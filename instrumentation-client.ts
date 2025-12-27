// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

interface CookieConsent {
  analytics: boolean;
}

const IN_APP_BROWSER_UA_RE =
  /FBAN|FBAV|Instagram|Messenger|LinkedIn|TikTok|Snapchat|Pinterest|Twitter|Line|WeChat|MicroMessenger/i;

const FIRST_HTTP_URL_RE = /https?:\/\/[^\s]+/;
const CLERK_ERROR_CODE_RE = /code="([^"]+)"/;
const TRAILING_PUNCTUATION_RE = /[),.]+$/;

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

function isKnownInAppBrowserUA(): boolean {
  try {
    return IN_APP_BROWSER_UA_RE.test(
      navigator.userAgent || navigator.vendor || ""
    );
  } catch {
    return false;
  }
}

/**
 * Detects whether a Sentry event represents the Facebook iOS in-app browser crash caused by an `InvalidAccessError`.
 *
 * @param event - The Sentry event to inspect
 * @returns `true` if the event is an `InvalidAccessError` whose message matches the known Facebook in-app browser crash text and the client user agent is a known in-app browser, `false` otherwise.
 */
function isFacebookInAppPostMessageInvalidAccessError(
  event: Sentry.Event
): boolean {
  const exc = event.exception?.values?.[0];
  const type = exc?.type;
  const value = exc?.value ?? "";

  if (type !== "InvalidAccessError") {
    return false;
  }

  // Sentry issue reports show this exact message for the FB iOS in-app browser crash.
  if (
    !value.includes("The object does not support the operation or argument")
  ) {
    return false;
  }

  // Ensure we only drop this in environments where we actually see the bug.
  return isKnownInAppBrowserUA();
}

/**
 * Detects whether a Sentry event represents the Facebook iOS in-app browser crash caused by accessing `window.webkit.messageHandlers`.
 *
 * @param event - The Sentry event to inspect.
 * @returns `true` if the event is a `TypeError` whose message includes "undefined is not an object" and "window.webkit.messageHandlers" and the user agent matches a known in-app browser; `false` otherwise.
 */
function isFacebookInAppWebKitMessageHandlerError(
  event: Sentry.Event
): boolean {
  const exc = event.exception?.values?.[0];
  const type = exc?.type;
  const value = exc?.value ?? "";

  if (type !== "TypeError") {
    return false;
  }

  // Sentry issue reports show this exact message for the FB iOS in-app browser crash
  // when trying to access window.webkit.messageHandlers that don't exist.
  if (
    !(
      value.includes("undefined is not an object") &&
      value.includes("window.webkit.messageHandlers")
    )
  ) {
    return false;
  }

  // Ensure we only drop this in environments where we actually see the bug.
  return isKnownInAppBrowserUA();
}

/**
 * Detects whether a Sentry event represents Clerk failing to load its JavaScript bundle.
 * This commonly occurs in in-app browsers that block external scripts, or with ad blockers/privacy extensions.
 *
 * @param event - The Sentry event to inspect.
 * @returns `true` if the event is a Clerk script load failure in an in-app browser; `false` otherwise.
 */
function isClerkScriptLoadFailure(event: Sentry.Event): boolean {
  const values = event.exception?.values ?? [];

  for (const exc of values) {
    const value = exc?.value ?? "";
    // Check for Clerk's specific error message when script fails to load
    if (
      value.toLowerCase().includes("failed to load") &&
      value.toLowerCase().includes("clerk")
    ) {
      // Only filter this in in-app browsers where we expect script loading issues
      return isKnownInAppBrowserUA();
    }
  }

  return false;
}

function captureClerkScriptLoadFailureToPosthog(event: Sentry.Event): void {
  if (!posthogKey) {
    return;
  }

  try {
    const values = event.exception?.values ?? [];
    const rawMessages: string[] = [];

    for (const exc of values) {
      const value = exc?.value;
      if (value) {
        rawMessages.push(value);
      }
    }

    const message = rawMessages.join(" | ").slice(0, 500);
    const scriptUrl = rawMessages
      .map((value) => value.match(FIRST_HTTP_URL_RE)?.[0] ?? null)
      .find((value): value is string => Boolean(value))
      ?.replace(TRAILING_PUNCTUATION_RE, "");
    const clerkErrorCode = rawMessages
      .map((value) => value.match(CLERK_ERROR_CODE_RE)?.[1] ?? null)
      .find((value): value is string => Boolean(value));

    posthog.capture("clerk_js_failed_to_load_in_app_browser", {
      clerkErrorCode,
      inAppBrowserUaMatch: isKnownInAppBrowserUA(),
      message,
      scriptUrl,
      sentryEventId: event.event_id,
      sentryRelease: event.release,
      sentryTransaction: event.transaction,
      url: typeof window === "undefined" ? undefined : window.location.href,
      referrer: typeof document === "undefined" ? undefined : document.referrer,
    });
  } catch {
    // Never let telemetry capture break app error handling.
  }
}

/**
 * Determines whether the user has granted analytics consent by reading the "cookie_consent" entry in localStorage.
 *
 * @returns `true` if the parsed consent object has `analytics` set to `true`, `false` otherwise.
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const raw = window.localStorage.getItem("cookie_consent");
    if (!raw) {
      return false;
    }
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

const enableReplay = hasAnalyticsConsent();

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Add optional integrations for additional features
  integrations: enableReplay ? [Sentry.replayIntegration()] : [],

  // Define how likely traces are sampled. 10% sampling for production.
  tracesSampleRate: 0.1,
  // Enable logs to be sent to Sentry
  enableLogs: false,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: enableReplay ? 0.1 : 0,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: enableReplay ? 1.0 : 0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  beforeSend(event) {
    if (isFacebookInAppPostMessageInvalidAccessError(event)) {
      return null;
    }

    if (isFacebookInAppWebKitMessageHandlerError(event)) {
      return null;
    }

    if (isClerkScriptLoadFailure(event)) {
      captureClerkScriptLoadFailureToPosthog(event);
      return null;
    }

    return event;
  },
});

// Initialize PostHog for analytics and capture exceptions
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
    debug: process.env.NODE_ENV === "development",
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

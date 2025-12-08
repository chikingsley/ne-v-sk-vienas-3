"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    console.error(
      "NEXT_PUBLIC_CONVEX_URL is not defined in environment variables"
    );
    // Fallback to prevent app from crashing
    return (
      <ClerkProvider
        afterSignOutUrl="/"
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        signInFallbackRedirectUrl="/onboarding"
        signUpFallbackRedirectUrl="/onboarding"
      >
        {children}
      </ClerkProvider>
    );
  }

  const convex = new ConvexReactClient(convexUrl);

  return (
    <ClerkProvider
      afterSignOutUrl="/"
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/onboarding"
      signUpFallbackRedirectUrl="/onboarding"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

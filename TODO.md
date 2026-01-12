# TODO - Nešvęsk vienas

Holiday hosting/guest matching platform for Lithuania.

**Last updated**: January 12, 2026

---

## Architecture: Multi-Holiday Infrastructure

The platform will support multiple holidays (Christmas, Easter, Midsummer, etc.) with proper infrastructure rather than hardcoded dates.

### New Database Tables

```text
holidays
├── slug: "easter-2026"
├── name: "Easter 2026"
├── names: { lt, en, ua, ru }  // Localized names
├── registrationOpensAt        // When users can sign up
├── startsAt                   // First day of holiday
├── endsAt                     // Last day
├── selectableDates: ["20 Apr", "21 Apr"]
├── status: "upcoming" | "active" | "completed"
└── theme: { primaryColor, heroImage }

holidayAvailability
├── userId
├── holidayId
├── hostingStatus
├── guestStatus
├── hostingDates
├── guestDates
├── capacity
├── notifiedAt
└── reminderSentAt

holidayNotifications
├── userId
├── holidayId
├── type: "registration_open" | "reminder" | "last_chance" | "holiday_starting"
├── sentAt
└── channel: "email" | "push" | "in_app"
```

### Holiday Transition Flow

1. Admin creates holiday → status: `upcoming`
2. Registration opens → status: `active`, send notifications
3. Users set per-holiday availability
4. Holiday ends → status: `completed`
5. Next holiday becomes active

---

## Completed Features

### Core Platform

- [x] Next.js 16 App Router + Convex database + Clerk auth
- [x] Real-time messaging with conversation system
- [x] Invitation system (send/accept/decline)
- [x] Multi-step onboarding with preference cards
- [x] Photo upload + gallery (up to 5 photos)
- [x] Face verification (EdgeFace-XXS + YuNet)
- [x] i18n (LT, EN, UA, RU) - partial, see gaps below
- [x] Username routing (`/people/[username]`)
- [x] In-app browser gate for Instagram/social auth
- [x] **Profile card unification** - `CompactCard` and `FullCard` variants in single component
- [x] **Last active display** - Shows in profile cards with `formatLastActive()`

### Security & Compliance (Production Hardening)

- [x] GDPR cookie consent banner + analytics gating
- [x] Consent recording to database (`userConsents` table)
- [x] Admin guard for dev-only Convex functions (`assertAdmin`)
- [x] Sentry with PII disabled + replay consent-gated
- [x] CSP headers (report-only mode)
- [x] Clerk ↔ Convex user sync (webhooks + bi-directional delete)
- [x] IDOR fix: `deleteUser` only allows self-deletion
- [x] Email test action disabled in production
- [x] Account deletion for users without profiles

### Moderation & Safety

- [x] Block user functionality
- [x] Unblock user functionality
- [x] Report user with reasons
- [x] Archive conversations
- [x] Archive/Block UI view in messages
- [x] Blocked users hidden from conversations and browse

### Legal Pages (All 4 languages)

- [x] Safety Guidelines (`/safety`) - Client's revised version
- [x] Terms of Service (`/terms`)
- [x] Privacy Policy (`/privacy`)
- [x] Cookie Policy (`/cookies`)

### Monitoring

- [x] Sentry error tracking
- [x] Vercel Analytics (consent-gated)
- [x] Vercel Speed Insights (consent-gated)
- [x] PostHog analytics

### Performance Optimizations (Dec 2025)

- [x] N+1 query fix in `listProfiles` - batch invitation queries (100 queries → 2)
- [x] Denormalized unread counts on conversations for O(1) reads
- [x] Slim profile returns from `listProfiles` (excludes large arrays)

---

## In Progress / Remaining

### Critical: Multi-Holiday Infrastructure

- [x] **Implement holidays table** - Store holiday definitions in database
- [x] **Implement holidayAvailability table** - Per-user, per-holiday participation
- [x] **Implement holidayNotifications table** - Track notification delivery
- [ ] **Holiday admin functions** - Create/activate/complete holidays
- [ ] **Update profile queries** - Filter by current holiday's availability
- [ ] **Update invitations** - Link to holidayId instead of hardcoded dates
- [ ] **Notification cron/scheduler** - Send "update your availability" reminders

### Critical: i18n Gaps

Major hardcoded strings that need translation keys:

- [x] **Onboarding page** - GDPR consent step now uses translations
- [x] **profile-action-button** - All action buttons now use translations
- [x] **PhotoGallery** - Upload/remove feedback messages now use translations
- [x] **in-app-browser-gate** - Browser detection messages now use translations
- [ ] **Messages page** - Report reasons, role labels (keys added, component update pending)
- [ ] **settings/edit-profile** - Preference options, form fields (keys added, component update pending)
- [ ] **Remaining onboarding steps** - Steps 1-6 still have hardcoded strings

### High Priority

- [ ] **Username selection UI** - Backend `setUsername` mutation exists, needs UI in onboarding/settings
- [ ] **Integrate useOnboardingForm hook** - Hook exists at `hooks/use-onboarding-form.ts`, reduces onboarding complexity
- [ ] **Evergreen landing page** - Auto-shows next upcoming holiday instead of static Christmas content

### Medium Priority: UX Improvements

- [ ] **"Pick 3" browse experience** - Show 3 profiles at a time, user picks interested/skip, more engaging than grid
- [ ] **Map view for browse** - Show hosts on map with privacy circles
- [ ] **References system** - Leave/receive references after meetups
- [ ] **Profile completion indicator** - "You're 80% done!" in onboarding
- [ ] **Response rate tracking** - Show how quickly users respond

### Low Priority / Post-MVP

- [ ] Phone verification (Clerk supports this)
- [ ] Compatibility score
- [ ] Save/favorite profiles
- [ ] PWA support
- [ ] Community Guidelines page (`/guidelines`)
- [ ] FAQ page (`/faq`)

---

## Tech Debt

### Completed

- [x] Fix TypeScript `lastMessage` null vs undefined type mismatch
- [x] Fix city type assertion in profiles.ts
- [x] Remove unused `getConnectionStatusBetween` function
- [x] Remove unused `QueryCtx` import
- [x] Extract shared `usePhotoUpload` hook
- [x] Profile card unification (CompactCard + FullCard variants)

### Remaining (Complexity Warnings)

Current lint complexity limit is 15. These are flagged but work fine:

| File | Score | Notes |
|------|-------|-------|
| `OnboardingPage` | 24/15 | 7-step wizard with 15+ fields. Hook created but not integrated yet |
| `usePhotoUpload` | 21/15 | Centralized upload logic - complexity trade-off for reusability |
| `profiles.ts` handler | 17/15 | Complex server query - legitimately complex |
| `profiles.ts` filter | 17/15 | Many filter conditions - idiomatic |
| `login-form` | 16/15 | Clean code, barely over |

**Decision**: Consider raising biome complexity limit to 20 (would pass login-form & profiles.ts, still flag OnboardingPage and usePhotoUpload for future refactoring).

### Future Considerations

- [ ] Consider Cloudflare R2 for images if scaling past bandwidth limits
- [ ] Integrate `useOnboardingForm` hook (requires updating Step0-Step6 components)

---

## Environment Variables Checklist

**Convex Dashboard:**
- `CLERK_WEBHOOK_SECRET`
- `CLERK_SECRET_KEY`
- `MAILEROO_API_KEY`
- `ADMIN_CLERK_USER_IDS` (comma-separated Clerk user IDs for admin functions)

**Vercel:**
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SENTRY_DSN`

---

## Quick Reference

### Running the app

```bash
bun dev          # Start dev server
bun run check    # Lint + type check (ultracite + tsc)
bun run lint     # Same as check
bun test         # Run tests
```

### Key files

- `convex/schema.ts` - Database schema
- `lib/i18n.ts` - All translations
- `contexts/cookie-consent-context.tsx` - Consent state
- `convex/lib/admin.ts` - Admin guard for protected functions
- `hooks/use-photo-upload.ts` - Shared photo upload logic
- `hooks/use-onboarding-form.ts` - Onboarding form state (not yet integrated)

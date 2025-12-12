# TODO - Nešvęsk vienas

Holiday hosting/guest matching platform for Lithuania.

**Last updated**: December 11, 2025

---

## Completed Features

### Core Platform

- [x] Next.js 16 App Router + Convex database + Clerk auth
- [x] Real-time messaging with conversation system
- [x] Invitation system (send/accept/decline)
- [x] Multi-step onboarding with preference cards
- [x] Photo upload + gallery (up to 5 photos)
- [x] Face verification (EdgeFace-XXS + YuNet)
- [x] i18n (LT, EN, UA, RU)
- [x] Username routing (`/people/[username]`)

### Security & Compliance (Production Hardening)

- [x] GDPR cookie consent banner + analytics gating
- [x] Consent recording to database (`userConsents` table)
- [x] Admin guard for dev-only Convex functions (`assertAdmin`)
- [x] Sentry with PII disabled + replay consent-gated
- [x] CSP headers (report-only mode)
- [x] Clerk ↔ Convex user sync (webhooks + bi-directional delete)
- [x] IDOR fix: `deleteUser` only allows self-deletion
- [x] Email test action disabled in production

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

---

## In Progress / Remaining

### High Priority

- [ ] **Username selection in onboarding/settings** - Users can't pick their own username yet
- [ ] **Profile card unification** - Create single `UserIdentityCard` with variants for grid/list/sidebar/profile
- [ ] **Map view for browse** - Show hosts on map with privacy circles

### Medium Priority

- [ ] **References system** - Leave/receive references after meetups
- [ ] **Profile completion indicator** - "You're 80% done!" in onboarding
- [ ] **Last active / response rate** - Show when user was last online
- [ ] **Community Guidelines page** (`/guidelines`)
- [ ] **FAQ page** (`/faq`)

### Low Priority / Post-MVP

- [ ] Phone verification (Clerk supports this)
- [ ] Compatibility score
- [ ] Save/favorite profiles
- [ ] PWA support

---

## Tech Debt

- [ ] Reduce component complexity (BrowsePage, MessagesPage still have warnings)
- [ ] Consider Cloudflare R2 for images if scaling past bandwidth limits

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
bun run check    # Lint + type check
bun test         # Run tests
```

### Key files

- `convex/schema.ts` - Database schema
- `lib/i18n.ts` - All translations
- `contexts/cookie-consent-context.tsx` - Consent state
- `convex/lib/admin.ts` - Admin guard for protected functions

# TODO - Nešvęsk vienas

Holiday hosting/guest matching platform for Lithuania.

**Last updated**: December 11, 2025

---

## Completed Features

### Core Infrastructure

- [x] Next.js 16 App Router migration
- [x] Convex database + real-time sync
- [x] Clerk authentication (magic link)
- [x] Clerk ↔ Convex bi-directional sync (webhooks)
- [x] Toast notifications (Sonner) - for actions like sending invites, profile saved, errors
- [x] DevPanel for development testing
- [x] 33 backend tests passing (vitest + convex-test)
- [x] E2E testing setup (Playwright + Stagehand v3 + Gemini 2.5 Flash)
- [x] Linting setup (Ultracite + Biome)
- [x] Dev server (Bun + concurrently)

### User Flow

- [x] Multi-step onboarding (4 steps: Preferences → Basic Info → Bio → Languages)
- [x] Preference cards (Can Host / May Host / Can't Host + Guest options)
- [x] Holiday date selection per preference
- [x] Fullscreen onboarding (separate layout, no sidebar)
- [x] Profile creation + editing
- [x] Photo upload + gallery (up to 5 photos, main photo selection)
- [x] Browse hosts/guests with filters (city, date, language)
- [x] Grid/list view toggle
- [x] Shadcn Select dropdowns - Full clickable area for filters
- [x] Tab switch optimization - No "0 found" flash when switching host/guest

### Matching & Messaging

- [x] Send invitations (backend)
- [x] Invitations UI - display pending invitations
- [x] Accept/Decline UI
- [x] Match confirmation
- [x] Contact reveal after match (phone/address)
- [x] Date picker in invite
- [x] Real-time chat
- [x] Message list in sidebar + dedicated MessagesPage
- [x] Unread indicators + badge count
- [x] Notification bell (combined messages + invites)
- [x] Message Profile Integration - View full profile in "Slide-over" sheet while chatting

### Verification

- [x] Face verification API (EdgeFace-XXS + YuNet)
- [x] Verified badge display
- [x] "Verify Identity" button in Dashboard
- [x] Upload component (ID photo + selfie)
- [x] Verification status display (pending/verified/failed)

### Localization

- [x] i18n setup - 4 languages (LT, EN, UA, RU) in single TypeScript file
- [x] LanguageSelector component in navbar
- [x] Landing page fully translated
- [x] EDITING.md guide for non-technical content editing
- [x] Client copy update - Updated i18n.ts with translations from client document

### Layout & Navigation

- [x] Sidebar navigation (AppSidebar)
- [x] TopBar with search + notifications + Clerk UserButton
- [x] Dashboard with stats + quick actions
- [x] Settings page with profile editing in tabs
- [x] Public profile view - `/profile` button to see your profile as others see it
- [x] Location privacy picker (prototype at `/location-picker`)

### Data Sync

- [x] Clerk → Convex webhook - Auto-sync user creation/updates/deletions
- [x] Convex → Clerk delete - `deleteUser` action removes from both systems
- [x] Cascading deletes - User deletion removes all related data

### Auth Flow (Clerk + Convex)

- [x] **Fixed auth sync issues** - Use `useConvexAuth` instead of Clerk's `useAuth`
  - Updated `app/(dashboard)/layout.tsx` - Wait for Convex auth before querying profiles
  - Updated `app/onboarding/page.tsx` - Skip profile query until auth is ready
  - Updated `app/(landing)/page.tsx` - Use `useConvexAuth` for consistent auth state
  - Prevents onboarding flash on page load
  - Fixed redirect issues after sign-in/sign-up

---

## High Priority - UI/UX Redesign

### Navigation Redesign

- [x] **Switch from sidebar to top bar navigation** - More screen real estate
  - Created `components/dashboard-navbar.tsx` - Top navbar with logo, nav items, language selector, user button
  - Updated `app/(dashboard)/layout.tsx` - Removed sidebar, uses full-width top navbar
  - Items: Home | Messages | Profile | Settings (with badge count on Messages)
  - Mobile responsive with hamburger menu
  - Old `components/app-sidebar.tsx` and `components/top-bar.tsx` can be removed (kept for reference)

### Username Routing

- [x] **`/people/[username]` route** - Human-readable profile URLs
  - ~~See: `docs/USERNAME-ROUTING-ANALYSIS.md` for full plan~~ (archived)
  - [x] Phase 1: Add `username` field to profiles schema + index
  - [x] Phase 2: `getProfileByUsername` query, `checkUsernameAvailability`, `setUsername` mutation
  - [x] Phase 3: New route at `app/(dashboard)/people/[username]/page.tsx`
  - [ ] Phase 4: Username selection in onboarding/settings
  - [x] Phase 5: Update all profile links (listing-card, browse, DevPanel, profile redirect)
  - [x] Keep `/profile/[id]` for backwards compatibility
  - [x] `generateMissingUsernames` mutation for existing profiles
  - [x] Run `generateMissingUsernames` on production to assign usernames

### Profile Card in Chat

- [ ] **Right sidebar mini-profile** - Show while chatting (xl screens)
  - Reference: `docs/couchsurfing-reimagined/components/InboxView.tsx`
  - Avatar, status indicator, references count
  - Verification badges
  - Interests tags
  - **Private notes field** - Yellow sticky note (only you see it)
  - **Labels/tags** - "Friend", "Potential Host", custom labels

### Profile Status System

- [ ] **Status dropdown** - Green/Yellow/Red (Accepting/Maybe/Not Accepting)
  - Reference: `docs/couchsurfing-reimagined/components/ProfileView.tsx`
  - Instant status change from profile card
  - "Wants to Meet Up" option for non-hosting scenarios

### Profile Card Unification (PRIORITY)

**Problem**: Data flows from onboarding → Convex but not all fields display in cards/profile views.

**Current state**:
- `ListingCard` (`components/listing-card.tsx`) - Grid card for browse page
- `ProfileView` (`components/profile-view.tsx`) - Full profile page display
- Both use different subsets of profile data

**Reference**: `docs/reference-projects/user-identity-card.tsx` - Multi-variant card component

**Action items**:
- [ ] **Audit data flow** - Map all profile fields from onboarding → schema → card display
- [ ] **Create `UserIdentityCard` component** - Single component with variants:
  - `dashboard-grid` - Browse page grid card
  - `dashboard-list` - Browse page list view
  - `inbox-sidebar` - Chat sidebar mini-profile
  - `profile-header` - Full profile page header
- [ ] **Add missing fields to cards**:
  - Response time / last active
  - References count (when implemented)
  - Friends count (when implemented)
  - Quick info section (joined date, occupation)
- [ ] **Status indicators** - Online/offline dot, hosting status color

**Data Model**:
Current schema has all needed fields. Key ones not yet displayed:
- `lastActive` - Show "Active recently" or "Last seen X days ago"
- `concept` - Party/Dinner/Hangout (only shown if host)
- `capacity` - Max guests (only shown if host)
- `amenities`, `houseRules` - Host details (profile page only)

---

## High Priority - Features

### Onboarding Improvements

- [x] **Extended date range** - Dec 23 to Jan 2 (was only 24, 25, 26, 31)
- [x] **Inline date selection in preference cards** - Dates expand within the selected preference card with Framer Motion animations
  - [x] **Prototype built** - See `/preference-cards` experiment
  - [x] **Color coding** - Green (yes), Amber (maybe), Red (no)
  - [x] **Applied to real onboarding** - Updated `app/onboarding/page.tsx`
- [ ] **Typeahead city search** - Instead of dropdown, autocomplete Lithuanian cities
- [ ] **Profile completion indicator** - "You're 80% done!" encouragement UI
- [ ] **State persistence** - Auto-save each step to Convex (no data loss on refresh)

### Email Integration (Maileroo)

- [x] **Set up Maileroo API** - Replaced Resend (doesn't support .lt domain)
- [x] **Email notification preferences** - Settings UI wired to database
- [ ] **Email verification** - Optional badge, don't force signup verification (avoid drop-offs)
- [ ] **Match notifications** - Email when someone accepts your invite
- [ ] **New message notifications** - Email digest for unread messages

### Clerk Elements Migration (Future)

- [ ] **Migrate to Clerk Elements** - Custom auth UI components for better GDPR compliance
  - Clerk Elements allows building custom sign-in/sign-up forms
  - Better control over consent checkboxes placement
  - Can style to match app design perfectly
  - Docs: https://clerk.com/docs/customization/elements/overview
- [ ] **Custom sign-up form** - With Terms/Privacy checkboxes directly in the form
- [ ] **Custom sign-in form** - Matching app styling

### Browse/Discovery Enhancements

- [ ] **Bigger filter system**:
  - Filter by interests
  - Filter by gender
  - Filter by verification status
  - Filter by hosting status (Can Host / May Host / All)
- [ ] **Map view** - Show hosts on interactive map (with privacy circles)
- [ ] **Compatibility score** - Match based on vibes/dates/languages/interests

### Chat/Inbox Improvements

- [ ] **Archive conversations**
- [ ] **Block user functionality**
- [ ] **Report user modal** with reasons (Spam, Inappropriate, Harassment, Fake Profile, Other)

---

## Medium Priority

### "My Home" Section

- [ ] **Detailed hosting preferences** in Settings/Profile tab
  - Max guests
  - Sleeping arrangements (Private/Shared/Common)
  - Pet-friendly (yes/no)
  - Smoking policy (No/Outside/Yes)
  - Kid-friendly
  - Wheelchair accessible
  - Roommate situation
  - Public transport info
  - House rules text
  - Reference: `docs/archive/PIVOT-ANALYSIS.md` for full field list

### References System

- [ ] **Leave reference** - After confirmed meetup, prompt to leave reference
- [ ] **Reference types** - Host / Guest / Personal
- [ ] **Positive/Negative indicator**
- [ ] **Respond to references** - Reply to references left on your profile
- [ ] Reference: `docs/couchsurfing-reimagined/types.ts` for Reference interface

### Verification Enhancements

- [x] **Exit/skip option on verify page** - "Back to Browse" link + "Skip for now" button
- [ ] **ID photo scanning guide** - Rectangle overlay on camera to help align ID card, optional edge detection
  - Simple: Static rectangle guide (user aligns manually)
  - Advanced: OpenCV.js or TensorFlow.js for auto edge detection
- [ ] **Phone verification** - Via SMS or authenticator app (Clerk supports this)
- [ ] **Email verification badge** - Show if email is verified
- [ ] **Photo verification badge** - Current face verification
- Note: NOT doing Government ID verification

### Profile Enhancements

- [ ] **Last active** - Show when user was last online
- [ ] **Response rate** - Track invitation response speed
- [ ] **Interests/hobbies** - Beyond just "vibes"

### Dashboard i18n (~210-260 strings)

- [x] **app-sidebar.tsx** - Nav labels (~5 strings)
- [x] **top-bar.tsx** - Page titles (~5 strings)
- [ ] **verify-banner.tsx** - Banner message (~2 strings)
- [ ] **onboarding/page.tsx** - Multi-step form (~30-35 strings)
- [x] **browse/page.tsx** - Filters, empty states, buttons (~30-35 strings)
- [ ] **profile/[id]/page.tsx** - Status messages, CTAs (~25-30 strings)
- [ ] **location-picker/page.tsx** - Instructions, labels (~20-25 strings)
- [x] **settings/page.tsx** - Many labels & descriptions (~50-55 strings)
- [ ] **messages/page.tsx** - Modals, dynamic text, status messages (~35-40 strings)
- [ ] **Dynamic text helpers** - Template interpolation for "{name}", "{count}", etc.

### Content Moderation

- [ ] **Profanity filter** - Use `obscenity` library (detects evasion like "fuuuck")
- [ ] **Block on flagged message** - Message not sent, user notified
- [ ] **Admin notification** - Flag to admin/dashboard for review
- [ ] **Temporary suspension** - Repeat offenders get temp banned

### Card Playground / Dev Mode

- [ ] **`/dev/cards` route** - Experiment with card designs
- [ ] Test different card layouts, sizes, information density
- [ ] Reference the mockup cards in `docs/couchsurfing-reimagined/`

---

## Low Priority / Post-MVP

### Monitoring & Error Tracking

- [x] **Sentry integration** - Automatic error capture and alerting
  - Catches JS errors, shows stack traces, user context
  - Free tier: 5,000 errors/month
  - Configured: `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
  - Test page: `/sentry-example-page`
- [x] **Error boundaries** - Graceful error handling in React
  - `app/global-error.tsx` - catches and reports to Sentry
- [ ] **Report Problem button** - User feedback mechanism
  - Footer link or floating button
  - Options: simple mailto link, feedback form modal, or Sentry's feedback widget
  - Store reports in Convex or send to email

### Analytics & Performance

- [x] **Vercel Analytics** - Enabled in Vercel dashboard
  - Page views, unique visitors, referrers
- [x] **Vercel Speed Insights** - Core Web Vitals monitoring
  - Track page load times, performance scores
- [x] **SEO** - Meta tags, OpenGraph, sitemap
  - [x] Root layout metadata (title, description, keywords, OG, Twitter cards)
  - [x] `sitemap.ts` - Dynamic sitemap generation
  - [x] `robots.ts` - Search engine crawling rules
  - [x] Browse page metadata
  - [x] Dynamic profile page metadata with `generateMetadata`
  - [ ] **Manual: Create OG image** - Need `public/og-image.png` (1200x630px)
  - [ ] **Manual: Google Search Console** - Add property, verify ownership, submit sitemap
  - [ ] **Manual: Bing Webmaster Tools** - Add site, verify, submit sitemap
  - [ ] **Manual: Add verification codes** - In `app/layout.tsx` verification field
  - [ ] **Manual: Set NEXT_PUBLIC_SITE_URL** - In Vercel env vars (e.g., `https://nesveskvienas.lt`)
- [ ] **PWA** - Installable app with offline support (stretch goal)

### Legal & Safety Pages

- [x] **Safety Guidelines Page** (`/safety`) - User safety tips and best practices ✅ EXISTS
- [x] **Terms of Service** (`/terms`) - Legal terms ✅ EXISTS
- [x] **Privacy Policy** (`/privacy`) - GDPR compliance ✅ EXISTS
- [ ] **Community Guidelines Page** (`/guidelines`) - How to behave on the platform
  - Be considerate and respectful, resolve disputes together
  - Don't attack members, use good judgment, report violations
  - Reference: `docs/courchsurfing-pages/main-about-site/about-guidelines.md`
- [ ] **Policies Page** (`/policies`) - Platform rules and conduct
  - No spam, no dating/hookups, no charging for hosting
  - No harassment, one profile only, keep it legal
  - Content policy (hate speech, explicit content, etc.)
  - Reference policy (14-day window, when refs can be removed)
  - Reference: `docs/courchsurfing-pages/main-about-site/about-policies.md`
- [ ] **FAQ Page** (`/faq`) - Common questions about safety and platform
  - Is it safe? How to report problems? References explained
  - What to do in emergencies, message disputes
  - Reference: `docs/courchsurfing-pages/main-about-site/about-faq.md`
- [x] **Cookie Policy Page** (`/cookies`) - Cookie usage disclosure (GDPR requirement) ✅ EXISTS

---

## 🚨 HIGH PRIORITY: GDPR/CCPA Compliance

**Status**: PARTIALLY COMPLIANT - Good foundation, critical gaps remain

**Audit Date**: December 11, 2024

### What's Already Done ✅

- [x] Consent checkboxes in onboarding (Step 0) - Terms + Privacy
- [x] Checkboxes start unchecked by default (`useState(false)`)
- [x] Linked legal documents (`/terms`, `/privacy`, `/safety`)
- [x] Age verification (18+ confirmation)
- [x] Multilingual legal docs (LT, EN, RU, UA)

---

### 1. Add Privacy/Terms Links to Clerk Sign-Up Page

**Severity**: HIGH (CCPA violation)
**Effort**: 🟢 EASY (~5 min) - Just add props to ClerkProvider
**Risk**: $7,988 per violation (CCPA)

**Problem**: Privacy policy not visible on `/sign-up` page where email is collected.

**Fix**: Add `termsPageUrl` and `privacyPageUrl` to ClerkProvider appearance prop.

```typescript
// app/layout.tsx or components/providers/convex-client-provider.tsx
<ClerkProvider
  appearance={{
    layout: {
      termsPageUrl: '/terms',
      privacyPageUrl: '/privacy',
    }
  }}
>
```

**Files to update**:
- `components/providers/convex-client-provider.tsx`

**Clerk Docs**: https://clerk.com/docs/customization/layout

---

### 2. Enable Clerk Legal Consent Checkbox (Dashboard Setting)

**Severity**: HIGH (GDPR requirement)
**Effort**: 🟢 EASY (~2 min) - Dashboard toggle, no code
**Risk**: €20M or 4% revenue (GDPR)

**Problem**: Sign-up doesn't show consent checkbox before collecting data.

**Fix**: Enable from Clerk Dashboard (no code needed):
1. Go to **Clerk Dashboard** → **Configure** → **Legal**
2. Toggle ON "Require express consent to legal documents"
3. Enter your Terms URL: `https://nesveskvienas.lt/terms`
4. Enter your Privacy URL: `https://nesveskvienas.lt/privacy`

**Result**: Checkbox automatically appears on `<SignUp />` component.

**Clerk Docs**: https://clerk.com/docs/authentication/configuration/legal-compliance

---

### 3. Add Cookie Consent Banner

**Severity**: CRITICAL (GDPR/ePrivacy violation)
**Effort**: 🟡 MEDIUM (~30 min) - Custom component, ~100 lines
**Risk**: €20M or 4% revenue (GDPR)

**Problem**: No cookie consent banner. Google Analytics may be setting cookies without consent.

**Recommended Fix**: Custom banner with Google Consent Mode (FREE, minimal dependencies)

**Dependencies to install**:
```bash
bun add client-only
bun add -d @types/gtag.js
```

**Files to create**:
1. `lib/storage-helper.ts` - localStorage wrapper
2. `lib/gtag-helper.ts` - Google Analytics helper
3. `components/cookie-banner.tsx` - Banner UI component
4. `components/google-analytics.tsx` - GA with consent mode

**Key Implementation Points**:
- GA loads with consent **denied by default**: `gtag('consent', 'default', { 'analytics_storage': 'denied' })`
- Banner shows "Accept All" and "Reject All" buttons (equal prominence - GDPR requirement)
- Consent stored in localStorage, persists across sessions
- On accept: `gtag('consent', 'update', { 'analytics_storage': 'granted' })`

**Alternative (Easier but less control)**:
```bash
bun add react-cookie-consent
```
Drop-in component with `enableDeclineButton` prop.

**Reference Tutorial**: https://gaudion.dev/blog/setup-google-analytics-with-gdpr-compliant-cookie-consent-in-nextjs13

---

### 4. Add Marketing Consent Checkbox (Onboarding)

**Severity**: CRITICAL (GDPR consent bundling violation)
**Effort**: 🟢 EASY (~15 min) - Add one checkbox to existing Step0
**Risk**: €20M or 4% revenue (GDPR)

**Problem**: Age confirmation text bundles "receive important communications" with age verification. GDPR requires separate consent for each purpose.

**Current problematic text**:
```
"By continuing, you confirm you are at least 18 years old and
agree to receive important communications about your account."
```

**Fix**:
1. Remove communication consent from age confirmation text
2. Add separate optional checkbox for marketing emails

**Updated Step 0 structure**:
```
REQUIRED:
☑ Terms of Service
☑ Privacy Policy

OPTIONAL (unchecked by default):
☐ I'd like to receive marketing emails about features, events, and
   community highlights. (You can unsubscribe anytime)

INFO (no checkbox):
"By continuing, you confirm you are at least 18 years old."
```

**File to update**:
- `app/onboarding/page.tsx` (Step0Consent component, lines 54-150)

---

### 5. Add Consent Recording to Database

**Severity**: MEDIUM (Audit risk)
**Effort**: 🟡 MEDIUM (~1-2 hours) - Schema + mutations
**Risk**: Cannot prove consent if audited

**Problem**: No record of when/what users consented to. GDPR requires proof of consent.

**Required Fields** (minimum to prove consent):
- `userId` - Who consented
- `purpose` - What they consented to (terms, privacy, marketing)
- `consentTimestamp` - When they consented
- `consentMethod` - How (checkbox, button)
- `policyVersion` - Which version of T&Cs they saw
- `status` - active/withdrawn

**Schema to add** (`convex/schema.ts`):
```typescript
// Add to schema
userConsents: defineTable({
  userId: v.id("users"),
  purpose: v.union(
    v.literal("terms_of_service"),
    v.literal("privacy_policy"),
    v.literal("marketing_emails"),
    v.literal("analytics_cookies")
  ),
  policyVersion: v.string(), // e.g., "2024-12-01"
  status: v.union(v.literal("active"), v.literal("withdrawn")),
  consentMethod: v.union(v.literal("checkbox"), v.literal("button")),
  consentTimestamp: v.number(),
  withdrawnAt: v.optional(v.number()),
  createdAt: v.number(),
})
  .index("by_userId", ["userId"])
  .index("by_purpose", ["userId", "purpose"]),
```

**Files to update**:
- `convex/schema.ts` - Add userConsents table
- `convex/profiles.ts` - Record consent when profile created
- `app/onboarding/page.tsx` - Pass consent data to mutation

---

### 6. Create Cookie Policy Page ✅ DONE

**Status**: COMPLETED

Cookie policy page exists at `app/(legal)/cookies/page.tsx` with:
- Multilingual support (LT, EN, UA, RU)
- What cookies are used
- Types of cookies (necessary, analytics, marketing)
- How to manage cookies
- Third-party cookies info
- Consent information

---

### 7. Separate Age Verification from Consent

**Severity**: LOW (Best practice)
**Effort**: 🟢 EASY (~10 min) - Text change only
**Risk**: Minor bundling concern

**Problem**: Age confirmation is presented as consent text when it's actually a service requirement.

**Current** (mixed concerns):
```
"By continuing, you confirm you are at least 18 years old and
agree to receive important communications about your account."
```

**Fix** (separated):
```
CONSENT CHECKBOXES:
☑ Terms of Service (required)
☑ Privacy Policy (required)
☐ Marketing emails (optional)

NOTICE (no checkbox, just text):
"By continuing, you confirm you are at least 18 years old."
```

**File to update**:
- `app/onboarding/page.tsx` (line 146-148)

---

### Implementation Priority Order

| # | Task | Effort | Impact | Status |
|---|------|--------|--------|--------|
| 2 | Clerk Dashboard Legal Consent | 2 min | HIGH | ✅ YES |
| 1 | Add Privacy/Terms to ClerkProvider | 5 min | HIGH | ✅ YES |
| 4 | Add Marketing Checkbox | 15 min | CRITICAL | ✅ YES |
| 7 | Separate Age Verification | 10 min | LOW | ✅ YES |
| 3 | Cookie Consent Banner | 30 min | CRITICAL | ✅ DONE |
| 6 | Cookie Policy Page | 30 min | LOW | ✅ DONE |
| 5 | Consent Database Recording | 1-2 hr | MEDIUM | After basics |

**Total time for full compliance: ~3-4 hours**

**Quick wins (do in 30 min)**:
- Clerk Dashboard toggle (2 min)
- ClerkProvider props (5 min)
- Fix age verification text (10 min)
- Add marketing checkbox (15 min)

---

### Reference: GDPR Key Requirements Checklist

- [ ] Consent checkboxes unchecked by default ✅ (already done)
- [ ] Separate consent for each purpose (fix marketing bundling)
- [ ] Privacy policy visible where data collected (add to Clerk)
- [ ] Cookie consent before non-essential cookies (add banner)
- [ ] "Reject All" equally prominent as "Accept All" (banner design)
- [ ] Easy consent withdrawal (add to settings page)
- [ ] Consent audit trail (add to database)
- [ ] Policy version tracking (add to database)

### Future Features

- [ ] Save/favorite profiles - Bookmark interesting hosts/guests
- [ ] Voice/video call integration (stretch goal)
- [ ] Easter event expansion
- [ ] Year-round hosting mode

---

## Tech Debt

- [x] Remove `@tensorflow/tfjs` from package.json (face-api bundles it internally) - DONE
- [x] Clean up old Bun server files (src/ folder) - DONE (folder doesn't exist)
- [x] Consolidate experiments into `app/(experiments)/` - landing1-3, client1-3, sentry-example-page, location-picker
- [x] Add `@vercel/analytics` to layout.tsx (was missing the `<Analytics />` component)
- [x] Set up Convex testing with vitest (`bun run test`) - 3 tests passing
- [ ] Reduce component complexity (BrowsePage, MessagesPage, ProfilePages) - partially done, still has warnings
- [ ] **[Future] Migrate images to Cloudflare R2** - Zero egress fees vs Convex bandwidth limits (50GB/mo on Pro). Not urgent now, consider if scaling past 1K active users.

---

## Known Issues

### Clerk Image 404 Error

**Error**: `upstream image response failed for https://img.clerk.com/... 404`

**Cause**: When a user deletes their account in Clerk, the OAuth profile image URL becomes invalid (404). The `syncGooglePhoto` function in `convex/files.ts` syncs the Clerk/Google image URL directly to the profile. When the user is deleted from Clerk, this URL breaks.

**Impact**: Browse page shows broken images for deleted/stale users. Real-time sync with Convex means deleted users may still appear briefly.

**Solutions**:
1. **Short-term**: Fallback to DiceBear avatar when image fails to load (already in place in `listing-card.tsx`)
2. **Medium-term**: Store OAuth images in Convex storage instead of linking to Clerk URLs
3. **Long-term**: Clean up orphaned profiles when Clerk webhook fires `user.deleted`

**Status**: Fallback implemented. Consider migrating to Convex storage for OAuth photos.

---

## Data Model Freeze Plan

**Goal**: Finalize schema before accepting real users to avoid migrations.

### Current Schema Status

**Stable (ready for users)**:
- `users` - Clerk sync working ✅
- `profiles` - All core fields present ✅
- `invitations` - Working but may deprecate for `conversations`
- `messages` - Working ✅

**Needs review before freeze**:
- [ ] `conversations` - New chat system, may replace `invitations`
- [ ] `events` - Not yet used in UI
- [ ] `bannedWords` - Content moderation (not urgent)

### Fields to Add Before Freeze

**Profile fields**:
- [ ] `occupation` - Job/profession (for Quick Info display)
- [ ] `joinedAt` - Registration date (auto-set on profile creation)
- [ ] `responseRate` - Track invitation response time
- [ ] `hostingStatus` - "accepting" | "maybe" | "not_accepting" (vs role)

**Future consideration (can add later with defaults)**:
- `interests` - Hobbies/interests array (beyond vibes)
- `referencesCount` - Denormalized count for display
- `friendsCount` - When friends system added

### Migration Strategy

Once schema is frozen:
1. All new fields must have `v.optional()` with sensible defaults
2. Use `generateXxx` mutations for backfilling (like `generateMissingUsernames`)
3. Never delete fields - mark as deprecated with comments

---

## Archived Docs

The following docs have been moved to `docs/archive/`:

- `holiday-platform-planning-2.md` - Original spec (superseded by this TODO)
- `PIVOT-ANALYSIS.md` - Couchers-style analysis (key items added here)
- `verification-stack-options.md` - Verification research (implemented EdgeFace approach)

### Reference Docs (Keep Active)

- `CLAUDE.md` - Claude Code instructions
- `README.md` - Project overview
- `CHANGELOG.md` - Version history
- `reference-projects/couchsurfing-reimagined/` - **Mockup project for UI reference** (Important!)
- `client-visual/` - Visual design references
- `courchsurfing-pages/` - Scraped Couchsurfing pages for legal/safety page templates

---

## Quick Reference

### Toast Notifications

Yes, we have toasts via Sonner. Used for actions (invite sent, profile saved, errors).
NOT used for real-time message notifications (those use bell icon badge).

```tsx
import { toast } from "sonner";
toast.success("Profile saved!");
toast.error("Something went wrong");
```

### Clerk Phone Verification

Clerk supports phone verification out of the box via SMS. Can be enabled in Clerk dashboard.
Also supports authenticator app (TOTP) for 2FA if needed.

### Key Mockup Files

- `docs/reference-projects/couchsurfing-reimagined/components/Navbar.tsx` - Top bar navigation
- `docs/reference-projects/couchsurfing-reimagined/components/Dashboard.tsx` - Browse/Find page
- `docs/reference-projects/couchsurfing-reimagined/components/InboxView.tsx` - Chat with profile sidebar
- `docs/reference-projects/couchsurfing-reimagined/components/ProfileView.tsx` - Profile with status dropdown
- `docs/reference-projects/couchsurfing-reimagined/types.ts` - TypeScript interfaces for Reference, etc.

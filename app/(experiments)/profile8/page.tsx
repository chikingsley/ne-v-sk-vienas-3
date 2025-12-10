"use client";

import {
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  Cigarette,
  Dog,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
  Wine,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { ProfileView } from "@/components/profile-view";
import type { Doc, Id } from "@/convex/_generated/dataModel";

// Extended mock profile with additional fields for experiments
type ExtendedProfile = Doc<"profiles"> & {
  occupation?: string;
  joinedDate?: string;
  responseTime?: string;
};

// My Place data structure - host's home/venue info
type MyPlace = {
  // Basic
  dwellingType:
    | "apartment"
    | "house"
    | "studio"
    | "loft"
    | "townhouse"
    | "other";
  neighborhood?: string; // e.g. "Old Town", "Žvėrynas"
  neighborhoodDescription?: string; // Free text about the area

  // Space details
  diningCapacity: number; // How many can sit at table
  hasOutdoorSpace?: boolean; // Balcony, terrace, garden
  outdoorSpaceType?: "balcony" | "terrace" | "garden" | "patio";

  // Accessibility
  floorLevel?: number; // 0 = ground floor
  hasElevator?: boolean;
  wheelchairAccessible?: boolean;

  // Parking
  parkingType?: "street" | "private" | "garage" | "none";
  parkingNotes?: string; // "Free street parking nearby"

  // Kitchen & Dining
  kitchenType?: "full" | "kitchenette" | "shared" | "none";
  diningSetup?: "dining-table" | "kitchen-island" | "living-room" | "outdoor";

  // What's provided
  providesFood?: boolean;
  providesDrinks?: boolean;
  guestsShouldBring?: string[]; // "A dish to share", "Drinks", "Dessert"

  // Atmosphere
  settingType?: "intimate" | "casual" | "formal" | "festive";
  photoUrls?: string[]; // Optional photos of the space
};

// Mock MyPlace data
const mockMyPlace: MyPlace = {
  dwellingType: "apartment",
  neighborhood: "Senamiestis",
  neighborhoodDescription:
    "Right in the heart of Old Town, walking distance to the Cathedral. Cobblestone streets and cozy cafes all around.",
  diningCapacity: 6,
  hasOutdoorSpace: true,
  outdoorSpaceType: "balcony",
  floorLevel: 3,
  hasElevator: true,
  wheelchairAccessible: false,
  parkingType: "street",
  parkingNotes: "Free parking on Pilies st. after 6pm, paid during the day",
  kitchenType: "full",
  diningSetup: "dining-table",
  providesFood: true,
  providesDrinks: true,
  guestsShouldBring: ["Dessert or snacks to share", "Your favorite drink"],
  settingType: "intimate",
};

const mockMyPlace2: MyPlace = {
  dwellingType: "house",
  neighborhood: "Žvėrynas",
  neighborhoodDescription:
    "Quiet residential area with lots of trees. 10 min drive from center.",
  diningCapacity: 12,
  hasOutdoorSpace: true,
  outdoorSpaceType: "garden",
  floorLevel: 0,
  hasElevator: false,
  wheelchairAccessible: true,
  parkingType: "private",
  parkingNotes: "Driveway fits 3 cars",
  kitchenType: "full",
  diningSetup: "dining-table",
  providesFood: true,
  providesDrinks: false,
  guestsShouldBring: ["Drinks", "An appetizer or side dish"],
  settingType: "festive",
};

// Mock profile data to preview the component
const mockProfile: ExtendedProfile = {
  _id: "mock-id" as Id<"profiles">,
  _creationTime: Date.now(),
  userId: "mock-user-id" as Id<"users">,
  username: "jonas",
  role: "both",
  hostingStatus: "can-host",
  guestStatus: "looking",
  hostingDates: ["24 Dec", "25 Dec", "26 Dec"],
  guestDates: ["31 Dec", "1 Jan"],
  firstName: "Jonas",
  lastName: "Jonaitis",
  age: 28,
  city: "Vilnius",
  bio: "I love hosting holiday dinners! My specialty is traditional Lithuanian kugelis and cepelinai. Looking forward to meeting new friends this holiday season.",
  photoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  verified: true,
  languages: ["Lithuanian", "English"],
  availableDates: ["24 Dec", "25 Dec", "26 Dec", "31 Dec", "1 Jan"],
  dietaryInfo: ["Vegetarian options", "Gluten-free options"],
  concept: "Dinner",
  capacity: 6,
  amenities: ["Parking", "Wi-Fi", "Board games"],
  houseRules: ["No shoes inside", "Quiet after 11pm"],
  vibes: ["Cozy", "Traditional", "Family-friendly"],
  smokingAllowed: false,
  drinkingAllowed: true,
  petsAllowed: false,
  hasPets: true,
  lastActive: Date.now() - 1000 * 60 * 30, // 30 mins ago
  occupation: "Software Engineer",
  joinedDate: "Nov 2024",
  responseTime: "Replies within hours",
};

// Mock profile with "maybe" statuses
const mockMaybeProfile: ExtendedProfile = {
  ...mockProfile,
  _id: "mock-id-2" as Id<"profiles">,
  firstName: "Ona",
  lastName: "Onaitė",
  hostingStatus: "may-host",
  guestStatus: "maybe-guest",
  hostingDates: ["25 Dec", "26 Dec"],
  guestDates: ["24 Dec"],
  photoUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  bio: "Not sure yet if I'll be hosting or joining someone else. Flexible and open to anything!",
  occupation: "Graphic Designer",
  joinedDate: "Dec 2024",
};

// Mock profile - host only
const mockHostOnly: ExtendedProfile = {
  ...mockProfile,
  _id: "mock-id-3" as Id<"profiles">,
  firstName: "Petras",
  hostingStatus: "can-host",
  guestStatus: "not-looking",
  hostingDates: ["24 Dec", "25 Dec"],
  guestDates: [],
  role: "host",
  photoUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  bio: "Hosting a big Christmas dinner! Have space for 8 guests.",
  capacity: 8,
  occupation: "Chef",
  joinedDate: "Oct 2024",
};

// Mock profile - guest only
const mockGuestOnly: ExtendedProfile = {
  ...mockProfile,
  _id: "mock-id-4" as Id<"profiles">,
  firstName: "Marija",
  hostingStatus: "cant-host",
  guestStatus: "looking",
  hostingDates: [],
  guestDates: ["24 Dec", "25 Dec", "31 Dec"],
  role: "guest",
  photoUrl:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  bio: "New to the city and looking to spend the holidays with friendly people!",
  capacity: undefined,
  concept: undefined,
  amenities: [],
  houseRules: [],
  occupation: "Student",
  joinedDate: "Dec 2024",
};

export default function Profile8Page() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-2 font-bold text-2xl text-gray-900">
          Profile View Experiments
        </h1>
        <p className="mb-8 text-gray-500 text-sm">
          Testing unified card designs - everything in one place, no redundant
          sections
        </p>

        {/* NEW: Unified Profile Card v1 */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            8. Unified Card - All-in-One (Host + Guest)
          </h2>
          <p className="mb-4 text-gray-500 text-sm">
            Everything in one card: avatar, status, quick info, verification,
            preferences. No split sections.
          </p>
          <UnifiedProfileCard profile={mockProfile} />
        </section>

        {/* NEW: Unified Profile Card - Maybe */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            9. Unified Card - Maybe Status
          </h2>
          <UnifiedProfileCard profile={mockMaybeProfile} />
        </section>

        {/* NEW: Unified Profile Card - Guest Only */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            10. Unified Card - Guest Only
          </h2>
          <UnifiedProfileCard profile={mockGuestOnly} />
        </section>

        {/* NEW: Unified Profile Card - Host Only */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            11. Unified Card - Host Only
          </h2>
          <UnifiedProfileCard profile={mockHostOnly} />
        </section>

        <hr className="my-12 border-gray-300" />

        {/* NEW: My Place Section */}
        <h2 className="mb-6 font-bold text-gray-900 text-xl">
          My Place - Host Home Info
        </h2>
        <p className="mb-8 text-gray-500 text-sm">
          Shown when someone can host. Helps guests know what to expect.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            12. My Place Card - Apartment in Old Town
          </h2>
          <MyPlaceCard hostName="Jonas" place={mockMyPlace} />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            13. My Place Card - House with Garden
          </h2>
          <MyPlaceCard hostName="Petras" place={mockMyPlace2} />
        </section>

        <hr className="my-12 border-gray-300" />
        <h2 className="mb-6 font-bold text-gray-500 text-lg">
          Old Designs (for comparison)
        </h2>

        {/* Profile 1: Both host and guest (definite) */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            1. Both Host & Guest (Definite) - Old
          </h2>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <ProfileView isOwnProfile profile={mockProfile} />
          </div>
        </section>

        {/* Old Compact Cards */}
        <section className="mb-12">
          <h2 className="mb-4 font-semibold text-gray-700 text-lg">
            5. Old Compact Card (dates in pill)
          </h2>
          <CompactProfileCard profile={mockProfile} />
        </section>
      </div>
    </div>
  );
}

// Compact profile card with dates inside pill and centered verification
function CompactProfileCard({ profile }: { profile: Doc<"profiles"> }) {
  const hostingDates = profile.hostingDates || [];
  const guestDates = profile.guestDates || [];

  return (
    <div className="mx-auto w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Avatar + Name */}
      <div className="p-6 text-center">
        <div className="relative mx-auto mb-4 h-28 w-28">
          <Image
            alt={profile.firstName}
            className="h-full w-full rounded-full border-4 border-white object-cover shadow-lg"
            fill
            src={
              profile.photoUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${profile.firstName}`
            }
          />
        </div>

        <h2 className="font-bold text-gray-900 text-xl">
          {profile.firstName}
          {profile.lastName && ` ${profile.lastName}`}
          {profile.age && (
            <span className="font-normal text-gray-500">, {profile.age}</span>
          )}
        </h2>

        <div className="mt-1 flex items-center justify-center gap-1 text-gray-500 text-sm">
          <MapPin size={14} />
          <span>{profile.city}</span>
        </div>

        {/* Status Pills with Dates Inside */}
        <div className="mt-4 space-y-2">
          {/* Hosting pill with dates */}
          {profile.hostingStatus &&
            profile.hostingStatus !== "cant-host" &&
            hostingDates.length > 0 && (
              <div
                className={`rounded-lg p-3 ${
                  profile.hostingStatus === "can-host"
                    ? "border border-green-200 bg-green-50"
                    : "border border-amber-200 bg-amber-50"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-center gap-1.5">
                  <Users
                    className={
                      profile.hostingStatus === "can-host"
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                    size={14}
                  />
                  <span
                    className={`font-semibold text-sm ${
                      profile.hostingStatus === "can-host"
                        ? "text-green-700"
                        : "text-amber-700"
                    }`}
                  >
                    {profile.hostingStatus === "can-host"
                      ? "Can Host"
                      : "Maybe Host"}
                    {profile.capacity && ` · ${profile.capacity} guests`}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {hostingDates.map((date) => (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs ${
                        profile.hostingStatus === "can-host"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                      key={date}
                    >
                      <Calendar size={10} />
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Guest pill with dates */}
          {profile.guestStatus &&
            profile.guestStatus !== "not-looking" &&
            guestDates.length > 0 && (
              <div
                className={`rounded-lg p-3 ${
                  profile.guestStatus === "looking"
                    ? "border border-blue-200 bg-blue-50"
                    : "border border-amber-200 bg-amber-50"
                }`}
              >
                <div className="mb-1.5 flex items-center justify-center gap-1.5">
                  <User
                    className={
                      profile.guestStatus === "looking"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }
                    size={14}
                  />
                  <span
                    className={`font-semibold text-sm ${
                      profile.guestStatus === "looking"
                        ? "text-blue-700"
                        : "text-amber-700"
                    }`}
                  >
                    {profile.guestStatus === "looking"
                      ? "Looking for Host"
                      : "Maybe Guest"}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {guestDates.map((date) => (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs ${
                        profile.guestStatus === "looking"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                      key={date}
                    >
                      <Calendar size={10} />
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Languages */}
        <div className="mt-4 flex flex-wrap justify-center gap-1">
          {profile.languages.map((lang) => (
            <span
              className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 text-xs"
              key={lang}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Centered Verification Section */}
      <div className="border-gray-100 border-t bg-gray-50 p-4">
        <p className="mb-3 text-center font-medium text-gray-500 text-xs uppercase tracking-wider">
          Verified
        </p>
        <div className="flex justify-center gap-3">
          <VerificationBadge icon={ShieldCheck} label="ID" verified />
          <VerificationBadge icon={Mail} label="Email" verified />
          <VerificationBadge icon={Phone} label="Phone" verified />
          <VerificationBadge
            icon={CheckCircle2}
            label="Photo"
            verified={false}
          />
        </div>
      </div>
    </div>
  );
}

function VerificationBadge({
  icon: Icon,
  label,
  verified,
}: {
  icon: typeof ShieldCheck;
  label: string;
  verified: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`rounded-full p-2 ${verified ? "bg-green-100" : "bg-gray-200"}`}
      >
        <Icon
          className={verified ? "text-green-600" : "text-gray-400"}
          size={16}
        />
      </div>
      <span
        className={`font-medium text-[10px] ${verified ? "text-green-600" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
}

// Helper to format last active time
function formatLastActive(lastActive: number | undefined): string | null {
  if (!lastActive) {
    return null;
  }
  const diff = Date.now() - lastActive;
  const mins = Math.floor(diff / 60_000);
  if (mins < 5) {
    return "Online now";
  }
  if (mins < 60) {
    return `Active ${mins}m ago`;
  }
  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    return `Active ${hours}h ago`;
  }
  return `Active ${Math.floor(hours / 24)}d ago`;
}

// Profile Header component
function ProfileHeader({ profile }: { profile: ExtendedProfile }) {
  const lastActive = formatLastActive(profile.lastActive);
  const isOnline = lastActive === "Online now";

  return (
    <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-6 pb-4">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="relative h-24 w-24">
            <Image
              alt={profile.firstName}
              className="h-full w-full rounded-2xl border-4 border-white object-cover shadow-lg"
              fill
              src={
                profile.photoUrl ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${profile.firstName}`
              }
            />
          </div>
          {isOnline && (
            <div className="absolute right-0 bottom-0 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>

        <div className="flex-1 pt-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900 text-xl">
              {profile.firstName}
              {profile.age && (
                <span className="font-normal text-gray-500">
                  , {profile.age}
                </span>
              )}
            </h2>
            {profile.verified && (
              <ShieldCheck className="text-green-600" size={18} />
            )}
          </div>

          <div className="mt-1 flex items-center gap-1 text-gray-600 text-sm">
            <MapPin size={14} />
            <span>{profile.city}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-gray-500 text-xs">
            {profile.occupation && (
              <span className="flex items-center gap-1">
                <Briefcase size={12} />
                {profile.occupation}
              </span>
            )}
            {profile.responseTime && (
              <span className="flex items-center gap-1">
                <Zap className="text-amber-500" size={12} />
                {profile.responseTime}
              </span>
            )}
          </div>

          {lastActive && !isOnline && (
            <p className="mt-1 text-gray-400 text-xs">{lastActive}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Get styles for status badge based on type and whether it's definite
function getStatusStyles(type: "host" | "guest", isDefinite: boolean) {
  if (!isDefinite) {
    return {
      colorClass: "border-amber-200 bg-amber-50",
      textColorClass: "text-amber-700",
      iconColorClass: "text-amber-600",
      pillColorClass: "bg-amber-100 text-amber-700",
    };
  }
  if (type === "host") {
    return {
      colorClass: "border-green-200 bg-green-50",
      textColorClass: "text-green-700",
      iconColorClass: "text-green-600",
      pillColorClass: "bg-green-100 text-green-700",
    };
  }
  return {
    colorClass: "border-blue-200 bg-blue-50",
    textColorClass: "text-blue-700",
    iconColorClass: "text-blue-600",
    pillColorClass: "bg-blue-100 text-blue-700",
  };
}

// Get label for status badge
function getStatusLabel(type: "host" | "guest", isDefinite: boolean): string {
  if (type === "host") {
    return isDefinite ? "Can Host" : "Might Host";
  }
  return isDefinite ? "Looking to Join" : "Might Join";
}

// Status badge for hosting/guest
function StatusBadge({
  type,
  status,
  dates,
  capacity,
  concept,
}: {
  type: "host" | "guest";
  status: string;
  dates: string[];
  capacity?: number;
  concept?: string;
}) {
  if (dates.length === 0) {
    return null;
  }

  const isDefinite =
    type === "host" ? status === "can-host" : status === "looking";
  const styles = getStatusStyles(type, isDefinite);
  const Icon = type === "host" ? Users : User;
  const label = getStatusLabel(type, isDefinite);

  return (
    <div className={`rounded-xl border p-3 ${styles.colorClass}`}>
      <div className="mb-2 flex items-center gap-2">
        <Icon className={styles.iconColorClass} size={16} />
        <span className={`font-semibold text-sm ${styles.textColorClass}`}>
          {label}
          {capacity && (
            <span className="ml-1 font-normal">· up to {capacity}</span>
          )}
        </span>
        {concept && (
          <span className="ml-auto rounded bg-white/60 px-2 py-0.5 text-[10px] text-gray-600">
            {concept}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {dates.map((date) => (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs ${styles.pillColorClass}`}
            key={date}
          >
            <Calendar size={10} />
            {date}
          </span>
        ))}
      </div>
    </div>
  );
}

// About section component
function AboutSection({ profile }: { profile: ExtendedProfile }) {
  return (
    <div className="space-y-4 px-6 py-4">
      <div>
        <p className="mb-2 flex items-center gap-1.5 font-medium text-gray-400 text-xs uppercase tracking-wider">
          <Globe size={12} />
          Languages
        </p>
        <div className="flex flex-wrap gap-1.5">
          {profile.languages.map((lang) => (
            <span
              className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700 text-xs"
              key={lang}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {profile.vibes.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 font-medium text-gray-400 text-xs uppercase tracking-wider">
            <Sparkles size={12} />
            Vibes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.vibes.map((vibe) => (
              <span
                className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 font-medium text-purple-700 text-xs"
                key={vibe}
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.dietaryInfo.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 font-medium text-gray-400 text-xs uppercase tracking-wider">
            <UtensilsCrossed size={12} />
            Dietary
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.dietaryInfo.map((diet) => (
              <span
                className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 font-medium text-orange-700 text-xs"
                key={diet}
              >
                {diet}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <PreferenceChip
          allowed={profile.drinkingAllowed}
          icon={Wine}
          label="Alcohol"
        />
        <PreferenceChip
          allowed={profile.smokingAllowed}
          icon={Cigarette}
          label="Smoking"
        />
        <PreferenceChip
          allowed={profile.petsAllowed}
          icon={Dog}
          label="Pets OK"
        />
        {profile.hasPets && (
          <span className="flex items-center gap-1 text-gray-500 text-xs">
            <Dog size={12} />
            Has pets
          </span>
        )}
      </div>
    </div>
  );
}

// NEW: Unified Profile Card - All info in one clean card
function UnifiedProfileCard({ profile }: { profile: ExtendedProfile }) {
  const hostingDates = profile.hostingDates || [];
  const guestDates = profile.guestDates || [];
  const canHost =
    profile.hostingStatus === "can-host" ||
    profile.hostingStatus === "may-host";
  const isGuest =
    profile.guestStatus === "looking" || profile.guestStatus === "maybe-guest";

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <ProfileHeader profile={profile} />

      {/* Status Section - Host & Guest with Dates */}
      <div className="space-y-3 border-gray-100 border-b px-6 py-4">
        {canHost && (
          <StatusBadge
            capacity={profile.capacity}
            concept={profile.concept}
            dates={hostingDates}
            status={profile.hostingStatus || "cant-host"}
            type="host"
          />
        )}
        {isGuest && (
          <StatusBadge
            dates={guestDates}
            status={profile.guestStatus || "not-looking"}
            type="guest"
          />
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="border-gray-100 border-b px-6 py-4">
          <p className="text-gray-700 text-sm leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {/* About Section */}
      <AboutSection profile={profile} />

      {/* Verification Footer */}
      <div className="border-gray-100 border-t bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VerificationDot label="ID" verified={profile.verified} />
            <VerificationDot label="Email" verified />
            <VerificationDot label="Phone" verified />
          </div>
          {profile.joinedDate && (
            <span className="text-gray-400 text-xs">
              Joined {profile.joinedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Simplified verification indicator
function VerificationDot({
  label,
  verified,
}: {
  label: string;
  verified: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`h-2 w-2 rounded-full ${verified ? "bg-green-500" : "bg-gray-300"}`}
      />
      <span
        className={`text-xs ${verified ? "text-gray-600" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
}

// Preference chip
function PreferenceChip({
  icon: Icon,
  label,
  allowed,
}: {
  icon: typeof Wine;
  label: string;
  allowed: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-1 text-xs ${allowed ? "text-green-600" : "text-gray-400"}`}
    >
      <Icon size={12} />
      {allowed ? <Check size={10} /> : <X size={10} />}
      {label}
    </span>
  );
}

// ============================================
// MY PLACE CARD - Host's home/venue info
// ============================================

import {
  Accessibility,
  Car,
  Home,
  Sofa,
  TreeDeciduous,
  Utensils,
} from "lucide-react";

const DWELLING_LABELS: Record<MyPlace["dwellingType"], string> = {
  apartment: "Apartment",
  house: "House",
  studio: "Studio",
  loft: "Loft",
  townhouse: "Townhouse",
  other: "Other",
};

const SETTING_LABELS: Record<NonNullable<MyPlace["settingType"]>, string> = {
  intimate: "Intimate gathering",
  casual: "Casual & relaxed",
  formal: "Formal dinner",
  festive: "Festive celebration",
};

const DINING_LABELS: Record<NonNullable<MyPlace["diningSetup"]>, string> = {
  "dining-table": "Dining table",
  "kitchen-island": "Kitchen island",
  "living-room": "Living room",
  outdoor: "Outdoor",
};

const PARKING_LABELS: Record<string, string> = {
  private: "Private parking",
  garage: "Garage parking",
  street: "Street parking",
};

function getOutdoorLabel(place: MyPlace): string {
  if (!place.hasOutdoorSpace) {
    return "No";
  }
  if (!place.outdoorSpaceType) {
    return "Yes";
  }
  return (
    place.outdoorSpaceType.charAt(0).toUpperCase() +
    place.outdoorSpaceType.slice(1)
  );
}

function getFloorLabel(place: MyPlace): string | null {
  if (place.floorLevel === undefined) {
    return null;
  }
  const floor =
    place.floorLevel === 0 ? "Ground floor" : `Floor ${place.floorLevel}`;
  return place.hasElevator ? `${floor} (elevator)` : floor;
}

function MyPlaceCard({
  place,
  hostName,
}: {
  place: MyPlace;
  hostName: string;
}) {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-gray-100 border-b bg-gradient-to-br from-amber-50 to-orange-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <Home className="text-amber-600" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{hostName}&apos;s Place</h3>
            <p className="text-gray-600 text-sm">
              {DWELLING_LABELS[place.dwellingType]}
              {place.neighborhood && ` in ${place.neighborhood}`}
            </p>
          </div>
        </div>
      </div>

      {/* Neighborhood description */}
      {place.neighborhoodDescription && (
        <div className="border-gray-100 border-b px-6 py-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            {place.neighborhoodDescription}
          </p>
        </div>
      )}

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-4 border-gray-100 border-b px-6 py-4">
        <QuickStat
          icon={Users}
          label="Seats"
          value={`Up to ${place.diningCapacity}`}
        />
        <QuickStat
          icon={Sofa}
          label="Setting"
          value={place.settingType ? SETTING_LABELS[place.settingType] : "—"}
        />
        <QuickStat
          icon={Utensils}
          label="Dining"
          value={place.diningSetup ? DINING_LABELS[place.diningSetup] : "—"}
        />
        <QuickStat
          icon={TreeDeciduous}
          label="Outdoor"
          value={getOutdoorLabel(place)}
        />
      </div>

      {/* Practical info */}
      <div className="space-y-3 border-gray-100 border-b px-6 py-4">
        <h4 className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
          Practical Info
        </h4>

        {/* Floor & Accessibility */}
        <div className="flex flex-wrap gap-2">
          {getFloorLabel(place) && <InfoPill>{getFloorLabel(place)}</InfoPill>}
          {place.wheelchairAccessible && (
            <InfoPill icon={Accessibility}>Wheelchair accessible</InfoPill>
          )}
        </div>

        {/* Parking */}
        {place.parkingType && place.parkingType !== "none" && (
          <div className="flex items-start gap-2 text-gray-600 text-sm">
            <Car className="mt-0.5 shrink-0 text-gray-400" size={14} />
            <div>
              <span className="font-medium">
                {PARKING_LABELS[place.parkingType] || "Parking available"}
              </span>
              {place.parkingNotes && (
                <p className="text-gray-500 text-xs">{place.parkingNotes}</p>
              )}
            </div>
          </div>
        )}
        {place.parkingType === "none" && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Car className="text-gray-400" size={14} />
            <span>No parking available</span>
          </div>
        )}
      </div>

      {/* What's provided */}
      <div className="space-y-3 px-6 py-4">
        <h4 className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
          What to Expect
        </h4>

        <div className="flex flex-wrap gap-2">
          {place.providesFood && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700 text-xs">
              <Check size={12} />
              Food provided
            </span>
          )}
          {place.providesDrinks && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700 text-xs">
              <Check size={12} />
              Drinks provided
            </span>
          )}
          {!place.providesFood && (
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-medium text-amber-700 text-xs">
              Potluck / BYOF
            </span>
          )}
          {!place.providesDrinks && (
            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-medium text-amber-700 text-xs">
              BYOB
            </span>
          )}
        </div>

        {/* What guests should bring */}
        {place.guestsShouldBring && place.guestsShouldBring.length > 0 && (
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="mb-2 font-medium text-amber-800 text-xs uppercase">
              Guests should bring:
            </p>
            <ul className="space-y-1">
              {place.guestsShouldBring.map((item) => (
                <li
                  className="flex items-center gap-2 text-amber-900 text-sm"
                  key={item}
                >
                  <span className="text-amber-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Quick stat component for the grid
function QuickStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Home;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-gray-400" size={16} />
      <div>
        <p className="font-medium text-gray-900 text-sm">{value}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  );
}

// Info pill component
function InfoPill({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: typeof Home;
}) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 text-xs">
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}

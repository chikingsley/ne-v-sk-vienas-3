import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the URL for a user's profile.
 * Prefers /people/[username] if username exists, falls back to /profile/[id]
 */
export function getProfileUrl(profile: {
  userId: string;
  username?: string | null;
}): string {
  if (profile.username) {
    return `/people/${profile.username}`;
  }
  return `/profile/${profile.userId}`;
}

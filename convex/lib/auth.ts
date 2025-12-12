import type { Id } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";

/**
 * Extract the Clerk user id from a token identifier.
 * Token identifiers are typically "issuer|userId".
 * Falls back to the whole string if it doesn't match the expected format.
 */
export function extractClerkUserId(tokenIdentifier: string): string {
  const parts = tokenIdentifier.split("|");
  const last = parts.at(-1);
  return parts.length > 1 && last ? last : tokenIdentifier;
}

/**
 * Get the current user's ID from the Clerk auth context.
 * Creates a user record if one doesn't exist for this Clerk user.
 */
export async function getCurrentUserId(
  ctx: QueryCtx | MutationCtx
): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  // Prefer exact lookup by full token identifier.
  const userByToken = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.tokenIdentifier))
    .unique();

  if (userByToken) {
    return userByToken._id;
  }

  // Fallback: lookup by stable Clerk user id (used by webhooks).
  const clerkUserId = extractClerkUserId(identity.tokenIdentifier);
  const userByClerkUserId = await ctx.db
    .query("users")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();

  if (userByClerkUserId) {
    return userByClerkUserId._id;
  }

  return null;
}

/**
 * Get or create a user from the Clerk identity.
 * Use this in mutations where you need to ensure the user exists.
 */
export async function getOrCreateUser(
  ctx: MutationCtx
): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const clerkUserId = extractClerkUserId(identity.tokenIdentifier);

  // Look up existing user
  const existingByToken = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.tokenIdentifier))
    .unique();

  if (existingByToken) {
    return existingByToken._id;
  }

  // Fallback: user created by webhook sync.
  const existingByClerkUserId = await ctx.db
    .query("users")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();

  if (existingByClerkUserId) {
    // Normalize the record to store the full token identifier.
    await ctx.db.patch(existingByClerkUserId._id, {
      clerkId: identity.tokenIdentifier,
      email: identity.email,
      name: identity.name,
      imageUrl: identity.pictureUrl,
    });
    return existingByClerkUserId._id;
  }

  // Create new user from Clerk identity
  const userId = await ctx.db.insert("users", {
    clerkId: identity.tokenIdentifier,
    clerkUserId,
    email: identity.email,
    name: identity.name,
    imageUrl: identity.pictureUrl,
  });

  return userId;
}

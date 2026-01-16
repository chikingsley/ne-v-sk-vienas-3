import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./lib/admin";

export const createHoliday = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    names: v.object({
      lt: v.string(),
      en: v.string(),
      ua: v.optional(v.string()),
      ru: v.optional(v.string()),
    }),
    registrationOpensAt: v.number(),
    startsAt: v.number(),
    endsAt: v.number(),
    selectableDates: v.array(v.string()),
    status: v.union(
      v.literal("upcoming"),
      v.literal("active"),
      v.literal("completed")
    ),
    theme: v.optional(
      v.object({
        primaryColor: v.optional(v.string()),
        heroImage: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    const existing = await ctx.db
      .query("holidays")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error(`Holiday with slug ${args.slug} already exists`);
    }

    return await ctx.db.insert("holidays", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateHolidayStatus = mutation({
  args: {
    holidayId: v.id("holidays"),
    status: v.union(
      v.literal("upcoming"),
      v.literal("active"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    await ctx.db.patch(args.holidayId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const updateHoliday = mutation({
  args: {
    holidayId: v.id("holidays"),
    slug: v.optional(v.string()),
    name: v.optional(v.string()),
    names: v.optional(
      v.object({
        lt: v.string(),
        en: v.string(),
        ua: v.optional(v.string()),
        ru: v.optional(v.string()),
      })
    ),
    registrationOpensAt: v.optional(v.number()),
    startsAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    selectableDates: v.optional(v.array(v.string())),
    theme: v.optional(
      v.object({
        primaryColor: v.optional(v.string()),
        heroImage: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    const { holidayId, ...updates } = args;

    if (updates.slug) {
      const existing = await ctx.db
        .query("holidays")
        .withIndex("by_slug", (q) => q.eq("slug", updates.slug!))
        .first();

      if (existing && existing._id !== holidayId) {
        throw new Error(`Holiday with slug ${updates.slug} already exists`);
      }
    }

    await ctx.db.patch(holidayId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const listHolidays = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    return await ctx.db.query("holidays").collect();
  },
});

export const getHoliday = query({
  args: { holidayId: v.id("holidays") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    return await ctx.db.get(args.holidayId);
  },
});

export const getActiveHoliday = query({
  args: {},
  handler: async (ctx) => {
    const active = await ctx.db
      .query("holidays")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .first();

    if (active) return active;

    // Get the upcoming holiday that starts soonest
    // Note: Since we can't easily sort by startsAt with the status index in a single query
    // without a composite index, and we likely won't have many upcoming holidays,
    // we can fetch them and sort in memory or just assume the first one created (insertion order)
    // is roughly correct if we don't have a specific index.
    // However, it's better to be precise.
    const upcoming = await ctx.db
      .query("holidays")
      .withIndex("by_status", (q) => q.eq("status", "upcoming"))
      .collect();

    if (upcoming.length === 0) return null;

    // Sort by startsAt ascending to get the next one
    upcoming.sort((a, b) => a.startsAt - b.startsAt);

    return upcoming[0];
  },
});

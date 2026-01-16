import { convexTest } from "convex-test";
import { describe, expect, test, vi, afterAll } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

describe("holidays", () => {
  const adminIdentity = {
    tokenIdentifier: "https://clerk.issuer|admin-id",
    subject: "admin-id",
    issuer: "https://clerk.issuer",
    name: "Admin User",
    email: "admin@example.com",
  };

  const userIdentity = {
    tokenIdentifier: "https://clerk.issuer|user-id",
    subject: "user-id",
    issuer: "https://clerk.issuer",
    name: "Regular User",
    email: "user@example.com",
  };

  // We need to set the environment variable for the test
  // Since we are running in the same process (vitest), we can set process.env
  const originalAdminIds = process.env.ADMIN_CLERK_USER_IDS;
  process.env.ADMIN_CLERK_USER_IDS = "admin-id";

  afterAll(() => {
    process.env.ADMIN_CLERK_USER_IDS = originalAdminIds;
  });

  test("createHoliday creates a holiday (admin only)", async () => {
    const t = convexTest(schema);

    // Test as non-admin - should fail
    await expect(
      t.withIdentity(userIdentity).mutation(api.holidays.createHoliday, {
        slug: "unauthorized",
        name: "Unauthorized",
        names: { lt: "U", en: "U" },
        registrationOpensAt: 0,
        startsAt: 0,
        endsAt: 0,
        selectableDates: [],
        status: "upcoming",
      })
    ).rejects.toThrow();

    const holidayId = await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
      slug: "christmas-2025",
      name: "Christmas 2025",
      names: {
        lt: "Kalėdos 2025",
        en: "Christmas 2025",
      },
      registrationOpensAt: 1730000000000,
      startsAt: 1735000000000,
      endsAt: 1735600000000,
      selectableDates: ["24 Dec", "25 Dec"],
      status: "upcoming",
    });

    const holiday = await t.withIdentity(adminIdentity).query(api.holidays.getHoliday, { holidayId });
    expect(holiday).toBeDefined();
    expect(holiday!.slug).toBe("christmas-2025");
  });

  test("updateHolidayStatus updates status", async () => {
    const t = convexTest(schema);
    const holidayId = await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
      slug: "easter-2026",
      name: "Easter 2026",
      names: { lt: "Velykos 2026", en: "Easter 2026" },
      registrationOpensAt: 1740000000000,
      startsAt: 1745000000000,
      endsAt: 1745600000000,
      selectableDates: ["20 Apr"],
      status: "upcoming",
    });

    await t.withIdentity(adminIdentity).mutation(api.holidays.updateHolidayStatus, {
      holidayId,
      status: "active",
    });

    const holiday = await t.withIdentity(adminIdentity).query(api.holidays.getHoliday, { holidayId });
    expect(holiday!.status).toBe("active");
  });

  test("listHolidays lists all holidays", async () => {
    const t = convexTest(schema);
    await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
      slug: "h1",
      name: "H1",
      names: { lt: "H1", en: "H1" },
      registrationOpensAt: 1,
      startsAt: 2,
      endsAt: 3,
      selectableDates: [],
      status: "upcoming",
    });

    await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
      slug: "h2",
      name: "H2",
      names: { lt: "H2", en: "H2" },
      registrationOpensAt: 1,
      startsAt: 2,
      endsAt: 3,
      selectableDates: [],
      status: "active",
    });

    const holidays = await t.withIdentity(adminIdentity).query(api.holidays.listHolidays, {});
    expect(holidays).toHaveLength(2);
  });

  test("getActiveHoliday returns active or upcoming holiday", async () => {
    const t = convexTest(schema);

    // Case 1: Only upcoming
    await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
        slug: "upcoming-h",
        name: "Upcoming",
        names: { lt: "U", en: "U" },
        registrationOpensAt: 100,
        startsAt: 200,
        endsAt: 300,
        selectableDates: [],
        status: "upcoming",
    });

    let active = await t.query(api.holidays.getActiveHoliday, {});
    expect(active?.slug).toBe("upcoming-h");

    // Case 2: Active and upcoming (should prefer active)
    await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
        slug: "active-h",
        name: "Active",
        names: { lt: "A", en: "A" },
        registrationOpensAt: 100,
        startsAt: 200,
        endsAt: 300,
        selectableDates: [],
        status: "active",
    });

    active = await t.query(api.holidays.getActiveHoliday, {});
    expect(active?.slug).toBe("active-h");

    // Case 3: Completed (should be ignored if active exists)
    // getActiveHoliday doesn't query completed, so it won't find it.
  });

  test("updateHoliday enforces slug uniqueness", async () => {
    const t = convexTest(schema);

    await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
      slug: "h1",
      name: "H1",
      names: { lt: "H1", en: "H1" },
      registrationOpensAt: 1,
      startsAt: 2,
      endsAt: 3,
      selectableDates: [],
      status: "upcoming",
    });

    const h2Id = await t.withIdentity(adminIdentity).mutation(api.holidays.createHoliday, {
      slug: "h2",
      name: "H2",
      names: { lt: "H2", en: "H2" },
      registrationOpensAt: 1,
      startsAt: 2,
      endsAt: 3,
      selectableDates: [],
      status: "upcoming",
    });

    // Try to rename h2 to h1 (should fail)
    await expect(
      t.withIdentity(adminIdentity).mutation(api.holidays.updateHoliday, {
        holidayId: h2Id,
        slug: "h1",
      })
    ).rejects.toThrow(/already exists/);

    // Renaming h2 to h2 (same) should be fine
    await t.withIdentity(adminIdentity).mutation(api.holidays.updateHoliday, {
      holidayId: h2Id,
      slug: "h2",
    });
  });
});

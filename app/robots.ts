import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nesveskvienas.lt";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/onboarding",
          "/settings",
          "/messages",
          "/verify",
          "/profile", // User's own profile page (protected)
          "/(experiments)/", // Experimental pages
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nešvęsk vienas - Don't Celebrate Alone",
    short_name: "Nešvęsk vienas",
    description:
      "A non-profit initiative connecting people for the holidays. Find hosts or guests for holiday celebrations in Lithuania.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#F59E0B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";

type Props = {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  try {
    const profile = await fetchQuery(api.profiles.getProfileByUsername, {
      username,
    });

    if (!profile) {
      return {
        title: "Profile Not Found",
        description: "This profile could not be found.",
      };
    }

    const title = `${profile.firstName}${profile.city ? ` from ${profile.city}` : ""}`;
    const description = profile.bio
      ? profile.bio.slice(0, 160)
      : `${profile.firstName} is ${profile.role === "host" ? "hosting" : "looking for a host"} for the holidays in Lithuania.`;

    return {
      title,
      description,
      openGraph: {
        title: `${title} | Nešvęsk vienas`,
        description,
        type: "profile",
        ...(profile.photoUrl && {
          images: [
            {
              url: profile.photoUrl,
              width: 400,
              height: 400,
              alt: `${profile.firstName}'s profile photo`,
            },
          ],
        }),
      },
      twitter: {
        card: "summary",
        title: `${title} | Nešvęsk vienas`,
        description,
        ...(profile.photoUrl && {
          images: [profile.photoUrl],
        }),
      },
    };
  } catch {
    return {
      title: "Profile",
      description: "View this profile on Nešvęsk vienas.",
    };
  }
}

export default function ProfileLayout({ children }: Props) {
  return children;
}

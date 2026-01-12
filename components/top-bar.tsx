"use client";

import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/contexts/locale-context";
import { api } from "@/convex/_generated/api";
import { LanguageSelector } from "./language-selector";
import { Button } from "./ui/button";

export function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLocale();
  const unreadCount = useQuery(api.messages.getUnreadCount) ?? 0;
  const pendingInvites = useQuery(api.invitations.getPendingCount) ?? 0;

  const totalNotifications = unreadCount + pendingInvites;

  // Get page title from pathname with i18n
  const PAGE_TITLES: Record<string, string> = {
    "/browse": t.navFindHosts,
    "/profile": t.navMyProfile,
    "/messages": t.navMessages,
    "/settings": t.navSettings,
    "/location-picker": t.navLocationPicker,
  };

  const isProfilePage =
    pathname.startsWith("/profile/") || pathname.startsWith("/people/");
  const pageTitle =
    PAGE_TITLES[pathname] ?? (isProfilePage ? t.navProfile : "");

  return (
    <header className="shrink-0 border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-6">
        {/* Page Title */}
        <h1 className="font-semibold text-lg">{pageTitle}</h1>

        {/* Spacer to push content to the right */}
        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Notifications */}
          <Button
            className="relative"
            onClick={() => router.push("/messages")}
            size="icon"
            variant="ghost"
          >
            <Bell className="h-5 w-5" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 font-medium text-white text-xs">
                {totalNotifications > 9 ? "9+" : totalNotifications}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}

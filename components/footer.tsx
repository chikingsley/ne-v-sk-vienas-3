"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/locale-context";

type FooterProps = {
  variant?: "dark" | "light";
};

export function Footer({ variant = "dark" }: FooterProps) {
  const { t } = useLocale();

  const isDark = variant === "dark";

  return (
    <footer
      className={
        isDark
          ? "border-white/10 border-t bg-slate-950 py-6"
          : "border-gray-200 border-t bg-gray-50 py-6"
      }
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <span
          className={
            isDark ? "text-blue-100/40 text-sm" : "text-gray-500 text-sm"
          }
        >
          &copy; {new Date().getFullYear()} {t.appName}
        </span>
        <nav
          className={
            isDark
              ? "flex gap-6 text-blue-100/50 text-sm"
              : "flex gap-6 text-gray-500 text-sm"
          }
        >
          <Link
            className={
              isDark
                ? "transition-colors hover:text-amber-400"
                : "transition-colors hover:text-green-600"
            }
            href="/safety"
          >
            {t.safetyGuidelines}
          </Link>
          <Link
            className={
              isDark
                ? "transition-colors hover:text-amber-400"
                : "transition-colors hover:text-green-600"
            }
            href="/terms"
          >
            {t.termsOfService}
          </Link>
          <Link
            className={
              isDark
                ? "transition-colors hover:text-amber-400"
                : "transition-colors hover:text-green-600"
            }
            href="/privacy"
          >
            {t.privacyPolicy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

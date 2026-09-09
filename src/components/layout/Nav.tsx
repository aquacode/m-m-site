"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { routing } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "gallery", href: "/gallery" },
  { key: "journeys", href: "/journeys" },
  { key: "blog", href: "/blog" },
] as const;

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  fa: "فا",
};

// Strip the locale prefix from a Next.js pathname.
// e.g. "/fr/gallery" → "/gallery",  "/en" → "/"
const LOCALE_PREFIX_RE = new RegExp(
  `^/(${routing.locales.join("|")})(?=/|$)`
);
function stripLocale(fullPath: string): string {
  return fullPath.replace(LOCALE_PREFIX_RE, "") || "/";
}

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  // usePathname from next/navigation returns the full path including locale prefix
  const fullPathname = usePathname();
  const pathname = stripLocale(fullPathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-sea-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl font-semibold text-lapis-700 tracking-wide hover:text-sea-600 transition-colors"
        >
          M <span className="text-sea-500">&</span> M
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-sea-600 border-b-2 border-sea-400 pb-0.5"
                      : "text-gray-600 hover:text-lapis-700"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Locale switcher + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Locale switcher: build explicit /{locale}{path} URLs */}
          <div className="flex items-center gap-1 rounded-full border border-sea-200 px-2 py-1">
            {routing.locales.map((loc) => {
              const isActive = loc === locale;
              const localeHref = `/${loc}${pathname === "/" ? "" : pathname}`;
              return isActive ? (
                <span
                  key={loc}
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-sea-500 text-white"
                >
                  {LOCALE_LABELS[loc]}
                </span>
              ) : (
                <NextLink
                  key={loc}
                  href={localeHref}
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium text-gray-500 hover:text-lapis-700 transition-colors"
                  aria-label={`Switch to ${loc}`}
                >
                  {LOCALE_LABELS[loc]}
                </NextLink>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-gray-600 hover:text-lapis-700"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-sea-100 bg-white">
          <ul className="flex flex-col px-4 py-3 gap-3">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="block text-sm font-medium text-gray-700 hover:text-sea-600 py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

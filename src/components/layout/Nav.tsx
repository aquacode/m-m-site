"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { routing } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Public nav order (locked IA): Home · About · Bios · Login */
const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "bios", href: "/bios" },
  { key: "login", href: "/login" },
] as const;

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  fr: "FR",
  fa: "فا",
};

const LOCALE_PREFIX_RE = new RegExp(
  `^/(${routing.locales.join("|")})(?=/|$)`
);
function stripLocale(fullPath: string): string {
  return fullPath.replace(LOCALE_PREFIX_RE, "") || "/";
}

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const fullPathname = usePathname();
  const pathname = stripLocale(fullPathname);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-lapis-950/90 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold text-white tracking-wide hover:text-sea-300 transition-colors"
        >
          M <span className="text-sea-400">&</span> M
        </Link>

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
                      ? "text-sea-300 border-b-2 border-sea-400 pb-0.5"
                      : "text-sea-100/70 hover:text-white"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-1">
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
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium text-sea-200/70 hover:text-white transition-colors"
                  aria-label={`Switch to ${loc}`}
                >
                  {LOCALE_LABELS[loc]}
                </NextLink>
              );
            })}
          </div>

          <button
            className="md:hidden p-1 text-sea-100 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-lapis-950">
          <ul className="flex flex-col px-4 py-3 gap-3">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="block text-sm font-medium text-sea-100 hover:text-sea-300 py-1"
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

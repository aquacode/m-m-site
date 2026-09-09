import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-lapis-900 text-sea-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-heading text-3xl font-semibold text-white mb-2">
              M <span className="text-sea-400">&</span> M
            </p>
            <p className="text-sea-300 text-sm">{t("tagline")}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-sea-400 mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Journeys", href: "/journeys" },
                { label: "Gallery", href: "/gallery" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sea-200 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex flex-col justify-end">
            <p className="text-sea-400 text-xs">
              {t("copyright", { year })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

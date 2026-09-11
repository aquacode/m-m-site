import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      {/* Landing hero — banner of Maryam & Michael (placeholder until real photo) */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sea-700 via-lapis-700 to-lapis-900" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, #2dd4bf 0%, transparent 50%), radial-gradient(circle at 75% 30%, #6d7fe8 0%, transparent 50%)",
          }}
          aria-hidden
        />

        {/* Placeholder banner frame */}
        <div className="absolute inset-x-0 top-0 h-full flex items-center justify-center pointer-events-none">
          <div
            className="w-[min(90%,42rem)] aspect-[4/3] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-[2px]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-24">
          <p className="text-sea-200 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4">
            {t("bannerHint")}
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-wide mb-4 drop-shadow-lg">
            {t("title")}
          </h1>
          <p className="text-sea-100/90 text-lg sm:text-xl font-light tracking-wide mb-6">
            {t("oneLiner")}
          </p>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t("welcome")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-block bg-white text-lapis-800 hover:bg-sea-50 text-sm font-semibold tracking-widest uppercase px-8 py-3 rounded-full shadow-lg transition-colors"
            >
              {t("primaryCta")}
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full backdrop-blur transition-all"
              >
                {t("secondaryAbout")}
              </Link>
              <Link
                href="/bios"
                className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-medium tracking-widest uppercase px-6 py-3 rounded-full backdrop-blur transition-all"
              >
                {t("secondaryBios")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

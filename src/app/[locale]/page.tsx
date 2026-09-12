import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="Maryam and Michael on the beach beneath a storm sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_75%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-lapis-950/55 via-lapis-900/45 to-lapis-950/70"
          aria-hidden
        />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto py-24">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-wide mb-4 drop-shadow-lg">
            {t("title")}
          </h1>
          <p className="text-sea-100/90 text-lg sm:text-xl font-light tracking-wide mb-6 drop-shadow">
            {t("oneLiner")}
          </p>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto drop-shadow">
            {t("welcome")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
            <Link
              href="/login"
              className="inline-block bg-white text-lapis-800 hover:bg-sea-50 text-sm font-semibold tracking-widest uppercase px-8 py-3 rounded-full shadow-lg transition-colors"
            >
              {t("primaryCta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

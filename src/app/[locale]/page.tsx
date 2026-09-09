import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        {/* Placeholder gradient — replace with <CldImage> once Cloudinary is connected */}
        <div className="absolute inset-0 bg-gradient-to-br from-sea-700 via-lapis-700 to-lapis-900" />

        {/* Subtle wave texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, #2dd4bf 0%, transparent 50%), radial-gradient(circle at 75% 30%, #6d7fe8 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-light text-white tracking-wide mb-4 drop-shadow-lg">
            {t("title")}
          </h1>
          <p className="text-sea-200 text-lg sm:text-xl font-light tracking-widest mb-8 uppercase">
            {t("subtitle")}
          </p>
          <Link
            href="/journeys"
            className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-medium tracking-widest uppercase px-8 py-3 rounded-full backdrop-blur transition-all"
          >
            {t("heroCta")}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs tracking-widest">
          <span className="w-px h-8 bg-white/30 block animate-bounce" />
        </div>
      </section>

      {/* Recent Journeys */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-4xl font-light text-lapis-800">
            {t("recentJourneys")}
          </h2>
          <Link
            href="/journeys"
            className="text-sm text-sea-600 hover:text-lapis-700 font-medium transition-colors"
          >
            {t("viewAll")} →
          </Link>
        </div>

        {/* Placeholder journey cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-52 bg-gradient-to-br from-sea-200 to-lapis-200 group-hover:from-sea-300 group-hover:to-lapis-300 transition-colors" />
              <div className="p-5">
                <p className="text-xs text-sea-600 font-medium uppercase tracking-widest mb-1">
                  Coming soon
                </p>
                <h3 className="font-heading text-xl text-lapis-800 font-semibold">
                  Journey placeholder
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-sea-200 to-transparent mx-6" />

      {/* Recent Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-heading text-4xl font-light text-lapis-800">
            {t("recentPosts")}
          </h2>
          <Link
            href="/blog"
            className="text-sm text-sea-600 hover:text-lapis-700 font-medium transition-colors"
          >
            {t("viewAll")} →
          </Link>
        </div>

        {/* Placeholder blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <article
              key={i}
              className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 rounded-xl flex-shrink-0 bg-gradient-to-br from-sand-200 to-sand-400" />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-sea-600 font-medium uppercase tracking-widest mb-1">
                  Coming soon
                </p>
                <h3 className="font-heading text-xl text-lapis-800 font-semibold leading-snug">
                  Blog post placeholder
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="font-heading text-5xl font-light text-lapis-800 mb-6">
        {t("title")}
      </h1>

      {/* Placeholder portrait */}
      <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-sea-200 via-lapis-200 to-sand-200 mb-10" />

      <p className="text-lg text-gray-700 leading-relaxed">{t("intro")}</p>

      {/* Placeholder sections */}
      <div className="mt-12 space-y-8">
        {["Our Story", "How We Travel", "About This Site"].map((heading) => (
          <section key={heading}>
            <h2 className="font-heading text-2xl text-lapis-700 mb-3">
              {heading}
            </h2>
            <div className="h-24 rounded-xl bg-sea-50 border border-sea-100 flex items-center justify-center text-sea-400 text-sm">
              Content coming soon
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

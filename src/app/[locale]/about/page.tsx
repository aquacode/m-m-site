import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const SECTION_KEYS = ["ourStory", "howWeTravel", "aboutThisSite"] as const;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="font-heading text-5xl font-light text-lapis-800 mb-6">
        {t("title")}
      </h1>

      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-10 bg-sand-100">
        <Image
          src="/images/about.jpg"
          alt={t("imageAlt")}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 48rem"
          className="object-cover object-[center_25%]"
        />
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">{t("intro")}</p>

      <div className="mt-12 space-y-8">
        {SECTION_KEYS.map((key) => (
          <section key={key}>
            <h2 className="font-heading text-2xl text-lapis-700 mb-3">
              {t(`sections.${key}.title`)}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {t(`sections.${key}.body`)}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

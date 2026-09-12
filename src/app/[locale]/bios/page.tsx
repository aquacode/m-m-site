import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Bios" };

export default async function BiosIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "bios" });

  const people = [
    {
      slug: "maryam" as const,
      name: t("maryam.name"),
      blurb: t("maryam.blurb"),
      image: "/images/maryam.png" as string | null,
      accent: "from-sea-200 to-lapis-200",
    },
    {
      slug: "michael" as const,
      name: t("michael.name"),
      blurb: t("michael.blurb"),
      image: "/images/michael.jpg",
      accent: "from-lapis-200 to-sand-200",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="font-heading text-5xl font-light text-lapis-800 mb-4">
        {t("title")}
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">{t("intro")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {people.map(({ slug, name, blurb, accent, image }) => (
          <Link
            key={slug}
            href={`/bios/${slug}`}
            className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-sea-100"
          >
            <div className="relative h-56 overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
              ) : (
                <div
                  className={`h-full w-full bg-gradient-to-br ${accent} group-hover:opacity-90 transition-opacity`}
                />
              )}
            </div>
            <div className="p-6">
              <h2 className="font-heading text-2xl text-lapis-800 font-semibold mb-2">
                {name}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {blurb}
              </p>
              <span className="text-sm text-sea-600 font-medium group-hover:text-lapis-700">
                {t("readBio")} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

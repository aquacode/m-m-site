import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // TODO: fetch journey from Contentful by slug
  return { title: slug };
}

export default async function JourneyDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "journeys" });

  // TODO: fetch journey from Contentful
  // const journey = await fetchJourney(slug, locale);
  // if (!journey) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/journeys"
        className="text-sm text-sea-600 hover:text-lapis-700 font-medium transition-colors mb-8 inline-block"
      >
        ← {t("title")}
      </Link>

      {/* Hero placeholder */}
      <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-sea-200 via-lapis-200 to-lapis-300 mb-10 flex items-center justify-center text-sea-600 text-sm">
        Journey cover photo · {slug}
      </div>

      <h1 className="font-heading text-5xl font-light text-lapis-800 mb-3">
        Journey: {slug}
      </h1>
      <p className="text-sea-600 text-sm mb-10">Content coming soon.</p>

      {/* Gallery placeholder */}
      <h2 className="font-heading text-3xl font-light text-lapis-700 mb-6">
        Photos
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-gradient-to-br from-sea-100 to-lapis-100"
          />
        ))}
      </div>
    </div>
  );
}

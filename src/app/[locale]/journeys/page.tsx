import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getJourneys } from "@/sanity/lib/queries";
import Image from "next/image";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Journeys" };

export default async function JourneysPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "journeys" });
  const journeys = await getJourneys();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-heading text-5xl font-light text-lapis-800 mb-2">
          {t("title")}
        </h1>
        <p className="text-sea-700">{t("subtitle")}</p>
      </div>

      {journeys.length === 0 ? (
        <p className="text-center text-gray-400 py-20">{t("noJourneys")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeys.map((journey) => (
            <Link key={journey._id} href={`/journeys/${journey.slug}`}>
              <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-52 bg-gradient-to-br from-sea-200 to-lapis-200">
                  {journey.coverPhoto && (
                    <Image
                      src={journey.coverPhoto}
                      alt={journey.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-sea-600 font-medium uppercase tracking-widest mb-1">
                    {journey.period} · {journey.destination}
                  </p>
                  <h3 className="font-heading text-xl text-lapis-800 font-semibold">
                    {journey.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

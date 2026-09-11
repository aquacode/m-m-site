import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Michael" };

export default async function MichaelBioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "bios" });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <Link
        href="/bios"
        className="text-sm text-sea-600 hover:text-lapis-700 font-medium mb-8 inline-block"
      >
        ← {t("backToBios")}
      </Link>

      <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-lapis-200 via-sea-200 to-sand-300 mb-10" />

      <h1 className="font-heading text-5xl font-light text-lapis-800 mb-2">
        {t("michael.name")}
      </h1>
      <p className="text-sea-600 text-sm uppercase tracking-widest mb-8">
        {t("editableHint")}
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
        <p>{t("michael.body")}</p>
        <p className="text-sea-500 italic text-base border-l-2 border-sea-200 pl-4">
          {t("placeholderNote")}
        </p>
      </div>
    </div>
  );
}

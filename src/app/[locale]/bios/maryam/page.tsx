import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bios" });
  return { title: t("maryam.name") };
}

export default async function MaryamBioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "bios" });
  const editableHint = t("editableHint");
  const placeholderNote = t("placeholderNote");

  return (
    <div className="bg-lapis-950 text-sea-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <Link
          href="/bios"
          className="text-sm text-sea-300 hover:text-sea-200 font-medium mb-8 inline-block"
        >
          ← {t("backToBios")}
        </Link>

        <div className="relative w-full aspect-[4/5] max-h-[28rem] rounded-2xl overflow-hidden mb-10 bg-lapis-900 ring-1 ring-white/10">
          <Image
            src="/images/maryam.png"
            alt={t("maryam.photoAlt")}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            className="object-cover object-center"
          />
        </div>

        <h1 className="font-heading text-5xl font-light text-white mb-2">
          {t("maryam.name")}
        </h1>
        {editableHint ? (
          <p className="text-sea-300 text-sm uppercase tracking-widest mb-8">
            {editableHint}
          </p>
        ) : (
          <div className="mb-8" />
        )}

        <div className="prose prose-lg prose-invert max-w-none text-sea-100/85 space-y-4">
          <p className="whitespace-pre-line">{t("maryam.body")}</p>
          {placeholderNote ? (
            <p className="text-sea-300/80 italic text-base border-l-2 border-sea-500/40 pl-4">
              {placeholderNote}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import GalleryClient from "@/components/gallery/GalleryClient";
import { getPhotos } from "@/sanity/lib/queries";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "gallery" });
  const rawPhotos = await getPhotos();
  const photos = rawPhotos.map((p) => ({
    id: p._id,
    url: p.url,
    alt: p.caption ?? "",
    width: 800,
    height: 600,
    caption: p.caption,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-heading text-5xl font-light text-lapis-800 mb-2">
          {t("title")}
        </h1>
        <p className="text-sea-700">{t("subtitle")}</p>
      </div>

      <GalleryClient
        photos={photos}
        labelGrid={t("grid")}
        labelMasonry={t("masonry")}
        emptyMessage={t("noPhotos")}
      />
    </div>
  );
}

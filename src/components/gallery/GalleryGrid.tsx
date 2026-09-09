import Image from "next/image";

export type GalleryPhoto = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative aspect-square overflow-hidden rounded-xl bg-sea-100 group cursor-pointer"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import type { GalleryPhoto } from "./GalleryGrid";

const BREAKPOINTS = {
  default: 4,
  1024: 3,
  640: 2,
  480: 1,
};

export default function GalleryMasonry({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <Masonry
      breakpointCols={BREAKPOINTS}
      className="flex gap-3"
      columnClassName="flex flex-col gap-3"
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative overflow-hidden rounded-xl bg-sea-100 group cursor-pointer"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
          />
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-xs">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}
    </Masonry>
  );
}

"use client";

import { useState, useEffect } from "react";
import GalleryGrid, { type GalleryPhoto } from "./GalleryGrid";
import GalleryMasonry from "./GalleryMasonry";

type Layout = "grid" | "masonry";

const STORAGE_KEY = "mm-gallery-layout";

export default function GalleryClient({
  photos,
  labelGrid,
  labelMasonry,
  emptyMessage,
}: {
  photos: GalleryPhoto[];
  labelGrid: string;
  labelMasonry: string;
  emptyMessage: string;
}) {
  const [layout, setLayout] = useState<Layout>("masonry");

  // Restore persisted preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Layout | null;
    if (stored === "grid" || stored === "masonry") setLayout(stored);
  }, []);

  function toggle(next: Layout) {
    setLayout(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <div className="flex items-center rounded-full border border-sea-200 overflow-hidden text-sm">
          {(["masonry", "grid"] as Layout[]).map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-4 py-1.5 font-medium transition-colors ${
                layout === opt
                  ? "bg-sea-500 text-white"
                  : "text-gray-500 hover:text-lapis-700 bg-white"
              }`}
            >
              {opt === "grid" ? labelGrid : labelMasonry}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {photos.length === 0 ? (
        <p className="text-center text-gray-400 py-20">{emptyMessage}</p>
      ) : layout === "grid" ? (
        <GalleryGrid photos={photos} />
      ) : (
        <GalleryMasonry photos={photos} />
      )}
    </div>
  );
}

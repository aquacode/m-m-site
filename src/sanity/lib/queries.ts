import { client, urlFor, isSanityConfigured } from "./client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Journey = {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  period: string;
  coverPhoto?: string;
  body?: unknown;
  photoGallery?: { url: string; caption?: string }[];
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  coverPhoto?: string;
  body?: unknown;
  tags?: string[];
  linkedJourney?: { title: string; slug: string } | null;
};

export type Photo = {
  _id: string;
  url: string;
  caption?: string;
  tags?: string[];
};

// ── Queries ───────────────────────────────────────────────────────────────────

export async function getJourneys(): Promise<Journey[]> {
  if (!isSanityConfigured) return [];
  const raw = await client.fetch(`
    *[_type == "journey"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      destination,
      period,
      coverPhoto
    }
  `);
  return raw.map((j: Journey & { coverPhoto: unknown }) => ({
    ...j,
    coverPhoto: j.coverPhoto ? urlFor(j.coverPhoto as Parameters<typeof urlFor>[0]).width(800).url() : undefined,
  }));
}

export async function getJourney(slug: string): Promise<Journey | null> {
  if (!isSanityConfigured) return null;
  const raw = await client.fetch(
    `*[_type == "journey" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      destination,
      period,
      coverPhoto,
      body,
      "photoGallery": photoGallery[] {
        "url": asset->url,
        caption
      }
    }`,
    { slug }
  );
  if (!raw) return null;
  return {
    ...raw,
    coverPhoto: raw.coverPhoto
      ? urlFor(raw.coverPhoto).width(1200).url()
      : undefined,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];
  const raw = await client.fetch(`
    *[_type == "blogPost"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      date,
      coverPhoto,
      tags
    }
  `);
  return raw.map((p: BlogPost & { coverPhoto: unknown }) => ({
    ...p,
    coverPhoto: p.coverPhoto ? urlFor(p.coverPhoto as Parameters<typeof urlFor>[0]).width(800).url() : undefined,
  }));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) return null;
  const raw = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      date,
      coverPhoto,
      body,
      tags,
      "linkedJourney": linkedJourney-> {
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
  if (!raw) return null;
  return {
    ...raw,
    coverPhoto: raw.coverPhoto
      ? urlFor(raw.coverPhoto).width(1200).url()
      : undefined,
  };
}

export async function getPhotos(): Promise<Photo[]> {
  if (!isSanityConfigured) return [];
  const raw = await client.fetch(`
    *[_type == "photo"] | order(_createdAt desc) {
      _id,
      "url": image.asset->url,
      caption,
      tags
    }
  `);
  return raw;
}

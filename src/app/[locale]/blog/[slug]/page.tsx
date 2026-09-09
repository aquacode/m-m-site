import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // TODO: fetch post from Contentful by slug
  return { title: slug };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  // TODO: fetch post from Contentful
  // const post = await fetchPost(slug, locale);
  // if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-sea-600 hover:text-lapis-700 font-medium transition-colors mb-8 inline-block"
      >
        ← {t("title")}
      </Link>

      {/* Cover image placeholder */}
      <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-sand-200 via-sand-300 to-sea-200 mb-10 flex items-center justify-center text-sand-700 text-sm">
        Post cover photo · {slug}
      </div>

      <header className="mb-10">
        <p className="text-xs text-sea-600 font-medium uppercase tracking-widest mb-3">
          Coming soon
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-light text-lapis-800 leading-tight mb-4">
          Blog Post: {slug}
        </h1>
        <p className="text-gray-500 text-sm">Content coming soon.</p>
      </header>

      {/* Rich text will render inside .prose once Contentful is connected */}
      <div className="prose prose-lg prose-headings:font-heading prose-headings:font-light prose-headings:text-lapis-800 prose-a:text-sea-600 max-w-none">
        <p>Post body content will appear here.</p>
      </div>
    </article>
  );
}

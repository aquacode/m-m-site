import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getPosts } from "@/sanity/lib/queries";
import Image from "next/image";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="font-heading text-5xl font-light text-lapis-800 mb-2">
          {t("title")}
        </h1>
        <p className="text-sea-700">{t("subtitle")}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400 py-20">{t("noPosts")}</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <article className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 rounded-xl flex-shrink-0 bg-gradient-to-br from-sand-200 to-sand-400 overflow-hidden">
                  {post.coverPhoto && (
                    <Image
                      src={post.coverPhoto}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-sea-600 font-medium uppercase tracking-widest mb-1">
                    {post.date}
                  </p>
                  <h3 className="font-heading text-xl text-lapis-800 font-semibold leading-snug">
                    {post.title}
                  </h3>
                  {post.tags && post.tags.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {post.tags.join(" · ")}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

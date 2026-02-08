"use client";

import { ArrowRight, Calendar, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

type BlogPost = {
  slug: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  category: string;
  date: string;
  readTime: number;
  image: string;
};

type BlogGridSectionProps = {
  posts: BlogPost[];
  locale: string;
  isRTL: boolean;
  labels: {
    noResults: string;
    loadMore: string;
    readMore: string;
    minRead: string;
    categoryMap: Record<string, string>;
  };
  visiblePosts: number;
  onLoadMore: () => void;
};

export default function BlogGridSection({
  posts,
  locale,
  isRTL,
  labels,
  visiblePosts,
  onLoadMore,
}: BlogGridSectionProps) {
  const displayedPosts = posts.slice(0, visiblePosts);

  if (posts.length === 0) {
    return (
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">{labels.noResults}</p>
          </div>
        </section>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              isRTL={isRTL}
              labels={labels}
            />
          ))}
        </div>

        {visiblePosts < posts.length ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onLoadMore}
              className="rounded-lg bg-[#0F4C81] px-8 py-3 font-medium text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
            >
              {labels.loadMore}
            </button>
          </div>
        ) : null}
      </section>
    </Reveal>
  );
}

type BlogCardProps = {
  post: BlogPost;
  locale: string;
  isRTL: boolean;
  labels: {
    readMore: string;
    minRead: string;
    categoryMap: Record<string, string>;
  };
};

function BlogCard({ post, locale, isRTL, labels }: BlogCardProps) {
  const title = post.title[locale] ?? post.title.en ?? "";
  const excerpt = post.excerpt[locale] ?? post.excerpt.en ?? "";
  const categoryLabel = labels.categoryMap[post.category] ?? post.category;
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="block w-full text-left">
        <div className="relative h-48 overflow-hidden bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
          <div className="absolute inset-0 flex items-center justify-center text-white/80">
            <span className="text-sm font-medium">{post.image}</span>
          </div>
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0F4C81] backdrop-blur-sm">
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`mb-3 flex items-center gap-4 text-xs text-gray-500 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Clock size={14} />
              <span>
                {post.readTime} {labels.minRead}
              </span>
            </div>
          </div>

          <h3
            className={`mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#0F4C81] ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mb-4 line-clamp-3 text-gray-600 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {excerpt}
          </p>

          <div
            className={`flex items-center gap-2 font-medium text-[#0F4C81] transition-all group-hover:gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span>{labels.readMore}</span>
            <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
          </div>
        </div>
      </Link>
    </article>
  );
}

"use client";

import { useMemo } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  User,
  BookOpen,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import type { CtaButton } from "@/components/ui/CtaSection";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type BlogPost = {
  slug: string;
  title: string;
  author: string;
  category: string;
  date: string;
  readTime: number;
  image: string;
};

type RelatedPost = {
  slug: string;
  title: string;
  readTime: number;
  image: string;
};

type Labels = {
  backToBlogs: string;
  tableOfContents: string;
  minRead: string;
  shareArticle: string;
  relatedPosts: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

type BlogPostClientProps = {
  locale: string;
  isRTL: boolean;
  post: BlogPost;
  contentHtml: string;
  headings: HeadingItem[];
  relatedPosts: RelatedPost[];
  categoryLabelMap: Record<string, string>;
  labels: Labels;
};

const isImageUrl = (value: string) => {
  const trimmed = value.trim();
  // recognize http(s), absolute paths, and data URI images
  return /^(https?:\/\/|\/|data:image\/[a-zA-Z]+;base64,)/i.test(trimmed);
};

export default function BlogPostClient({
  locale,
  isRTL,
  post,
  contentHtml,
  headings,
  relatedPosts,
  categoryLabelMap,
  labels,
}: BlogPostClientProps) {
  const formattedDate = useMemo(
    () =>
      new Date(post.date).toLocaleDateString(
        locale === "ar" ? "ar-EG" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      ),
    [post.date, locale],
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const categoryLabel = categoryLabelMap[post.category] ?? post.category;
  const ctaButtons: CtaButton[] = [
    {
      label: labels.ctaButton,
      href: "/contact-us",
      variant: "primary",
      withArrow: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Reveal>
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <Link
              href="/blog"
              className={`flex items-center gap-2 text-[#0F4C81] transition-colors hover:text-[#083A61] ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <ArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
              <span className="font-medium">{labels.backToBlogs}</span>
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="relative h-80 bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
          {isImageUrl(post.image) ? (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/80">
              <span className="text-lg font-medium">{post.image}</span>
            </div>
          )}
        </div>
      </Reveal>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {headings.length > 0 ? (
            <aside
              className={`hidden lg:block lg:col-span-3 ${isRTL ? "lg:order-2" : ""}`}
            >
              <Reveal>
                <div className="sticky top-24">
                  <div className="rounded-xl bg-gray-50 p-6">
                    <div
                      className={`mb-4 flex items-center gap-2 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <BookOpen size={20} className="text-[#0F4C81]" />
                      <h3 className="font-bold text-gray-900">
                        {labels.tableOfContents}
                      </h3>
                    </div>
                    <nav className="space-y-2">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          type="button"
                          onClick={() => scrollToSection(heading.id)}
                          className={`block w-full text-sm text-gray-700 transition-colors hover:text-[#0F4C81] ${
                            isRTL ? "text-right" : "text-left"
                          } ${heading.level === 3 ? (isRTL ? "pr-4" : "pl-4") : ""}`}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </Reveal>
            </aside>
          ) : null}

          <article className={`lg:col-span-9 ${isRTL ? "lg:order-1" : ""}`}>
            <Reveal>
              <header className="mb-8">
                <div className="mb-4">
                  <span className="rounded-full bg-[#0F4C81] px-3 py-1 text-sm font-semibold text-white">
                    {categoryLabel}
                  </span>
                </div>

                <h1
                  className={`mb-6 text-4xl font-bold text-gray-900 md:text-5xl ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.title}
                </h1>

                <div
                  className={`flex flex-wrap items-center gap-6 text-gray-700 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <User size={18} />
                    <span>{post.author}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Calendar size={18} />
                    <span>{formattedDate}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Clock size={18} />
                    <span>
                      {post.readTime} {labels.minRead}
                    </span>
                  </div>
                </div>
              </header>
            </Reveal>

            <Reveal>
              <div
                id="blog-content"
                className={`blog-prose prose prose-lg max-w-none ${
                  isRTL ? "text-right" : "text-left"
                }`}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              />
            </Reveal>

          </article>
        </div>

        {relatedPosts.length > 0 ? (
          <Reveal>
            <section className="mt-16 border-t border-gray-200 pt-16">
              <h2
                className={`mb-8 text-3xl font-bold text-gray-900 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {labels.relatedPosts}
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <Link
                      href={`/blog/${related.slug}`}
                      className="block w-full text-left"
                    >
                      <div className="relative h-40 bg-linear-to-br from-[#0F4C81] to-[#2B7CB3]">
                        {isImageUrl(related.image) ? (
                          <img
                            src={related.image}
                            alt={related.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/80">
                            <span className="text-sm font-medium">
                              {related.image}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3
                          className={`mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#0F4C81] ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {related.title}
                        </h3>
                        <div
                          className={`flex items-center gap-2 text-sm text-gray-500 ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Clock size={14} />
                          <span>
                            {related.readTime} {labels.minRead}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="mt-16">
            <CtaSection
              title={labels.ctaTitle}
              description={labels.ctaDescription}
              buttons={ctaButtons}
              variant="primary"
              size="lg"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

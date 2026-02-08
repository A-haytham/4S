import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import BlogPostClient from "./BlogPostClient";
import { blogPosts } from "../blogData";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type BlogPostPageProps = {
  slug: string;
};

const extractHeadings = (content: string) => {
  let index = 0;
  const headings: HeadingItem[] = [];
  const html = content.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level, inner) => {
    const id = `section-${index++}`;
    const text = inner.replace(/<[^>]*>/g, "").trim();
    headings.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html, headings };
};

const getRelatedPosts = (slug: string) => {
  const current = blogPosts.find((post) => post.slug === slug);
  if (!current) return [];
  const sameCategory = blogPosts.filter(
    (post) => post.slug !== slug && post.category === current.category
  );
  const fallback = blogPosts.filter(
    (post) => post.slug !== slug && post.category !== current.category
  );
  return [...sameCategory, ...fallback].slice(0, 3);
};

export default async function BlogPostPage({ slug }: BlogPostPageProps) {
  const locale = await getLocale();
  const t = await getTranslations("blogs");

  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return (
      <div className="min-h-screen bg-white px-4 py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {t("postNotFound")}
        </h1>
        <Link href="/blog" className="font-medium text-[#0F4C81] hover:underline">
          {t("backToBlogs")}
        </Link>
      </div>
    );
  }

  const content = post.content[locale] ?? post.content.en;
  const { html, headings } = extractHeadings(content);
  const relatedPosts = getRelatedPosts(slug).map((related) => ({
    slug: related.slug,
    title: related.title[locale] ?? related.title.en,
    readTime: related.readTime,
    image: related.image,
  }));

  const labels = {
    backToBlogs: t("backToBlogs"),
    tableOfContents: t("tableOfContents"),
    minRead: t("minRead"),
    shareArticle: t("shareArticle"),
    relatedPosts: t("relatedPosts"),
    ctaTitle: t("cta.title"),
    ctaDescription: t("cta.description"),
    ctaButton: t("cta.button"),
  };

  const categoryLabelMap = {
    all: t("categories.all"),
    erp: t("categories.erp"),
    finance: t("categories.finance"),
    inventory: t("categories.inventory"),
    hr: t("categories.hr"),
    integrations: t("categories.integrations"),
    caseStudies: t("categories.caseStudies"),
  };

  return (
    <BlogPostClient
      locale={locale}
      isRTL={locale === "ar"}
      post={{
        slug: post.slug,
        title: post.title[locale] ?? post.title.en,
        author: post.author[locale] ?? post.author.en,
        category: post.category,
        date: post.date,
        readTime: post.readTime,
        image: post.image,
      }}
      contentHtml={html}
      headings={headings}
      relatedPosts={relatedPosts}
      categoryLabelMap={categoryLabelMap}
      labels={labels}
    />
  );
}

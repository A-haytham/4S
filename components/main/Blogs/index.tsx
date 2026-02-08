import { getLocale, getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import BlogsClient from "./BlogsClient";
import HeroSection from "./HeroSection";
import { blogCategories, blogPosts } from "./blogData";

export default async function BlogsPage() {
  const t = await getTranslations("blogs");
  const locale = await getLocale();

  const copy = {
    hero: {
      title: t("hero.title"),
      description: t("hero.description"),
    },
    search: {
      placeholder: t("search.placeholder"),
    },
    filters: {
      title: t("filters.title"),
    },
    categories: {
      all: t("categories.all"),
      erp: t("categories.erp"),
      finance: t("categories.finance"),
      inventory: t("categories.inventory"),
      hr: t("categories.hr"),
      integrations: t("categories.integrations"),
      caseStudies: t("categories.caseStudies"),
    },
    readMore: t("readMore"),
    minRead: t("minRead"),
    loadMore: t("loadMore"),
    noResults: t("noResults"),
    cta: {
      title: t("cta.title"),
      description: t("cta.description"),
      button: t("cta.button"),
    },
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Reveal>
        <HeroSection title={copy.hero.title} description={copy.hero.description} />
      </Reveal>
      <BlogsClient locale={locale} posts={blogPosts} categories={blogCategories} copy={copy} />
    </main>
  );
}

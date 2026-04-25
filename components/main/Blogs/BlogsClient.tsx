"use client";

import { useMemo, useState } from "react";
import BlogFiltersSection from "./BlogFiltersSection";
import BlogGridSection from "./BlogGridSection";
import BlogCtaSection from "./BlogCtaSection";

type BlogPost = {
  slug: string;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  category: string;
  date: string;
  readTime: number;
  image: string;
};

type BlogsCopy = {
  search: {
    placeholder: string;
  };
  filters: {
    title: string;
  };
  categories: Record<string, string>;
  readMore: string;
  minRead: string;
  loadMore: string;
  noResults: string;
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

type BlogsClientProps = {
  locale: string;
  posts: BlogPost[];
  categories: string[];
  copy: BlogsCopy;
};

export default function BlogsClient({ locale, posts, categories, copy }: BlogsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const isRTL = locale === "ar";

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const title = (post.title[locale] ?? post.title.en ?? "").toLowerCase();
      const excerpt = (post.excerpt[locale] ?? post.excerpt.en ?? "").toLowerCase();
      const matchesSearch = title.includes(query) || excerpt.includes(query);
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, posts, locale]);

  const handleLoadMore = () => setVisiblePosts((prev) => prev + 6);

  return (
    <>
      <BlogFiltersSection
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setVisiblePosts(6);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(value) => {
          setSelectedCategory(value);
          setVisiblePosts(6);
        }}
        categories={categories}
        isRTL={isRTL}
        labels={{
          placeholder: copy.search.placeholder,
          filterTitle: copy.filters.title,
          categoryMap: copy.categories,
        }}
      />

      <BlogGridSection
        posts={filteredBlogs}
        locale={locale}
        isRTL={isRTL}
        visiblePosts={visiblePosts}
        onLoadMore={handleLoadMore}
        labels={{
          noResults: copy.noResults,
          loadMore: copy.loadMore,
          readMore: copy.readMore,
          minRead: copy.minRead,
          categoryMap: copy.categories,
        }}
      />
       
      <BlogCtaSection
        title={copy.cta.title}
        description={copy.cta.description}
        buttonLabel={copy.cta.button}
      /> 
    </>
  );
}

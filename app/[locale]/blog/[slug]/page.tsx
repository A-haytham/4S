import type { Metadata } from "next";
import BlogPostPage from "../../../../components/main/Blogs/BlogPost";
import { getBlogPosts } from "@/components/main/Blogs/blogApi";
import { buildSeoMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.slug === slug);

  if (!post) {
    return buildSeoMetadata({
      locale,
      path: `/blog/${slug}`,
      title: "Blog post not found",
      description: "The requested blog post could not be found.",
    });
  }

  const title = post.title[locale] ?? post.title.en;
  const description =
    post.excerpt[locale] ?? post.excerpt.en ?? stripHtml(post.content[locale] ?? post.content.en).slice(0, 160);

  return buildSeoMetadata({
    locale,
    path: `/blog/${slug}`,
    title,
    description,
    type: "article",
  });
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}

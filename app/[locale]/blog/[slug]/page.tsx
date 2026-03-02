import BlogPostPage from "../../../../components/main/Blogs/BlogPost";
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}

import type { MetadataRoute } from "next";
import { blogPosts } from "@/components/main/Blogs/blogData";
import { getAbsoluteUrl } from "@/lib/seo";

const staticPaths = [
  "/",
  "/about",
  "/solutions",
  "/our-services",
  "/our-services/recruitment",
  "/our-services/chatbot-whatsapp",
  "/faqs",
  "/blog",
  "/contact-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedStaticRoutes = staticPaths.flatMap((path) => [
    {
      url: getAbsoluteUrl("en", path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    },
    {
      url: getAbsoluteUrl("ar", path),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    },
  ]);

  const localizedBlogRoutes = blogPosts.flatMap((post) => [
    {
      url: getAbsoluteUrl("en", `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: getAbsoluteUrl("ar", `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  return [...localizedStaticRoutes, ...localizedBlogRoutes];
}

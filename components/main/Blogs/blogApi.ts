import { blogPosts, type BlogPost } from "./blogData";

type BlogApiItem = {
  id: string;
  slug: string | null;
  titleEn: string | null;
  titleAr: string | null;
  briefEn: string | null;
  briefAr: string | null;
  contentEn: string | null;
  contentAr: string | null;
  metaTitleEn: string | null;
  metaTitleAr: string | null;
  metaDescriptionEn: string | null;
  metaDescriptionAr: string | null;
  coverImage: string | null;
  category: string | null;
  status: string | null;
  publishDate: string | null;
};

type BlogApiResponse = {
  content?: BlogApiItem[];
};

const BLOGS_API_URL =
  process.env.BLOGS_API_URL ??
  process.env.NEXT_PUBLIC_BLOGS_API_URL ??
  "http://196.219.86.38:8080/api/blogs";
const DEFAULT_AUTHOR = { en: "4S Team", ar: "4S Team" };
const DEFAULT_IMAGE_LABEL = "Blog cover";
const DEFAULT_CATEGORY = "all";
const READING_SPEED_WPM = 200;

const normalizeText = (value: string | null | undefined) => value?.trim() ?? "";

const toLocalizedValue = (en: string | null | undefined, ar: string | null | undefined) => {
  const enValue = normalizeText(en);
  const arValue = normalizeText(ar);

  return {
    en: enValue || arValue,
    ar: arValue || enValue,
  };
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const estimateReadTime = (htmlContent: string) => {
  const words = stripHtml(htmlContent).split(" ").filter(Boolean).length;
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / READING_SPEED_WPM));
};

const mapApiItemToBlogPost = (item: BlogApiItem): BlogPost | null => {
  const slug = normalizeText(item.slug);
  const title = toLocalizedValue(item.titleEn, item.titleAr);
  const excerpt = toLocalizedValue(item.briefEn, item.briefAr);
  const content = toLocalizedValue(item.contentEn, item.contentAr);

  if (!slug || (!title.en && !title.ar)) {
    return null;
  }

  const publishedDate = normalizeText(item.publishDate);
  const fallbackContent = content.en || content.ar || "";

  return {
    slug,
    title,
    excerpt,
    author: DEFAULT_AUTHOR,
    category: normalizeText(item.category) || DEFAULT_CATEGORY,
    date: publishedDate || new Date().toISOString(),
    readTime: estimateReadTime(fallbackContent),
    image: normalizeText(item.coverImage) || DEFAULT_IMAGE_LABEL,
    content,
  };
};

const extractApiItems = (payload: unknown): BlogApiItem[] => {
  if (Array.isArray(payload)) {
    return payload as BlogApiItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as BlogApiResponse).content)) {
    return (payload as BlogApiResponse).content ?? [];
  }

  return [];
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!BLOGS_API_URL) {
    return blogPosts;
  }

  try {
    const response = await fetch(BLOGS_API_URL, {
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      return blogPosts;
    }

    const payload = (await response.json()) as unknown;
    const mappedPosts = extractApiItems(payload)
      .map(mapApiItemToBlogPost)
      .filter((item): item is BlogPost => item !== null);

    return mappedPosts.length > 0 ? mappedPosts : blogPosts;
  } catch {
    return blogPosts;
  }
}

export const getBlogCategories = (posts: BlogPost[]) => {
  const categories = Array.from(
    new Set(posts.map((post) => post.category.trim()).filter(Boolean))
  );

  if (!categories.includes("all")) {
    categories.unshift("all");
  }

  return categories;
};

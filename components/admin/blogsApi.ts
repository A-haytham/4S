import type { Blog } from "./BlogsList";
import { createAdminApiError } from "./apiError";

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

const ADMIN_BLOGS_API = "/api/admin/blogs";
const ADMIN_LOGIN_API = "/api/admin/auth/login";

const normalize = (value: string | null | undefined) => value?.trim() ?? "";

const toNullable = (value: string | undefined) => {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
};

const getIdFromLocationHeader = (response: Response) => {
  const location = response.headers.get("location");
  if (!location) {
    return "";
  }

  const parts = location.split("/").filter(Boolean);
  return parts.at(-1) ?? "";
};

const parseJsonIfPresent = async <T>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  const textPayload = await response.text();
  if (!textPayload.trim()) {
    return null;
  }

  try {
    return JSON.parse(textPayload) as T;
  } catch {
    return null;
  }
};

const mapApiToBlog = (item: BlogApiItem): Blog => {
  const titleEn = normalize(item.titleEn);
  const titleAr = normalize(item.titleAr);
  const briefEn = normalize(item.briefEn);
  const briefAr = normalize(item.briefAr);
  const contentEn = normalize(item.contentEn);
  const contentAr = normalize(item.contentAr);
  const metaTitleEn = normalize(item.metaTitleEn);
  const metaTitleAr = normalize(item.metaTitleAr);
  const metaDescriptionEn = normalize(item.metaDescriptionEn);
  const metaDescriptionAr = normalize(item.metaDescriptionAr);

  return {
    id: item.id,
    slug: normalize(item.slug),
    titleEn,
    titleAr,
    briefEn,
    briefAr,
    contentEn,
    contentAr,
    coverImage: normalize(item.coverImage),
    category: normalize(item.category) || "General",
    status: item.status === "published" ? "published" : "draft",
    publishDate: normalize(item.publishDate) || new Date().toISOString(),
    metaTitleEn,
    metaTitleAr,
    metaDescriptionEn,
    metaDescriptionAr,
  };
};

const mapBlogToApiPayload = (blogData: Partial<Blog>) => {
  const publishDate = blogData.publishDate?.trim() || new Date().toISOString();
  const status = blogData.status === "published" ? "published" : "draft";
  const titleEn = blogData.titleEn?.trim() ?? "";
  const titleAr = blogData.titleAr?.trim() ?? "";
  const briefEn = blogData.briefEn?.trim() ?? "";
  const briefAr = blogData.briefAr?.trim() ?? "";
  const contentEn = blogData.contentEn?.trim() ?? "";
  const contentAr = blogData.contentAr?.trim() ?? "";
  const metaTitleEn = blogData.metaTitleEn?.trim() ?? "";
  const metaTitleAr = blogData.metaTitleAr?.trim() ?? "";
  const metaDescriptionEn = blogData.metaDescriptionEn?.trim() ?? "";
  const metaDescriptionAr = blogData.metaDescriptionAr?.trim() ?? "";

  return {
    slug: toNullable(blogData.slug),
    titleEn: toNullable(titleEn),
    titleAr: toNullable(titleAr),
    briefEn: toNullable(briefEn),
    briefAr: toNullable(briefAr),
    contentEn: toNullable(contentEn),
    contentAr: toNullable(contentAr),
    metaTitleEn: toNullable(metaTitleEn),
    metaTitleAr: toNullable(metaTitleAr),
    metaDescriptionEn: toNullable(metaDescriptionEn),
    metaDescriptionAr: toNullable(metaDescriptionAr),
    coverImage: toNullable(blogData.coverImage),
    category: toNullable(blogData.category) ?? "General",
    status,
    publishDate,
  };
};

const mapInputToBlog = (id: string, blogData: Partial<Blog>): Blog => ({
  id,
  slug: normalize(blogData.slug),
  titleEn: normalize(blogData.titleEn),
  titleAr: normalize(blogData.titleAr),
  briefEn: normalize(blogData.briefEn),
  briefAr: normalize(blogData.briefAr),
  contentEn: normalize(blogData.contentEn),
  contentAr: normalize(blogData.contentAr),
  coverImage: normalize(blogData.coverImage),
  category: normalize(blogData.category) || "General",
  status: blogData.status === "published" ? "published" : "draft",
  publishDate: normalize(blogData.publishDate) || new Date().toISOString(),
  metaTitleEn: normalize(blogData.metaTitleEn),
  metaTitleAr: normalize(blogData.metaTitleAr),
  metaDescriptionEn: normalize(blogData.metaDescriptionEn),
  metaDescriptionAr: normalize(blogData.metaDescriptionAr),
});

const extractItems = (payload: unknown): BlogApiItem[] => {
  if (Array.isArray(payload)) {
    return payload as BlogApiItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as BlogApiResponse).content)) {
    return (payload as BlogApiResponse).content ?? [];
  }

  return [];
};

export async function fetchBlogsFromApi() {
  const response = await fetch(ADMIN_BLOGS_API, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw createAdminApiError(await parseErrorMessage(response), response.status);
  }

  const payload = (await response.json()) as unknown;
  return extractItems(payload).map(mapApiToBlog);
}

type LoginResponse = {
  token: string;
};

const parseErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export async function loginAdmin(email: string, password: string) {
  const response = await fetch(ADMIN_LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw createAdminApiError(await parseErrorMessage(response), response.status);
  }

  const payload = (await response.json()) as LoginResponse;
  return payload.token;
}

export async function createBlogInApi(token: string, blogData: Partial<Blog>) {
  const response = await fetch(ADMIN_BLOGS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mapBlogToApiPayload(blogData)),
  });

  if (!response.ok) {
    throw createAdminApiError(await parseErrorMessage(response), response.status);
  }

  const payload = await parseJsonIfPresent<BlogApiItem>(response);
  if (payload) {
    return mapApiToBlog(payload);
  }

  const slug = normalize(blogData.slug);
  if (slug) {
    try {
      const existing = await fetchBlogsFromApi();
      const matched = existing.find((blog) => blog.slug === slug);
      if (matched) {
        return matched;
      }
    } catch {
      // fallback to local object if refresh fails
    }
  }

  const fallbackId = getIdFromLocationHeader(response) || `created-${Date.now()}`;
  return mapInputToBlog(fallbackId, blogData);
}

export async function updateBlogInApi(token: string, id: string, blogData: Partial<Blog>) {
  const response = await fetch(`${ADMIN_BLOGS_API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mapBlogToApiPayload(blogData)),
  });

  if (!response.ok) {
    throw createAdminApiError(await parseErrorMessage(response), response.status);
  }

  const payload = await parseJsonIfPresent<BlogApiItem>(response);
  if (payload) {
    return mapApiToBlog(payload);
  }

  return mapInputToBlog(id, blogData);
}

export async function deleteBlogInApi(token: string, id: string) {
  const response = await fetch(`${ADMIN_BLOGS_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw createAdminApiError(await parseErrorMessage(response), response.status);
  }
}

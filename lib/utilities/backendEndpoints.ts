const DEFAULT_BACKEND_BASE_URL = "http://92.205.108.111:8888";

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/g, "");

const trimLeadingSlashes = (value: string) => value.replace(/^\/+/g, "");

export const BACKEND_BASE_URL = trimTrailingSlashes(
  process.env.BACKEND_BASE_URL ??
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ??
    DEFAULT_BACKEND_BASE_URL,
);

export const buildBackendUrl = (path: string) =>
  `${BACKEND_BASE_URL}/${trimLeadingSlashes(path)}`;

export const BACKEND_ENDPOINTS = {
  publicBlogs: process.env.BLOGS_API_URL ?? process.env.NEXT_PUBLIC_BLOGS_API_URL ?? buildBackendUrl("/api/blogs"),
  publicFaqs: process.env.FAQS_API_URL ?? process.env.NEXT_PUBLIC_FAQS_API_URL ?? buildBackendUrl("/api/faqs"),
  publicContact:
    process.env.CONTACT_API_URL ??
    process.env.CONTACTS_API_URL ??
    process.env.NEXT_PUBLIC_CONTACT_API_URL ??
    process.env.NEXT_PUBLIC_CONTACTS_API_URL ??
    buildBackendUrl("/api/contact"),
  adminBlogs: process.env.ADMIN_BLOGS_API_URL ?? buildBackendUrl("/api/admin/blogs"),
  adminFaqs: process.env.ADMIN_FAQS_API_URL ?? buildBackendUrl("/api/admin/faqs"),
  adminContact: process.env.ADMIN_CONTACTS_API_URL ?? buildBackendUrl("/api/admin/contact"),
  authLogin: process.env.AUTH_API_URL ?? buildBackendUrl("/api/auth/login"),
} as const;

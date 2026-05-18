import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.4s-systems.com");

const trimSlash = (value: string) => value.replace(/\/+$/, "");

export const getLocalizedPath = (locale: string, path = "/") => {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return locale === "ar" ? `/ar${normalizedPath}` : normalizedPath || "/";
};

export const getAbsoluteUrl = (locale: string, path = "/") =>
  `${trimSlash(siteUrl)}${getLocalizedPath(locale, path)}`;

type SeoMetadataInput = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildSeoMetadata({
  locale,
  path = "/",
  title,
  description,
  keywords,
  type = "website",
}: SeoMetadataInput): Metadata {
  const url = getAbsoluteUrl(locale, path);
  const image = `${trimSlash(siteUrl)}/og-image.svg`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: getAbsoluteUrl("en", path),
        ar: getAbsoluteUrl("ar", path),
        "x-default": getAbsoluteUrl("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "4S Systems",
      type,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "4S Systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

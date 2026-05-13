import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";
import { siteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Solutions | 4S Systems",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function OurProductPage({ params }: PageProps) {
  const { locale } = await params;
  redirect({ href: "/solutions", locale });
}

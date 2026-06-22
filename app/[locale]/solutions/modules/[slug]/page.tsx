import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ModuleDetailPage from "@/components/main/Solutions/ModuleDetailPage";
import { getModuleBySlug, modules } from "@/app/data/modules";
import { getArabicModuleCopy } from "@/app/data/moduleArabic";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return modules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const moduleDetail = getModuleBySlug(slug);

  if (!moduleDetail) {
    return {};
  }
  const localizedModule = locale === "ar" ? getArabicModuleCopy(moduleDetail) : moduleDetail;

  return buildSeoMetadata({
    locale,
    path: `/solutions/modules/${localizedModule.slug}`,
    title: `${localizedModule.title} | 4S Systems`,
    description: localizedModule.shortDescription,
  });
}

export default async function ModuleDetailRoutePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const moduleDetail = getModuleBySlug(slug);

  if (!moduleDetail) {
    notFound();
  }

  setRequestLocale(locale);

  return <ModuleDetailPage module={locale === "ar" ? getArabicModuleCopy(moduleDetail) : moduleDetail} locale={locale} />;
}

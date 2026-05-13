import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/ui/PageHero";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const serviceKeyBySlug = {
  recruitment: "recruitment",
  "chatbot-whatsapp": "chatbotWhatsapp",
} as const;

type ServiceSlug = keyof typeof serviceKeyBySlug;

export function generateStaticParams() {
  return Object.keys(serviceKeyBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const serviceKey = serviceKeyBySlug[slug as ServiceSlug];

  if (!serviceKey) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: `serviceDetails.${serviceKey}` });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const serviceKey = serviceKeyBySlug[slug as ServiceSlug];

  if (!serviceKey) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: `serviceDetails.${serviceKey}` });
  const paragraphs = t.raw("paragraphs") as string[];
  const points = t.raw("points") as string[];

  return (
    <main className="min-h-screen bg-white">
      <PageHero title={t("title")} description={t("description")} />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:px-8">
          <div className="space-y-6 ltr:text-left rtl:text-right">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="rounded-2xl bg-linear-to-br from-blue-50 to-orange-50 p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t("highlightsTitle")}</h2>
            <div className="space-y-4">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3 rtl:flex-row-reverse">
                  <CheckCircle size={20} className="mt-1 shrink-0 text-[#0F4C81]" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
            >
              {t("cta")}
              <ArrowRight size={18} className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

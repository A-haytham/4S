"use client";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  Download,
  Factory,
  FileText,
  Landmark,
  Leaf,
  Package,
  Settings,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "@/i18n/navigation";
import type { ModuleDetail, ModuleIcon } from "@/app/data/modules";
import { getRelatedModules } from "@/app/data/modules";
import { getArabicModuleCopy } from "@/app/data/moduleArabic";
import { getModulePdfFiles } from "@/app/data/modulePdfs";
import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";

const iconMap: Record<
  ModuleIcon,
  ComponentType<{ className?: string; size?: number }>
> = {
  administration: ClipboardList,
  agriculture: Leaf,
  assets: BadgeCheck,
  attendance: Users,
  bank: Landmark,
  chart: BarChart3,
  construction: Building2,
  cooling: Snowflake,
  digital: Workflow,
  dollar: Landmark,
  extracts: FileText,
  facility: Building2,
  invoice: FileText,
  maintenance: Settings,
  manufacturing: Factory,
  mobile: Smartphone,
  package: Package,
  realEstate: Building2,
  settings: Truck,
  shoppingCart: ClipboardList,
  trending: BarChart3,
  users: Users,
  zap: Workflow,
};

type ModuleDetailPageProps = {
  module: ModuleDetail;
  locale: string;
};

type ModuleCopy = {
  systemLabel: string;
  productVideo: string;
  seeInAction: (title: string) => string;
  video: string;
  requestDemo: string;
  downloadFiles: string;
  exploreModules: string;
  overview: string;
  overviewTitle: string;
  snapshot: string;
  consultation: string;
  mainFeatures: string;
  technicalFeatures: string;
  reports: string;
  relatedLabel: string;
  relatedTitle: string;
  learnMore: string;
  finalTitle: string;
  finalDescription: string;
};

const copyByLocale: Record<"en" | "ar", ModuleCopy> = {
  en: {
    systemLabel: "4S Systems",
    productVideo: "Product Video",
    seeInAction: (title: string) => `See ${title} in action`,
    video: "Video",
    requestDemo: "Request a Demo",
    downloadFiles: "Download Files",
    exploreModules: "Explore All Modules",
    overview: "Overview",
    overviewTitle: "Built for operational clarity",
    snapshot: "Module Snapshot",
    consultation: "Schedule a Consultation",
    mainFeatures: "Main Features",
    technicalFeatures: "Technical Features",
    reports: "Reports",
    relatedLabel: "Related Modules",
    relatedTitle: "Explore connected capabilities",
    learnMore: "Learn more",
    finalTitle: "Ready to modernize your operations?",
    finalDescription:
      "Talk to our team about the right ERP setup for your business.",
  },
  ar: {
    systemLabel: "4S Systems",
    productVideo: "فيديو المنتج",
    seeInAction: (title: string) => `شاهد ${title} أثناء العمل`,
    video: "فيديو",
    requestDemo: "اطلب عرضًا توضيحيًا",
    downloadFiles: "تحميل الملفات",
    exploreModules: "استعرض كل المديولز",
    overview: "نظرة عامة",
    overviewTitle: "مصمم لزيادة وضوح العمليات",
    snapshot: "ملخص المديول",
    consultation: "احجز استشارة",
    mainFeatures: "الخصائص الرئيسية",
    technicalFeatures: "الخصائص الفنية",
    reports: "التقارير",
    relatedLabel: "مديولز مرتبطة",
    relatedTitle: "استكشف قدرات متكاملة",
    learnMore: "اعرف المزيد",
    finalTitle: "هل أنت جاهز لتحديث عملياتك؟",
    finalDescription:
      "تواصل مع فريقنا لاختيار إعداد ERP الأنسب لاحتياجات عملك.",
  },
};

function CardList({
  title,
  items,
  label,
  columns = "lg:grid-cols-3",
}: {
  title: string;
  items: string[];
  label: string;
  columns?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl ltr:text-left rtl:text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E67E22]">
            {label}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className={`grid gap-5 md:grid-cols-2 ${columns}`}>
          {items.map((item) => (
            <div
              key={item}
              className="flex min-h-28 items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ltr:text-left ltr:flex-row rtl:text-right rtl:flex-row-reverse"
            >
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81]/10 text-[#0F4C81]">
                <CheckCircle2 size={18} />
              </div>
              <p className="text-sm leading-relaxed text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleVideos({
  title,
  videoUrls = [],
  copy,
}: {
  title: string;
  videoUrls?: string[];
  copy: ModuleCopy;
}) {
  if (videoUrls.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl ltr:text-left rtl:text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E67E22]">
            {copy.productVideo}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {copy.seeInAction(title)}
          </h2>
        </div>
        <div
          className={`grid gap-6 ${videoUrls.length > 1 ? "lg:grid-cols-2" : ""}`}
        >
          {videoUrls.map((videoUrl, index) => (
            <div
              key={videoUrl}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <video
                className="aspect-video w-full bg-slate-950"
                src={videoUrl}
                controls
                preload="metadata"
                playsInline
              />
              {videoUrls.length > 1 ? (
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-gray-700">
                    {copy.video} {index + 1}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadButton({
  module,
  copy,
}: {
  module: ModuleDetail;
  copy: ModuleCopy;
}) {
  const files = getModulePdfFiles(module.slug);

  const handleDownload = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/modules-pdf/${encodeURIComponent(filename)}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!files) {
    return null;
  }

  const allFiles = [
    files.pdf && { name: files.pdf, type: "PDF" },
    files.pptx && { name: files.pptx, type: "PPTX" },
  ].filter(Boolean) as Array<{ name: string; type: string }>;

  if (allFiles.length === 0) {
    return null;
  }

  if (allFiles.length === 1) {
    return (
      <button
        onClick={() => handleDownload(allFiles[0].name)}
        className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
      >
        {copy.downloadFiles}
        <Download size={18} className="ml-2 rtl:ml-0 rtl:mr-2" />
      </button>
    );
  }

  return (
    <div className="group relative inline-flex">
      <button className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20">
        {copy.downloadFiles}
        <Download size={18} className="ml-2 rtl:ml-0 rtl:mr-2" />
      </button>
      <div className="absolute right-0 top-full mt-2 hidden w-48 flex-col rounded-xl border border-gray-200 bg-white shadow-lg group-hover:flex rtl:right-auto rtl:left-0">
        {allFiles.map((file) => (
          <button
            key={file.name}
            onClick={() => handleDownload(file.name)}
            className="px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
          >
            Download {file.type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ModuleDetailPage({
  module,
  locale,
}: ModuleDetailPageProps) {
  const relatedModules = getRelatedModules(module).map((relatedModule) =>
    locale === "ar" ? getArabicModuleCopy(relatedModule) : relatedModule,
  );
  const Icon = module.icon ? iconMap[module.icon] : Settings;
  const copy = locale === "ar" ? copyByLocale.ar : copyByLocale.en;

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        title={module.title}
        description={module.shortDescription}
        className="py-20"
        contentClassName="ltr:text-left rtl:text-right"
      >
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row ltr:sm:justify-start rtl:sm:justify-end">
          {module.category ? (
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              {module.category}
            </span>
          ) : null}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row ltr:sm:justify-start rtl:sm:justify-end">
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0F4C81] transition-all hover:bg-gray-100 hover:shadow-xl"
          >
            {copy.requestDemo}
            <ArrowRight
              size={18}
              className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180"
            />
          </Link>
          {getModulePdfFiles(module.slug) && (
            <DownloadButton module={module} copy={copy} />
          )}
          <Link
            href="/solutions#modules"
            className="inline-flex items-center justify-center rounded-xl border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            {copy.exploreModules}
          </Link>
        </div>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.35fr_0.75fr] ltr:lg:grid-cols-[1.35fr_0.75fr] rtl:lg:grid-cols-[0.75fr_1.35fr] lg:px-8">
          <div className="space-y-6 ltr:text-left rtl:text-right ltr:lg:col-start-1 rtl:lg:col-start-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E67E22]">
              {copy.overview}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {copy.overviewTitle}
            </h2>
            {module.overview.map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-relaxed text-gray-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="rounded-2xl bg-linear-to-br from-blue-50 to-orange-50 p-8 ltr:lg:col-start-2 rtl:lg:col-start-1">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81] text-white ltr:mr-0 rtl:ml-auto">
              <Icon size={26} />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {copy.snapshot}
            </h2>
            <p className="text-gray-700">{module.shortDescription}</p>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
            >
              {module.cta ?? copy.consultation}
              <ArrowRight
                size={18}
                className="ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180"
              />
            </Link>
          </aside>
        </div>
      </section>

      <ModuleVideos
        title={module.title}
        videoUrls={module.videoUrls}
        copy={copy}
      />

      <CardList
        title={copy.mainFeatures}
        items={module.features}
        label={copy.systemLabel}
      />
      <CardList
        title={copy.technicalFeatures}
        items={module.technicalFeatures ?? []}
        label={copy.systemLabel}
        columns="lg:grid-cols-2"
      />
      <CardList
        title={copy.reports}
        items={module.reports ?? []}
        label={copy.systemLabel}
        columns="lg:grid-cols-2"
      />

      {module.sections?.map((section) => (
        <CardList
          key={section.title}
          title={section.title}
          items={section.items}
          label={copy.systemLabel}
          columns="lg:grid-cols-3"
        />
      ))}

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 ltr:text-left rtl:text-right">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E67E22]">
              {copy.relatedLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {copy.relatedTitle}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedModules.map((relatedModule) => {
              const RelatedIcon = relatedModule.icon
                ? iconMap[relatedModule.icon]
                : ShieldCheck;

              return (
                <Link
                  key={relatedModule.slug}
                  href={`/solutions/modules/${relatedModule.slug}`}
                  className="group flex min-h-56 flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0F4C81] hover:shadow-xl ltr:text-left rtl:text-right"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0F4C81] transition-colors group-hover:bg-[#0F4C81] group-hover:text-white rtl:ml-auto">
                    <RelatedIcon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {relatedModule.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {relatedModule.shortDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center pt-5 text-sm font-semibold text-[#0F4C81]">
                    {copy.learnMore}
                    <ArrowRight
                      size={16}
                      className="ml-2 transition-transform group-hover:translate-x-1 rtl:ml-0 rtl:mr-2 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        title={copy.finalTitle}
        description={copy.finalDescription}
        buttons={[
          { label: copy.consultation, href: "/contact-us", withArrow: true },
        ]}
      />
    </main>
  );
}

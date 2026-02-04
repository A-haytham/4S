import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type IndustryItem = {
  title: string;
  description: string;
};

export default function IndustriesSection() {
  const t = useTranslations("home.industries");
  const items = t.raw("items") as IndustryItem[];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">{t("title")}</h2>
        <p className="mt-3 text-base text-gray-600">{t("subtitle")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((industry) => (
            <div
              key={industry.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#2B7CB3] p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ltr:text-left rtl:text-right"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
              <h3 className="relative z-10 text-lg font-semibold">{industry.title}</h3>
              <p className="relative z-10 mt-2 text-sm text-blue-100">{industry.description}</p>
              <ArrowRight
                size={20}
                className="absolute bottom-5 right-5 opacity-0 transition-opacity group-hover:opacity-100 rtl:right-auto rtl:left-5 rtl:rotate-180"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

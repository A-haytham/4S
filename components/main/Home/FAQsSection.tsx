import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FAQsAccordion from "./FAQsAccordion";

type FaqItem = {
  question: string;
  answer: string;
};

export default function FAQsSection() {
  const t = useTranslations("home.faqsSection");
  const faqs = t.raw("faqs") as FaqItem[];

  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <FAQsAccordion faqs={faqs} />

        <div className="mt-10 text-center">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#083A61] hover:shadow-lg"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFaqCategoriesFromApi } from "@/components/main/FAQs/faqsApi";
import { withFaqFallback } from "@/components/main/FAQs/faqFallback";
import FAQsAccordion from "./FAQsAccordion";

type FaqItem = {
  question: string;
  answer: string;
};

export default async function FAQsSection() {
  const t = await getTranslations("home.faqsSection");
  const faqsT = await getTranslations("faqs");
  const locale = await getLocale();

  const categories = await getFaqCategoriesFromApi(locale);
  const fallbackCategories = faqsT.raw("categories") as {
    id: string;
    name: string;
    icon: string;
    faqs: FaqItem[];
  }[];
  const faqCategories = withFaqFallback(categories, fallbackCategories);
  const faqs = faqCategories
    .flatMap((category) => category.faqs)
    .filter((item) => item.question.trim() && item.answer.trim());
  const displayedFaqs = faqs.slice(0, 4);

  return (
    <section className="bg-linear-to-b from-white to-gray-50 py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <FAQsAccordion faqs={displayedFaqs} />

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

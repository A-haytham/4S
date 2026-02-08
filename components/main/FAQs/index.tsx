import { getLocale, getTranslations } from "next-intl/server";
import FAQsClient from "./FAQsClient";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  faqs: FaqItem[];
};

export default async function FAQsPage() {
  const t = await getTranslations("faqs");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const copy = {
    hero: {
      title: t("hero.title"),
      description: t("hero.description"),
    },
    search: {
      placeholder: t("search.placeholder"),
      noResults: t("search.noResults"),
    },
    categories: t.raw("categories") as Category[],
    expandAll: t("expandAll"),
    collapseAll: t("collapseAll"),
    cta: {
      title: t("cta.title"),
      description: t("cta.description"),
      button: t("cta.button"),
    },
  };

  return (
    <>
      <Reveal>
        <PageHero title={copy.hero.title} description={copy.hero.description} />
      </Reveal>
      <FAQsClient copy={copy} isRTL={isRTL} />
    </>
  );
}

import type { FaqCategory } from "./faqsApi";

type FallbackCategory = {
  id: string;
  name: string;
  icon: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

export function getFallbackFaqCategories(categories: FallbackCategory[]): FaqCategory[] {
  return categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
      faqs: category.faqs.filter((faq) => faq.question && faq.answer),
    }))
    .filter((category) => category.faqs.length > 0);
}

export function withFaqFallback(
  apiCategories: FaqCategory[],
  fallbackCategories: FallbackCategory[],
) {
  return apiCategories.length > 0 ? apiCategories : getFallbackFaqCategories(fallbackCategories);
}

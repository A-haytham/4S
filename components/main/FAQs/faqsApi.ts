import { BACKEND_ENDPOINTS } from "@/lib/utilities/backendEndpoints";

type BackendFaqItem = {
  id: string;
  questionEn: string | null;
  answerEn: string | null;
  questionAr: string | null;
  answerAr: string | null;
  category: string | null;
  order: number | null;
};

type BackendFaqResponse = {
  content?: BackendFaqItem[];
};

type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  name: string;
  icon: string;
  faqs: FaqItem[];
};

const FAQS_API_URL = BACKEND_ENDPOINTS.publicFaqs;

const normalize = (value: string | null | undefined) => value?.trim() ?? "";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (name.includes("implement")) return "implementation";
  if (name.includes("security") || name.includes("secure")) return "security";
  if (name.includes("price") || name.includes("pricing") || name.includes("cost")) return "pricing";
  return "basics";
};

const extractItems = (payload: unknown): BackendFaqItem[] => {
  if (Array.isArray(payload)) {
    return payload as BackendFaqItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as BackendFaqResponse).content)) {
    return (payload as BackendFaqResponse).content ?? [];
  }

  return [];
};

export async function getFaqCategoriesFromApi(locale: string): Promise<FaqCategory[]> {
  try {
    const response = await fetch(`${FAQS_API_URL}?page=0&size=100`, {
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as unknown;
    const items = extractItems(payload).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const categoriesMap = new Map<string, FaqCategory>();

    for (const item of items) {
      const question =
        locale === "ar"
          ? normalize(item.questionAr) || normalize(item.questionEn)
          : normalize(item.questionEn) || normalize(item.questionAr);
      const answer =
        locale === "ar"
          ? normalize(item.answerAr) || normalize(item.answerEn)
          : normalize(item.answerEn) || normalize(item.answerAr);

      if (!question || !answer) {
        continue;
      }

      const categoryName = normalize(item.category) || "General";
      const categoryId = slugify(categoryName) || "general";

      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          id: categoryId,
          name: categoryName,
          icon: getCategoryIcon(categoryName),
          faqs: [],
        });
      }

      categoriesMap.get(categoryId)?.faqs.push({ question, answer });
    }

    return Array.from(categoriesMap.values());
  } catch {
    return [];
  }
}

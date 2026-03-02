import type { FAQ } from "./FAQsList";

type FaqApiItem = {
  id: string;
  questionEn: string | null;
  answerEn: string | null;
  questionAr: string | null;
  answerAr: string | null;
  category: string | null;
  order: number | null;
};

type FaqApiResponse = {
  content?: FaqApiItem[];
};

const ADMIN_FAQS_API = "/api/admin/faqs";

const normalize = (value: string | null | undefined) => value?.trim() ?? "";

const getIdFromLocationHeader = (response: Response) => {
  const location = response.headers.get("location");
  if (!location) {
    return "";
  }

  const parts = location.split("/").filter(Boolean);
  return parts.at(-1) ?? "";
};

const parseJsonIfPresent = async <T>(response: Response): Promise<T | null> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  const textPayload = await response.text();
  if (!textPayload.trim()) {
    return null;
  }

  try {
    return JSON.parse(textPayload) as T;
  } catch {
    return null;
  }
};

const extractItems = (payload: unknown): FaqApiItem[] => {
  if (Array.isArray(payload)) {
    return payload as FaqApiItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as FaqApiResponse).content)) {
    return (payload as FaqApiResponse).content ?? [];
  }

  return [];
};

const mapApiToFaq = (item: FaqApiItem): FAQ => ({
  id: item.id,
  questionEn: normalize(item.questionEn),
  answerEn: normalize(item.answerEn),
  questionAr: normalize(item.questionAr),
  answerAr: normalize(item.answerAr),
  category: normalize(item.category) || "General",
  order: item.order ?? 1,
});

const mapFaqToPayload = (faqData: Partial<FAQ>) => ({
  questionEn: normalize(faqData.questionEn) || null,
  answerEn: normalize(faqData.answerEn) || null,
  questionAr: normalize(faqData.questionAr) || null,
  answerAr: normalize(faqData.answerAr) || null,
  category: normalize(faqData.category) || "General",
  order: faqData.order ?? 1,
});

const mapInputToFaq = (id: string, faqData: Partial<FAQ>): FAQ => ({
  id,
  questionEn: normalize(faqData.questionEn),
  answerEn: normalize(faqData.answerEn),
  questionAr: normalize(faqData.questionAr),
  answerAr: normalize(faqData.answerAr),
  category: normalize(faqData.category) || "General",
  order: faqData.order ?? 1,
});

const parseErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export async function fetchFaqsFromApi() {
  const response = await fetch(ADMIN_FAQS_API, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const payload = (await response.json()) as unknown;
  return extractItems(payload)
    .map(mapApiToFaq)
    .sort((a, b) => a.order - b.order);
}

export async function createFaqInApi(token: string, faqData: Partial<FAQ>) {
  const response = await fetch(ADMIN_FAQS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mapFaqToPayload(faqData)),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const payload = await parseJsonIfPresent<FaqApiItem>(response);
  if (payload) {
    return mapApiToFaq(payload);
  }

  const fallbackId = getIdFromLocationHeader(response) || `created-${Date.now()}`;
  return mapInputToFaq(fallbackId, faqData);
}

export async function updateFaqInApi(token: string, id: string, faqData: Partial<FAQ>) {
  const response = await fetch(`${ADMIN_FAQS_API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mapFaqToPayload(faqData)),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const payload = await parseJsonIfPresent<FaqApiItem>(response);
  if (payload) {
    return mapApiToFaq(payload);
  }

  return mapInputToFaq(id, faqData);
}

export async function deleteFaqInApi(token: string, id: string) {
  const response = await fetch(`${ADMIN_FAQS_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
}

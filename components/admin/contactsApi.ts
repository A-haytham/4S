import type { ContactLead } from "./ContactLeadsList";
import { createAdminApiError } from "./apiError";

type ContactLeadApiItem = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  date: string | null;
};

type ContactLeadsApiResponse = {
  content?: ContactLeadApiItem[];
};

const ADMIN_CONTACTS_API = "/api/admin/contact";

const normalize = (value: string | null | undefined) => value?.trim() ?? "";

const parseJsonSafely = (payload: string) => {
  if (!payload.trim()) {
    return null;
  }

  try {
    return JSON.parse(payload) as unknown;
  } catch {
    return null;
  }
};

const extractItems = (payload: unknown): ContactLeadApiItem[] => {
  if (Array.isArray(payload)) {
    return payload as ContactLeadApiItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as ContactLeadsApiResponse).content)) {
    return (payload as ContactLeadsApiResponse).content ?? [];
  }

  return [];
};

const mapApiToLead = (item: ContactLeadApiItem): ContactLead => ({
  id: item.id,
  name: normalize(item.name),
  email: normalize(item.email),
  phone: normalize(item.phone),
  subject: normalize(item.subject),
  message: normalize(item.message),
  date: normalize(item.date) || new Date().toISOString(),
});

const parseErrorMessage = (payload: unknown, status: number) => {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return `Request failed with status ${status}`;
};

export type CreateContactLeadPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export async function fetchContactsFromApi(token: string) {
  const normalizedToken = token.trim();
  if (!normalizedToken) {
    throw createAdminApiError("Missing auth token.", 401);
  }

  const response = await fetch(ADMIN_CONTACTS_API, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${normalizedToken}`,
    },
  });

  const rawPayload = await response.text();
  const payload = parseJsonSafely(rawPayload);

  if (!response.ok) {
    throw createAdminApiError(parseErrorMessage(payload, response.status), response.status);
  }

  if (!payload) {
    return [];
  }

  return extractItems(payload)
    .map(mapApiToLead)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function createContactLeadInApi(contactData: CreateContactLeadPayload) {
  const response = await fetch(ADMIN_CONTACTS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: normalize(contactData.name),
      email: normalize(contactData.email),
      phone: normalize(contactData.phone),
      subject: normalize(contactData.subject),
      message: normalize(contactData.message),
    }),
  });

  const rawPayload = await response.text();
  const payload = parseJsonSafely(rawPayload);

  if (!response.ok) {
    throw createAdminApiError(parseErrorMessage(payload, response.status), response.status);
  }
}

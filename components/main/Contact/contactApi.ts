type CreateContactLeadPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const CONTACTS_API = "/api/contact";

const parseErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export async function createContactLead(payload: CreateContactLeadPayload) {
  const response = await fetch(CONTACTS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
}

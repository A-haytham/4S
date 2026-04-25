"use client";

export class AdminApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

const AUTH_ERROR_PATTERNS = [
  /unauthorized/i,
  /forbidden/i,
  /invalid token/i,
  /token expired/i,
  /expired token/i,
  /jwt/i,
  /auth token/i,
  /not authenticated/i,
  /authentication is required/i,
  /full authentication/i,
  /login again/i,
  /access denied/i,
  /invalid credentials/i,
];

export const createAdminApiError = (message: string, status?: number) =>
  new AdminApiError(message, status);

export const getAdminErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
};

export const isAdminAuthError = (error: unknown) => {
  if (error instanceof AdminApiError && (error.status === 401 || error.status === 403)) {
    return true;
  }

  const message = error instanceof Error ? error.message : "";
  return AUTH_ERROR_PATTERNS.some((pattern) => pattern.test(message));
};

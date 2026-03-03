"use server";

import { cookies } from "next/headers";

const TOKEN_KEY = "token";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value ?? null;
};

export const setToken = async (value: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: TOKEN_KEY,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: TOKEN_KEY,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
};

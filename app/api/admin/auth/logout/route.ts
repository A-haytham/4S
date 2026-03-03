import { NextResponse } from "next/server";
import { removeToken } from "@/lib/utilities/auth";

export async function POST() {
  await removeToken();
  return NextResponse.json({ success: true });
}

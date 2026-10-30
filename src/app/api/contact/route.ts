import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Please check your note and try again." }, { status: 400 });
  }

  const body = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255 || message.length < 8 || message.length > 3000) {
    return NextResponse.json({ message: "Please check your name, email address and message, then try again." }, { status: 400 });
  }

  try {
    await db.insert(contactRequests).values({ name, email, message });
    return NextResponse.json({ message: "Thanks for reaching out. Your note is with us." });
  } catch {
    return NextResponse.json({ message: "We couldn’t send your note just now. Please try again shortly." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const email = typeof payload === "object" && payload !== null && "email" in payload && typeof payload.email === "string"
    ? payload.email.trim().toLowerCase()
    : "";
  if (email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing({ target: newsletterSubscribers.email });
    return NextResponse.json({ message: "You’re on the list. See you soon." });
  } catch {
    return NextResponse.json({ message: "We couldn’t save that just now. Please try again shortly." }, { status: 500 });
  }
}

import { Resend } from "resend";
import { NextResponse } from "next/server";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY on the server." },
      { status: 500 },
    );
  }

  const eventName =
    process.env.RESEND_WAITLIST_EVENT?.trim() || "email.added";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim()
      : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.events.send({
    event: eventName,
    email,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Resend request failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const, data });
}

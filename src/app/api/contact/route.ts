import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const webhook = process.env.MAKE_WEBHOOK_URL; // TODO: completar con variable de entorno
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        createdAt: new Date().toISOString(),
      }),
    });
  }

  return NextResponse.json({ ok: true });
}

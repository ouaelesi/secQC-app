// app/api/report/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.BLACKLIST_API_URL ?? "http://localhost:3000";
const API_KEY = process.env.BLACKLIST_API_KEY ?? "demo_key_123";

// POST { type, value, description?, city?, evidence?, reporter_contact? }
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const resp = await fetch(`${API_URL}/v1/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (e) {
    console.error("[proxy report] error:", e);
    return NextResponse.json({ error: "Report failed" }, { status: 500 });
  }
}

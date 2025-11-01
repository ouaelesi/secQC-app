// app/api/lookup/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.BLACKLIST_API_URL ?? "http://localhost:3000";
const API_KEY = process.env.BLACKLIST_API_KEY ?? "demo_key_123";

// POST { type, value } -> proxies to /v1/lookup
export async function POST(req: Request) {
  try {
    const { type, value } = await req.json();
    if (!type || !value) {
      return NextResponse.json({ error: "Missing type or value" }, { status: 400 });
    }

    const url = new URL("/v1/lookup", API_URL);
    url.searchParams.set("type", type);
    url.searchParams.set("value", value);

    const resp = await fetch(url.toString(), {
      headers: { "x-api-key": API_KEY },
      // GET to your backend endpoint (uses query params)
      method: "GET",
      cache: "no-store",
    });

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (e: any) {
    console.error("[proxy lookup] error:", e);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
}

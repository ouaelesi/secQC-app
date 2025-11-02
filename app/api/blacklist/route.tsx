// app/api/blacklist/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.BLACKLIST_API_URL ?? "http://localhost:3000";
const API_KEY = process.env.BLACKLIST_API_KEY ?? "demo_key_123";

/**
 * GET /api/blacklist
 * Accepts query params and proxies to your backend:
 *   /v1/blacklist?type=&q=&malicious=&status=&from=&to=&sort=&page=&limit=&format=
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = new URL("/v1/blacklist", API_URL);

    // forward known params
    for (const key of [
      "type", "q", "malicious", "status",
      "from", "to", "sort", "page", "limit", "format"
    ]) {
      const v = searchParams.get(key);
      if (v !== null && v !== "") url.searchParams.set(key, v);
    }

    const resp = await fetch(url.toString(), {
      method: "GET",
      headers: { "x-api-key": API_KEY },
      cache: "no-store",
    });

    // stream CSV directly if requested
    const format = searchParams.get("format");
    if (format === "csv") {
      const text = await resp.text();
      return new NextResponse(text, {
        status: resp.status,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=blacklist.csv",
        },
      });
    }

    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (e) {
    console.error("[proxy blacklist] error:", e);
    return NextResponse.json({ error: "Failed to fetch blacklist" }, { status: 500 });
  }
}

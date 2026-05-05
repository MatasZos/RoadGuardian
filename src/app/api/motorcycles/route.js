import { NextResponse } from "next/server";

export const runtime = "nodejs";

// GET proxies a motorcycle search to the API Ninjas motorcycles endpoint using the make, model and year query params, returning the matching results or a descriptive error
export async function GET(req) {
  const apiKey = process.env.API_NINJAS_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API_NINJAS_KEY environment variable" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);

  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const year = searchParams.get("year") || "";

  // at least one of make or model must be provided to avoid returning the entire database
  if (!make && !model) {
    return NextResponse.json(
      { error: "Either make or model is required" },
      { status: 400 }
    );
  }

  const url = new URL("https://api.api-ninjas.com/v1/motorcycles");

  if (make) url.searchParams.set("make", make);
  if (model) url.searchParams.set("model", model);
  if (year) url.searchParams.set("year", year);

  try {
    const apiRes = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": apiKey,
      },
      cache: "no-store",
    });

    const text = await apiRes.text();

    // safely parse the response body, falling back to the raw text if JSON parsing fails
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!apiRes.ok) {
      return NextResponse.json(
        {
          error: data?.error || "Motorcycles API error",
          details: data,
        },
        { status: apiRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Motorcycles API Route Error:", err);

    return NextResponse.json(
      {
        error: "Server error",
        message: err?.message || String(err),
        name: err?.name,
        // only include stack traces in development to avoid leaking internals in production
        stack:
          process.env.NODE_ENV === "development" ? err?.stack : undefined,
      },
      { status: 500 }
    );
  }
}

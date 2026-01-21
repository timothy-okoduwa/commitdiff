import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});
export async function POST(request: NextRequest) {
    // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  try {
    const { diff } = await request.json();

    if (!diff || typeof diff !== "string") {
      return NextResponse.json(
        { error: "Invalid diff provided" },
        { status: 400 },
      );
    }

    // Optional: Add rate limiting here to prevent abuse
    // You can check IP, add usage limits, etc.

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://commitdiff.dev",
          "X-Title": "CommitDiff CLI",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a senior software engineer.
Analyze the provided git diff and generate:
1. A concise, professional git commit title.
2. A short bullet-point summary of the changes.

Follow conventional commit style when possible.
Avoid vague phrases like "update stuff".
Output in JSON with fields: title, summary.`,
            },
            {
              role: "user",
              content: `Generate a commit message for this diff:\n\n${diff}`,
            },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: "Failed to generate commit message" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return NextResponse.json({
      title: parsed.title || parsed.message || "Update code",
      summary: parsed.summary || parsed.description || "No summary available",
    });
  } catch (error) {
    console.error("Error generating commit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

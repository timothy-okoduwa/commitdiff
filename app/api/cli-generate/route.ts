// app/api/cli-generate/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { diff } = await request.json();

    if (!diff || typeof diff !== "string") {
      return NextResponse.json(
        { error: "Invalid diff provided" },
        { status: 400 },
      );
    }

    if (!OPENROUTER_API_KEY) {
      console.error("❌ OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured. Please contact support." },
        { status: 500 },
      );
    }

    console.log("📡 Calling OpenRouter API with DeepSeek...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://commitdiff.vercel.app",
          "X-Title": "CommitDiff CLI",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
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
      console.error("❌ OpenRouter API error:", error);
      return NextResponse.json(
        {
          error: `AI service error: ${response.status}`,
          details: error,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("❌ Unexpected API response:", data);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 500 },
      );
    }

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    console.log("✅ Successfully generated commit message");

    return NextResponse.json({
      title: parsed.title || parsed.message || "Update code",
      summary: parsed.summary || parsed.description || "No summary available",
    });
  } catch (error) {
    console.error("❌ Error generating commit:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

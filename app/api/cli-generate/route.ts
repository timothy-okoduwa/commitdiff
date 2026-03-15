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
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

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
          model: "deepseek/deepseek-chat", // ✨ FREE DeepSeek model (was: openai/gpt-4o-mini)
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

// ============================================================================
// ALSO UPDATE: app/api/generate/route.ts (for the web interface)
// ============================================================================

// app/api/generate/route.ts
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

    if (diff.length > 50000) {
      return NextResponse.json(
        { error: "Diff too large (max 50KB)" },
        { status: 400 },
      );
    }

    if (!OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://commitdiff.dev",
          "X-Title": "CommitDiff",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat", // ✨ FREE DeepSeek model
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

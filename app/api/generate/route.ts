import { NextRequest, NextResponse } from "next/server";
import { generateCommitMessage } from "@/lib/openrouter";

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

    const result = await generateCommitMessage(diff);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

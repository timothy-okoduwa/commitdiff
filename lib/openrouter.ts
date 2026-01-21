export interface CommitMessage {
  title: string;
  summary: string;
}

export async function generateCommitMessage(
  diff: string,
): Promise<CommitMessage> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://commitdiff.dev",
        "X-Title": "CommitDiff",
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
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  const parsed = JSON.parse(content);

  return {
    title: parsed.title || parsed.message || "Update code",
    summary: parsed.summary || parsed.description || "No summary available",
  };
}

#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const child_process_1 = require("child_process");
// Default API key - users can override with their own if they want
const DEFAULT_API_KEY = "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"; // Replace with your actual API key
async function generateCommitMessage(diff) {
    // Use environment variable if provided, otherwise fall back to default
    const apiKey = process.env.OPENROUTER_API_KEY || DEFAULT_API_KEY;
    if (!apiKey ||
        apiKey ===
            "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") {
        throw new Error("API key not configured. Please contact the developer.");
    }
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }
    const data = (await response.json());
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    return {
        title: parsed.title || parsed.message || "Update code",
        summary: parsed.summary || parsed.description || "No summary available",
    };
}
function getStagedDiff() {
    try {
        return (0, child_process_1.execSync)("git diff --staged", { encoding: "utf-8" });
    }
    catch (error) {
        throw new Error("Failed to get git diff. Are you in a git repository?");
    }
}
const program = new commander_1.Command();
program
    .name("commitdiff")
    .description("AI-powered git commit message generator")
    .version("1.0.0");
program
    .option("--commit", "Automatically commit with generated message")
    .option("--style <type>", "Commit style: conventional | short | detailed", "conventional")
    .action(async (options) => {
    try {
        console.log("🔍 Analyzing staged changes...\n");
        const diff = getStagedDiff();
        if (!diff.trim()) {
            console.log("⚠️  No staged changes found.");
            console.log("💡 Stage your changes first: git add <files>");
            process.exit(1);
        }
        console.log("🤖 Generating commit message with AI...\n");
        const result = await generateCommitMessage(diff);
        console.log("✨ Generated Commit Message:\n");
        console.log(`📝 ${result.title}\n`);
        console.log("Summary:");
        console.log(result.summary);
        console.log("\n" + "─".repeat(60) + "\n");
        console.log("💻 To commit with this message, run:");
        console.log(`\x1b[32mgit commit -m "${result.title}"\x1b[0m`);
        console.log("");
        if (options.commit) {
            console.log("🚀 Auto-committing...");
            (0, child_process_1.execSync)(`git commit -m "${result.title.replace(/"/g, '\\"')}"`, {
                stdio: "inherit",
            });
            console.log("✅ Committed successfully!");
        }
    }
    catch (error) {
        console.error("❌ Error:", error instanceof Error ? error.message : "Unknown error");
        process.exit(1);
    }
});
program.parse();

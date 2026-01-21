#!/usr/bin/env node

import { Command } from "commander";
import { execSync } from "child_process";

// This will point to your deployed backend
const API_ENDPOINT = "https://commitdiff.vercel.app/api/cli-generate";

interface CommitMessage {
  title: string;
  summary: string;
}

async function generateCommitMessage(diff: string): Promise<CommitMessage> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diff }),
    });

    if (!response.ok) {
      const error = (await response
        .json()
        .catch(() => ({ error: "Unknown error" }))) as { error?: string };
      throw new Error(error.error || `API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      title?: string;
      summary?: string;
    };

    return {
      title: data.title || "Update code",
      summary: data.summary || "No summary available",
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate commit message: ${error.message}`);
    }
    throw new Error("Failed to generate commit message");
  }
}

function getStagedDiff(): string {
  try {
    return execSync("git diff --staged", { encoding: "utf-8" });
  } catch (error) {
    throw new Error("Failed to get git diff. Are you in a git repository?");
  }
}

const program = new Command();

program
  .name("commitdiff")
  .description("AI-powered git commit message generator")
  .version("1.0.0");

program
  .option("--commit", "Automatically commit with generated message")
  .option(
    "--style <type>",
    "Commit style: conventional | short | detailed",
    "conventional",
  )
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
        execSync(`git commit -m "${result.title.replace(/"/g, '\\"')}"`, {
          stdio: "inherit",
        });
        console.log("✅ Committed successfully!");
      }
    } catch (error) {
      console.error(
        "❌ Error:",
        error instanceof Error ? error.message : "Unknown error",
      );
      process.exit(1);
    }
  });

program.parse();

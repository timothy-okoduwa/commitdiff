#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// packages/cli/src/index.ts
const commander_1 = require("commander");
const child_process_1 = require("child_process");
// Import package.json - works with CommonJS
const packageJson = require("../package.json");
const API_ENDPOINT = "https://commitdiff.vercel.app/api/cli-generate";
async function generateCommitMessage(diff) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ diff }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("API Response:", errorText);
            let error;
            try {
                error = JSON.parse(errorText);
            }
            catch {
                error = { error: errorText || "Unknown error" };
            }
            const errorMessage = error.error || `API error: ${response.status}`;
            throw new Error(String(errorMessage));
        }
        const data = (await response.json());
        return {
            title: data.title || "Update code",
            summary: data.summary || "No summary available",
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to generate commit message: ${error.message}`);
        }
        throw new Error("Failed to generate commit message");
    }
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
    .version(packageJson.version);
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
        console.log("🤖 Generating commit message with DeepSeek AI (FREE)...\n");
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

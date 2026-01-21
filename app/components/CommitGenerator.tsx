"use client";

import { useState } from "react";

interface CommitResult {
  title: string;
  summary: string;
}

export default function CommitGenerator() {
  const [diff, setDiff] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CommitResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!diff.trim()) {
      setError("Please paste a git diff");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diff }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate commit message");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <label className="block text-sm font-medium mb-3 text-gray-300">
          Paste your git diff
        </label>
        <textarea
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          placeholder="git diff --staged"
          className="w-full h-64 bg-black text-gray-100 rounded-lg p-4 font-mono text-sm border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? "Generating..." : "Generate Commit Message"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Commit Message
              </h3>
              <p className="text-lg font-semibold text-blue-400 font-mono">
                {result.title}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="ml-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Summary</h3>
            <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
              {result.summary}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Quick commit command:</p>
            <code className="block bg-black p-3 rounded text-sm text-green-400 overflow-x-auto">
              git commit -m "{result.title}"
            </code>
          </div>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import CommitGenerator from "./components/CommitGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-blue-300">
                AI-Powered Developer Tool
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="block">Write Better</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Git Commits
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop wasting time writing commit messages. Let AI analyze your
              code changes and generate professional, conventional commits in
              seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="#try-now"
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10">Try It Now →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <a
                href="https://github.com/yourusername/commitdiff"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Star on GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">10x</div>
                <div className="text-sm text-gray-500">Faster Commits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  100%
                </div>
                <div className="text-sm text-gray-500">Conventional</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-1">AI</div>
                <div className="text-sm text-gray-500">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is CommitDiff? */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                What is <span className="text-blue-400">CommitDiff</span>?
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            </div>

            <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">CommitDiff</strong> is an
                AI-powered developer tool that automatically generates
                meaningful, professional git commit messages by analyzing your
                code changes. No more staring at the terminal wondering what to
                write.
              </p>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🎯 Who is this for?
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>
                      <strong>Developers</strong> who want consistent,
                      professional commit messages
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>
                      <strong>Teams</strong> maintaining clean git histories
                      across projects
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>
                      <strong>Open source maintainers</strong> enforcing
                      conventional commit standards
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <span>
                      <strong>Anyone</strong> who's tired of writing "fix stuff"
                      or "update code"
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-800/30 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-blue-400 mb-3">
                    The Problem
                  </h4>
                  <p className="text-gray-400">
                    Writing good commit messages is time-consuming and
                    inconsistent. Most developers default to vague messages that
                    don't help future code reviews.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-900/20 to-transparent border border-green-800/30 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-green-400 mb-3">
                    The Solution
                  </h4>
                  <p className="text-gray-400">
                    CommitDiff analyzes your actual code changes with AI and
                    generates professional, conventional commits that accurately
                    describe what changed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-gray-400">
                Three simple steps to better commits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-900/30 to-gray-900 border border-blue-800/30 rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Stage Changes</h3>
                  <p className="text-gray-400">
                    Stage your code changes with{" "}
                    <code className="bg-black px-2 py-1 rounded text-blue-400">
                      git add
                    </code>
                    like you normally would. CommitDiff reads your staged diff.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-800/30 rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AI Analysis</h3>
                  <p className="text-gray-400">
                    Our AI analyzes your diff, understanding what changed, why,
                    and how to describe it following conventional commit
                    standards.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-pink-900/30 to-gray-900 border border-pink-800/30 rounded-2xl p-8 h-full">
                  <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-6">
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Commit</h3>
                  <p className="text-gray-400">
                    Get a professional commit message you can use immediately.
                    Copy it or auto-commit with one command.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Now Section */}
      <section
        id="try-now"
        className="py-24 bg-gradient-to-b from-gray-950 to-black"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6">Try It Now</h2>
              <p className="text-xl text-gray-400">
                Paste your git diff and see the magic happen
              </p>
            </div>

            <CommitGenerator />
          </div>
        </div>
      </section>

      {/* Installation & Usage */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">Getting Started</h2>
              <p className="text-xl text-gray-400">
                Choose your preferred method
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* CLI Method */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">CLI Tool</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">
                      1. Install Dependencies
                    </h4>
                    <div className="bg-black rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-400">
                        npm install -g commitdiff
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">
                      2. Set API Key
                    </h4>
                    <div className="bg-black rounded-lg p-4 font-mono text-sm space-y-2">
                      <code className="text-gray-400"># Create .env file</code>
                      <br />
                      <code className="text-green-400">
                        echo "OPENROUTER_API_KEY=your_key" &gt; .env
                      </code>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">
                      3. Use It
                    </h4>
                    <div className="bg-black rounded-lg p-4 font-mono text-sm space-y-2">
                      <code className="text-gray-400">
                        # Stage your changes
                      </code>
                      <br />
                      <code className="text-green-400">git add .</code>
                      <br />
                      <br />
                      <code className="text-gray-400">
                        # Generate commit message
                      </code>
                      <br />
                      <code className="text-green-400">npx commitdiff</code>
                      <br />
                      <br />
                      <code className="text-gray-400"># Or auto-commit</code>
                      <br />
                      <code className="text-green-400">
                        npx commitdiff --commit
                      </code>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 text-blue-400">
                      Available Options:
                    </h5>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>
                        <code className="text-blue-400">--commit</code> -
                        Auto-commit with generated message
                      </li>
                      <li>
                        <code className="text-blue-400">--style</code> - Choose
                        style: conventional | short | detailed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Web Method */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Web Interface</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">
                      1. Get Your Diff
                    </h4>
                    <div className="bg-black rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-400">git diff --staged</code>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Copy the output to your clipboard
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">
                      2. Paste & Generate
                    </h4>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>Visit the "Try It Now" section above</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>Paste your diff in the text area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">→</span>
                        <span>Click "Generate Commit Message"</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">
                      3. Copy & Use
                    </h4>
                    <p className="text-gray-400 mb-3">
                      The AI will generate a professional commit message with a
                      summary. Click the "Copy" button and use it:
                    </p>
                    <div className="bg-black rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-400">
                        git commit -m "your_message_here"
                      </code>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 text-purple-400">
                      💡 Pro Tips:
                    </h5>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Works with any git repository</li>
                      <li>• No installation required</li>
                      <li>• Instant results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                Why Choose CommitDiff?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-700 transition-colors">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-gray-400">
                  Generate commit messages in under 2 seconds. No more thinking
                  or typing.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-700 transition-colors">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Conventional Commits</h3>
                <p className="text-gray-400">
                  Follows conventional commit standards automatically for
                  consistent history.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-700 transition-colors">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-3">AI-Powered</h3>
                <p className="text-gray-400">
                  Uses GPT-4o-mini to understand your code changes contextually.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-700 transition-colors">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                <p className="text-gray-400">
                  Your code diffs are processed securely and never stored.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-700 transition-colors">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold mb-3">Dual Interface</h3>
                <p className="text-gray-400">
                  Use from terminal or browser. Whatever fits your workflow.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-700 transition-colors">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-bold mb-3">Open Source</h3>
                <p className="text-gray-400">
                  Free and open source. Contribute or customize as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                  How does CommitDiff work?
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  CommitDiff uses OpenRouter's API to access GPT-4o-mini. When
                  you provide a git diff, the AI analyzes the code changes,
                  understands the context, and generates a conventional commit
                  message that accurately describes what changed and why.
                </p>
              </details>

              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                  Is my code safe?
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  Yes. Your git diffs are sent to OpenRouter for processing but
                  are never stored. The API processes your request and returns
                  the commit message immediately. No data is retained after
                  generation.
                </p>
              </details>

              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                  Do I need an API key?
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  Yes. You need an OpenRouter API key. Get one free at{" "}
                  <a
                    href="https://openrouter.ai"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    openrouter.ai
                  </a>
                  . Set it in your .env file or environment variables.
                </p>
              </details>

              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                  Can I customize the commit style?
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  Yes! Use the{" "}
                  <code className="bg-black px-2 py-1 rounded text-blue-400">
                    --style
                  </code>{" "}
                  flag in the CLI to choose between conventional, short, or
                  detailed formats. The default follows conventional commit
                  standards.
                </p>
              </details>

              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                  Does it work with all programming languages?
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  Yes! CommitDiff works with any programming language because it
                  analyzes git diffs, not the code itself. Whether you're
                  writing Python, JavaScript, Go, Rust, or anything else, it
                  works the same way.
                </p>
              </details>

              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
                <summary className="text-xl font-semibold cursor-pointer list-none flex justify-between items-center">
                  Is it free?
                  <span className="text-2xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  The tool itself is free and open source. You only pay for
                  OpenRouter API usage, which uses GPT-4o-mini (one of the
                  cheapest models). Most developers spend less than $1/month on
                  API costs.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Write Better Commits?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join developers who've automated their commit messages
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#try-now"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              >
                Try It Free →
              </Link>

              <a
                href="https://github.com/yourusername/commitdiff"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl font-semibold text-lg transition-all"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="col-span-2">
                <h3 className="text-2xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    CommitDiff
                  </span>
                </h3>
                <p className="text-gray-400 mb-4">
                  AI-powered git commit message generator. Write better commits
                  in seconds.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/yourusername/commitdiff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="#try-now"
                      className="hover:text-white transition-colors"
                    >
                      Try It Now
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername/commitdiff"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername/commitdiff/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Report Issues
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://openrouter.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Get API Key
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="https://www.conventionalcommits.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Conventional Commits
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername/commitdiff/blob/main/CONTRIBUTING.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Contributing
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername/commitdiff/blob/main/LICENSE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      License
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yourusername/commitdiff/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Changelog
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} CommitDiff. Open source under MIT
                License.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms
                </a>
                <a
                  href="mailto:hello@commitdiff.com"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

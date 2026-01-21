# CommitDiff CLI

[![npm version](https://img.shields.io/npm/v/commitdiff.svg)](https://www.npmjs.com/package/commitdiff)
[![npm downloads](https://img.shields.io/npm/dm/commitdiff.svg)](https://www.npmjs.com/package/commitdiff)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AI-powered git commit message generator for your terminal.**

Stop wasting time writing commit messages. Let AI analyze your code changes and generate professional, conventional commits in seconds.

---

## 🚀 Quick Start

### Installation

```bash
# Install globally
npm install -g commitdiff

# Or use with npx (no installation required)
npx commitdiff
```

### Usage

```bash
# Stage your changes
git add .

# Generate commit message
commitdiff

# Or auto-commit with the generated message
commitdiff --commit
```

That's it! CommitDiff will analyze your staged changes and generate a professional commit message.

---

## 📖 Features

- ⚡ **Lightning Fast** - Generate commit messages in under 2 seconds
- 🎯 **Conventional Commits** - Follows conventional commit standards automatically
- 🤖 **AI-Powered** - Uses GPT-4o-mini to understand your code changes
- 🔒 **Privacy First** - Your code is never stored, only processed
- 💻 **Zero Config** - Works out of the box, no setup required
- 🌐 **Language Agnostic** - Works with any programming language

---

## 🔧 Commands & Options

### Basic Command

```bash
commitdiff [options]
```

### Options

| Option           | Description                                 | Default |
| ---------------- | ------------------------------------------- | ------- |
| `--commit`       | Automatically commit with generated message | `false` |
| `--style <type>` | Commit style:`conventional`                 | `short` |
| `-V, --version`  | Output the version number                   | -       |
| `-h, --help`     | Display help for command                    | -       |

### Examples

```bash
# Generate a conventional commit message
commitdiff

# Generate and auto-commit
commitdiff --commit

# Use detailed commit style
commitdiff --style detailed

# Use short commit style
commitdiff --style short
```

---

## 📝 Example Output

### Input (your staged changes)

```bash
git add src/auth.ts
commitdiff
```

### Output

```
🔍 Analyzing staged changes...

🤖 Generating commit message with AI...

✨ Generated Commit Message:

📝 feat(auth): add JWT token validation middleware

Summary:
• Implemented JWT token verification in auth middleware
• Added error handling for expired and invalid tokens
• Updated authentication flow to use new validation

────────────────────────────────────────────────────────────

💻 To commit with this message, run:
git commit -m "feat(auth): add JWT token validation middleware"
```

---

## 🎯 How It Works

1. **Stage your changes** - Use `git add` to stage the files you want to commit
2. **Run commitdiff** - The CLI reads your staged diff and sends it to our AI
3. **Get your message** - Receive a professional, conventional commit message
4. **Commit** - Use the generated message or auto-commit with `--commit`

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  git add    │ ───> │ commitdiff  │ ───> │ AI Analysis │
│  (stage)    │      │   (reads)   │      │  (generate) │
└─────────────┘      └─────────────┘      └─────────────┘
                                                  │
                                                  v
                                          ┌─────────────┐
                                          │ git commit  │
                                          │  (apply)    │
                                          └─────────────┘
```

---

## 🔐 Privacy & Security

- **No Storage** - Your code diffs are never stored on our servers
- **Secure Processing** - All requests use HTTPS encryption
- **No Tracking** - We don't track or analyze your code
- **Open Source** - Full transparency, [view the code](https://github.com/timothy-okoduwa/commitdiff)

---

## 💡 Tips & Best Practices

### 1. **Stage Meaningful Changes**

```bash
# Good - stage related changes together
git add src/auth/ tests/auth.test.ts

# Avoid - staging everything at once
git add .  # Only if changes are related
```

### 2. **Review Before Committing**

Always review the generated message before committing. The AI is smart, but you know your code best.

### 3. **Use Auto-commit Wisely**

```bash
# Use auto-commit for quick iterations
commitdiff --commit

# But review important changes manually
commitdiff  # then copy and edit if needed
```

### 4. **Combine with Git Hooks**

Add commitdiff to your git hooks for team consistency:

```bash
# .git/hooks/prepare-commit-msg
#!/bin/bash
commitdiff > .git/COMMIT_EDITMSG
```

---

## 🌐 Web Interface

Prefer a web interface? Try our online version at [commitdiff.vercel.app](https://commitdiff.vercel.app/)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs** - [Open an issue](https://github.com/timothy-okoduwa/commitdiff/issues)
2. **Suggest Features** - [Request a feature](https://github.com/timothy-okoduwa/commitdiff/issues)
3. **Submit PRs** - [Contributing guide](https://github.com/timothy-okoduwa/commitdiff/blob/main/CONTRIBUTING.md)

---

## 📚 Related Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [GitHub Repository](https://github.com/timothy-okoduwa/commitdiff)
- [Full Documentation](https://github.com/timothy-okoduwa/commitdiff#readme)
- [Report Issues](https://github.com/timothy-okoduwa/commitdiff/issues)

---

## 📋 Requirements

- Node.js 18.0.0 or higher
- Git installed and configured
- Active internet connection (for AI processing)

---

## ❓ FAQ

<details>
<summary><strong>Does this work offline?</strong></summary>
No, CommitDiff requires an internet connection to process your diffs using AI. We're exploring offline options for future releases.

</details>
<details>
<summary><strong>What if I don't like the generated message?</strong></summary>
Just run `commitdiff` again, or edit the message manually before committing. You're always in control.

</details>
<details>
<summary><strong>Does it support custom commit formats?</strong></summary>
Currently, we support conventional, short, and detailed styles. Custom templates are on our roadmap!

</details>
<details>
<summary><strong>Is there a rate limit?</strong></summary>
Yes, there's a rate limit of 10 requests per 10 seconds per IP to prevent abuse. This is more than enough for normal usage.

</details>
<details>
<summary><strong>Can I use this in CI/CD?</strong></summary>
While possible, CommitDiff is designed for interactive use. For CI/CD, consider using conventional commit linters instead.

## </details>

## 🐛 Troubleshooting

### "No staged changes found"

```bash
# Make sure you've staged your changes first
git add <files>
```

### "Failed to generate commit message"

- Check your internet connection
- Verify you're in a git repository
- Try again (rate limit may have been hit)

### "Command not found: commitdiff"

```bash
# Reinstall globally
npm install -g commitdiff

# Or use npx
npx commitdiff
```

---

## 📄 License

MIT License - see [LICENSE](https://github.com/timothy-okoduwa/commitdiff/blob/main/LICENSE) for details.

---

## 👨‍💻 Author

**Timothy Okoduwa**

- Twitter: [@timothyokoduwa](https://twitter.com/timothyokoduwa)
- GitHub: [@timothy-okoduwa](https://github.com/timothy-okoduwa)
- Website: [commitdiff.vercel.app](https://commitdiff.vercel.app/)

---

<div align="center">
**Made with ❤️ for developers who value their time**

⭐ [Star on GitHub](https://github.com/timothy-okoduwa/commitdiff) • 🐦 [Follow on Twitter](https://twitter.com/timothyokoduwa) • 🌐 [Try Online](https://commitdiff.vercel.app/)

</div>

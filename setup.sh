#!/bin/bash

# CommitDiff - One-command setup
mkdir -p commitdiff/{apps/web/{app/{api/generate,components},public,styles},packages/cli/src,shared} && \
cd commitdiff && \

# Root package.json
cat > package.json << 'EOF'
{
  "name": "commitdiff",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=apps/web",
    "build": "npm run build --workspace=apps/web",
    "start": "npm run start --workspace=apps/web",
    "cli": "npm run dev --workspace=packages/cli"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "typescript": "^5.3.3"
  }
}
EOF

# .env.example
cat > .env.example << 'EOF'
OPENROUTER_API_KEY=your_api_key_here
EOF

# .gitignore
cat > .gitignore << 'EOF'
node_modules
.next
.env
.env.local
dist
*.log
.DS_Store
EOF

# Shared OpenRouter client
cat > shared/openrouter.ts << 'EOF'
export interface CommitMessage {
  title: string;
  summary: string;
}

export async function generateCommitMessage(diff: string): Promise<CommitMessage> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://commitdiff.dev',
      'X-Title': 'CommitDiff'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a senior software engineer.
Analyze the provided git diff and generate:
1. A concise, professional git commit title.
2. A short bullet-point summary of the changes.

Follow conventional commit style when possible.
Avoid vague phrases like "update stuff".
Output in JSON with fields: title, summary.`
        },
        {
          role: 'user',
          content: `Generate a commit message for this diff:\n\n${diff}`
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  const parsed = JSON.parse(content);

  return {
    title: parsed.title || parsed.message || 'Update code',
    summary: parsed.summary || parsed.description || 'No summary available'
  };
}
EOF

# Web App - package.json
cat > apps/web/package.json << 'EOF'
{
  "name": "@commitdiff/web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
EOF

# Next.js config
cat > apps/web/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@commitdiff/shared']
}

module.exports = nextConfig
EOF

# TypeScript config
cat > apps/web/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/shared/*": ["../../shared/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Tailwind config
cat > apps/web/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#2a2a2a',
        }
      }
    },
  },
  plugins: [],
}
EOF

# PostCSS config
cat > apps/web/postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Global styles
cat > apps/web/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground: #ffffff;
  --background: #0a0a0a;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
EOF

# Root layout
cat > apps/web/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CommitDiff - AI-Powered Git Commit Messages',
  description: 'Generate meaningful git commit messages with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOF

# Main page
cat > apps/web/app/page.tsx << 'EOF'
import CommitGenerator from './components/CommitGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            CommitDiff
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI-powered git commit messages. Paste your diff, get professional commits instantly.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <code className="px-4 py-2 bg-dark-700 rounded-lg text-sm text-blue-400">
              npx commitdiff
            </code>
            <span className="text-gray-500">or use the web app below</span>
          </div>
        </div>

        {/* Main Generator */}
        <CommitGenerator />

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-dark-800 rounded-xl border border-dark-600">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400 text-sm">
              Uses GPT-4o-mini via OpenRouter to analyze your code changes intelligently
            </p>
          </div>
          <div className="p-6 bg-dark-800 rounded-xl border border-dark-600">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">CLI & Web</h3>
            <p className="text-gray-400 text-sm">
              Use from terminal or browser. Integrates seamlessly into your workflow
            </p>
          </div>
          <div className="p-6 bg-dark-800 rounded-xl border border-dark-600">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-2">Conventional</h3>
            <p className="text-gray-400 text-sm">
              Follows conventional commit standards for clean git history
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
EOF

# Commit Generator Component
cat > apps/web/app/components/CommitGenerator.tsx << 'EOF'
'use client'

import { useState } from 'react'

interface CommitResult {
  title: string
  summary: string
}

export default function CommitGenerator() {
  const [diff, setDiff] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CommitResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!diff.trim()) {
      setError('Please paste a git diff')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate commit message')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.title)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
        <label className="block text-sm font-medium mb-3 text-gray-300">
          Paste your git diff
        </label>
        <textarea
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          placeholder="git diff --staged"
          className="w-full h-64 bg-dark-900 text-gray-100 rounded-lg p-4 font-mono text-sm border border-dark-600 focus:border-blue-500 focus:outline-none resize-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Commit Message'}
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
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Commit Message</h3>
              <p className="text-lg font-semibold text-blue-400 font-mono">{result.title}</p>
            </div>
            <button
              onClick={handleCopy}
              className="ml-4 px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Summary</h3>
            <div className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
              {result.summary}
            </div>
          </div>

          <div className="pt-4 border-t border-dark-600">
            <p className="text-xs text-gray-500 mb-2">Quick commit command:</p>
            <code className="block bg-dark-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              git commit -m "{result.title}"
            </code>
          </div>
        </div>
      )}
    </div>
  )
}
EOF

# API Route
cat > apps/web/app/api/generate/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server'
import { generateCommitMessage } from '../../../../../shared/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { diff } = await request.json()

    if (!diff || typeof diff !== 'string') {
      return NextResponse.json(
        { error: 'Invalid diff provided' },
        { status: 400 }
      )
    }

    if (diff.length > 50000) {
      return NextResponse.json(
        { error: 'Diff too large (max 50KB)' },
        { status: 400 }
      )
    }

    const result = await generateCommitMessage(diff)

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
EOF

# CLI Package - package.json
cat > packages/cli/package.json << 'EOF'
{
  "name": "commitdiff",
  "version": "1.0.0",
  "description": "AI-powered git commit message generator",
  "main": "dist/index.js",
  "bin": {
    "commitdiff": "./dist/index.js"
  },
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "keywords": ["git", "commit", "ai", "cli"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "commander": "^12.0.0",
    "dotenv": "^16.4.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
EOF

# CLI TypeScript config
cat > packages/cli/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# CLI Main File
cat > packages/cli/src/index.ts << 'EOF'
#!/usr/bin/env node

import { Command } from 'commander'
import { execSync } from 'child_process'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

interface CommitMessage {
  title: string
  summary: string
}

async function generateCommitMessage(diff: string): Promise<CommitMessage> {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not found. Set it in your .env file or environment.')
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://commitdiff.dev',
      'X-Title': 'CommitDiff'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a senior software engineer.
Analyze the provided git diff and generate:
1. A concise, professional git commit title.
2. A short bullet-point summary of the changes.

Follow conventional commit style when possible.
Avoid vague phrases like "update stuff".
Output in JSON with fields: title, summary.`
        },
        {
          role: 'user',
          content: `Generate a commit message for this diff:\n\n${diff}`
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  const content = data.choices[0].message.content
  const parsed = JSON.parse(content)

  return {
    title: parsed.title || parsed.message || 'Update code',
    summary: parsed.summary || parsed.description || 'No summary available'
  }
}

function getStagedDiff(): string {
  try {
    return execSync('git diff --staged', { encoding: 'utf-8' })
  } catch (error) {
    throw new Error('Failed to get git diff. Are you in a git repository?')
  }
}

const program = new Command()

program
  .name('commitdiff')
  .description('AI-powered git commit message generator')
  .version('1.0.0')

program
  .option('--commit', 'Automatically commit with generated message')
  .option('--style <type>', 'Commit style: conventional | short | detailed', 'conventional')
  .action(async (options) => {
    try {
      console.log('🔍 Analyzing staged changes...\n')

      const diff = getStagedDiff()

      if (!diff.trim()) {
        console.log('⚠️  No staged changes found.')
        console.log('💡 Stage your changes first: git add <files>')
        process.exit(1)
      }

      console.log('🤖 Generating commit message with AI...\n')

      const result = await generateCommitMessage(diff)

      console.log('✨ Generated Commit Message:\n')
      console.log(`📝 ${result.title}\n`)
      console.log('Summary:')
      console.log(result.summary)
      console.log('\n' + '─'.repeat(60) + '\n')
      
      console.log('💻 To commit with this message, run:')
      console.log(`\x1b[32mgit commit -m "${result.title}"\x1b[0m`)
      console.log('')

      if (options.commit) {
        console.log('🚀 Auto-committing...')
        execSync(`git commit -m "${result.title.replace(/"/g, '\\"')}"`, { stdio: 'inherit' })
        console.log('✅ Committed successfully!')
      }
    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })

program.parse()
EOF

# README
cat > README.md << 'EOF'
# 🚀 CommitDiff

AI-powered git commit message generator using OpenRouter.

## Features

- 🤖 **AI-Powered**: Uses GPT-4o-mini to analyze code diffs
- ⚡ **Dual Interface**: Web app and CLI tool
- 📝 **Conventional Commits**: Follows best practices
- 🔥 **Fast**: Generates messages in seconds

## Quick Start

### 1. Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your OpenRouter API key
echo "OPENROUTER_API_KEY=your_key_here" > .env
```

Get your API key from [OpenRouter](https://openrouter.ai/)

### 2. Web App

```bash
npm run dev
```

Visit `http://localhost:3000`

### 3. CLI Tool

```bash
# Stage your changes
git add .

# Generate commit message
npm run cli

# Or install globally
cd packages/cli
npm link
commitdiff
```

## CLI Usage

```bash
# Basic usage
commitdiff

# Auto-commit
commitdiff --commit

# Specify style
commitdiff --style conventional
```

## Project Structure

```
commitdiff/
├── apps/web/          # Next.js web app
├── packages/cli/      # CLI tool
├── shared/            # Shared OpenRouter client
└── .env               # API keys
```

## API Integration

Uses OpenRouter with:
- Model: `openai/gpt-4o-mini`
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- JSON response format

## Development

```bash
# Start web app
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test CLI
npm run cli
```

## Environment Variables

```
OPENROUTER_API_KEY=your_api_key_here
```

## Publishing CLI

```bash
cd packages/cli
npm publish
```

Then users can install with:
```bash
npm install -g commitdiff
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenRouter API
- Commander.js

## License

MIT

---

Built with ❤️ using OpenRouter AI
EOF

echo "✅ CommitDiff project structure created successfully!"
echo ""
echo "Next steps:"
echo "1. cd commitdiff"
echo "2. npm install"
echo "3. cp .env.example .env"
echo "4. Add your OPENROUTER_API_KEY to .env"
echo "5. npm run dev (web) or npm run cli (terminal)"
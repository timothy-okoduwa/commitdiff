# CommitDiff

AI-powered git commit message generator. Write better commits in seconds.

## Installation

```bash
npm install -g commitdiff
```

## Usage

```bash
# Stage your changes
git add .

# Generate commit message
commitdiff

# Or auto-commit
commitdiff --commit
```

## Features

- ⚡ Lightning fast - generates commits in under 2 seconds
- 🎯 Conventional commits - follows best practices automatically
- 🤖 AI-powered - uses GPT-4o-mini to understand your changes
- 💻 Free to use - no API key required

## Options

- `--commit` - Automatically commit with generated message
- `--style <type>` - Commit style: conventional | short | detailed (default: conventional)

## Examples

```bash
# Basic usage
git add .
commitdiff

# Auto-commit
git add .
commitdiff --commit

# Different style
git add .
commitdiff --style detailed
```

## Learn More

- [Website](https://commitdiff.vercel.app)
- [GitHub](https://github.com/timothy-okoduwa/commitdiff)

## License

MIT

# DevLens

> A single-file browser tool that audits any GitHub repo or codebase for security vulnerabilities, bugs, dead code, and architectural issues — no install, no server, no cost.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Made with: Vanilla JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e.svg?logo=javascript&logoColor=black)](#)
[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen.svg)](#)
[![Free tier: Gemini + Groq](https://img.shields.io/badge/Free%20tier-Gemini%20%2B%20Groq-4285F4.svg)](#ai-setup)
![Keys](https://img.shields.io/badge/API_keys-yours_only-green)

## What it does

Most code-audit tools demand an install, a CI pipeline, an account, or a credit card before they tell you anything. DevLens is one HTML file: open it, point it at a repository, and read the report. It maps how untrusted input flows into dangerous sinks, checks whether every route is actually protected, untangles spaghetti dependencies, and surfaces the bugs a linter never catches — then explains each finding at the depth you ask for.

It speaks four audiences from the same analysis: **vibe coders** who want a plain-English "what's broken and how do I paste the fix," **junior devs** who want to learn *why* it matters, **senior devs** who want root cause, blast radius, and trade-offs, and **bug bounty hunters** who want a CVSS-tagged report with a proof-of-concept. Static analysis is deterministic and runs with zero keys; the AI layer is optional and bring-your-own-key.

## Live demo

**[kartikeyrawat15.github.io/devlens](https://kartikeyrawat15.github.io/devlens)**

**No signup. No install. Open and analyze.**

## Features

<table>
<tr>
<th align="left">🔬 Analysis engines</th>
<th align="left">🤖 AI layer</th>
<th align="left">📤 Output</th>
</tr>
<tr valign="top">
<td>

- Data-flow taint tracking
- Auth coverage matrix
- IDOR detection
- Spaghetti detector
- Dead-code finder
- Python + JS/TS rules
- CVE reachability

</td>
<td>

- 3-model loop
- Gemini generates
- DeepSeek validates
- Groq tiebreaks
- Confidence scores
- Self-critique loop
- BYOK support

</td>
<td>

- 4 audience modes
- Vibe / Junior
- Senior / Bounty
- Quick Wins list
- Blast-radius map
- PDF export
- WHERE-IS-X search

</td>
</tr>
</table>

## How it works

```
INPUT (GitHub URL / zip / files)
  ↓
FINGERPRINT   — detects language, framework, auth pattern
  ↓
STATIC MAPS   — symbol table, call graph, import graph
  ↓
TAINT TRACK   — follows user input to dangerous sinks
  ↓
AUTH MATRIX   — maps every route to its auth coverage
  ↓
PATTERN ENGINE — 50+ rules, 100% confidence, no AI needed
  ↓
AI LOOP       — Gemini → DeepSeek validates → retry if <85%
  ↓
CORRELATE     — merge, dedupe, score by impact × confidence
  ↓
OUTPUT        — 4 modes, Quick Wins, blast radius, PDF
```

## Getting started

### Option 1 — Use it now (recommended)

Open **[kartikeyrawat15.github.io/devlens](https://kartikeyrawat15.github.io/devlens)** and paste a GitHub URL — nothing to install.

### Option 2 — Run locally

DevLens is a single static file with no build step. Clone and open it, or serve it with any static server:

```bash
git clone https://github.com/kartikeyrawat15/devlens.git
cd devlens

# Open directly…
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# …or serve it (recommended, avoids file:// CORS limits)
python -m http.server 8080
# then visit http://localhost:8080
```

Any of these also work: `npx serve`, the VS Code "Live Server" extension, or any web host that serves static files.

## AI setup

DevLens uses YOUR API keys — never ours.
Keys stored only in your browser localStorage.
Never sent anywhere except directly to the
provider you choose.

### How the two slots work

DevLens uses two AI models working against each other:

- Generator finds bugs and writes fixes
- Validator independently checks every finding
- If confidence < threshold, it retries with critique
- This loop is why free models can match paid tools

### Get free keys (2 minutes)

**Gemini** (Generator — 1,500 req/day free)

1. aistudio.google.com → Get API key
2. Paste in DevLens → ⚙ Settings → Generator

**Groq** (Validator — 14,400 req/day free)

1. console.groq.com → API Keys → Create new
2. Paste in DevLens → ⚙ Settings → Validator

### Want better results?

Swap either slot for a paid key:

| Combo | Quality |
|---|---|
| Gemini + Groq (free) | Matches Snyk + SonarQube |
| GPT-4o + Groq | Enhanced — fewer retries needed |
| Claude + GPT-4o | Premium — principal engineer mode |
| Claude + Claude | Premium + bonus pass on critical findings |

Any key works in either slot.
Different providers per slot = best cross-validation.
Same provider both slots = still works, slightly weaker.

### No keys at all?

Static analysis still runs fully:
pattern engine, dead code, auth matrix,
spaghetti detector, blast radius.
All deterministic, zero AI needed.
You only miss AI deep analysis and
natural language explanations.

> **GitHub token (optional):** add one under **Settings** to raise the GitHub API rate limit (60 → 5,000 req/hr) for large or frequent repo scans.

## Inputs

- **GitHub URL** — public repos are fetched via the GitHub API
- **`.zip`** — drag-and-drop an exported archive
- **Local files** — pick a folder or individual source files

Everything is parsed in the browser. Your code never leaves your machine except for the snippets you opt to send to your own AI provider.

## Privacy

- 100% client-side — no backend, no telemetry, no analytics
- API keys live in `localStorage` and go straight to the provider you configured
- Static analysis is fully offline once the page is loaded

## Tech

Vanilla JavaScript, zero framework. [D3](https://d3js.org/) for the dependency graph, [jsPDF](https://github.com/parallax/jsPDF) for report export, and [JSZip](https://stuk.github.io/jszip/) for archive input — all loaded from CDN.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md). Found a security issue? Please read [SECURITY.md](./SECURITY.md) first.

## License

[MIT](./LICENSE) © Kartikey Rawat

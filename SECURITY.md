# Security Policy

## Our security model

DevLens is a 100% client-side tool. It has no backend, no database, and collects no telemetry. This shapes what "a vulnerability" means here:

- **Your code never leaves your browser** except for the snippets you explicitly send to *your own* configured AI provider (Gemini / Groq).
- **API keys are stored in `localStorage`** and are sent directly to the provider's API — never to any DevLens-controlled server.
- The most relevant risks for a tool like this are **cross-site scripting (XSS)** from rendering analyzed code, **key leakage**, and **unsafe handling of fetched repository content**.

We take these seriously and welcome reports.

## Supported versions

DevLens ships as a single file from the `main` branch and the live GitHub Pages deployment. Only the **latest version** is supported. Please confirm an issue reproduces on the current `index.html` before reporting.

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Instead, report privately through either:

1. **GitHub Security Advisories** — use the **"Report a vulnerability"** button under the repository's **Security** tab (preferred), or
2. **Email** — `kartikeyrawat151002@gmail.com` with the subject line `DevLens Security`.

Please include:

- A clear description of the issue and its impact
- Step-by-step reproduction instructions
- A proof-of-concept (a minimal repo, snippet, or input that triggers it)
- The browser and version you tested on
- Any suggested remediation, if you have one

## What to expect

| Stage | Target |
| --- | --- |
| Acknowledgement of your report | within **48 hours** |
| Initial assessment & severity triage | within **5 business days** |
| Fix or mitigation for confirmed issues | as fast as severity warrants |
| Public disclosure | coordinated with you, after a fix ships |

We'll keep you updated as we work through it, and we're happy to credit you in the release notes and any advisory unless you'd prefer to remain anonymous.

## Scope

**In scope**

- XSS or code execution via analyzed source, repository names, or file contents
- Leakage or unintended transmission of API keys
- Bypass of the client-side-only / no-exfiltration guarantees
- Unsafe `innerHTML`/DOM sinks in the rendering layer
- Dependency vulnerabilities (D3, jsPDF, JSZip) that are exploitable through DevLens

**Out of scope**

- Vulnerabilities in the **code being analyzed** (that's the tool working as intended — report those to that project)
- Issues requiring a malicious browser extension or a compromised local machine
- Rate limits, availability, or behavior of third-party APIs (GitHub, Gemini, Groq)
- Self-XSS that requires the victim to paste attacker-supplied content into their own DevTools
- Missing security headers on the static GitHub Pages host

## Safe harbor

We will not pursue or support legal action against researchers who:

- Make a good-faith effort to follow this policy
- Avoid privacy violations, data destruction, and service disruption
- Give us reasonable time to remediate before any public disclosure

Thank you for helping keep DevLens and its users safe.

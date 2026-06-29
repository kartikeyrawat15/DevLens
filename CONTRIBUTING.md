# Contributing to DevLens

Thanks for your interest in improving DevLens! This project is a single, dependency-free HTML file, which makes contributing refreshingly simple — but it also means a few conventions matter. Please read this before opening a PR.

## Ground rules

- **It stays one file.** All application logic, styles, and markup live in `index.html`. No build step, no bundler, no `node_modules`, no framework. If a change requires a toolchain, it's probably out of scope.
- **No new runtime dependencies.** The only external code is the CDN-loaded D3, jsPDF, and JSZip. Don't add more.
- **Static analysis must work with zero API keys.** AI is an optional enhancement layered on top — never a requirement for core analysis.
- **Everything runs in the browser.** No backend, no telemetry, no phoning home. User code and keys must never leave the user's machine except for snippets sent to the user's own configured AI provider.

## Getting set up

```bash
git clone https://github.com/kartikeyrawat15/devlens.git
cd devlens
python -m http.server 8080   # or: npx serve
# open http://localhost:8080
```

That's it — edit `index.html`, refresh, repeat.

## How to contribute

1. **Open an issue first** for anything non-trivial, so we can agree on the approach before you write code.
2. **Fork** the repo and create a branch: `git checkout -b feature/short-description`.
3. **Make your change** in `index.html`. Keep it focused — one logical change per PR.
4. **Test it** (see below).
5. **Open a pull request** using the PR template. Link the issue it closes.

## Adding an analysis rule

Pattern rules live in the `PatternEngine` `RULES` array. Each rule is a small object:

```js
{
  id:'sec-example',          // unique, kebab-case, prefixed by category
  cat:'security',            // security | bugs | quality
  sev:8,                     // 1–10
  cwe:'CWE-XXX', cvss:7.5,   // optional, for security rules
  langs:['py'],              // optional; omit for JS-family default
  title:'Short human title',
  test:l=>/regex/.test(l),   // (line, ctx) => boolean
  desc:'What it is and why it is dangerous.',
  fix:l=>'// the corrected line or guidance',
  poc:'How to demonstrate it.',          // optional
  learn:'https://cwe.mitre.org/...'      // optional
}
```

Guidelines for rules:

- **Precision over recall.** A noisy rule that cries wolf is worse than no rule. Prefer false negatives to false positives.
- **Give a real fix.** `fix()` should produce something a user can actually paste or act on.
- **Mark the language.** Use `langs:['py']` for Python-only rules; JS-family is the default.
- **Add a fixture.** Include a minimal code snippet in your PR description showing the rule firing (and, ideally, a near-miss it correctly ignores).

## Testing

Before opening a PR, verify:

- [ ] Analysis runs end-to-end on a sample repo with **no API keys set**.
- [ ] Your new/changed rule fires on a positive case and does **not** fire on a similar negative case.
- [ ] All four output modes (Vibe / Junior / Senior / Bounty) render the finding correctly.
- [ ] No console errors during a full analysis.
- [ ] No regressions in existing tabs (Quick Wins, Spaghetti, Dead Code, Graph, PDF export).

## Code style

- Match the surrounding code — it's dense, compact vanilla JS by design.
- Keep modules as the existing IIFE pattern (`const Engine = (()=>{ ... })()`).
- Prefer pure, deterministic functions in the analysis engines; keep DOM work in the render layer.
- No new global state outside the existing `State` object.

## Reporting bugs and requesting features

Use the issue templates:

- 🐛 [Bug report](./.github/ISSUE_TEMPLATE/bug_report.md)
- ✨ [Feature request](./.github/ISSUE_TEMPLATE/feature_request.md)

For **security vulnerabilities**, do **not** open a public issue — follow [SECURITY.md](./SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

# Security policy

## Reporting a vulnerability

Report vulnerabilities privately through GitHub:
[open a security advisory](https://github.com/syz51/riemann/security/advisories/new).
Please don't open a public issue, pull request, or discussion for them.

Include what an attacker can do, the affected page, script, or workflow, the commit SHA, and steps to reproduce.

This is a one-maintainer project. Expect an acknowledgement within a week, and a fix or a plan once the report is confirmed. You'll be credited in the advisory unless you ask not to be.

## Supported versions

Only `main` (which deploys the live explainer site) receives fixes.

## Scope

Examples in scope:

- script injection (XSS) or unsafe HTML rendering in the explainer site (`site/`);
- supply-chain or workflow vulnerabilities in `.github/workflows/`, `site/`, or `vercel.json`;
- unintended disclosure of secrets or private data in the repository.

Out of scope: mathematical or citation errors in the notes or site (please open a normal [bug report](https://github.com/syz51/riemann/issues/new/choose) for those), and issues in upstream Lean 4, Mathlib, or pinned proof repositories.

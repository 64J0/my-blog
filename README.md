<p align="center">
  <h1 align="center">Blog made with Next.js 🎉</h1>
</p>

Personal blog for articles on software engineering, philosophy, and theology. Markdown files in, static HTML out — no CMS, no database, no client-side data fetching.

You can access this blog at [https://gaio.dev](https://gaio.dev).

## Stack

* **[Next.js](https://nextjs.org/)** (Pages Router) + **TypeScript**, statically generated (`getStaticProps`/`getStaticPaths`) — every post is plain HTML at build time, nothing rendered per-request.
* **Sass Modules** for component styles; theming (light/dark) is done with CSS custom properties switched via a `data-color-mode` attribute, not a CSS-in-JS library.
* **[next/font](https://nextjs.org/docs/pages/api-reference/components/font)** self-hosts Inter (body) and Roboto Mono (code) — no runtime requests to Google Fonts.
* **[gray-matter](https://github.com/jonschlinkert/gray-matter)** parses post front matter; **[unified](https://unifiedjs.com/)** (remark/rehype) turns the Markdown body into HTML at build time, with:
  * `remark-gfm` and `remark-math` / `rehype-katex` for GitHub-flavored Markdown and LaTeX.
  * **[Shiki](https://shiki.style/)** (`@shikijs/rehype`) for syntax highlighting — it uses the same TextMate grammars as VS Code, so language support (including less common ones like F#) is accurate.
  * A handful of small custom rehype plugins (`lib/rehype*.ts`) that post-process the generated HTML: image captions, a table-of-contents extractor, and a copy-to-clipboard button on code blocks.
* **[Vitest](https://vitest.dev/)** for a lean set of unit tests on the pure, non-file-system logic (slug generation, description/reading-time derivation, XML escaping) — see [Testing](#testing).

## Architecture notes

* `lib/posts.ts` is the single place that reads Markdown files and returns fully-shaped `PostData`/`PostMeta` objects; page components never touch the filesystem or the Markdown pipeline directly.
* Content transforms (image captions, code copy buttons, table of contents) are implemented as isolated rehype plugins in `lib/`, each operating on the hast tree rather than string-manipulating HTML.
* `types/posts.ts` is the shared contract between the data layer (`lib/`) and the view layer (`pages/`, `components/`).

## External Tools

* [Google Analytics (GA4)](https://analytics.google.com/)
* [Microsoft Clarity](https://clarity.microsoft.com/)
* [Vercel](https://vercel.com/)

## Testing

```bash
npm run test        # unit tests (Vitest)
npx tsc --noEmit     # type check
npm run lint         # ESLint
npm run build        # full production build (also type-checks every post)
```

All four run in CI on every push/PR via `.github/workflows/ci.yml`.

## Demonstration

<p align="center">
  <img src="./assets-readme/blog-demo-08-2022.gif" alt="Demonstration gif of my blog" />
</p>

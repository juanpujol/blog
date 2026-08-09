# Juan Pujol's blog

A static Astro blog published from Markdown files and designed around a Rosé Pine terminal interface.

## Writing

Create English posts in `src/content/blog/en/` and Brazilian Portuguese posts in
`src/content/blog/pt-br/`:

```md
---
title: "Article title"
description: "A short summary shown on the homepage."
pubDate: "2026-08-09"
locale: "en"
translationKey: "article-name"
---

Article content.
```

The filename becomes the URL. For example, `en/example.md` is available at
`/blog/example/`, while `pt-br/example.md` is available at
`/pt-br/blog/example/`.

Translated versions of the same article must use the same `translationKey`.
This connects their language switcher and SEO alternate links even if their
filenames differ.

## Commands

| Command                | Action                                 |
| :--------------------- | :------------------------------------- |
| `bun run dev`          | Start Astro locally                    |
| `bun run build`        | Build the static site into `dist/`     |
| `bun run preview`      | Preview the production build           |
| `bun run deploy`       | Deploy `dist/` to Cloudflare Workers   |
| `bun run lint`         | Lint the repository with Oxlint        |
| `bun run lint:fix`     | Apply safe Oxlint fixes                |
| `bun run format`       | Format supported files with Oxfmt      |
| `bun run format:check` | Check formatting without writing files |

## Deployment

`wrangler.jsonc` configures Cloudflare Workers Static Assets. The production domain and Astro `site` URL should be added when the domain is chosen. No deployment occurs automatically until the GitHub repository is connected through Workers Builds.

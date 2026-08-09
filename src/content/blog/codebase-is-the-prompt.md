---
title: "I internationalized my app to fix AI agent language drift"
description: "How a 785-file i18n migration taught me that coding agents follow a codebase's structure more reliably than its written rules."
pubDate: "2026-08-01"
---

Let me be honest about why I did a 785-file i18n migration, because it's not the reason you think.

It wasn't for the users. It wasn't "global expansion". Nobody asked for English.

I did it because I was tired of AI agents writing Portuguese inside my code.

## The codebase was the stronger prompt

<a href="https://laiki.co" target="_blank" rel="noopener">Laiki</a> is a marketing analytics platform for Brazil. Its UI is pt-BR because its customers speak pt-BR. Over time, the codebase filled up with inline Portuguese copy: labels, validation messages, errors, and emails.

Then I started working with coding agents. A lot. They looked at the codebase and imitated it perfectly. Portuguese leaked from UI copy into comments, docs, database descriptions, and eventually migration files. My infrastructure was becoming bilingual.

So I wrote rules. `AGENTS.md`, project instructions, memory files, the whole shrine:

> "PT-BR is UI copy ONLY. Never in SQL, migrations, or backend code."

The agents read the rule, opened a component with 40 Portuguese strings in it, and wrote more Portuguese.

This wasn't stupidity. It was imitation. The agents had one line saying "don't write Portuguese" and thousands of lines saying "we write Portuguese here all the time." That's not a fair fight. **The codebase is a bigger prompt than your prompt.** You cannot out-rule the gradient.

I considered adding a lint rule that banned Portuguese entirely. But **the Portuguese had nowhere else to go.** The product genuinely needs pt-BR. As long as those strings lived inline in components, "no Portuguese in code" was structurally impossible. The ban would break the product.

The fix wasn't a better rule. It was giving Portuguese a legal home outside the code: message catalogs. Which, if you squint, is just i18n. Once UI copy lived there, the rest of the codebase could be English and automated guards could reject exceptions. The multilingual product was a very presentable side effect.

## "It's just string extraction"

The plan looked simple: pick a library, extract strings, done. I chose Paraglide JS for its compile-time typed messages and TanStack support. It was a good choice. The estimate was still fiction.

The migration took 43 commits, touched 785 files, and produced 3,237 message keys. The work came from three places nobody puts in the estimate.

**One: this wasn't extraction, it was inversion.** The app was pt-BR-first and I made it en-US-first. Every extracted string became a translation task in both directions: an English base catalog and a pt-BR catalog. Extraction is a refactor; inversion rewrites every sentence your product says.

**Two: UI strings are maybe half of it.** The rest hides in validation schemas, server errors, hosted auth templates, transactional emails without request context, AI prompts, filenames, date formatting, and prerendered routes. Each has a different way to determine language, if it has one at all.

**Three: migration does not mean done.** A feature-by-feature audit found about 70 issues after the app compiled in English: duplicate keys, copy owned by the wrong feature, ambient-locale leaks, and redundant strings. "It compiles" is not a definition of done. It is a definition of started.

## The agents did the work

Full disclosure: I didn't type most of those 43 commits. Agents worked through phase plans, other agents reviewed them, and I adjudicated like some kind of tiny court. The reviews caught real bugs, including date shifts, a cookie-expiry mismatch, and a script that exited successfully while reporting "not ready."

That makes the story a nice loop: agents caused the problem, agents executed the fix, and lint guards now keep them honest. The machines broke it, fixed it, and now watch the machines. I mostly supervise and pay the token bill.

## Was it the right call?

I don't know. It took four intense days and a pile of tokens to solve what is, at its core, a discipline problem. Maybe smarter models won't need any of this next year.

But today I have an English codebase, agents that write English because everything they see is English, and three guards that turn regression into a CI failure instead of a review argument. Almost by accident, I also have an app that speaks two languages.

If you're fighting your agents about repo conventions, stop writing better rules and look at what the codebase is teaching. If the wrong behavior has structural support, no instruction file will save you. Remove that support. Give the exception a sanctioned home. Then ban everything else with a machine, not a sentence.

The feature was the bonus. The alignment was the product.

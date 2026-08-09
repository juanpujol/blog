---
title: "I internationalized my app to fix AI agent language drift"
description: "How a 785-file i18n migration taught me that coding agents follow a codebase's structure more reliably than its written rules."
pubDate: "2026-08-01"
---

Let me be honest about why I did a 785-file i18n migration, because it's not the reason you think.

It wasn't for the users. It wasn't "global expansion". Nobody asked for English.

I did it because I was tired of AI agents writing Portuguese inside my code.

## The actual problem

<a href="https://laiki.co" target="_blank" rel="noopener">Laiki</a> is a marketing analytics platform for the Brazilian market. The product speaks pt-BR because the customers speak pt-BR. Reasonable. So over time the codebase filled up with Portuguese strings: button labels, validation messages, error translations, email templates. Also reasonable.

Then I started working with coding agents. A lot. And the agents did what agents do best: they looked at my codebase and imitated it. Perfectly.

Portuguese in the UI copy? Sure, expected. But also Portuguese in code comments. Portuguese in commit-adjacent docs. Portuguese in database column descriptions. At one point I caught Portuguese heading toward a migration file. My infrastructure was slowly becoming bilingual and nobody had approved that.

So I did what everyone does. I wrote rules. `AGENTS.md`, project instructions, memory files, the whole shrine:

> "PT-BR is UI copy ONLY. Never in SQL, migrations, or backend code."

And the agents read the rule, nodded politely, opened a component with 40 Portuguese strings in it, and wrote more Portuguese. Every. Single. Time.

## Why the rules kept losing

It took me longer than I'd like to admit to understand why, and it's not that agents are dumb. It's the opposite problem: they're extremely good imitators.

An agent working in your repo has one line of instruction saying "don't write Portuguese" and two thousand lines of in-context evidence saying "we write Portuguese here, all the time, everywhere, it's fine." That's not a fair fight. The codebase is a bigger prompt than your prompt. You cannot out-rule the gradient.

I could have kept playing whack-a-mole. Reject it in review, fix it, watch it come back. Instead I asked a different question: why can't I just add a lint rule that bans Portuguese from the code entirely?

And the answer is the actual insight of this whole story: **because the Portuguese had nowhere else to go.** The product's UI genuinely needs pt-BR. You can't ban a thing that has no legal home. As long as the strings lived inline in components, "no Portuguese in code" was structurally impossible, the ban would break the product.

So the real fix wasn't a better rule. It was giving every Portuguese string a home that isn't code, message catalogs. Which, if you squint, is just... i18n. The multilingual feature I "got" out of this is basically a side effect. A very presentable side effect. It demos great. But the point was always: English codebase, guards at zero, agents behaving because the environment finally agrees with the instructions.

I don't know if this was the right choice. It seems to work. That's my whole level of confidence and I'm comfortable with it.

## "It's just string extraction"

The plan looked so simple. Pick a library (Paraglide JS, compile-time typed messages, TanStack blessed, genuinely a good pick), extract strings, done. The AI research phase estimated this like it estimates everything, cheerfully.

Here's what it actually took: 43 commits, 785 files changed, +32k/-11k lines, 3,237 message keys across 21 feature catalogs, three custom lint guards, and a 21-area audit that found ~70 real problems AFTER the migration was "complete".

Where did all that work come from? Three places nobody puts in the estimate.

**One: this wasn't extraction, it was inversion.** The app was pt-BR-first and I went en-US-first. So every extracted string was also a translation task, in both directions. 2,351 lines of Portuguese copy became keys plus an English base catalog plus a pt-BR catalog. Extraction is a refactor; inversion is a rewrite of every sentence your product says.

**Two: UI strings are maybe half of it.** The rest hides in places no i18n tutorial mentions:

- Valibot validation messages baked into schemas
- The server error-translation layer (services return error codes, the boundary speaks human)
- Auth emails that don't even live in your repo, Supabase hosted config, Go templates, deployed through the Management API
- Transactional emails with no request context at all
- AI prompts (English instructions, output language as an explicit parameter, never from the catalogs, never from the client)
- PDF filenames, date formatting, prerendered legal pages needing per-locale paths and hreflang tags

**Three: migration != done.** After every feature was migrated I ran a feature-by-feature audit with an actual status table. It found ~70 findings: duplicated keys, copy owned by the wrong feature, ambient-locale leaks, redundant strings that should have been one canonical key. "It compiles and the app is in English" is not a definition of done, it's a definition of started.

## The part where I admit the agents did the work

Full disclosure: I didn't type most of these 43 commits. Agents did, working through phase plans, with other agents reviewing them, and me adjudicating like some kind of tiny court. The review agents caught real bugs, the date-shift thing, a cookie-expiry mismatch, a script that exited 0 while its own output said "not ready".

Which makes the whole story a nice loop: agents caused the problem, agents executed the fix, and lint guards now keep the agents honest forever. The machines broke it, the machines fixed it, the machines are now watching the machines. I mostly supervise and pay the token bill.

## Was it the right call?

The honest version: I don't know. It was four days of intense work and a real pile of tokens to solve what is, at its core, a discipline problem. Maybe smarter models next year won't need any of this.

But here's what I have today: a pure English codebase (the kind I'm comfortable working in), agents that write English because everything they see is English, three guards that make regression a CI failure instead of a code-review argument, and, almost by accident, an app that speaks two languages.

If you're fighting your agents about repo conventions, here's the transferable lesson: stop writing better rules. Look at what the codebase is teaching, because that's the prompt the agents actually read. If the wrong behavior has structural support in your repo, no instruction file will save you. Remove the support. Give the exception a sanctioned home. Then ban everything else with a machine, not a sentence.

The feature was the bonus. The alignment was the product.

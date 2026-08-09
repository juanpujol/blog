---
title: "I internationalized my app to fix AI agent language drift"
description: "How a 785-file i18n migration got Portuguese out of the codebase after the agent rules failed."
pubDate: "2026-08-01"
locale: "en"
translationKey: "codebase-is-the-prompt"
---

It wasn't for the users. It wasn't "global expansion". Nobody asked for English.

## The rules said one thing, the code said another

<a href="https://laiki.co" target="_blank" rel="noopener">Laiki</a> is a marketing analytics platform for Brazil. Its UI is pt-BR because its customers speak pt-BR. Over time, the codebase filled up with inline Portuguese copy: labels, validation messages, errors, and emails.

Then I started working with coding agents. A lot. They looked at the codebase and imitated it perfectly. Portuguese started showing up outside the UI, in comments, docs, database descriptions, and eventually a database migration. The UI was no longer the boundary.

So I wrote rules. `AGENTS.md`, project instructions, memory files, everything I could think of:

> "PT-BR is UI copy ONLY. Never in SQL, migrations, or backend code."

The agents read the rule, nodded politely, opened a component with 40 Portuguese strings in it, and wrote more Portuguese.

This wasn't stupidity. It was imitation. The agents had one line in `AGENTS.md` saying "don't write Portuguese" and thousands of lines of code showing the opposite. The rule had no chance. The codebase was teaching them more than the instruction file.

I considered solving this with lint. It would be deterministic and wouldn't depend on an agent following instructions. But the UI still needed Portuguese, and the strings were still in the components. Enabling the rule then would have broken the app.

I had to move the UI text from the components into translation files first. Only then could I keep the codebase in English and reject Portuguese everywhere else. The app supporting two languages was a side effect. It demos great.

## "It's just string extraction"

The plan looked simple: pick a library, extract strings, done. I chose Paraglide JS for its compile-time typed messages and TanStack support. It was a good choice. The estimate was completely wrong.

The migration took 43 commits, touched 785 files, and produced 3,237 message keys. The estimate missed three parts of the work.

**First, I was also changing the product's base language.** The app was pt-BR-first and became en-US-first. Every string needed an English base message and a pt-BR translation.

**Second, UI strings were only about half the work.** There was still text in validation schemas, server errors, emails, AI prompts, and prerendered routes. Each one determined the language differently, if it did at all.

**Third, compiling in English didn't mean the migration was done.** A feature-by-feature audit still found about 70 real problems, including duplicate keys, strings owned by the wrong feature, ambient-locale leaks, and redundant strings.

## The agents did the work

I didn't type any of those 43 commits. I orchestrated agents through each phase, assigned other agents to review their work, and played the annoying manager. The reviews caught real bugs, including date shifts, a cookie-expiry mismatch, and a script that exited successfully while reporting "not ready."

The agents caused the problem, did the migration, and now three lint rules watch them. The machines broke it, the machines fixed it, and now the machines watch the machines. I mostly supervise and pay the token bill.

## Was it the right call?

I don't know, man. It took four intense days and a pile of tokens to solve a discipline problem. Maybe smarter models won't need any of this next year.

But today the codebase is English. The agents write English because that's what they see. If Portuguese gets back into the code, CI fails before it becomes a code review argument.

If an agent keeps ignoring a repository convention, look at the examples it sees before writing another rule. If the repository is full of the wrong pattern, `AGENTS.md` will lose. Fix the pattern, isolate the exceptions, and let lint block the rest.

The feature was the bonus. The alignment was the product.

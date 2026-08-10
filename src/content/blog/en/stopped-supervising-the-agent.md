---
title: "I stopped supervising the agent"
description: "I use coding agents every day. For this blog, I chose the constraints and stayed out of most of the implementation."
pubDate: "2026-08-10"
locale: "en"
translationKey: "stopped-supervising-the-agent"
---

I built this blog in around four hours, mostly by talking to an agent.

I had a loose design in my head and the first article ready. I chose Astro, decided to host it on Cloudflare, and tried not to tell the agent how to implement everything.

This is not my first time building with agents. I use them every day, but normally with much more supervision.

For the last two years, I have been building <a href="https://laiki.co" target="_blank" rel="noopener">Laiki</a>, a SaaS application that handles user data and PII. I take this seriously. For roughly 60% of that time, agents have been part of my daily work. I plan their work, monitor it closely, review the result, and often assign another agent to review it.

I am also a partner and CTO at <a href="https://lab1095.com.br/" target="_blank" rel="noopener">LAB1095</a>, where we help companies adopt generative AI safely, with governance. So using agents is not new to me. What is new here is giving one very little supervision.

## The problem is that I have an opinion about everything

I can tell the agent which files to create, how to organize the components, and exactly how I want the CSS to work. In the moment, that seems faster than explaining the result I want.

But then I would still be designing the implementation. The agent would just type it for me. I already know how to do that.

For this blog, I want to see what happens if I do less.

## Talking instead of coding

I turned on the microphone and started talking to the agent.

I tell the agent what I want, look at the result, and say what needs to change. Sometimes it does things that make no sense and I get pissed off. Other times, when I try to explain why something is wrong, I realize the original instruction was not clear enough.

The first version broke on mobile, and the navigation caused enough layout shift to move the page around while I was using it. So it is not magic. It is still frontend work, just with me complaining into a microphone.

This is probably the most difficult part. I have to separate what is actually broken from what is just not how I would build it.

I also looked at the architecture. Not because I had to review it, but because I was curious about what the agent decided. I did not change much, and I tried not to reorganize everything just because I would have done it differently.

## It did not stop at the code

The Cloudflare part is probably the most impressive. Once I connected the MCP, the agent could work outside the repository too. It configured the domain, handled the redirects and URLs, set up the sitemap, and told me what to add to Google Search Console so the site could be indexed.

It was impressive autonomy right up until it created a Worker in the wrong Cloudflare account. GitHub and Cloudflare were already connected, but instead of pushing, the agent used the Cloudflare CLI to upload the site manually.

Still, going from a conversation about a design to a deployed site on my domain took around three or four hours. I barely typed.

I would not work this way on Laiki. The application has real users, real data, and mistakes that are more expensive than a broken blog layout. There, I am still supervising everything closely.

This blog is a good place to try the opposite. If the agent makes a mess, I can fix it or start again. I still chose the stack, set the boundaries, and decided whether the result was good enough. I just tried not to tell it how to build everything.

I don't know how far I will take this way of working. For now, I have a blog that works, an architecture I did not design, and a first experiment in letting an agent do the simple thing without standing over it the entire time.

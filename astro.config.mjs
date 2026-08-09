// @ts-check

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = "https://juanpujol.com";
const redirectPages = new Set([`${site}/blog/`, `${site}/pt-br/blog/`]);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => !redirectPages.has(page),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "pt-br": "pt-BR",
        },
      },
    }),
  ],
  i18n: {
    locales: ["en", "pt-br"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/blog": "/",
    "/pt-br/blog": "/pt-br/",
  },
});

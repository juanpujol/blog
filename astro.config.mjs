// @ts-check

import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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

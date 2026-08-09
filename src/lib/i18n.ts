import type { CollectionEntry } from "astro:content";
import { SITE_DESCRIPTION } from "../consts";

export const LOCALES = ["en", "pt-br"] as const;
export const DEFAULT_LOCALE = "en";

export type Locale = (typeof LOCALES)[number];

export interface LocaleLink {
  locale: Locale;
  href: string;
}

export const languages = {
  en: {
    html: "en",
    label: "EN",
    og: "en_US",
  },
  "pt-br": {
    html: "pt-BR",
    label: "PT-BR",
    og: "pt_BR",
  },
} satisfies Record<Locale, { html: string; label: string; og: string }>;

export const ui = {
  en: {
    description: SITE_DESCRIPTION,
    skip: "Skip to content",
    home: "Juan Pujol, home",
    languages: "Languages",
    published: "published",
    updated: "Last updated",
    empty: "No entries yet. The cursor is blinking.",
  },
  "pt-br": {
    description: "Histórias sobre software, trabalho e tudo que existe em volta.",
    skip: "Pular para o conteúdo",
    home: "Juan Pujol, início",
    languages: "Idiomas",
    published: "publicado",
    updated: "Última atualização",
    empty: "Nenhum texto por aqui ainda. O cursor continua piscando.",
  },
} satisfies Record<
  Locale,
  {
    description: string;
    skip: string;
    home: string;
    languages: string;
    published: string;
    updated: string;
    empty: string;
  }
>;

export function homeUrl(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}

export function slug(post: CollectionEntry<"blog">) {
  const prefix = `${post.data.locale}/`;

  if (!post.id.startsWith(prefix)) {
    throw new Error(`Post ${post.id} must be stored under ${prefix}`);
  }

  return post.id.slice(prefix.length);
}

export function postUrl(locale: Locale, value: string) {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${prefix}/blog/${value}/`;
}

export function translations(
  post: CollectionEntry<"blog">,
  posts: CollectionEntry<"blog">[],
): LocaleLink[] {
  return posts
    .filter((candidate) => candidate.data.translationKey === post.data.translationKey)
    .sort((a, b) => LOCALES.indexOf(a.data.locale) - LOCALES.indexOf(b.data.locale))
    .map((candidate) => ({
      locale: candidate.data.locale,
      href: postUrl(candidate.data.locale, slug(candidate)),
    }));
}

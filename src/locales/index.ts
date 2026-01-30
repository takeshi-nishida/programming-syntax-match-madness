import { ja } from "./ja";
import { en } from "./en";

export type Locale = "ja" | "en";
export type Translations = {
  [K in keyof typeof ja]: string;
};

export const translations: Record<Locale, Translations> = { ja, en };

export function detectLocale(): Locale {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

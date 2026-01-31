import { ja } from "./ja";
import { en } from "./en";

export type Locale = "ja" | "en";

// ja の構造を元にして、全ての値を string（またはネストしたオブジェクト）に緩和
type DeepString<T> = T extends object
  ? { [K in keyof T]: DeepString<T[K]> }
  : string;

export type Translations = DeepString<typeof ja>;

export const translations: Record<Locale, Translations> = { ja, en };

export function detectLocale(): Locale {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

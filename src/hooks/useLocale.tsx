import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, detectLocale, type Locale, type Translations } from "../locales";

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "ja" ? "en" : "ja"));
  }, []);

  const value: LocaleContextValue = {
    locale,
    t: translations[locale],
    toggleLocale,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

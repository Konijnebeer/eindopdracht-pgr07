import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { createContext, use, useEffect, useState } from "react";

import { en, type Translations } from "./locales/en";
import { fi } from "./locales/fi";
import { nl } from "./locales/nl";

// Recursively build dot-notation keys, e.g. "profile.title" | "route.start"
type DotKeys<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : `${K}.${DotKeys<T[K]>}`;
}[keyof T & string];

export type TranslationKey = DotKeys<Translations>;

type TranslateFn = (
  key: TranslationKey,
  options?: Record<string, unknown>,
) => string;

export const SUPPORTED_LOCALES = ["en", "nl", "fi"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const STORAGE_KEY = "app-locale";

export const i18n = new I18n({ en, nl, fi }, { enableFallback: true });

i18n.locale =
  SUPPORTED_LOCALES.find((local) => local === getLocales()[0]?.languageCode) ??
  "en";

// For use outside of React components
export const t: TranslateFn = i18n.t.bind(i18n);

const I18nContext = createContext({
  locale: i18n.locale as Locale,
  setLocale: (_locale: Locale) => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(i18n.locale as Locale);

  function changeLocale(locale: Locale) {
    i18n.locale = locale;
    setLocale(locale);
    AsyncStorage.setItem(STORAGE_KEY, locale);
  }

  // Restore last selected language
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
        changeLocale(stored as Locale);
      }
    });
  }, []);

  return (
    <I18nContext value={{ locale, setLocale: changeLocale }}>
      {children}
    </I18nContext>
  );
}

export function useTranslation() {
  const { locale, setLocale } = use(I18nContext);
  return { locale, setLocale, t: i18n.t.bind(i18n) as TranslateFn };
}

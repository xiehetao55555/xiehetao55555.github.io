"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LANG, LANGUAGES, translate, type Lang } from "@/lib/i18n";

type LanguageCtx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
};

const Ctx = createContext<LanguageCtx | null>(null);

const STORAGE_KEY = "portfolio-lang";

function subscribeLanguage(listener: () => void) {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
}
function readLanguage(): Lang {
  const value = document.documentElement.lang;
  return value === "en" || value === "es" ? value : DEFAULT_LANG;
}

// Inlined in <head> before hydration so the document lang attribute matches
// the user's stored preference (avoids FOUC and wrong screen-reader lang).
export const LANG_BOOT_SCRIPT = `(function(){try{var l=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var ok=${JSON.stringify(LANGUAGES)};if(l&&ok.indexOf(l)>-1){document.documentElement.lang=l;}}catch(e){}})();`;

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lang = useSyncExternalStore(
    subscribeLanguage,
    readLanguage,
    () => DEFAULT_LANG,
  );

  const setLang = useCallback((next: Lang) => {
    document.documentElement.lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore — state still updates in-memory.
    }
  }, []);

  const t = useCallback((path: string) => translate(path, lang), [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLanguage(): LanguageCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Safe fallback outside the provider: default language, no-op setter.
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (path) => translate(path, DEFAULT_LANG),
    };
  }
  return ctx;
}

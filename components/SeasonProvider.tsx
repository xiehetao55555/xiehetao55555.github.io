"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_SEASON,
  SEASONS,
  getPalette,
  type SeasonId,
  type SeasonPalette,
} from "@/lib/seasons";

type SeasonCtx = {
  id: SeasonId;
  palette: SeasonPalette;
  setSeason: (id: SeasonId) => void;
};

const Ctx = createContext<SeasonCtx | null>(null);

const STORAGE_KEY = "portfolio-season";

function subscribeSeason(listener: () => void) {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-season"],
  });
  return () => observer.disconnect();
}
function readSeason(): SeasonId {
  const value = document.documentElement.dataset.season;
  return SEASONS.find((season) => season.id === value)?.id ?? DEFAULT_SEASON;
}

// Client-side script that runs before React hydrates. Reads the stored
// season and sets data-season on <html> so the first paint already uses
// the right palette (no flash of winter). Emitted inline by layout.tsx.
export const SEASON_BOOT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var ok=${JSON.stringify(SEASONS.map((s) => s.id))};if(s&&ok.indexOf(s)>-1){document.documentElement.dataset.season=s;}else{document.documentElement.dataset.season=${JSON.stringify(DEFAULT_SEASON)};}}catch(e){document.documentElement.dataset.season=${JSON.stringify(DEFAULT_SEASON)};}})();`;

export default function SeasonProvider({ children }: { children: ReactNode }) {
  const id = useSyncExternalStore(
    subscribeSeason,
    readSeason,
    () => DEFAULT_SEASON,
  );

  const setSeason = useCallback((next: SeasonId) => {
    document.documentElement.dataset.season = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore quota/availability errors — the UI still updates in-memory.
    }
  }, []);

  const palette = getPalette(id);

  return (
    <Ctx.Provider value={{ id, palette, setSeason }}>{children}</Ctx.Provider>
  );
}

export function useSeason(): SeasonCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // Outside the provider (e.g. during SSR before hydration of a leaf),
    // fall back to defaults rather than throwing. Keeps rendering robust.
    return {
      id: DEFAULT_SEASON,
      palette: getPalette(DEFAULT_SEASON),
      setSeason: () => {},
    };
  }
  return ctx;
}

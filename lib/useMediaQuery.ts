"use client";

import { useCallback, useSyncExternalStore } from "react";

// The same hydration-safe matchMedia approach used by upstream useIsMobile.
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (listener: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

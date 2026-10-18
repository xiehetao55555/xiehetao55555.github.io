"use client";

import { useSyncExternalStore, type MouseEvent } from "react";

const CHANGE = "portfolio:technology-change";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(CHANGE, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(CHANGE, listener);
  };
}
export function useProjectFilter() {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get("tech"),
    () => null,
  );
}
export function selectTechnology(id: string | null, scroll = true) {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set("tech", id);
  else url.searchParams.delete("tech");
  if (scroll) url.hash = "work";
  const next = `${url.pathname}${url.search}${url.hash}`;
  if (
    next !==
    `${window.location.pathname}${window.location.search}${window.location.hash}`
  )
    window.history.pushState(null, "", next);
  window.dispatchEvent(new Event(CHANGE));
  if (scroll) {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById("work")
      ?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    requestAnimationFrame(() =>
      document
        .getElementById("project-results-status")
        ?.focus({ preventScroll: true }),
    );
  }
}
export function technologyLink(
  event: MouseEvent<HTMLAnchorElement>,
  id: string | null,
) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  selectTechnology(id);
}

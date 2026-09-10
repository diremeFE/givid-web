"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "givid_cookie_consent";
const EVENT_NAME = "givid-cookie-consent";

export type ConsentValue = "accepted" | "rejected" | null;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

function getSnapshot(): ConsentValue {
  try {
    return localStorage.getItem(STORAGE_KEY) as ConsentValue;
  } catch {
    return null;
  }
}

function getServerSnapshot(): ConsentValue {
  return null;
}

export function useCookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function setConsent(value: Exclude<ConsentValue, null>) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    window.dispatchEvent(new Event(EVENT_NAME));
  }

  return { consent, setConsent };
}

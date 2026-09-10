"use client";

import { useEffect, useState, type RefObject } from "react";

export function useHeroCleared(headerRef: RefObject<HTMLElement | null>, watchKey: unknown) {
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const heroEl = document.querySelector<HTMLElement>("[data-hero]");
    if (!heroEl) {
      return;
    }

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const observer = new IntersectionObserver(
      ([entry]) => setCleared(!entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [headerRef, watchKey]);

  return cleared;
}

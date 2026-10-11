"use client";

import { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let observer: IntersectionObserver | null = null;
    let raf2 = 0;

    // On a fresh client-side navigation the browser can still be mid-way
    // through resetting scroll to the top of the new page when this effect
    // runs, so the element's position is momentarily stale. Observing
    // immediately in that window makes every section "intersect" at once and
    // reveal instantly, instead of as the user actually scrolls to them.
    // Waiting two animation frames lets scroll settle first.
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer?.disconnect();
            }
          },
          { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );
        observer.observe(node);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

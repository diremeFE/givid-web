export function FlagES({ className = "h-3.5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  );
}

export function FlagFR({ className = "h-3.5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#ED2939" />
      <rect width="20" height="20" fill="#fff" />
      <rect width="10" height="20" fill="#002395" />
    </svg>
  );
}

export function FlagGB({ className = "h-3.5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#00247D" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#CF142B" strokeWidth="1.5" />
      <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
      <path d="M15 0V20M0 10H30" stroke="#CF142B" strokeWidth="3.5" />
    </svg>
  );
}

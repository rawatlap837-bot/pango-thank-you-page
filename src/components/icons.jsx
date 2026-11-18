// Inline SVG icons. Pass a className to change size or colour with Tailwind.

const lineProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function CheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function LockIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function ClockIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function PlayIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

export function PauseIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function VolumeIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function MutedIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M22 9l-6 6" />
      <path d="M16 9l6 6" />
    </svg>
  );
}

export function FullscreenIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </svg>
  );
}

export function ExitFullscreenIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <path d="M9 4v5H4" />
      <path d="M15 4v5h5" />
      <path d="M9 20v-5H4" />
      <path d="M15 20v-5h5" />
    </svg>
  );
}

export function DumbbellIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...lineProps} className={className}>
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1a2 2 0 0 0-2.8 0L16 21l-3-3 1.2-1.2a2 2 0 0 0 0-2.8l-1-1" />
      <path d="m3 3 1 1a2 2 0 0 0 2.8 0L8 3l3 3-1.2 1.2a2 2 0 0 0 0 2.8l1 1" />
      <path d="m14 8 2-2" />
      <path d="m8 14-2 2" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VerifiedBadgeIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2.5l2.2 2 2.9-.3 1.2 2.7 2.8 1.1-.5 3 1.7 2.5-1.7 2.5.5 3-2.8 1.1-1.2 2.7-2.9-.3-2.2 2-2.2-2-2.9.3-1.2-2.7-2.8-1.1.5-3-1.7-2.5 1.7-2.5-.5-3 2.8-1.1 1.2-2.7 2.9.3 2.2-2z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12l2.5 2.5 5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import type { ReactNode } from 'react';

export default function Marquee({
  children,
  speed = 40,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ticker ${className}`}>
      <div
        className="flex gap-12 whitespace-nowrap will-change-transform"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

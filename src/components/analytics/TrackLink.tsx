"use client";

import { trackEvent } from "@/lib/analytics";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "_self";
  rel?: string;
  prefetch?: boolean;
};

export default function TrackLink({
  href,
  children,
  eventName,
  eventParams,
  className,
  ariaLabel,
  target = "_self",
  rel,
  prefetch = false,
}: Props) {
  const safeRel =
    target === "_blank" ? rel ?? "noopener noreferrer" : rel ?? undefined;

  return (
    <a
      href={href}
      target={target}
      rel={safeRel}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  );
}

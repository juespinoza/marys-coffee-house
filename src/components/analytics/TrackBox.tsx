"use client";

import React from "react";
import { trackEvent } from "@/lib/analytics";

export default function TrackBox({
  eventName,
  eventParams,
  className,
  children,
}: {
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </div>
  );
}

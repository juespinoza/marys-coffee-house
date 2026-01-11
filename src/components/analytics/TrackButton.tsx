"use client";

import { trackEvent } from "@/lib/analytics";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean>;
};

export default function TrackButton({
  eventName,
  eventParams,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}

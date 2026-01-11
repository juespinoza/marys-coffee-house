"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Evita mismatch: no renderizar nada dependiente del theme hasta montar
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="rounded-full border border-border bg-surface px-3 py-2 text-sm shadow-soft hover:translate-y-px transition"
      >
        {/* placeholder estable */}
        <span className="opacity-60">☀️</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-border bg-surface px-3 py-2 text-sm shadow-soft hover:translate-y-px transition"
      aria-label="Toggle theme"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}

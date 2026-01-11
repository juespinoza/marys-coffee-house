"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, locales } from "@/lib/i18n";

function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  // Espera pathname tipo: /es/cafe/...
  const parts = (pathname || "/").split("/").filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}`;

  // Si el primer segmento es locale, lo reemplazamos.
  const first = parts[0];
  if (locales.includes(first as Locale)) {
    parts[0] = nextLocale;
    return "/" + parts.join("/");
  }

  // Si no hay locale, lo anteponemos
  return `/${nextLocale}/${parts.join("/")}`;
}

export default function LocaleSwitch({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const pathname = usePathname();

  const current = (
    locales.includes(currentLocale as Locale) ? (currentLocale as Locale) : "es"
  ) as Locale;

  const options = useMemo(
    () =>
      locales.map((lc) => ({
        lc,
        href: replaceLocaleInPath(pathname || "/", lc),
        active: lc === current,
      })),
    [pathname, current]
  );

  return (
    <div className="relative inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1 shadow-soft">
      <span className="text-xs text-muted px-1">🌐</span>

      {options.map((o) => (
        <Link
          key={o.lc}
          href={o.href}
          prefetch={false}
          className={[
            "rounded-full px-2.5 py-1 text-xs font-semibold transition",
            o.active
              ? "bg-primary2/20 text-text"
              : "text-muted hover:bg-primary2/15 hover:text-text",
          ].join(" ")}
          aria-current={o.active ? "page" : undefined}
        >
          {o.lc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

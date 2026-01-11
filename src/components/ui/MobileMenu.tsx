"use client";

import type { NavItem } from "@/lib/types";
import { normalizePathname } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MobileMenu({
  items,
  rightSlot,
  title = "Menú",
}: {
  items: NavItem[];
  rightSlot?: React.ReactNode;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathnameRaw = usePathname();
  const pathname = normalizePathname(pathnameRaw || "/");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Base: asumimos que el primer link suele ser "Inicio"
  const base = useMemo(
    () => normalizePathname(items?.[0]?.href || "/"),
    [items]
  );

  function isActive(href: string) {
    const h = normalizePathname(href);
    if (h === base) return pathname === base;
    return pathname === h || pathname.startsWith(h + "/");
  }

  // Cerrar al navegar
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathnameRaw]);

  // ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll + focus en cerrar
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 shadow-soft hover:bg-primary2/15 transition"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* OVERLAY REAL: cubre toda la pantalla + blur + oscurece */}
          <div
            className="fixed inset-0"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* DRAWER: fijo, sólido, encima del overlay */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            className="
              fixed right-0 top-0 h-dvh w-[86%] max-w-sm
              bg-surface border-l border-border
              shadow-[0_100px_200px_rgba(0,0,0,0.95)]
              flex flex-col
            "
          >
            {/* Header del drawer */}
            <div className="shrink-0 border-b border-border bg-surface px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{title}</div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="rounded-lg border border-border bg-bg px-3 py-2 text-sm hover:bg-primary2/15 transition"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Acciones (idioma / theme) */}
              {/* {rightSlot && <div className="mt-3">{rightSlot}</div>} */}
            </div>

            {/* NAV scrolleable (pero visible) */}
            <nav className="flex-1 overflow-y-auto bg-surface px-5 py-5">
              <ul className="space-y-3">
                {items.map((it) => {
                  const active = isActive(it.href);

                  return (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        prefetch={false}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "block rounded-sm border px-4 py-4 text-base font-semibold transition",
                          // fondo SIEMPRE visible
                          active
                            ? "border-primary bg-primary2/20"
                            : "border-border bg-bg hover:bg-primary2/15",
                        ].join(" ")}
                      >
                        {it.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* hint */}
              {/* <div className="mt-8 text-xs text-muted">
                Tip: presioná <span className="font-semibold">ESC</span> para
                cerrar.
              </div> */}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

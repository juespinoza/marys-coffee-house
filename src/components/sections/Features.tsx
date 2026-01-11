"use client";

import { motion } from "framer-motion";
import { Feature } from "@/lib/types";

function Icon({ name }: { name?: string }) {
  const common = "h-8 w-8 text-primary2";
  if (name === "heart")
    return (
      <span className={common} aria-hidden>
        ♡
      </span>
    );
  if (name === "croissant")
    return (
      <span className={common} aria-hidden>
        🥐
      </span>
    );
  return (
    <span className={common} aria-hidden>
      ☕
    </span>
  );
}

export default function Features({ items }: { items: Feature[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((f, idx) => (
        <motion.article
          key={f.title + idx}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.28 }}
          className="rounded-xl2 border border-border bg-surface shadow-soft p-6 text-center hover:translate-y-0.5 transition"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary2/15 border border-border">
            <Icon name={f.icon} />
          </div>

          <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{f.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

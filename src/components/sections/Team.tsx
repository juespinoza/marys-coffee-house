"use client";

import { TeamMember } from "@/lib/types";
import { initials } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Team({
  title,
  subtitle,
  team,
}: {
  title: string;
  subtitle?: string;
  team: TeamMember[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!team?.length) return null;

  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {team.slice(0, 6).map((m, idx) => {
          const Card = mounted ? motion.article : "article";

          return (
            <Card
              key={m.name + idx}
              {...(mounted
                ? {
                    initial: { opacity: 0, y: 10 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-60px" },
                    transition: { duration: 0.3 },
                  }
                : {})}
              className="rounded-xl2 border border-border bg-surface shadow-soft p-6 hover:translate-y-0.5 transition text-center"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-primary2/15 border border-border grid place-items-center">
                <span className="text-primary2 font-semibold text-xl">
                  {initials(m.name)}
                </span>
              </div>

              <div className="mt-5 font-semibold">{m.name}</div>
              <div className="mt-1 text-xs text-primary2">{m.role}</div>

              <p className="mt-3 text-xs text-muted leading-relaxed">{m.bio}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

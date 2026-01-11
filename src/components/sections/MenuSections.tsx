import { MenuSection } from "@/lib/types";
import { formatGs } from "@/lib/utils";

export default function MenuSections({
  sections,
}: {
  sections: MenuSection[];
}) {
  return (
    <div className="space-y-14">
      {sections.map((sec, idx) => (
        <section key={sec.title + idx}>
          {/* título grande tipo serif como en diseño */}
          <h2 className="text-3xl md:text-4xl">{sec.title}</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {sec.items.map((item, i) => (
              <article
                key={item.name + i}
                className="rounded-xl border border-border bg-surface shadow-soft px-6 py-5
                           hover:-translate-y-0.5 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{item.desc}</p>
                  </div>

                  <div className="text-sm font-semibold text-primary whitespace-nowrap">
                    {formatGs(item.price)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* divisor entre secciones como en el screenshot */}
          <div className="mt-10 h-px w-full bg-border/70" />
        </section>
      ))}
    </div>
  );
}

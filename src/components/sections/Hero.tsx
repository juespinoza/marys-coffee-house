import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";
import TrackLink from "../analytics/TrackLink";

export default function Hero({
  cafe,
  site,
  hero,
}: {
  cafe: string;
  site: any;
  hero: {
    title: string;
    subtitle: string;
    text: string;
    cta: { label: string; href: string }; // href relativo: "menu"
    image: string; // ej: "hero.jpg"
  };
}) {
  const folder = site.cloudinaryFolder;

  return (
    <section className="mx-auto">
      <div className="relative overflow-hidden shadow-soft">
        {/* Imagen */}
        <div className="relative h-80 sm:h-105 md:h-130 bg-bg">
          <Image
            src={cloudinaryUrl(folder, hero.image)}
            alt={hero.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            loading="eager"
          />

          {/* Overlay suave */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
        </div>

        {/* Contenido centrado */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-2xl">
            <h1 className="text-white text-4xl md:text-5xl font-semibold tracking-tight">
              {hero.title}
            </h1>

            <p className="mt-2 text-white/90 italic text-lg md:text-xl">
              {hero.subtitle}
            </p>

            <p className="mt-4 text-white/85 text-sm md:text-base leading-relaxed">
              {hero.text}
            </p>

            <div className="mt-6 flex justify-center">
              <TrackLink
                href={hero.cta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary2/90 px-6 py-3 text-sm font-semibold text-text \
                hover:bg-primary2 hover:-translate-y-px transition shadow-soft"
                eventName="cta_click"
                eventParams={{ location: "home", action: "explore_menu" }}
              >
                {hero.cta.label}
                <span aria-hidden>→</span>
              </TrackLink>
            </div>
          </div>
        </div>

        {/* “pill” tipo detalle (opcional) */}
        <div className="absolute top-4 right-4 hidden sm:block">
          <div className="rounded-full bg-bg/80 backdrop-blur border border-border px-4 py-2 text-xs text-text">
            {site.address}
          </div>
        </div>
      </div>
    </section>
  );
}

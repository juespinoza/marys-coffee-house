import Image from "next/image";
import Link from "next/link";
import TrackLink from "../analytics/TrackLink";

export default function Footer({
  locale,
  data,
}: {
  locale: string;
  data: any;
}) {
  const base = `/${locale}`;
  const nav = data?.nav ?? {};
  const site = data?.site ?? {};
  const social = site?.social ?? {};

  return (
    <footer className="mt-4 bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Left: logo + tagline + social */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 bg-primary/10">
                <Image alt={site.name} src="/logo.jpg" width={80} height={80} />
              </div>
              <div className="font-semibold">{site.name ?? "Coffee"}</div>
            </div>

            <p className="mt-4 text-sm text-white/70 max-w-xs">
              {site.description ?? "Café excepcional y pastelería artesanal."}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {social.facebook && (
                <TrackLink
                  href={social.facebook}
                  target="_blank"
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 border border-white/15
                             hover:bg-white/15 transition"
                  aria-label="Facebook"
                  eventName="social_click"
                  eventParams={{ network: "facebook", location: "footer" }}
                >
                  f
                </TrackLink>
              )}
              {social.instagram && (
                <TrackLink
                  href={social.instagram}
                  target="_blank"
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 border border-white/15
                             hover:bg-white/15 transition"
                  eventName="social_click"
                  eventParams={{ network: "instagram", location: "footer" }}
                  aria-label="Instagram"
                >
                  ◎
                </TrackLink>
              )}
            </div>
          </div>

          {/* Middle: menu links */}
          <div className="md:justify-self-center">
            <div className="font-semibold">Menú</div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link className="hover:text-white transition" href={base}>
                  {nav.home ?? "Inicio"}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition"
                  href={`${base}/menu`}
                >
                  {nav.menu ?? "Menú"}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition"
                  href={`${base}/products`}
                >
                  {nav.products ?? "Productos"}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition"
                  href={`${base}/about`}
                >
                  {nav.about ?? "Nosotros"}
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition"
                  href={`${base}/contact`}
                >
                  {nav.contact ?? "Contacto"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: visit info */}
          <div className="md:justify-self-end">
            <div className="font-semibold">Visítanos</div>

            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="flex gap-2">
                <span aria-hidden>📍</span>
                <span>{site.address ?? "-"}</span>
              </div>

              <div className="flex gap-2">
                <span aria-hidden>🕒</span>
                <div>
                  <div>{site?.hours?.weekdays ?? ""}</div>
                  <div>{site?.hours?.weekends ?? ""}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {site.name ?? "Coffee Shop"}. Todos los
          derechos reservados.
          <div>
            <i>
              Desarrollado por{" "}
              <TrackLink
                href="https://www.instagram.com/magnitudvega"
                target="_blank"
                eventName="julia_espinoza"
                className="underline"
              >
                Magnitud Vega
              </TrackLink>
            </i>
          </div>
        </div>
      </div>
    </footer>
  );
}

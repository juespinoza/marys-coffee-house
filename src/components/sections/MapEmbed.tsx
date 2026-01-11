import TrackBox from "../analytics/TrackBox";
import { normalizeEmbedUrl } from "@/lib/utils";

export default function MapEmbed({ embedUrl }: { embedUrl: string }) {
  if (!embedUrl) return null;

  const normalizedUrl = normalizeEmbedUrl(embedUrl);

  return (
    <section
      className="rounded-xl2 border border-border bg-surface shadow-soft overflow-hidden"
      aria-label="Mapa"
    >
      <div className="relative w-full h-105 md:h-130 bg-bg">
        <TrackBox
          eventName="map_interaction"
          eventParams={{ action: "iframe_click" }}
          className="absolute inset-0 z-10"
        >
          {/* overlay transparente */}
          <div className="absolute inset-0 z-10" aria-hidden />
        </TrackBox>
        <iframe
          src={normalizedUrl}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Google Maps"
        />
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReviewsData } from "@/lib/types";
import TrackLink from "../analytics/TrackLink";

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`${full} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-primary" : "text-border"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews({ reviews }: { reviews?: ReviewsData }) {
  const items = reviews?.items ?? [];

  return (
    <section className="py-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl">
          {reviews?.title ?? "Customer Reviews"}
        </h2>

        {(reviews?.rating || reviews?.count) && (
          <div className="mt-3 flex items-center justify-center gap-3 text-sm text-muted">
            {typeof reviews.rating === "number" && (
              <>
                <Stars value={reviews.rating} />
                <span className="font-semibold text-text">
                  {reviews.rating.toFixed(1)}
                </span>
              </>
            )}
            {typeof reviews.count === "number" && (
              <span>({reviews.count} reseñas)</span>
            )}
            {reviews?.sourceLabel && (
              <span className="hidden sm:inline">· {reviews.sourceLabel}</span>
            )}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mx-auto mt-8 max-w-3xl rounded-xl2 border border-border bg-surface shadow-soft p-6 text-center">
          <div className="text-sm text-muted">
            Aún no hay reseñas configuradas para esta cafetería.
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-8 max-w-6xl grid gap-5 md:grid-cols-3">
          {items.slice(0, 6).map((r, idx) => (
            <motion.article
              key={`${r.author}-${idx}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3 }}
              className="rounded-xl2 border border-border bg-surface shadow-soft p-5 hover:-translate-y-0.5 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{r.author}</div>
                  {r.date && (
                    <div className="text-xs text-muted mt-0.5">{r.date}</div>
                  )}
                </div>
                <Stars value={r.rating} />
              </div>

              <p className="mt-3 text-sm text-muted leading-relaxed">
                “{r.text}”
              </p>
            </motion.article>
          ))}
        </div>
      )}

      {reviews?.mapReviewsLink && (
        <div className="mt-6 text-center">
          <TrackLink
            href={reviews.mapReviewsLink}
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-bg px-4 py-2 text-sm hover:bg-primary2/20 hover:-translate-y-px transition shadow-soft"
            eventName="map_interaction"
            eventParams={{ action: "open_google_maps" }}
          >
            Ver más en Google Maps
          </TrackLink>
        </div>
      )}
    </section>
  );
}

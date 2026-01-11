"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { Product } from "@/lib/types";
import { formatGs, clampImages } from "@/lib/utils";

export default function ProductsGrid({
  folder,
  products,
}: {
  folder: string;
  products: Product[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);

  function onOpen(p: Product) {
    setActive(p);
    setOpen(true);
    // Bloquear scroll del body
    document.documentElement.style.overflow = "hidden";
  }

  function onClose() {
    setOpen(false);
    // Restaurar scroll
    document.documentElement.style.overflow = "";
    // Esperar a que cierre la animación para limpiar el active
    setTimeout(() => setActive(null), 150);
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const imgs = clampImages(p.images);
          const cover = imgs[0];

          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35 }}
              className="rounded-sm border border-border bg-surface shadow-soft overflow-hidden \
              hover:shadow-md hover:-translate-y-0.5 transition flex flex-col"
            >
              <div className="relative aspect-4/3 bg-bg">
                {cover ? (
                  <Image
                    src={cloudinaryUrl(folder, cover)}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-muted">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug">
                    {p.name}
                  </h3>
                  <div className="text-sm font-semibold text-primary whitespace-nowrap">
                    {formatGs(p.price)}
                  </div>
                </div>

                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {p.short}
                </p>

                <button
                  onClick={() => onOpen(p)}
                  className="mt-4 w-full rounded-lg border border-border bg-bg px-4 py-2 text-sm
                             hover:bg-primary2/20 hover:-translate-y-px transition shadow-soft"
                >
                  Ver detalles
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      <ProductModal
        open={open}
        onClose={onClose}
        product={active}
        folder={folder}
      />
    </>
  );
}

function ProductModal({
  open,
  onClose,
  product,
  folder,
}: {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  folder: string;
}) {
  const images = useMemo(() => clampImages(product?.images ?? []), [product]);

  const [selected, setSelected] = useState(0);

  // Reset selección al abrir un producto nuevo
  // (cuando cambia product.id)
  useMemo(() => {
    setSelected(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4">
          {/* overlay */}
          <motion.button
            aria-label="Cerrar modal"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-3xl rounded-xl2 border border-border bg-surface shadow-soft overflow-hidden"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
              <div>
                <div className="text-lg font-semibold">{product.name}</div>
                <div className="text-sm text-primary font-semibold">
                  {formatGs(product.price)}
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg border border-border bg-bg px-3 py-2 text-sm hover:bg-primary2/20 transition"
              >
                Cerrar
              </button>
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-2">
              {/* Galería */}
              <div>
                <div className="relative aspect-4/3 rounded-xl2 overflow-hidden border border-border bg-bg">
                  {images[selected] ? (
                    <Image
                      src={cloudinaryUrl(folder, images[selected])}
                      alt={`${product.name} - imagen ${selected + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={false}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-muted">
                      Sin imagen
                    </div>
                  )}
                </div>

                {/* Thumbs */}
                {images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => {
                      const active = idx === selected;
                      return (
                        <button
                          key={img + idx}
                          onClick={() => setSelected(idx)}
                          className={[
                            "relative h-16 w-20 flex-none rounded-lg overflow-hidden border transition",
                            active
                              ? "border-primary"
                              : "border-border hover:border-primary2",
                          ].join(" ")}
                          aria-label={`Ver imagen ${idx + 1}`}
                        >
                          <Image
                            src={cloudinaryUrl(folder, img)}
                            alt={`${product.name} - miniatura ${idx + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Texto */}
              <div>
                <p className="text-sm text-muted leading-relaxed">
                  {product.short}
                </p>
                <div className="mt-4 rounded-xl2 border border-border bg-bg p-4">
                  <div className="text-sm font-semibold">Descripción</div>
                  <p className="mt-2 text-sm leading-relaxed text-text/90">
                    {product.long}
                  </p>
                </div>

                <div className="mt-4 text-xs text-muted">
                  * Imágenes: {images.length} / 5
                </div>
              </div>
            </div>
          </motion.div>

          {/* ESC para cerrar */}
          <EscToClose onClose={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}

function EscToClose({ onClose }: { onClose: () => void }) {
  useMemo(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return null;
}

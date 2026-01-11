import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

export default function Gallery({
  cafe,
  folder,
  images,
}: {
  cafe: string;
  folder: string;
  images: string[]; // máximo 10
}) {
  const list = (images ?? []).slice(0, 10);

  return (
    <section className="grid gap-2 md:grid-cols-2">
      {/* Dos columnas grandes como en tu diseño */}
      {list.slice(0, 2).map((img, idx) => (
        <div
          key={img + idx}
          className="relative aspect-16/10 rounded-sm overflow-hidden shadow-soft bg-bg"
        >
          <Image
            src={cloudinaryUrl(folder, img)}
            alt={`Galería ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-[1.02] transition duration-300"
            loading="eager"
          />
        </div>
      ))}

      {/* Si hay más, mostramos una grilla secundaria abajo */}
      {list.length > 2 && (
        <div className="md:col-span-2 grid gap-2 sm:grid-cols-3">
          {list.slice(2).map((img, idx) => (
            <div
              key={img + idx}
              className="relative aspect-4/3 rounded-sm overflow-hidden bg-bg"
            >
              <Image
                src={cloudinaryUrl(folder, img)}
                alt={`Galería extra ${idx + 3}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover:scale-[1.02] transition duration-300"
                loading="eager"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

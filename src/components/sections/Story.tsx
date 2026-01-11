import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

type StoryData = {
  image: string; // cloudinary filename
  paragraphs: string[]; // texto en 1..n párrafos
};

export default function Story({
  cafe,
  folder,
  story,
}: {
  cafe: string;
  folder: string;
  story: StoryData;
}) {
  if (!story) return null;

  return (
    <section className="grid gap-8 md:grid-cols-2 items-center">
      {/* Imagen izquierda */}
      <div className="relative aspect-16/10 rounded-md overflow-hidden border border-border shadow-soft bg-bg">
        <Image
          src={cloudinaryUrl(folder, story.image)}
          alt="Nuestra historia"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
          loading="eager"
        />
      </div>

      {/* Texto derecha */}
      <div className="text-sm md:text-base text-muted leading-relaxed">
        {Array.isArray(story.paragraphs) &&
          story.paragraphs.map((p, idx) => (
            <p key={idx} className={idx === 0 ? "" : "mt-5"}>
              {p}
            </p>
          ))}
      </div>
    </section>
  );
}

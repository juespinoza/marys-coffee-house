import { getCafeContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Gallery from "@/components/sections/Gallery";
import VisitBanner from "@/components/sections/VisitBanner";

export const revalidate = 3600; // 1 hora

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const cafe = process.env.NEXT_PUBLIC_CAFE_NAME || "Coffee Shop";
  const data = await getCafeContent(locale);

  return (
    <div className="bg-bg">
      <Hero cafe={cafe} site={data.site} hero={data.home.hero} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-3xl md:text-4xl">
          {data.home.features.title}
        </h2>
        <div className="mt-8">
          <Features items={data.home.features.list} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <Gallery
          cafe={cafe}
          folder={data.site.cloudinaryFolder}
          images={data.home.gallery}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <VisitBanner
          cafe={cafe}
          visit={data.home.visit}
          googleMapsUrl={data.site.googleMapsUrl}
        />
      </section>
    </div>
  );
}

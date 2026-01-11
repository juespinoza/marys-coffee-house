import { Metadata } from "next";
import { getCafeContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { buildMetadata, buildPageTitle } from "@/lib/seo";
import ContactForm from "@/components/sections/ContactForm";
import MapEmbed from "@/components/sections/MapEmbed";
import Reviews from "@/components/sections/Reviews";
import TrackLink from "@/components/analytics/TrackLink";

export const revalidate = 3600; // 1 hora

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; cafe: string }>;
}): Promise<Metadata> {
  const { locale, cafe } = await params;
  const data = await getCafeContent(locale);

  const pageTitle = data?.contactPage?.title ?? data?.nav?.contact ?? "Contact";

  const dataWithSeo = {
    ...data,
    seo: {
      ...(data?.seo ?? {}),
      title: buildPageTitle(pageTitle, data?.site?.name ?? cafe),
      description:
        data?.seo.description ??
        data?.contactPage?.subtitle ??
        data?.site?.description ??
        "",
    },
  };

  return buildMetadata({ locale: locale, slug: "contact" }, dataWithSeo);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale; cafe: string }>;
}) {
  const { locale, cafe } = await params;
  const data = await getCafeContent(locale);
  return (
    <div className="bg-bg">
      <header className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h1 className="text-4xl font-semibold">{data.contactPage.title}</h1>
          <p className="mt-2 opacity-90">{data.contactPage.subtitle}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4 md:grid-cols-2">
        <ContactForm
          cafe={cafe}
          locale={locale}
          formText={data.contactPage.form}
          site={data.site}
        />

        <div className="space-y-4">
          <div className="rounded-md border border-border bg-surface shadow-soft p-5">
            <div className="text-sm text-muted">Visítanos</div>
            <div className="mt-1 font-medium">{data.site.address}</div>
          </div>

          <div className="rounded-md border border-border bg-surface shadow-soft p-5">
            <div className="text-sm text-muted">Horario de Atención</div>
            <div className="mt-1">{data.site.hours.weekdays}</div>
            <div>{data.site.hours.weekends}</div>
          </div>

          <div className="rounded-md border border-border bg-surface shadow-soft p-5">
            <div className="text-sm text-muted">Síguenos</div>
            <div className="mt-3 flex gap-3">
              {data.site?.social?.facebook && (
                <TrackLink
                  href={data.site.social.facebook}
                  target="_blank"
                  className="rounded-full border border-border bg-bg px-3 py-2 text-sm hover:bg-primary2/20 transition"
                  eventName="social_click"
                  eventParams={{ network: "facebook", location: "contact" }}
                >
                  Facebook
                </TrackLink>
              )}
              {data.site?.social?.instagram && (
                <TrackLink
                  href={data.site.social.instagram}
                  target="_blank"
                  className="rounded-full border border-border bg-bg px-3 py-2 text-sm hover:bg-primary2/20 transition"
                  eventName="social_click"
                  eventParams={{ network: "instagram", location: "contact" }}
                >
                  Instagram
                </TrackLink>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <MapEmbed embedUrl={data.contactPage.reviews.mapEmbedUrl} />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <Reviews reviews={data.contactPage.reviews} />
      </div>
    </div>
  );
}

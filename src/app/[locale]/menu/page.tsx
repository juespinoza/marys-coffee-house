import type { Metadata } from "next";
import { getCafeContent } from "@/lib/content";
import { buildMetadata, buildPageTitle } from "@/lib/seo";
import MenuSections from "@/components/sections/MenuSections";
import { Locale } from "@/lib/i18n";

export const revalidate = 3600; // 1 hora

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; cafe: string }>;
}): Promise<Metadata> {
  const { locale, cafe } = await params;
  const data = await getCafeContent(locale);

  // Clonamos data para ajustar title solo para esta page
  const pageTitle = data?.menuPage?.title ?? data?.nav?.menu ?? "Menu";

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

  return buildMetadata({ locale: locale, slug: "menu" }, dataWithSeo);
}

export default async function MenuPage({
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
          <h1 className="text-4xl font-semibold">{data.menuPage.title}</h1>
          <p className="mt-2 opacity-90">{data.menuPage.subtitle}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <MenuSections sections={data.menuPage.sections} />
      </div>
    </div>
  );
}

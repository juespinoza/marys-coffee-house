import ProductsGrid from "@/components/sections/ProductsGrid";
import { getCafeContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { buildMetadata, buildPageTitle } from "@/lib/seo";
import { Metadata } from "next";

export const revalidate = 3600; // 1 hora

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; cafe: string }>;
}): Promise<Metadata> {
  const { locale, cafe } = await params;
  const data = await getCafeContent(locale);

  const pageTitle =
    data?.productsPage?.title ?? data?.nav?.products ?? "Products";

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

  return buildMetadata({ locale: locale, slug: "products" }, dataWithSeo);
}

export default async function ProductsPage({
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
          <h1 className="text-4xl font-semibold">{data.productsPage.title}</h1>
          <p className="mt-2 opacity-90">{data.productsPage.subtitle}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <ProductsGrid
          folder={data.site.cloudinaryFolder}
          products={data.productsPage.products}
        />
      </div>
    </div>
  );
}

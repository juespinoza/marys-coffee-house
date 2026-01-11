import type { Metadata } from "next";

/**
 * Helpers
 */
function cleanUrl(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function getSiteBaseUrl() {
  // Recomendado: setear NEXT_PUBLIC_SITE_URL=https://tudominio.com
  // Fallback: localhost en dev
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000"
  );
}

function ensureArray<T>(v: unknown, fallback: T[] = []) {
  return Array.isArray(v) ? (v as T[]) : fallback;
}

/**
 * buildMetadata
 * - params: { locale, slug? } donde slug podría ser "menu" | "products" | ...
 * - data: contenido JSON devuelto por getCafeContent(cafe, locale)
 */
export function buildMetadata(
  params: { locale: string; slug?: string },
  data: any
): Metadata {
  const baseUrl = getSiteBaseUrl();
  const metadataBase = new URL(baseUrl);

  const siteName: string = data?.site?.name ?? "Coffee Template";

  const defaultDescription: string =
    data?.seo?.description ?? data?.site?.description ?? "";

  // SEO general (por café)
  const seoTitle: string = data?.seo?.title ?? `${siteName}`;

  const seoKeywords: string[] = ensureArray<string>(data?.seo?.keywords, []);

  const ogImage: string | undefined = data?.seo?.ogImage; // puede ser URL absoluta o relativa (si es relativa, la convertimos)

  // Slug actual (para canonical / alternates)
  const slug = params.slug?.replace(/^\//, "") ?? "";
  const path = slug ? `/${params.locale}/${slug}` : `/${params.locale}`;

  const canonical = cleanUrl(baseUrl, path);

  // Alternates por idioma (si querés, los podés hardcodear o leer locales desde lib/i18n)
  const languages: Record<string, string> = {
    es: cleanUrl(baseUrl, slug ? `/es/${slug}` : `/es`),
    en: cleanUrl(baseUrl, slug ? `/en/${slug}` : `/en`),
    pt: cleanUrl(baseUrl, slug ? `/pt/${slug}` : `/pt`),
  };

  const images: string[] = ogImage
    ? [ogImage.startsWith("http") ? ogImage : cleanUrl(baseUrl, ogImage)]
    : [];

  return {
    metadataBase,
    title: seoTitle,
    description: defaultDescription,
    keywords: seoKeywords.length ? seoKeywords : undefined,

    alternates: {
      canonical,
      languages,
    },

    openGraph: {
      type: "website",
      title: seoTitle,
      description: defaultDescription,
      siteName,
      locale: params.locale,
      url: canonical,
      images,
    },

    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: seoTitle,
      description: defaultDescription,
      images: images.length ? images : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * (Opcional) helper por página:
 * Si querés títulos específicos por sección:
 * - buildPageTitle("Menú", "Almarreina Coffee Shop") => "Menú | Almarreina Coffee Shop"
 */
export function buildPageTitle(page: string, siteName: string) {
  const p = (page || "").trim();
  const s = (siteName || "").trim();
  if (!p) return s;
  if (!s) return p;
  return `${p} | ${s}`;
}

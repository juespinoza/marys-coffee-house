import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { getCafeContent, getCafeTheme } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import { locales, type Locale } from "@/lib/i18n";
import { Inter, Fraunces } from "next/font/google";
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });

function cssVarsFromTheme(theme: any) {
  const to = (arr: number[]) => arr.join(" ");
  return `
    :root{
      --bg:${to(theme.light.bg)};
      --surface:${to(theme.light.surface)};
      --text:${to(theme.light.text)};
      --muted:${to(theme.light.muted)};
      --primary:${to(theme.light.primary)};
      --primary2:${to(theme.light.primary2)};
      --border:${to(theme.light.border)};
      --font-display:${theme.fonts.display}, ui-serif, Georgia, serif;
      --font-body:${
        theme.fonts.body
      }, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
    }
    .dark{
      --bg:${to(theme.dark.bg)};
      --surface:${to(theme.dark.surface)};
      --text:${to(theme.dark.text)};
      --muted:${to(theme.dark.muted)};
      --primary:${to(theme.dark.primary)};
      --primary2:${to(theme.dark.primary2)};
      --border:${to(theme.dark.border)};
    }
  `;
}

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "es";

  const data = await getCafeContent(locale);
  return buildMetadata({ locale }, data);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";

  const data = await getCafeContent(locale);
  const theme = await getCafeTheme();

  return (
    <html
      lang={locale}
      className={`${body.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* <style dangerouslySetInnerHTML={{ __html: cssVarsFromTheme(theme) }} /> */}
      </head>

      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GoogleAnalytics />
          <Header locale={locale} nav={data.nav} siteName={data.site.name} />
          <main className="min-h-[60vh]">{children}</main>
          <Footer locale={locale} data={data} />
        </ThemeProvider>
      </body>
    </html>
  );
}

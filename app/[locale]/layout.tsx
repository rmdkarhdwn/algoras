import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildPageMetadata } from "@/lib/metadata";
import { isValidLocale, type AppLocale } from "@/lib/site";

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "seo.layout" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    title: t("title"),
    description: t("description"),
    keywords: (t.raw("keywords") as string[]) ?? [],
  });
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const nav = await getTranslations({ locale, namespace: "navigation" });
  const footer = await getTranslations({ locale, namespace: "footer" });

  return (
    <NextIntlClientProvider locale={locale}>
      <div className="min-h-screen">
        <Header
          locale={locale as AppLocale}
          labels={{
            home: nav("home"),
            algorithms: nav("algorithms"),
            dataStructures: nav("dataStructures"),
          }}
        />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 md:px-10">
          {children}
        </main>
        <Footer locale={locale as AppLocale} tagline={footer("tagline")} />
      </div>
    </NextIntlClientProvider>
  );
}

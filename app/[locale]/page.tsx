import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import { HeroSection } from "@/components/ui/HeroSection";
import { buildPageMetadata } from "@/lib/metadata";
import { isValidLocale, type AppLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "seo.home" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    title: t("title"),
    description: t("description"),
    keywords: (t.raw("keywords") as string[]) ?? [],
    pathname: "/",
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "home" });
  const sections = t.raw("sections") as { title: string; description: string }[];

  return (
    <>
      <div className="-mx-6 -mt-10 md:-mx-10">
        <HeroSection
          locale={locale}
          heading={t("title")}
          description={t("description")}
          primaryCta={t("primaryCta")}
        />
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardContent className="space-y-3 p-6">
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

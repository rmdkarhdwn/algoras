import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import { algorithms } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { isValidLocale, type AppLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "seo.algorithms" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    title: t("title"),
    description: t("description"),
    keywords: (t.raw("keywords") as string[]) ?? [],
    pathname: "/algorithms",
  });
}

export default async function AlgorithmsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "algorithmsPage" });

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{t("badge")}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">{t("description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.slug}>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{algorithm.name}</CardTitle>
                <Badge>{algorithm.difficulty}</Badge>
              </div>
              <CardDescription>{algorithm.description[locale as AppLocale]}</CardDescription>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{`${t("bestLabel")} ${algorithm.complexity.best}`}</span>
                <Link
                  href={`/${locale}/algorithms/${algorithm.slug}`}
                  className="font-semibold text-accent-strong"
                >
                  {t("detailCta")}
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

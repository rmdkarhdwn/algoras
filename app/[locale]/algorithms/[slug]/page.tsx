import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CodeViewer } from "@/components/algorithm/CodeViewer";
import { SortingPlayer } from "@/components/algorithm/Visualizer/SortingPlayer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { algorithms, getAlgorithmBySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { isValidLocale, type AppLocale } from "@/lib/site";

export function generateStaticParams() {
  return algorithms.flatMap((algorithm) => [
    { locale: "ko", slug: algorithm.slug },
    { locale: "en", slug: algorithm.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const algorithm = getAlgorithmBySlug(slug);
  if (!algorithm) return {};

  const t = await getTranslations({ locale, namespace: "seo.algorithms" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    title: `${algorithm.name} | Algoras`,
    description: algorithm.description[locale as AppLocale],
    keywords: (t.raw("keywords") as string[]) ?? [],
    pathname: `/algorithms/${slug}`,
  });
}

export default async function AlgorithmDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const algorithm = getAlgorithmBySlug(slug);
  if (!algorithm) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "algorithmDetail" });

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{t("category")}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{algorithm.name}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {algorithm.description[locale as AppLocale]}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <CardTitle>{t("visualizerTitle")}</CardTitle>
            <SortingPlayer algorithmSlug={algorithm.slug} sampleInput={algorithm.sampleInput} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <CardTitle>{t("codeTitle")}</CardTitle>
            <CodeViewer algorithmSlug={algorithm.slug} codeExamples={algorithm.codeExamples} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

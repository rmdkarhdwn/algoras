import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CodeViewer } from "@/components/algorithm/CodeViewer";
import { ComplexityTable } from "@/components/algorithm/ComplexityTable";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { dataStructures, getDataStructureBySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { isValidLocale, type AppLocale } from "@/lib/site";

export function generateStaticParams() {
  return dataStructures.flatMap((structure) => [
    { locale: "ko", slug: structure.slug },
    { locale: "en", slug: structure.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const structure = getDataStructureBySlug(slug);
  if (!structure) return {};

  const t = await getTranslations({ locale, namespace: "seo.dataStructures" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    title: `${structure.name} | Algoras`,
    description: structure.description[locale as AppLocale],
    keywords: (t.raw("keywords") as string[]) ?? [],
    pathname: `/data-structures/${slug}`,
  });
}

export default async function DataStructureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const structure = getDataStructureBySlug(slug);
  if (!structure) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "dataStructureDetail" });

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{structure.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{structure.name}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {structure.description[locale as AppLocale]}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-6 p-6">
            <CardTitle>{t("coreOperations")}</CardTitle>
            <ComplexityTable complexity={structure.complexity} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <CardTitle>{t("recommendedUseCases")}</CardTitle>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              {structure.useCases[locale as AppLocale].map((useCase) => (
                <li key={useCase} className="rounded-2xl border border-border bg-white/60 px-4 py-3">
                  {useCase}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <CardTitle>{t("codeTitle")}</CardTitle>
          <CodeViewer algorithmSlug={structure.slug} codeExamples={structure.codeExamples} />
        </CardContent>
      </Card>
    </section>
  );
}

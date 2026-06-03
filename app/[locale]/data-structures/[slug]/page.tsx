import dataStructures from "@/data/algorithms/data-structures.json";
import { CodeViewer } from "@/components/algorithm/CodeViewer";
import { ComplexityTable } from "@/components/algorithm/ComplexityTable";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { notFound } from "next/navigation";

const locales = ["ko", "en"] as const;

export default async function DataStructureDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const structure = dataStructures.find((item) => item.slug === slug);

  if (!structure) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{structure.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{structure.name}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {structure.description[locale as "ko" | "en"]}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-6 p-6">
            <CardTitle>{locale === "ko" ? "핵심 연산" : "Core Operations"}</CardTitle>
            <ComplexityTable complexity={structure.complexity} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <CardTitle>{locale === "ko" ? "추천 사용처" : "Recommended Use Cases"}</CardTitle>
            <ul className="space-y-3 text-sm leading-7 text-muted">
              {structure.useCases[locale as "ko" | "en"].map((useCase) => (
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
          <CardTitle>{locale === "ko" ? "TypeScript 예제" : "TypeScript Example"}</CardTitle>
          <CodeViewer code={structure.codeExamples.typescript} language="ts" />
        </CardContent>
      </Card>
    </section>
  );
}

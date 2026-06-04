import dataStructures from "@/data/algorithms/data-structures.json";
import { CodeViewer } from "@/components/algorithm/CodeViewer";
import { ComplexityTable } from "@/components/algorithm/ComplexityTable";
import { ArrayDemo } from "@/components/algorithm/DataStructure/ArrayDemo";
import { StackDemo } from "@/components/algorithm/DataStructure/StackDemo";
import { QueueDemo } from "@/components/algorithm/DataStructure/QueueDemo";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { notFound } from "next/navigation";

const locales = ["ko", "en"] as const;

const DEMOS: Record<string, React.ReactNode> = {
  array: <ArrayDemo />,
  stack: <StackDemo />,
  queue: <QueueDemo />,
};

export function generateStaticParams() {
  return dataStructures.flatMap((s) =>
    locales.map((locale) => ({ locale, slug: s.slug }))
  );
}

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

  const demo = DEMOS[slug];

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{structure.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{structure.name}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {structure.description[locale as "ko" | "en"]}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Left: Demo + Complexity */}
        <div className="space-y-6">
          {demo && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <CardTitle>{locale === "ko" ? "인터랙티브 데모" : "Interactive Demo"}</CardTitle>
                {demo}
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="space-y-4 p-6">
              <CardTitle>{locale === "ko" ? "핵심 연산" : "Core Operations"}</CardTitle>
              <ComplexityTable complexity={structure.complexity} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Code */}
        <Card>
          <CardContent className="space-y-4 p-6">
            <CardTitle>{locale === "ko" ? "코드 예제" : "Code Example"}</CardTitle>
            <CodeViewer algorithmSlug={structure.slug} codeExamples={structure.codeExamples} />
            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
                {locale === "ko" ? "추천 사용처" : "Use Cases"}
              </p>
              <ul className="space-y-2">
                {structure.useCases[locale as "ko" | "en"].map((useCase) => (
                  <li key={useCase} className="rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-muted">
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

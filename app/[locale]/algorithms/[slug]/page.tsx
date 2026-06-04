import algorithms from "@/data/algorithms/algorithms.json";
import { CodeViewer } from "@/components/algorithm/CodeViewer";
import { ComplexityTable } from "@/components/algorithm/ComplexityTable";
import { Controls } from "@/components/algorithm/Controls";
import { Visualizer } from "@/components/algorithm/Visualizer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { notFound } from "next/navigation";

const locales = ["ko", "en"] as const;

export default async function AlgorithmDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const algorithm = algorithms.find((item) => item.slug === slug);

  if (!algorithm) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{algorithm.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{algorithm.name}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {algorithm.description[locale as "ko" | "en"]}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <CardTitle>{locale === "ko" ? "Visualizer" : "Visualizer"}</CardTitle>
            <Visualizer values={algorithm.sampleInput} />
            <Controls />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-6 p-6">
            <CardTitle>{locale === "ko" ? "복잡도" : "Complexity"}</CardTitle>
            <ComplexityTable complexity={algorithm.complexity} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-6 p-6">
          <CardTitle>{locale === "ko" ? "코드 예제" : "Code Example"}</CardTitle>
          <CodeViewer algorithmSlug={algorithm.slug} codeExamples={algorithm.codeExamples} />
        </CardContent>
      </Card>
    </section>
  );
}

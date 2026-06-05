import algorithms from "@/data/algorithms/algorithms.json";
import { CodeViewer } from "@/components/algorithm/CodeViewer";
import { ComplexityTable } from "@/components/algorithm/ComplexityTable";
import { SortingPlayer } from "@/components/algorithm/Visualizer/SortingPlayer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import { notFound } from "next/navigation";

const locales = ["ko", "en"] as const;

export function generateStaticParams() {
  return algorithms.flatMap((a) =>
    locales.map((locale) => ({ locale, slug: a.slug }))
  );
}

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

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-2 p-5">
            <CardDescription>{locale === "ko" ? "난이도" : "Difficulty"}</CardDescription>
            <CardTitle>{algorithm.difficulty}</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-5">
            <CardDescription>{locale === "ko" ? "평균 시간" : "Average Time"}</CardDescription>
            <CardTitle>{algorithm.complexity.average}</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-5">
            <CardDescription>{locale === "ko" ? "공간 복잡도" : "Space Complexity"}</CardDescription>
            <CardTitle>{algorithm.complexity.space}</CardTitle>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <CardTitle>{locale === "ko" ? "시각화" : "Visualizer"}</CardTitle>
              <CardDescription>
                {locale === "ko"
                  ? "샘플 입력을 재생하거나 직접 배열을 넣어서 단계별 흐름을 확인할 수 있습니다."
                  : "Play through the sample input or enter your own array to inspect each step."}
              </CardDescription>
              <SortingPlayer
                key={algorithm.slug}
                algorithmSlug={algorithm.slug}
                sampleInput={algorithm.sampleInput}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <CardTitle>{locale === "ko" ? "복잡도 요약" : "Complexity Summary"}</CardTitle>
              <ComplexityTable complexity={algorithm.complexity} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <Card>
            <CardContent className="space-y-4 p-6">
              <CardTitle>{locale === "ko" ? "코드 예제" : "Code Example"}</CardTitle>
              <CardDescription>
                {locale === "ko"
                  ? "현재 시각화 단계와 연결된 코드 라인을 함께 추적할 수 있습니다."
                  : "Trace the relevant lines of code alongside the active visualization step."}
              </CardDescription>
              <CodeViewer
                algorithmSlug={algorithm.slug}
                codeExamples={algorithm.codeExamples}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-6">
              <CardTitle>{locale === "ko" ? "핵심 포인트" : "Key Notes"}</CardTitle>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  {locale === "ko"
                    ? `최선 ${algorithm.complexity.best}, 평균 ${algorithm.complexity.average}, 최악 ${algorithm.complexity.worst}`
                    : `Best ${algorithm.complexity.best}, average ${algorithm.complexity.average}, worst ${algorithm.complexity.worst}`}
                </li>
                <li>
                  {locale === "ko"
                    ? `샘플 입력 길이: ${algorithm.sampleInput.length}`
                    : `Sample input size: ${algorithm.sampleInput.length}`}
                </li>
                <li>
                  {locale === "ko"
                    ? "동일한 플레이어 구조를 사용해 다른 정렬 알고리즘과도 비교할 수 있습니다."
                    : "This page reuses the same player structure so you can compare it directly with the other sorting algorithms."}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

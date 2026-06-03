import algorithms from "@/data/algorithms/algorithms.json";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["ko", "en"] as const;

export default async function AlgorithmsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <Badge>{locale === "ko" ? "Algorithm Catalog" : "Algorithm Catalog"}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          {locale === "ko" ? "정렬 알고리즘 컬렉션" : "Sorting Algorithm Collection"}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {locale === "ko"
            ? "알고리즘의 핵심 아이디어와 시간 복잡도를 한 화면에서 빠르게 비교할 수 있도록 준비해 둔 목록입니다."
            : "A structured catalog for comparing core ideas, trade-offs, and complexity characteristics at a glance."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.slug}>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{algorithm.name}</CardTitle>
                <Badge>{algorithm.difficulty}</Badge>
              </div>
              <CardDescription>{algorithm.description[locale as "ko" | "en"]}</CardDescription>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{`Best ${algorithm.complexity.best}`}</span>
                <Link
                  href={`/${locale}/algorithms/${algorithm.slug}`}
                  className="font-semibold text-accent-strong"
                >
                  {locale === "ko" ? "자세히 보기" : "View details"}
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

import dataStructures from "@/data/algorithms/data-structures.json";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { notFound } from "next/navigation";

const locales = ["ko", "en"] as const;

export default async function DataStructuresPage({
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
        <Badge>{locale === "ko" ? "Data Structures" : "Data Structures"}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          {locale === "ko" ? "자료구조 라이브러리" : "Data Structure Library"}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {locale === "ko"
            ? "배열부터 큐까지, 핵심 연산의 비용과 적합한 사용처를 빠르게 비교할 수 있는 자료구조 목록입니다."
            : "A practical overview of common structures, focusing on operation costs and the situations where each shines."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {dataStructures.map((structure) => (
          <Card key={structure.slug}>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{structure.name}</CardTitle>
                <Badge>{structure.category}</Badge>
              </div>
              <CardDescription>{structure.description[locale as "ko" | "en"]}</CardDescription>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{structure.primaryUseCase[locale as "ko" | "en"]}</span>
                <Link
                  href={`/${locale}/data-structures/${structure.slug}`}
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

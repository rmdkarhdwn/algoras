import algorithms from "@/data/algorithms/algorithms.json";
import { AlgorithmCatalog } from "@/components/algorithm/AlgorithmCatalog";
import { Badge } from "@/components/ui/Badge";
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
        <Badge>Algorithm Catalog</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          {locale === "ko" ? "정렬 알고리즘 컬렉션" : "Sorting Algorithm Collection"}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {locale === "ko"
            ? "알고리즘의 핵심 아이디어와 시간 복잡도를 한 화면에서 빠르게 비교할 수 있도록 준비해 둔 목록입니다."
            : "A structured catalog for comparing core ideas, trade-offs, and complexity characteristics at a glance."}
        </p>
      </div>

      <AlgorithmCatalog algorithms={algorithms} locale={locale} />
    </section>
  );
}

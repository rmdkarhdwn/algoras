"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";

type Algorithm = {
  slug: string;
  name: string;
  difficulty: string;
  complexity: { best: string; average: string; worst: string; space: string };
  description: { ko: string; en: string };
};

const DIFFICULTY_OPTIONS = [
  { value: "All", label: { ko: "전체", en: "All" } },
  { value: "Easy", label: { ko: "Easy", en: "Easy" } },
  { value: "Medium", label: { ko: "Medium", en: "Medium" } },
  { value: "Hard", label: { ko: "Hard", en: "Hard" } },
] as const;

type Props = {
  algorithms: Algorithm[];
  locale: string;
};

const difficultyColor: Record<string, string> = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

export function AlgorithmCatalog({ algorithms, locale }: Props) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<string>("All");

  const filtered = algorithms.filter((a) => {
    const matchName = a.name.toLowerCase().includes(query.toLowerCase());
    const matchDiff = difficulty === "All" || a.difficulty === difficulty;
    return matchName && matchDiff;
  });

  return (
    <div className="space-y-6">
      {/* Search + filter */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locale === "ko" ? "알고리즘 검색…" : "Search algorithms…"}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-white/25 focus:border-[#D4AF37]/50 transition-colors"
          style={{ minWidth: 180 }}
        />
        <div className="flex gap-1.5">
          {DIFFICULTY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDifficulty(option.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                difficulty === option.value
                  ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {option.label[locale as "ko" | "en"]}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-white/30">
          {locale === "ko" ? "검색 결과가 없습니다." : "No results found."}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((algorithm) => (
            <Card key={algorithm.slug}>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle>{algorithm.name}</CardTitle>
                  <span className={`text-xs font-semibold ${difficultyColor[algorithm.difficulty] ?? "text-white/40"}`}>
                    {algorithm.difficulty}
                  </span>
                </div>
                <CardDescription>
                  {algorithm.description[locale as "ko" | "en"]}
                </CardDescription>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span>avg {algorithm.complexity.average}</span>
                  <Link
                    href={`/${locale}/algorithms/${algorithm.slug}`}
                    className="font-semibold text-[#D4AF37] hover:opacity-80 transition-opacity"
                  >
                    {locale === "ko" ? "자세히 보기 →" : "View details →"}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

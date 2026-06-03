"use client";

import type { AlgorithmStep } from "@/lib/algorithms/types";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { useState } from "react";

// ─── Language definitions ─────────────────────────────────────────────────────

type Language = "ts" | "py" | "java";

type LangConfig = {
  label: string;
  lines: string[];
  getLine: (step: AlgorithmStep) => number;
};

const LANGS: Record<Language, LangConfig> = {
  ts: {
    label: "TypeScript",
    lines: [
      "function bubbleSort(arr: number[]): void {",
      "  const n = arr.length;",
      "",
      "  for (let i = 0; i < n - 1; i++) {",
      "    for (let j = 0; j < n - i - 1; j++) {",
      "      if (arr[j] > arr[j + 1]) {",
      "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];",
      "      }",
      "    }",
      "  }",
      "}",
    ],
    getLine: (s) => {
      if (s.comparing.length > 0) return 5;
      if (s.swapping.length > 0) return 6;
      if (s.sorted.length === s.array.length) return 10;
      if (s.sorted.length > 0) return 8;
      return 3;
    },
  },

  py: {
    label: "Python",
    lines: [
      "def bubble_sort(arr):",
      "    n = len(arr)",
      "",
      "    for i in range(n - 1):",
      "        for j in range(n - i - 1):",
      "            if arr[j] > arr[j + 1]:",
      "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
    ],
    getLine: (s) => {
      if (s.comparing.length > 0) return 5;
      if (s.swapping.length > 0) return 6;
      if (s.sorted.length === s.array.length) return 6;
      if (s.sorted.length > 0) return 4;
      return 3;
    },
  },

  java: {
    label: "Java",
    lines: [
      "void bubbleSort(int[] arr) {",
      "    int n = arr.length;",
      "",
      "    for (int i = 0; i < n - 1; i++) {",
      "        for (int j = 0; j < n - i - 1; j++) {",
      "            if (arr[j] > arr[j + 1]) {",
      "                int temp = arr[j];",
      "                arr[j] = arr[j + 1];",
      "                arr[j + 1] = temp;",
      "            }",
      "        }",
      "    }",
      "}",
    ],
    getLine: (s) => {
      if (s.comparing.length > 0) return 5;
      if (s.swapping.length > 0) return 6;
      if (s.sorted.length === s.array.length) return 12;
      if (s.sorted.length > 0) return 10;
      return 3;
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CodePanel() {
  const [lang, setLang] = useState<Language>("ts");
  const { steps, currentStep } = useVisualizationStore();

  const config = LANGS[lang];
  const step = steps[currentStep];
  const activeLine = step ? config.getLine(step) : -1;

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(245,245,245,0.35)" }}
        >
          코드
        </span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          className="cursor-pointer rounded-lg border bg-transparent px-3 py-1.5 text-xs outline-none transition"
          style={{
            borderColor: "rgba(245,245,245,0.12)",
            color: "#F5F5F5",
            background: "rgba(20,20,20,0.9)",
          }}
        >
          {(Object.keys(LANGS) as Language[]).map((id) => (
            <option key={id} value={id} style={{ background: "#141414" }}>
              {LANGS[id].label}
            </option>
          ))}
        </select>
      </div>

      {/* Code block */}
      <div
        className="overflow-auto rounded-xl border border-white/10"
        style={{ background: "rgba(13,13,13,0.85)" }}
      >
        <pre className="py-4 font-mono text-[13px] leading-[1.7]" aria-label="code">
          {config.lines.map((line, i) => {
            const isActive = i === activeLine;
            return (
              <div
                key={i}
                className="flex transition-colors"
                style={{
                  background: isActive ? "rgba(212,175,55,0.1)" : "transparent",
                  borderLeft: isActive
                    ? "2px solid #D4AF37"
                    : "2px solid transparent",
                }}
              >
                {/* Line number */}
                <span
                  className="select-none px-3 text-right"
                  style={{
                    color: isActive ? "rgba(212,175,55,0.5)" : "rgba(245,245,245,0.18)",
                    minWidth: "2.5rem",
                  }}
                >
                  {i + 1}
                </span>
                {/* Code text */}
                <span
                  className="flex-1 pr-4"
                  style={{
                    color: isActive ? "#D4AF37" : "rgba(245,245,245,0.65)",
                    whiteSpace: "pre",
                  }}
                >
                  {line || " "}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Step description */}
      <div
        className="min-h-[3.5rem] rounded-xl border border-white/10 px-4 py-3"
        style={{ background: "rgba(20,20,20,0.6)" }}
      >
        {step?.description ? (
          <p className="text-sm leading-relaxed" style={{ color: "rgba(245,245,245,0.6)" }}>
            {step.description}
          </p>
        ) : (
          <p className="text-sm" style={{ color: "rgba(245,245,245,0.22)" }}>
            재생 버튼을 눌러 시작하세요
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "@/stores/visualizationStore";
import type { SerializedToken } from "@/lib/shiki";
import type { LangAnnotation } from "@/data/algorithms/code-annotations";

const LANG_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  kotlin: "Kotlin",
  dart: "Dart",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  swift: "Swift",
  php: "PHP",
};

type Props = {
  tokensByLang: Record<string, { lines: SerializedToken[][]; fg: string }>;
  annotationsByLang: Record<string, LangAnnotation | null>;
  defaultLang: string;
};

export function CodeViewerClient({ tokensByLang, annotationsByLang, defaultLang }: Props) {
  const [activeLang, setActiveLang] = useState(defaultLang);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentStep = useVisualizationStore((s) => s.currentStep);
  const steps = useVisualizationStore((s) => s.steps);

  const tokens = tokensByLang[activeLang];
  const annotation = annotationsByLang[activeLang];
  const langs = Object.keys(tokensByLang);

  const highlightLine = (() => {
    if (!annotation || !steps.length) return null;
    const step = steps[currentStep];
    if (!step) return null;
    if (step.swapping?.length) return annotation.stepLineMap.swapping;
    if (step.comparing?.length) return annotation.stepLineMap.comparing;
    if (step.sorted?.length) return annotation.stepLineMap.sorted;
    return annotation.stepLineMap.initial;
  })();

  useEffect(() => {
    if (highlightLine == null) return;
    lineRefs.current[highlightLine - 1]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlightLine, activeLang]);

  const tooltipText =
    hoveredLine != null ? annotation?.lines[hoveredLine] ?? null : null;

  if (!tokens) return null;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141414] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        {langs.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveLang(lang)}
            className={`rounded-lg px-3 py-1 text-xs transition-colors ${
              activeLang === lang
                ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {LANG_LABELS[lang] ?? lang}
          </button>
        ))}
      </div>

      {/* Code */}
      <div className="overflow-auto p-4" style={{ maxHeight: "480px" }}>
        <pre className="text-sm leading-7">
          {tokens.lines.map((line, lineIdx) => {
            const lineNum = lineIdx + 1;
            const isActive = highlightLine === lineNum;

            return (
              <div
                key={lineIdx}
                ref={(el) => { lineRefs.current[lineIdx] = el; }}
                onMouseEnter={() => setHoveredLine(lineNum)}
                onMouseLeave={() => setHoveredLine(null)}
                className={`flex cursor-default gap-4 rounded px-3 transition-colors ${
                  isActive ? "bg-[#D4AF37]/15" : "hover:bg-white/[0.04]"
                }`}
              >
                <span className="w-5 shrink-0 select-none text-right text-white/20">
                  {lineNum}
                </span>
                <code>
                  {line.length === 0 ? (
                    <span>{" "}</span>
                  ) : (
                    line.map((token, i) => (
                      <span key={i} style={{ color: token.color ?? tokens.fg }}>
                        {token.content}
                      </span>
                    ))
                  )}
                </code>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Tooltip bar */}
      <div className="min-h-[36px] border-t border-white/10 px-5 py-2 text-xs text-white/50 transition-opacity">
        {tooltipText ?? " "}
      </div>
    </div>
  );
}

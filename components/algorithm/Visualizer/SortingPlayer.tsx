"use client";

import { useEffect, useState } from "react";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { STEP_GENERATORS } from "@/lib/algorithms";
import { AlgorithmVisualizer } from "./AlgorithmVisualizer";

type Props = {
  algorithmSlug: string;
  sampleInput: number[];
};

export function SortingPlayer({ algorithmSlug, sampleInput }: Props) {
  const [inputText, setInputText] = useState(sampleInput.join(", "));
  const [error, setError] = useState("");
  const setSteps = useVisualizationStore((s) => s.setSteps);

  useEffect(() => {
    const gen = STEP_GENERATORS[algorithmSlug];
    if (gen) setSteps(gen(sampleInput));
  }, [algorithmSlug]);

  const handleApply = () => {
    const values = inputText
      .split(/[\s,]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (values.length < 2 || values.length > 12) {
      setError("2 ~ 12개의 숫자를 입력하세요");
      return;
    }
    if (values.some((n) => n < 1 || n > 100)) {
      setError("각 숫자는 1 ~ 100 사이여야 합니다");
      return;
    }

    setError("");
    const gen = STEP_GENERATORS[algorithmSlug];
    if (gen) setSteps(gen(values));
    setInputText(values.join(", "));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => { setInputText(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder="예: 62, 24, 45, 18, 91, 33, 57"
          className="flex-1 rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-[#D4AF37]/50 transition-colors"
        />
        <button
          type="button"
          onClick={handleApply}
          className="shrink-0 rounded-xl border border-[#D4AF37]/30 px-4 py-2 text-sm text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
        >
          적용
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <AlgorithmVisualizer />
    </div>
  );
}

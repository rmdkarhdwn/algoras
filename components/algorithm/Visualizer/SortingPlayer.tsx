"use client";

import { BubbleSortVisualizer } from "@/components/algorithm/Visualizer/BubbleSortVisualizer";
import { VisualizerControls } from "@/components/algorithm/Controls/VisualizerControls";
import { STEP_GENERATORS } from "@/lib/algorithms";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { useEffect, useState } from "react";

type Props = {
  algorithmSlug: string;
  sampleInput: number[];
};

export function SortingPlayer({ algorithmSlug, sampleInput }: Props) {
  const { steps, currentStep, setSteps } = useVisualizationStore();
  const [inputValue, setInputValue] = useState(sampleInput.join(", "));
  const [error, setError] = useState("");

  useEffect(() => {
    const gen = STEP_GENERATORS[algorithmSlug];
    if (gen) setSteps(gen(sampleInput));
    setInputValue(sampleInput.join(", "));
  }, [algorithmSlug]);

  function handleApply() {
    const parsed = inputValue
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length < 2) { setError("2개 이상의 숫자를 입력하세요."); return; }
    if (parsed.length > 12) { setError("최대 12개까지 입력 가능합니다."); return; }

    setError("");
    const gen = STEP_GENERATORS[algorithmSlug];
    if (gen) setSteps(gen(parsed));
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="flex flex-col gap-8">
      <div
        className="rounded-2xl border border-white/10 p-6"
        style={{ background: "rgba(20,20,20,0.6)", minHeight: 340 }}
      >
        {currentStepData ? (
          <BubbleSortVisualizer step={currentStepData} />
        ) : (
          <div
            className="flex h-full min-h-[280px] items-center justify-center text-sm"
            style={{ color: "rgba(245,245,245,0.3)" }}
          >
            배열을 입력하고 시작하세요
          </div>
        )}
      </div>

      <div
        className="rounded-2xl border border-white/10 p-5"
        style={{ background: "rgba(20,20,20,0.6)" }}
      >
        <VisualizerControls />
        {currentStepData?.description && (
          <p className="mt-5 text-center text-base font-semibold" style={{ color: "rgba(245,245,245,0.75)" }}>
            {currentStepData.description}
          </p>
        )}
      </div>

      <div
        className="rounded-2xl border border-white/10 p-5"
        style={{ background: "rgba(20,20,20,0.6)" }}
      >
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(245,245,245,0.35)" }}
        >
          배열 직접 입력
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="예: 5, 3, 8, 1, 4"
            className="flex-1 rounded-xl border bg-transparent px-4 py-2.5 font-mono text-sm outline-none transition focus:border-[#D4AF37]/60"
            style={{
              borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(245,245,245,0.12)",
              color: "#F5F5F5",
            }}
          />
          <button
            onClick={handleApply}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-85"
            style={{ background: "#D4AF37", color: "#0B0B0B" }}
          >
            적용
          </button>
        </div>
        {error && (
          <p className="mt-2 text-xs" style={{ color: "rgba(239,68,68,0.8)" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

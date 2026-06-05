"use client";

import { STEP_GENERATORS } from "@/lib/algorithms";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { VisualizerControls } from "../Controls/VisualizerControls";
import { SortingVisualizer } from "./SortingVisualizer";
import {
  INPUT_BORDER,
  INPUT_BORDER_ERROR,
  PANEL_BG,
  PANEL_BORDER,
  TEXT_DIM,
  TEXT_ERROR,
  TEXT_STEP_DESC,
} from "./styles";

type Props = {
  algorithmSlug: string;
  sampleInput: number[];
};

export function SortingPlayer({ algorithmSlug, sampleInput }: Props) {
  const locale = useLocale() as "ko" | "en";
  const { steps, currentStep, setSteps } = useVisualizationStore();
  const [inputValue, setInputValue] = useState(sampleInput.join(", "));
  const [error, setError] = useState("");

  const generator = STEP_GENERATORS[algorithmSlug];

  useEffect(() => {
    if (generator) {
      setSteps(generator(sampleInput, locale));
    }
  }, [algorithmSlug, locale, generator, setSteps]);

  function handleApply() {
    const parsed = inputValue
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length < 2) {
      setError(locale === "ko" ? "2개 이상의 숫자를 입력하세요." : "Enter at least 2 numbers.");
      return;
    }
    if (parsed.length > 12) {
      setError(locale === "ko" ? "최대 12개까지 입력 가능합니다." : "Maximum 12 numbers allowed.");
      return;
    }

    setError("");
    if (generator) setSteps(generator(parsed, locale));
  }

  const currentStepData = steps[currentStep] ?? null;

  return (
    <div className="flex flex-col gap-8">
      {/* Visualizer */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: PANEL_BG,
          border: `1px solid ${PANEL_BORDER}`,
          minHeight: 340,
        }}
      >
        <SortingVisualizer step={currentStepData} />
      </div>

      {/* Controls + step description */}
      <div
        className="rounded-2xl p-5"
        style={{ background: PANEL_BG, border: `1px solid ${PANEL_BORDER}` }}
      >
        <VisualizerControls />
        {currentStepData?.description && (
          <p
            className="mt-5 text-center text-base font-semibold"
            style={{ color: TEXT_STEP_DESC }}
          >
            {currentStepData.description}
          </p>
        )}
      </div>

      {/* Custom input */}
      <div
        className="rounded-2xl p-5"
        style={{ background: PANEL_BG, border: `1px solid ${PANEL_BORDER}` }}
      >
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: TEXT_DIM }}
        >
          {locale === "ko" ? "배열 직접 입력" : "Custom array"}
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder={locale === "ko" ? "예: 5, 3, 8, 1, 4" : "e.g. 5, 3, 8, 1, 4"}
            className="flex-1 rounded-xl border bg-transparent px-4 py-2.5 font-mono text-sm text-[#F5F5F5] outline-none transition focus:border-[#D4AF37]/60"
            style={{
              borderColor: error ? INPUT_BORDER_ERROR : INPUT_BORDER,
            }}
          />
          <button
            onClick={handleApply}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition hover:opacity-85"
            style={{ background: "#D4AF37", color: "#0B0B0B" }}
          >
            {locale === "ko" ? "적용" : "Apply"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-xs" style={{ color: TEXT_ERROR }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

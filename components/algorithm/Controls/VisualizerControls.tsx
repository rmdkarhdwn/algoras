"use client";

import {
  CTRL_BTN_BG,
  CTRL_BTN_BG_HOVER,
  CTRL_BTN_BORDER,
  CTRL_BTN_COLOR,
  TEXT_MUTED,
} from "@/components/algorithm/Visualizer/styles";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { useEffect, useRef } from "react";

// ─── Icon primitives ──────────────────────────────────────────────────────────

function IconPlay() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2.5l9 5.5-9 5.5V2.5z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2" width="4" height="12" rx="1" />
      <rect x="9" y="2" width="4" height="12" rx="1" />
    </svg>
  );
}

function IconPrev() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="2" width="3" height="12" rx="1" />
      <path d="M13 2.5L5 8l8 5.5V2.5z" />
    </svg>
  );
}

function IconNext() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
      <rect x="11" y="2" width="3" height="12" rx="1" />
      <path d="M3 2.5l8 5.5-8 5.5V2.5z" />
    </svg>
  );
}

function IconReset() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2a6 6 0 1 0 5.2 3H11.5A4.5 4.5 0 1 1 8 3.5V2z" />
      <path d="M8 1v4l3-2-3-2z" />
    </svg>
  );
}

// ─── Control button ───────────────────────────────────────────────────────────

function CtrlBtn({
  onClick,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors disabled:opacity-30"
      style={{
        border: CTRL_BTN_BORDER,
        background: CTRL_BTN_BG,
        color: CTRL_BTN_COLOR,
      }}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = CTRL_BTN_BG_HOVER;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = CTRL_BTN_BG;
      }}
    >
      {children}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function VisualizerControls() {
  const { steps, currentStep, status, speed, play, pause, next, prev, reset, setSpeed } =
    useVisualizationStore();

  const isPlaying = status === "playing";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance when playing
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isPlaying) {
      const ms = 1200 / speed;
      intervalRef.current = setInterval(() => {
        useVisualizationStore.getState().next();
        if (useVisualizationStore.getState().currentStep >= useVisualizationStore.getState().steps.length - 1) {
          clearInterval(intervalRef.current!);
        }
      }, ms);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed]);

  const atStart = currentStep === 0;
  const atEnd = currentStep >= steps.length - 1;

  return (
    <div className="flex flex-col gap-5">
      {/* Step counter */}
      <div className="flex items-center justify-between text-xs" style={{ color: TEXT_MUTED }}>
        <span>스텝</span>
        <span>
          {steps.length > 0 ? `${currentStep + 1} / ${steps.length}` : "—"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full rounded-full" style={{ background: "rgba(245,245,245,0.08)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: steps.length > 1 ? `${(currentStep / (steps.length - 1)) * 100}%` : "0%",
            background: "#D4AF37",
          }}
        />
      </div>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-2">
        <CtrlBtn onClick={reset} disabled={atStart && !isPlaying} title="처음으로">
          <IconReset />
        </CtrlBtn>
        <CtrlBtn onClick={prev} disabled={atStart} title="이전 스텝">
          <IconPrev />
        </CtrlBtn>

        {isPlaying ? (
          <CtrlBtn onClick={pause} title="일시정지">
            <IconPause />
          </CtrlBtn>
        ) : (
          <CtrlBtn onClick={play} disabled={atEnd} title="재생">
            <IconPlay />
          </CtrlBtn>
        )}

        <CtrlBtn onClick={next} disabled={atEnd} title="다음 스텝">
          <IconNext />
        </CtrlBtn>
      </div>

      {/* Speed slider */}
      <div className="flex items-center gap-3">
        <span className="w-6 text-xs" style={{ color: TEXT_MUTED }}>
          1×
        </span>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 cursor-pointer accent-[#D4AF37]"
        />
        <span className="w-6 text-right text-xs" style={{ color: TEXT_MUTED }}>
          5×
        </span>
        <span
          className="w-8 text-right text-xs font-semibold"
          style={{ color: CTRL_BTN_COLOR }}
        >
          {speed}×
        </span>
      </div>
    </div>
  );
}

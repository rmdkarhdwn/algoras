"use client";

import { useVisualizationStore } from "@/stores/visualizationStore";
import { Button } from "@/components/ui/Button";

const SPEED_PRESETS = [0.5, 1, 1.5, 2];

export function Controls() {
  const status = useVisualizationStore((s) => s.status);
  const speed = useVisualizationStore((s) => s.speed);
  const steps = useVisualizationStore((s) => s.steps);
  const currentStep = useVisualizationStore((s) => s.currentStep);
  const play = useVisualizationStore((s) => s.play);
  const pause = useVisualizationStore((s) => s.pause);
  const reset = useVisualizationStore((s) => s.reset);
  const setSpeed = useVisualizationStore((s) => s.setSpeed);

  const isIdle = !steps.length;
  const step = steps[currentStep];

  const descColor = (() => {
    if (!step) return "text-white/30";
    if (step.swapping.length) return "text-red-400";
    if (step.comparing.length) return "text-yellow-400";
    if (step.sorted.length === step.array.length) return "text-green-400";
    return "text-white/50";
  })();

  const cycleSpeed = () => {
    const idx = SPEED_PRESETS.indexOf(speed);
    const next = SPEED_PRESETS[(idx + 1) % SPEED_PRESETS.length];
    setSpeed(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-border bg-white/5 p-4">
        <Button
          type="button"
          onClick={play}
          disabled={isIdle || status === "playing"}
        >
          Play
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={pause}
          disabled={isIdle || status !== "playing"}
        >
          Pause
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={reset}
          disabled={isIdle}
        >
          Reset
        </Button>
        <button
          type="button"
          onClick={cycleSpeed}
          className="ml-auto text-sm text-white/40 transition-colors hover:text-white/70"
        >
          {speed.toFixed(1)}x speed
        </button>
      </div>
      {step?.description && (
        <p className={`px-2 text-base font-medium transition-colors ${descColor}`}>
          {step.description}
        </p>
      )}
    </div>
  );
}

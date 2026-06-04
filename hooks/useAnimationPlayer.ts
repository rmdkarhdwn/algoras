"use client";

import { useEffect, useRef } from "react";
import { useVisualizationStore } from "@/stores/visualizationStore";

export function useAnimationPlayer() {
  const status = useVisualizationStore((s) => s.status);
  const speed = useVisualizationStore((s) => s.speed);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (status !== "playing") return;

    const tick = () => {
      const store = useVisualizationStore.getState();
      if (store.status !== "playing") return;
      if (store.currentStep >= store.steps.length - 1) {
        store.pause();
        return;
      }
      store.setCurrentStep(store.currentStep + 1);
      timerRef.current = setTimeout(tick, 1000 / store.speed);
    };

    timerRef.current = setTimeout(tick, 1000 / speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, speed]);
}

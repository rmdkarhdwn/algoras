"use client";

import { create } from "zustand";
import type { AlgorithmStep } from "@/lib/algorithms/types";

type VisualizationStatus = "idle" | "playing" | "paused";

type VisualizationStore = {
  currentStep: number;
  speed: number;
  status: VisualizationStatus;
  steps: AlgorithmStep[];
  setCurrentStep: (currentStep: number) => void;
  setSpeed: (speed: number) => void;
  setSteps: (steps: AlgorithmStep[]) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
};

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  currentStep: 0,
  speed: 1,
  status: "idle",
  steps: [],
  setCurrentStep: (currentStep) => set({ currentStep }),
  setSpeed: (speed) => set({ speed }),
  setSteps: (steps) => set({ steps, currentStep: 0, status: "idle" }),
  play: () => set({ status: "playing" }),
  pause: () => set({ status: "paused" }),
  next: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ status: "idle" });
    }
  },
  prev: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },
  reset: () => set({ currentStep: 0, status: "idle" }),
}));

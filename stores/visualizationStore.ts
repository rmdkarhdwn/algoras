"use client";

import type { AlgorithmStep } from "@/lib/algorithms/types";
import { create } from "zustand";

type VisualizationStore = {
  steps: AlgorithmStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number; // 1~5

  setSteps: (steps: AlgorithmStep[]) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
};

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  steps: [],
  currentStep: 0,
  isPlaying: false,
  speed: 2,

  setSteps: (steps) => set({ steps, currentStep: 0, isPlaying: false }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  next: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  prev: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },

  reset: () => set({ currentStep: 0, isPlaying: false }),

  setSpeed: (speed) => set({ speed: Math.min(5, Math.max(1, speed)) }),
}));

"use client";

import { create } from "zustand";

type VisualizationStatus = "idle" | "playing" | "paused";

type VisualizationStore = {
  currentStep: number;
  speed: number;
  status: VisualizationStatus;
  steps: number[][];
  setCurrentStep: (currentStep: number) => void;
  setSpeed: (speed: number) => void;
  setSteps: (steps: number[][]) => void;
  pause: () => void;
  play: () => void;
  reset: () => void;
};

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  currentStep: 0,
  speed: 1,
  status: "idle",
  steps: [],
  setCurrentStep: (currentStep) => set({ currentStep }),
  setSpeed: (speed) => set({ speed }),
  setSteps: (steps) => set({ steps, currentStep: 0, status: "idle" }),
  pause: () => set({ status: "paused" }),
  play: () => set({ status: "playing" }),
  reset: () => set({ currentStep: 0, status: "idle" }),
}));

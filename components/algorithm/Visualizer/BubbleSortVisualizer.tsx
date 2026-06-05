"use client";

import type { AlgorithmStep } from "@/lib/algorithms/types";
import { SortingVisualizer } from "./SortingVisualizer";

type Props = {
  step: AlgorithmStep;
};

/** @deprecated Use SortingVisualizer directly */
export function BubbleSortVisualizer({ step }: Props) {
  return <SortingVisualizer step={step} />;
}

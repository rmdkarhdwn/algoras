import { generateBubbleSortSteps } from "./sorting/bubble";
import { generateSelectionSortSteps } from "./sorting/selection";
import { generateInsertionSortSteps } from "./sorting/insertion";
import { generateMergeSortSteps } from "./sorting/merge";
import { generateQuickSortSteps } from "./sorting/quick";
import type { StepGenerator } from "./types";

export const STEP_GENERATORS: Record<string, StepGenerator> = {
  "bubble-sort": generateBubbleSortSteps,
  "selection-sort": generateSelectionSortSteps,
  "insertion-sort": generateInsertionSortSteps,
  "merge-sort": generateMergeSortSteps,
  "quick-sort": generateQuickSortSteps,
};

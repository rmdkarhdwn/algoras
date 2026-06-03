import type { AlgorithmStep } from "@/lib/algorithms/types";

export function createSelectionSortSteps(input: number[]): AlgorithmStep[] {
  const values = [...input];
  const steps: AlgorithmStep[] = [
    { values: [...values], description: "Initial state" },
  ];

  for (let start = 0; start < values.length; start += 1) {
    let minIndex = start;

    for (let index = start + 1; index < values.length; index += 1) {
      steps.push({
        values: [...values],
        comparing: [minIndex, index],
        description: `Find minimum from index ${start}`,
      });

      if (values[index] < values[minIndex]) {
        minIndex = index;
      }
    }

    if (minIndex !== start) {
      [values[start], values[minIndex]] = [values[minIndex], values[start]];
      steps.push({
        values: [...values],
        swapping: [start, minIndex],
        description: `Place the next minimum at index ${start}`,
      });
    }
  }

  steps.push({
    values: [...values],
    sorted: values.map((_, index) => index),
    description: "Sorted result",
  });

  return steps;
}

import type { AlgorithmStep } from "@/lib/algorithms/types";

export function createBubbleSortSteps(input: number[]): AlgorithmStep[] {
  const values = [...input];
  const steps: AlgorithmStep[] = [
    { values: [...values], description: "Initial state" },
  ];

  for (let end = values.length - 1; end > 0; end -= 1) {
    for (let index = 0; index < end; index += 1) {
      steps.push({
        values: [...values],
        comparing: [index, index + 1],
        description: `Compare index ${index} and ${index + 1}`,
      });

      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        steps.push({
          values: [...values],
          swapping: [index, index + 1],
          description: `Swap ${index} and ${index + 1}`,
        });
      }
    }
  }

  steps.push({
    values: [...values],
    sorted: values.map((_, index) => index),
    description: "Sorted result",
  });

  return steps;
}

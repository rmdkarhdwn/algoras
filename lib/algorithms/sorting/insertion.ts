import type { AlgorithmStep } from "@/lib/algorithms/types";

export function createInsertionSortSteps(input: number[]): AlgorithmStep[] {
  const values = [...input];
  const steps: AlgorithmStep[] = [
    { values: [...values], description: "Initial state" },
  ];

  for (let index = 1; index < values.length; index += 1) {
    const current = values[index];
    let position = index - 1;

    while (position >= 0 && values[position] > current) {
      values[position + 1] = values[position];
      steps.push({
        values: [...values],
        comparing: [position, position + 1],
        description: `Shift value at index ${position}`,
      });
      position -= 1;
    }

    values[position + 1] = current;
    steps.push({
      values: [...values],
      swapping: [position + 1, index],
      description: `Insert ${current} at index ${position + 1}`,
    });
  }

  steps.push({
    values: [...values],
    sorted: values.map((_, index) => index),
    description: "Sorted result",
  });

  return steps;
}

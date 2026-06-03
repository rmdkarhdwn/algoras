import type { AlgorithmStep } from "@/lib/algorithms/types";

export function createQuickSortSteps(input: number[]): AlgorithmStep[] {
  const values = [...input];
  const steps: AlgorithmStep[] = [
    { values: [...values], description: "Initial state" },
  ];

  function quickSort(low: number, high: number) {
    if (low >= high) {
      return;
    }

    const pivot = values[high];
    let partitionIndex = low;

    for (let index = low; index < high; index += 1) {
      steps.push({
        values: [...values],
        comparing: [index, high],
        description: `Compare index ${index} with pivot ${pivot}`,
      });

      if (values[index] <= pivot) {
        [values[index], values[partitionIndex]] = [values[partitionIndex], values[index]];
        steps.push({
          values: [...values],
          swapping: [index, partitionIndex],
          description: `Move value below pivot to index ${partitionIndex}`,
        });
        partitionIndex += 1;
      }
    }

    [values[partitionIndex], values[high]] = [values[high], values[partitionIndex]];
    steps.push({
      values: [...values],
      swapping: [partitionIndex, high],
      description: `Place pivot at index ${partitionIndex}`,
    });

    quickSort(low, partitionIndex - 1);
    quickSort(partitionIndex + 1, high);
  }

  quickSort(0, values.length - 1);

  steps.push({
    values: [...values],
    sorted: values.map((_, index) => index),
    description: "Sorted result",
  });

  return steps;
}

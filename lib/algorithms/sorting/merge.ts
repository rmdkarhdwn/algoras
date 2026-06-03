import type { AlgorithmStep } from "@/lib/algorithms/types";

export function createMergeSortSteps(input: number[]): AlgorithmStep[] {
  const values = [...input];
  const steps: AlgorithmStep[] = [
    { values: [...values], description: "Initial state" },
  ];

  function mergeSort(start: number, end: number) {
    if (end - start <= 1) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    mergeSort(start, middle);
    mergeSort(middle, end);

    const left = values.slice(start, middle);
    const right = values.slice(middle, end);
    let leftIndex = 0;
    let rightIndex = 0;
    let targetIndex = start;

    while (leftIndex < left.length || rightIndex < right.length) {
      const leftValue = left[leftIndex];
      const rightValue = right[rightIndex];

      if (rightIndex >= right.length || (leftIndex < left.length && leftValue <= rightValue)) {
        values[targetIndex] = leftValue;
        leftIndex += 1;
      } else {
        values[targetIndex] = rightValue;
        rightIndex += 1;
      }

      steps.push({
        values: [...values],
        swapping: [targetIndex],
        description: `Merge values into index ${targetIndex}`,
      });

      targetIndex += 1;
    }
  }

  mergeSort(0, values.length);

  steps.push({
    values: [...values],
    sorted: values.map((_, index) => index),
    description: "Sorted result",
  });

  return steps;
}

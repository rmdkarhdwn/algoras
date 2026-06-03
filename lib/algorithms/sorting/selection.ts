import type { AlgorithmStep } from "@/lib/algorithms/types";

export function generateSelectionSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: "정렬 시작." });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        description: `arr[${j}]=${arr[j]} 와 현재 최솟값 arr[${minIdx}]=${arr[minIdx]} 비교`,
      });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        description: `arr[${i}] 와 arr[${minIdx}] 교환`,
      });
    }

    sorted.push(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `인덱스 ${i} 확정`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    description: "정렬 완료!",
  });

  return steps;
}

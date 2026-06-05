import type { AlgorithmStep } from "@/lib/algorithms/types";
import type { AppLocale } from "@/lib/site";

export function generateSelectionSortSteps(input: number[], locale: AppLocale = "ko"): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  const isKo = locale === "ko";

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: isKo ? "정렬 시작." : "Starting sort.",
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        description: isKo
          ? `arr[${j}]=${arr[j]} 와 현재 최솟값 arr[${minIdx}]=${arr[minIdx]} 비교`
          : `Compare arr[${j}]=${arr[j]} against current minimum arr[${minIdx}]=${arr[minIdx]}`,
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
        description: isKo
          ? `arr[${i}] 와 arr[${minIdx}] 교환`
          : `Swap arr[${i}] and arr[${minIdx}]`,
      });
    }

    sorted.push(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: isKo ? `인덱스 ${i} 확정` : `Index ${i} is fixed in place`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    description: isKo ? "정렬 완료!" : "Sorting complete!",
  });

  return steps;
}

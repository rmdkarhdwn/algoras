import type { AlgorithmStep } from "@/lib/algorithms/types";
import type { AppLocale } from "@/lib/site";

export function generateInsertionSortSteps(input: number[], locale: AppLocale = "ko"): AlgorithmStep[] {
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

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      description: isKo
        ? `arr[${i}]=${key} 를 삽입 위치 탐색`
        : `Search for the insertion point of arr[${i}]=${key}`,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sorted],
        description: isKo
          ? `arr[${j}]=${arr[j]} 을 오른쪽으로 이동`
          : `Shift arr[${j}]=${arr[j]} one step to the right`,
      });
      j--;
    }

    arr[j + 1] = key;
    sorted.push(j + 1);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: isKo
        ? `${key} 를 인덱스 ${j + 1} 에 삽입`
        : `Insert ${key} at index ${j + 1}`,
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

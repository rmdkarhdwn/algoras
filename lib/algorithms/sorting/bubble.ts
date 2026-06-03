import type { AlgorithmStep } from "@/lib/algorithms/types";

export function generateBubbleSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: "정렬 시작. 인접한 두 원소를 비교합니다.",
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        description: `arr[${j}]=${arr[j]}와 arr[${j + 1}]=${arr[j + 1]} 비교`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          description: `arr[${j}]와 arr[${j + 1}] 교환 → [${arr[j]}, ${arr[j + 1]}]`,
        });
      }
    }

    sorted.unshift(n - 1 - i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      description: `패스 ${i + 1} 완료. ${arr[n - 1 - i]}이(가) 제자리에 놓였습니다.`,
    });
  }

  sorted.unshift(0);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    description: "정렬 완료!",
  });

  return steps;
}

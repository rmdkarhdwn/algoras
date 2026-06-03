import type { AlgorithmStep } from "@/lib/algorithms/types";

export function generateInsertionSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: "정렬 시작." });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      description: `arr[${i}]=${key} 를 삽입 위치 탐색`,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [...sorted],
        description: `arr[${j}]=${arr[j]} 을 오른쪽으로 이동`,
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
      description: `${key} 를 인덱스 ${j + 1} 에 삽입`,
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

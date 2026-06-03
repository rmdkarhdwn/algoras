import type { AlgorithmStep } from "@/lib/algorithms/types";

export function generateQuickSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const sorted: number[] = [];

  steps.push({ array: [...arr], comparing: [], swapping: [], sorted: [], description: "정렬 시작." });

  function quickSort(low: number, high: number) {
    if (low >= high) return;

    const pivot = arr[high];
    let p = low;

    for (let i = low; i < high; i++) {
      steps.push({
        array: [...arr],
        comparing: [i, high],
        swapping: [],
        sorted: [...sorted],
        pivot: high,
        description: `arr[${i}]=${arr[i]} 와 pivot=${pivot} 비교`,
      });

      if (arr[i] <= pivot) {
        [arr[i], arr[p]] = [arr[p], arr[i]];
        if (i !== p) {
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, p],
            sorted: [...sorted],
            pivot: high,
            description: `arr[${i}] 와 arr[${p}] 교환`,
          });
        }
        p++;
      }
    }

    [arr[p], arr[high]] = [arr[high], arr[p]];
    sorted.push(p);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [p, high],
      sorted: [...sorted],
      pivot: p,
      description: `pivot ${arr[p]} 을 인덱스 ${p} 에 배치`,
    });

    quickSort(low, p - 1);
    quickSort(p + 1, high);
  }

  quickSort(0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    description: "정렬 완료!",
  });

  return steps;
}

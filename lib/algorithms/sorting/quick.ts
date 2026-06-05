import type { AlgorithmStep } from "@/lib/algorithms/types";
import type { AppLocale } from "@/lib/site";

export function generateQuickSortSteps(input: number[], locale: AppLocale = "ko"): AlgorithmStep[] {
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
        description: isKo
          ? `arr[${i}]=${arr[i]} 와 pivot=${pivot} 비교`
          : `Compare arr[${i}]=${arr[i]} with pivot=${pivot}`,
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
            description: isKo
              ? `arr[${i}] 와 arr[${p}] 교환`
              : `Swap arr[${i}] and arr[${p}]`,
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
      description: isKo
        ? `pivot ${arr[p]} 을 인덱스 ${p} 에 배치`
        : `Place pivot ${arr[p]} at index ${p}`,
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
    description: isKo ? "정렬 완료!" : "Sorting complete!",
  });

  return steps;
}

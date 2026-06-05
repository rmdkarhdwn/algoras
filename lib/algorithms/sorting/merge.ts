import type { AlgorithmStep } from "@/lib/algorithms/types";
import type { AppLocale } from "@/lib/site";

export function generateMergeSortSteps(input: number[], locale: AppLocale = "ko"): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  const isKo = locale === "ko";

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: isKo ? "정렬 시작." : "Starting sort.",
  });

  function mergeSort(start: number, end: number) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);

    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let li = 0, ri = 0, ti = start;

    while (li < left.length || ri < right.length) {
      const takeLeft =
        ri >= right.length || (li < left.length && left[li] <= right[ri]);

      arr[ti] = takeLeft ? left[li++] : right[ri++];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [ti],
        sorted: [],
        description: isKo
          ? `인덱스 ${ti} 에 ${arr[ti]} 병합`
          : `Merge ${arr[ti]} into index ${ti}`,
      });
      ti++;
    }
  }

  mergeSort(0, arr.length);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: arr.map((_, i) => i),
    description: isKo ? "정렬 완료!" : "Sorting complete!",
  });

  return steps;
}

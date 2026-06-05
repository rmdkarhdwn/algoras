import type { AppLocale } from "@/lib/site";

export type StepLineMap = {
  initial: number;
  comparing: number;
  swapping: number;
  sorted: number;
};

type TLocalizedLine = {
  ko: string;
  en: string;
};

export type LangAnnotation = {
  lines: Record<number, TLocalizedLine>;
  stepLineMap: StepLineMap;
};

const annotations: Record<string, Record<string, LangAnnotation>> = {
  "bubble-sort": {
    typescript: {
      lines: {
        1: { ko: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다", en: "Function signature — receives a number array and returns a sorted copy" },
        2: { ko: "스프레드로 원본 배열을 복사해 불변성을 유지합니다", en: "Clones the original array to preserve immutability" },
        4: { ko: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다", en: "Outer loop — shrinks the comparison range after each pass" },
        5: { ko: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다", en: "Inner loop — walks adjacent values inside the active range" },
        6: { ko: "두 인접 원소를 비교합니다", en: "Compares two adjacent values" },
        7: { ko: "구조 분해 할당으로 두 원소를 자리 바꿉니다", en: "Swaps two values with destructuring assignment" },
        12: { ko: "정렬이 끝난 배열을 반환합니다", en: "Returns the sorted array" }
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 12 }
    },
    javascript: {
      lines: {
        1: { ko: "함수 선언 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다", en: "Function declaration — receives a number array and returns a sorted copy" },
        2: { ko: "스프레드로 원본 배열을 복사해 불변성을 유지합니다", en: "Clones the original array to preserve immutability" },
        4: { ko: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다", en: "Outer loop — shrinks the comparison range after each pass" },
        5: { ko: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다", en: "Inner loop — walks adjacent values inside the active range" },
        6: { ko: "두 인접 원소를 비교합니다", en: "Compares two adjacent values" },
        7: { ko: "구조 분해 할당으로 두 원소를 자리 바꿉니다", en: "Swaps two values with destructuring assignment" },
        12: { ko: "정렬이 끝난 배열을 반환합니다", en: "Returns the sorted array" }
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 12 }
    },
    python: {
      lines: {
        1: { ko: "함수 정의 — 리스트를 받아 정렬된 새 리스트를 반환합니다", en: "Function definition — returns a sorted copy of the list" },
        2: { ko: "list()로 원본을 복사해 불변성을 유지합니다", en: "Copies the original list to avoid mutating the input" },
        3: { ko: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다", en: "Outer loop — reduces the comparison window each pass" },
        4: { ko: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다", en: "Inner loop — scans adjacent values in the current range" },
        5: { ko: "두 인접 원소를 비교합니다", en: "Compares two adjacent values" },
        6: { ko: "파이썬 다중 할당으로 두 원소를 자리 바꿉니다", en: "Swaps values using Python tuple assignment" },
        7: { ko: "정렬이 끝난 리스트를 반환합니다", en: "Returns the sorted list" }
      },
      stepLineMap: { initial: 2, comparing: 5, swapping: 6, sorted: 7 }
    },
    java: {
      lines: {
        1: { ko: "메서드 시그니처 — 정수 배열을 받아 정렬된 새 배열을 반환합니다", en: "Method signature — returns a sorted copy of an int array" },
        2: { ko: "Arrays.copyOf로 원본 배열을 복사합니다", en: "Copies the original array with Arrays.copyOf" },
        4: { ko: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다", en: "Outer loop — shrinks the comparison range each pass" },
        5: { ko: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다", en: "Inner loop — iterates adjacent elements in the active range" },
        6: { ko: "두 인접 원소를 비교합니다", en: "Compares two adjacent values" },
        7: { ko: "임시 변수에 현재 원소를 저장합니다", en: "Stores the current element in a temporary variable" },
        8: { ko: "다음 원소를 현재 위치로 이동합니다", en: "Moves the next element into the current slot" },
        9: { ko: "임시 변수 값을 다음 위치에 씁니다", en: "Writes the temporary value into the next slot" },
        14: { ko: "정렬이 끝난 배열을 반환합니다", en: "Returns the sorted array" }
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 14 }
    }
  },
  "selection-sort": {
    typescript: {
      lines: {
        1: { ko: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다", en: "Function signature — returns a sorted copy of the array" },
        2: { ko: "원본 배열을 복사해 불변성을 유지합니다", en: "Copies the original array to keep the input immutable" },
        4: { ko: "외부 루프 — 현재 위치에 놓일 최솟값을 선택합니다", en: "Outer loop — chooses the minimum value for the current position" },
        5: { ko: "현재 시작 위치를 최솟값 후보로 둡니다", en: "Starts with the current position as the minimum candidate" },
        7: { ko: "남은 구간을 순회하며 더 작은 값을 찾습니다", en: "Scans the remaining range for a smaller value" },
        8: { ko: "새 최솟값이 보이면 minIndex를 갱신합니다", en: "Updates minIndex when a new minimum is found" },
        12: { ko: "선택한 최솟값을 현재 위치와 교환합니다", en: "Swaps the selected minimum into the current position" },
        15: { ko: "정렬이 끝난 배열을 반환합니다", en: "Returns the sorted array" }
      },
      stepLineMap: { initial: 2, comparing: 8, swapping: 12, sorted: 15 }
    }
  },
  "insertion-sort": {
    typescript: {
      lines: {
        1: { ko: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다", en: "Function signature — returns a sorted copy of the array" },
        2: { ko: "원본 배열을 복사해 불변성을 유지합니다", en: "Copies the original array to keep the input immutable" },
        4: { ko: "외부 루프 — 두 번째 원소부터 순회합니다", en: "Outer loop — starts from the second element" },
        5: { ko: "삽입할 값을 key에 저장합니다", en: "Stores the value to insert in key" },
        6: { ko: "왼쪽 비교 포인터를 준비합니다", en: "Prepares the pointer used to scan leftward" },
        8: { ko: "key보다 큰 원소를 오른쪽으로 밀어냅니다", en: "Shifts values larger than key to the right" },
        9: { ko: "현재 원소를 한 칸 오른쪽으로 이동합니다", en: "Moves the current value one slot to the right" },
        12: { ko: "key를 올바른 위치에 삽입합니다", en: "Inserts key into its correct position" },
        15: { ko: "정렬이 끝난 배열을 반환합니다", en: "Returns the sorted array" }
      },
      stepLineMap: { initial: 2, comparing: 8, swapping: 9, sorted: 15 }
    }
  },
  "merge-sort": {
    typescript: {
      lines: {
        1: { ko: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다", en: "Function signature — returns a sorted copy of the array" },
        2: { ko: "기저 조건 — 길이 1 이하면 이미 정렬된 상태입니다", en: "Base case — arrays of length 1 or less are already sorted" },
        4: { ko: "중간 인덱스를 계산해 배열을 둘로 나눕니다", en: "Calculates the midpoint and splits the array in half" },
        5: { ko: "왼쪽 절반을 재귀적으로 정렬합니다", en: "Recursively sorts the left half" },
        6: { ko: "오른쪽 절반을 재귀적으로 정렬합니다", en: "Recursively sorts the right half" },
        8: { ko: "병합 결과를 담을 배열을 준비합니다", en: "Creates an array for the merged result" },
        12: { ko: "더 작은 값을 result에 추가합니다", en: "Appends the smaller value to the result" },
        15: { ko: "남은 원소를 이어 붙여 반환합니다", en: "Appends remaining values and returns the merged array" }
      },
      stepLineMap: { initial: 4, comparing: 12, swapping: 12, sorted: 15 }
    }
  },
  "quick-sort": {
    typescript: {
      lines: {
        1: { ko: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다", en: "Function signature — returns a sorted copy of the array" },
        2: { ko: "기저 조건 — 길이 1 이하면 그대로 반환합니다", en: "Base case — arrays of length 1 or less are returned as-is" },
        6: { ko: "pivot과 나머지 원소를 분리합니다", en: "Separates the pivot from the rest of the values" },
        7: { ko: "pivot 이하 값을 smaller로 모읍니다", en: "Collects values less than or equal to the pivot into smaller" },
        8: { ko: "pivot 초과 값을 larger로 모읍니다", en: "Collects values greater than the pivot into larger" },
        10: { ko: "왼쪽, pivot, 오른쪽 결과를 재귀적으로 합칩니다", en: "Recursively combines the left partition, pivot, and right partition" }
      },
      stepLineMap: { initial: 6, comparing: 7, swapping: 10, sorted: 10 }
    }
  }
};

export function getAnnotation(slug: string, lang: string) {
  return annotations[slug]?.[lang] ?? null;
}

export function getAnnotationLine(
  annotation: LangAnnotation | null,
  line: number,
  locale: AppLocale,
) {
  return annotation?.lines[line]?.[locale] ?? null;
}

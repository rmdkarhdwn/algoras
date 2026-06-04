export type StepLineMap = {
  initial: number;
  comparing: number;
  swapping: number;
  sorted: number;
};

export type LangAnnotation = {
  lines: Record<number, string>;
  stepLineMap: StepLineMap;
};

const annotations: Record<string, Record<string, LangAnnotation>> = {
  "bubble-sort": {
    typescript: {
      lines: {
        1: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "스프레드로 원본 배열을 복사해 불변성을 유지합니다",
        4: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다",
        5: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다",
        6: "두 인접 원소를 비교합니다",
        7: "구조 분해 할당으로 두 원소를 자리 바꿉니다",
        12: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 12 },
    },
    javascript: {
      lines: {
        1: "함수 선언 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "스프레드로 원본 배열을 복사해 불변성을 유지합니다",
        4: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다",
        5: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다",
        6: "두 인접 원소를 비교합니다",
        7: "구조 분해 할당으로 두 원소를 자리 바꿉니다",
        12: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 12 },
    },
    python: {
      lines: {
        1: "함수 정의 — 리스트를 받아 정렬된 새 리스트를 반환합니다",
        2: "list()로 원본을 복사해 불변성을 유지합니다",
        3: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다",
        4: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다",
        5: "두 인접 원소를 비교합니다",
        6: "파이썬 다중 할당으로 두 원소를 자리 바꿉니다",
        7: "정렬이 끝난 리스트를 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 5, swapping: 6, sorted: 7 },
    },
    java: {
      lines: {
        1: "메서드 시그니처 — 정수 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "Arrays.copyOf로 원본 배열을 복사합니다",
        4: "외부 루프 — 비교 범위를 매 회차마다 하나씩 줄여갑니다",
        5: "내부 루프 — 현재 범위에서 인접 원소를 순회합니다",
        6: "두 인접 원소를 비교합니다",
        7: "임시 변수에 현재 원소를 저장합니다",
        8: "다음 원소를 현재 위치로 이동합니다",
        9: "임시 변수 값을 다음 위치에 씁니다",
        14: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 14 },
    },
  },
};

export function getAnnotation(slug: string, lang: string): LangAnnotation | null {
  return annotations[slug]?.[lang] ?? null;
}

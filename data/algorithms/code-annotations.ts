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
  "insertion-sort": {
    typescript: {
      lines: {
        1: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "원본 배열을 복사해 불변성을 유지합니다",
        4: "외부 루프 — 두 번째 원소부터 순회합니다",
        5: "현재 삽입할 값을 key에 저장합니다",
        6: "key와 비교할 왼쪽 포인터를 설정합니다",
        8: "key보다 큰 원소를 오른쪽으로 한 칸씩 밀어냅니다",
        9: "원소를 한 칸 오른쪽으로 이동합니다",
        12: "key를 올바른 위치에 삽입합니다",
        15: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 8, swapping: 9, sorted: 15 },
    },
    javascript: {
      lines: {
        1: "함수 선언 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "원본 배열을 복사해 불변성을 유지합니다",
        4: "외부 루프 — 두 번째 원소부터 순회합니다",
        5: "현재 삽입할 값을 key에 저장합니다",
        6: "key와 비교할 왼쪽 포인터를 설정합니다",
        8: "key보다 큰 원소를 오른쪽으로 한 칸씩 밀어냅니다",
        9: "원소를 한 칸 오른쪽으로 이동합니다",
        12: "key를 올바른 위치에 삽입합니다",
        15: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 8, swapping: 9, sorted: 15 },
    },
    python: {
      lines: {
        1: "함수 정의 — 리스트를 받아 정렬된 새 리스트를 반환합니다",
        2: "원본 리스트를 복사합니다",
        3: "외부 루프 — 두 번째 원소부터 순회합니다",
        4: "현재 삽입할 값을 key에 저장합니다",
        5: "key와 비교할 왼쪽 포인터를 설정합니다",
        6: "key보다 큰 원소를 오른쪽으로 한 칸씩 밀어냅니다",
        7: "원소를 한 칸 오른쪽으로 이동합니다",
        9: "key를 올바른 위치에 삽입합니다",
        10: "정렬이 끝난 리스트를 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 10 },
    },
  },
  "selection-sort": {
    typescript: {
      lines: {
        1: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "원본 배열을 복사해 불변성을 유지합니다",
        4: "외부 루프 — 현재 위치에 들어갈 최솟값을 찾기 시작합니다",
        5: "현재 시작 인덱스를 최솟값 후보로 둡니다",
        7: "남은 구간을 순회하며 더 작은 값을 찾습니다",
        8: "새 최솟값을 발견하면 minIndex를 갱신합니다",
        12: "찾아낸 최솟값을 현재 시작 위치와 교환합니다",
        15: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 8, swapping: 12, sorted: 15 },
    },
    javascript: {
      lines: {
        1: "함수 선언 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "원본 배열을 복사해 불변성을 유지합니다",
        4: "외부 루프 — 현재 위치에 들어갈 최솟값을 찾기 시작합니다",
        5: "현재 시작 인덱스를 최솟값 후보로 둡니다",
        7: "남은 구간을 순회하며 더 작은 값을 찾습니다",
        8: "새 최솟값을 발견하면 minIndex를 갱신합니다",
        12: "찾아낸 최솟값을 현재 시작 위치와 교환합니다",
        15: "정렬이 끝난 배열을 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 8, swapping: 12, sorted: 15 },
    },
    python: {
      lines: {
        1: "함수 정의 — 리스트를 받아 정렬된 새 리스트를 반환합니다",
        2: "원본 리스트를 복사합니다",
        3: "외부 루프 — 현재 위치에 들어갈 최솟값을 찾기 시작합니다",
        4: "현재 시작 인덱스를 최솟값 후보로 둡니다",
        5: "남은 구간을 순회합니다",
        6: "더 작은 값을 찾으면 min_index를 갱신합니다",
        7: "선택한 최솟값을 현재 위치와 교환합니다",
        8: "정렬이 끝난 리스트를 반환합니다",
      },
      stepLineMap: { initial: 2, comparing: 6, swapping: 7, sorted: 8 },
    },
  },
  "merge-sort": {
    typescript: {
      lines: {
        1: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "기저 조건 — 길이 1 이하면 이미 정렬됨",
        4: "중간 인덱스를 계산해 분할 기준을 정합니다",
        5: "왼쪽 절반을 재귀적으로 정렬합니다",
        6: "오른쪽 절반을 재귀적으로 정렬합니다",
        8: "병합 결과를 담을 배열을 준비합니다",
        10: "양쪽 배열에서 더 작은 값을 꺼내 result에 추가합니다",
        11: "두 원소를 비교해 작은 쪽을 result에 push합니다",
        13: "남은 원소를 그대로 이어 붙여 반환합니다",
      },
      stepLineMap: { initial: 4, comparing: 11, swapping: 11, sorted: 13 },
    },
    javascript: {
      lines: {
        1: "함수 선언 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "기저 조건 — 길이 1 이하면 이미 정렬됨",
        4: "중간 인덱스를 계산해 분할 기준을 정합니다",
        5: "왼쪽 절반을 재귀적으로 정렬합니다",
        6: "오른쪽 절반을 재귀적으로 정렬합니다",
        8: "병합 결과를 담을 배열을 준비합니다",
        10: "양쪽 배열에서 더 작은 값을 꺼내 result에 추가합니다",
        11: "두 원소를 비교해 작은 쪽을 result에 push합니다",
        13: "남은 원소를 그대로 이어 붙여 반환합니다",
      },
      stepLineMap: { initial: 4, comparing: 11, swapping: 11, sorted: 13 },
    },
    python: {
      lines: {
        1: "함수 정의 — 리스트를 받아 정렬된 새 리스트를 반환합니다",
        2: "기저 조건 — 길이 1 이하면 이미 정렬됨",
        3: "중간 인덱스를 계산합니다",
        4: "왼쪽 절반을 재귀적으로 정렬합니다",
        5: "오른쪽 절반을 재귀적으로 정렬합니다",
        6: "병합 결과와 포인터를 초기화합니다",
        7: "양쪽에서 더 작은 값을 result에 추가합니다",
        10: "남은 원소를 이어 붙여 반환합니다",
      },
      stepLineMap: { initial: 3, comparing: 7, swapping: 7, sorted: 10 },
    },
  },
  "quick-sort": {
    typescript: {
      lines: {
        1: "함수 시그니처 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "기저 조건 — 길이 1 이하면 그대로 반환합니다",
        6: "첫 원소를 pivot으로 선택하고 나머지를 분리합니다",
        7: "pivot 이하 원소를 smaller 배열로 분류합니다",
        8: "pivot 초과 원소를 larger 배열로 분류합니다",
        10: "왼쪽 부분, pivot, 오른쪽 부분을 재귀적으로 결합합니다",
      },
      stepLineMap: { initial: 6, comparing: 7, swapping: 10, sorted: 10 },
    },
    javascript: {
      lines: {
        1: "함수 선언 — 숫자 배열을 받아 정렬된 새 배열을 반환합니다",
        2: "기저 조건 — 길이 1 이하면 그대로 반환합니다",
        6: "첫 원소를 pivot으로 선택하고 나머지를 분리합니다",
        7: "pivot 이하 원소를 smaller 배열로 분류합니다",
        8: "pivot 초과 원소를 larger 배열로 분류합니다",
        10: "왼쪽 부분, pivot, 오른쪽 부분을 재귀적으로 결합합니다",
      },
      stepLineMap: { initial: 6, comparing: 7, swapping: 10, sorted: 10 },
    },
    python: {
      lines: {
        1: "함수 정의 — 리스트를 받아 정렬된 새 리스트를 반환합니다",
        2: "기저 조건 — 길이 1 이하면 그대로 반환합니다",
        3: "pivot과 나머지 원소를 분리합니다",
        4: "pivot 이하 원소를 smaller 배열로 분류합니다",
        5: "pivot 초과 원소를 larger 배열로 분류합니다",
        6: "양쪽을 재귀적으로 정렬한 뒤 합쳐 반환합니다",
      },
      stepLineMap: { initial: 3, comparing: 4, swapping: 6, sorted: 6 },
    },
  },
};

export function getAnnotation(slug: string, lang: string): LangAnnotation | null {
  return annotations[slug]?.[lang] ?? null;
}

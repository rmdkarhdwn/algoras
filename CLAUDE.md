markdown# Algoras

알고리즘과 자료구조를 시각적으로 학습할 수 있는 인터랙티브 교육 플랫폼.

---

## 기술 스택

- 프레임워크: Next.js 14 (App Router)
- 언어: TypeScript
- 스타일: TailwindCSS
- 애니메이션: Framer Motion
- 상태관리: Zustand
- 코드 하이라이팅: Shiki
- i18n: next-intl
- 배포: Vercel

---

## 디자인 토큰

- primary: #D4AF37 (Gold)
- background: #0B0B0B (Dark Black)
- surface: #141414 (Dark Gray)
- text: #F5F5F5 (White)

---

## 디렉토리 구조
algoras/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── algorithms/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── data-structures/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   └── algorithm/
│       ├── Visualizer/
│       ├── CodeViewer/
│       ├── Controls/
│       └── ComplexityTable/
├── lib/
│   └── algorithms/
│       ├── sorting/
│       │   ├── bubble.ts
│       │   ├── selection.ts
│       │   ├── insertion.ts
│       │   ├── merge.ts
│       │   └── quick.ts
│       └── types.ts
├── data/
│   └── algorithms/
├── stores/
│   └── visualizationStore.ts
├── messages/
│   ├── ko.json
│   └── en.json
└── CLAUDE.md

---

## 핵심 아키텍처 원칙

### 시각화 엔진

알고리즘 로직과 UI는 반드시 분리한다.
`/lib/algorithms/sorting/*.ts` 파일은 순수 함수만 포함한다. UI 코드 절대 금지.

모든 알고리즘은 단계 배열을 생성하는 함수를 export한다.

```typescript
// lib/algorithms/types.ts
interface AlgorithmStep {
  array: number[];        // 현재 배열 스냅샷
  comparing: number[];    // 비교 중인 인덱스 (노란색)
  swapping: number[];     // 교환 중인 인덱스 (빨간색)
  sorted: number[];       // 정렬 완료 인덱스 (초록색)
  pivot?: number;         // Quick Sort 전용
  description: string;    // 단계 설명 텍스트
}

// 사용 예시
export function generateBubbleSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  // 순수 로직만
  return steps;
}
```

Visualizer 컴포넌트는 steps 배열을 받아 currentStep 인덱스만 변경한다.
새 알고리즘 추가 = 새 generate*Steps 함수 하나 추가.

시각화 렌더링은 SVG 기반으로 한다. Canvas 사용 금지.

---

## 코드 컨벤션

- 컴포넌트: PascalCase
- 훅: use- 접두사
- 스토어: -Store 접미사
- 인터페이스: I- 접두사
- 타입: T- 접두사

---

## Git 규칙

Git 명령어는 직접 실행하지 않는다.
작업 완료 후 아래 형식으로 커밋 가이드를 제시한다.
경로에 대괄호가 포함된 경우 (예: app/[locale]/...) 반드시 따옴표로 감싼다.
git add <수정된 파일 목록>
git commit -m "<추천 커밋 메세지>"

커밋 메세지 컨벤션:
- feat: 새 기능
- fix: 버그 수정
- refactor: 코드 구조 변경
- style: UI/스타일 변경
- chore: 설정, 빌드, 패키지 변경
- docs: 문서 변경

예시:
git add lib/algorithms/sorting/bubble.ts stores/visualizationStore.ts
git commit -m "feat: add Bubble Sort step generator and visualization store"

---

## 브랜치 규칙

브랜치를 직접 생성하거나 전환하지 않는다.
작업 시작 전 아래 형식으로 브랜치 생성 가이드를 제시한다.
git checkout -b feature/<phase>-<작업 내용>

작업 완료 후 머지 가이드를 제시한다.
git checkout main
git merge feature/<브랜치명>

브랜치 네이밍 예시:
- feature/phase-1-design-system
- feature/phase-2-viz-bubble-sort
- feature/phase-3-code-viewer-shiki
- fix/<버그 설명>

---

## 개발 단계 (MVP)

| Phase | 이름 | 기간 |
|-------|------|------|
| 0 | Foundation | ~2일 |
| 1 | Design System | ~2일 |
| 2 | Visualization Engine | ~5일 |
| 3 | Code Viewer | ~3일 |
| 4 | Page Build | ~4일 |
| 5 | i18n & SEO | ~2일 |
| 6 | Deploy & QA | ~3일 |

Phase 2 Visualization Engine이 프로젝트 핵심이다.
Bubble Sort를 완벽하게 완성한 후 나머지 4개 알고리즘을 같은 패턴으로 확장한다.

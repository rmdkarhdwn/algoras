import { CodePanel } from "@/components/algorithm/CodeViewer/CodePanel";
import { BubbleSortPlayer } from "@/components/algorithm/Visualizer/BubbleSortPlayer";

export default function BubbleSortPage() {
  return (
    <div className="py-4">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs"
          style={{
            border: "1px solid rgba(212,175,55,0.3)",
            background: "rgba(212,175,55,0.07)",
            color: "#D4AF37",
          }}
        >
          정렬 알고리즘
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#F5F5F5" }}>
          Bubble Sort
        </h1>
        <p className="text-sm leading-7" style={{ color: "rgba(245,245,245,0.48)" }}>
          인접한 두 원소를 반복 비교해 큰 값을 오른쪽으로 밀어내는 가장 단순한 정렬 알고리즘.
          시간복잡도 O(n²), 공간복잡도 O(1).
        </p>
      </div>

      {/* Two-column split */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left 60%: visualizer + controls + input */}
        <div className="w-full lg:w-[60%]">
          <BubbleSortPlayer />
        </div>

        {/* Right 40%: code panel */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-6">
            <CodePanel />
          </div>
        </div>
      </div>
    </div>
  );
}

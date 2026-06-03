"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { useAnimationPlayer } from "@/hooks/useAnimationPlayer";
import type { AlgorithmStep } from "@/lib/algorithms/types";

function barColor(idx: number, step: AlgorithmStep | undefined): string {
  if (!step) return "#374151";
  if (step.swapping?.includes(idx)) return "#EF4444";
  if (step.comparing?.includes(idx)) return "#FBBF24";
  if (step.sorted?.includes(idx)) return "#22C55E";
  return "#4B5563";
}

export function AlgorithmVisualizer() {
  useAnimationPlayer();

  const currentStep = useVisualizationStore((s) => s.currentStep);
  const steps = useVisualizationStore((s) => s.steps);

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = steps[currentStep];
  const values = step?.values ?? [];

  if (!values.length) {
    return (
      <div
        ref={containerRef}
        className="flex h-52 items-center justify-center rounded-2xl border border-white/10 bg-[#0f0f0f] text-sm text-white/30"
      >
        Play를 눌러 시작하세요
      </div>
    );
  }

  const { w, h } = size;
  const PT = 12;
  const PB = 28;
  const PX = 12;
  const maxVal = Math.max(...values);
  const areaW = w - PX * 2;
  const areaH = h - PT - PB;
  const slotW = areaW / values.length;
  const gap = Math.max(slotW * 0.15, 2);
  const bw = slotW - gap;

  return (
    <div
      ref={containerRef}
      className="relative h-52 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]"
    >
      {w > 0 && (
        <svg width={w} height={h}>
          {values.map((val, idx) => {
            const bh = Math.max((val / maxVal) * areaH, 4);
            const x = PX + idx * slotW + gap / 2;
            const y = PT + areaH - bh;
            const color = barColor(idx, step);

            return (
              <g key={idx}>
                <motion.rect
                  x={x}
                  y={y}
                  width={bw}
                  height={bh}
                  rx={4}
                  animate={{ fill: color }}
                  transition={{ duration: 0.1 }}
                />
                <text
                  x={x + bw / 2}
                  y={h - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fill="rgba(255,255,255,0.3)"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

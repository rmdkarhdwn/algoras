"use client";

import type { AlgorithmStep } from "@/lib/algorithms/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  step: AlgorithmStep;
};

const MAX_BAR_H = 200;
const PAD_X = 24;
const PAD_TOP = 32;   // enough room for value labels
const PAD_BOTTOM = 44;
const SVG_H = MAX_BAR_H + PAD_TOP + PAD_BOTTOM;

function barColor(i: number, step: AlgorithmStep) {
  if (step.sorted.includes(i)) return "#22c55e";
  if (step.swapping.includes(i)) return "#ef4444";
  if (step.comparing.includes(i)) return "#eab308";
  return "#D4AF37";
}

function barGlow(i: number, step: AlgorithmStep) {
  if (step.swapping.includes(i)) return "drop-shadow(0 0 8px rgba(239,68,68,0.7))";
  if (step.comparing.includes(i)) return "drop-shadow(0 0 8px rgba(234,179,8,0.6))";
  if (step.sorted.includes(i)) return "drop-shadow(0 0 6px rgba(34,197,94,0.35))";
  return "none";
}

function stateLabel(i: number, step: AlgorithmStep) {
  if (step.sorted.includes(i)) return "done";
  if (step.swapping.includes(i)) return "swap";
  if (step.comparing.includes(i)) return "cmp";
  return "";
}

export function BubbleSortVisualizer({ step }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(480);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSvgWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { array } = step;
  const n = array.length;
  const max = Math.max(...array);
  const usable = svgWidth - PAD_X * 2;
  const slot = usable / n;
  const barW = Math.max(8, Math.min(44, slot * 0.62));

  return (
    <div className="flex flex-col gap-4">
      <svg
        ref={svgRef}
        width="100%"
        height={SVG_H}
        aria-label="Bubble sort visualization"
      >
        {array.map((value, i) => {
          const barH = Math.max(6, (value / max) * MAX_BAR_H);
          const x = PAD_X + slot * i + (slot - barW) / 2;
          const y = PAD_TOP + MAX_BAR_H - barH;
          const color = barColor(i, step);
          const label = stateLabel(i, step);

          return (
            <g key={i}>
              {/* Bar */}
              <motion.rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={5}
                animate={{ fill: color }}
                transition={{ duration: 0.22 }}
                style={{ filter: barGlow(i, step) }}
              />

              {/* Value label above bar */}
              <motion.text
                x={x + barW / 2}
                y={Math.max(PAD_TOP - 6, y - 6)}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                animate={{ fill: color }}
                transition={{ duration: 0.22 }}
              >
                {value}
              </motion.text>

              {/* State label below baseline */}
              {label && (
                <text
                  x={x + barW / 2}
                  y={PAD_TOP + MAX_BAR_H + 18}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={700}
                  fill={color}
                  style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}

        {/* Baseline */}
        <line
          x1={PAD_X}
          y1={PAD_TOP + MAX_BAR_H}
          x2={svgWidth - PAD_X}
          y2={PAD_TOP + MAX_BAR_H}
          stroke="rgba(245,245,245,0.1)"
          strokeWidth={1}
        />
      </svg>

      {/* Step description */}
      <p
        className="min-h-[1.5rem] text-center text-sm"
        style={{ color: "rgba(245,245,245,0.5)" }}
      >
        {step.description}
      </p>
    </div>
  );
}

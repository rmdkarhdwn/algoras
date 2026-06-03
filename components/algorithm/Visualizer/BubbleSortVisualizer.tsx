"use client";

import type { AlgorithmStep } from "@/lib/algorithms/types";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  step: AlgorithmStep;
};

const BAR_WIDTH = 36;
const BAR_GAP = 10;
const MAX_HEIGHT = 220;
const SVG_PADDING_X = 24;
const SVG_PADDING_TOP = 16;
const SVG_PADDING_BOTTOM = 48;

function barColor(index: number, step: AlgorithmStep): string {
  if (step.sorted.includes(index)) return "#22c55e";   // green
  if (step.swapping.includes(index)) return "#ef4444";  // red
  if (step.comparing.includes(index)) return "#eab308"; // yellow
  return "#D4AF37";                                      // gold default
}

function barLabel(index: number, step: AlgorithmStep): string {
  if (step.sorted.includes(index)) return "sorted";
  if (step.swapping.includes(index)) return "swap";
  if (step.comparing.includes(index)) return "cmp";
  return "";
}

export function BubbleSortVisualizer({ step }: Props) {
  const { array } = step;
  const max = Math.max(...array);
  const n = array.length;
  const svgWidth = n * (BAR_WIDTH + BAR_GAP) - BAR_GAP + SVG_PADDING_X * 2;
  const svgHeight = MAX_HEIGHT + SVG_PADDING_TOP + SVG_PADDING_BOTTOM;

  return (
    <div className="flex flex-col gap-4">
      <svg
        width="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="overflow-visible"
        aria-label="Bubble sort visualization"
      >
        <AnimatePresence initial={false}>
          {array.map((value, i) => {
            const barH = Math.max(8, (value / max) * MAX_HEIGHT);
            const x = SVG_PADDING_X + i * (BAR_WIDTH + BAR_GAP);
            const y = SVG_PADDING_TOP + MAX_HEIGHT - barH;
            const color = barColor(i, step);
            const label = barLabel(i, step);

            return (
              <motion.g
                key={`bar-${i}`}
                layout
                layoutId={`bar-${value}-${i}`}
                initial={false}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Bar */}
                <motion.rect
                  x={x}
                  y={y}
                  width={BAR_WIDTH}
                  height={barH}
                  rx={6}
                  fill={color}
                  animate={{ fill: color, y, height: barH }}
                  transition={{ duration: 0.25 }}
                  style={{
                    filter: step.swapping.includes(i)
                      ? "drop-shadow(0 0 8px rgba(239,68,68,0.7))"
                      : step.comparing.includes(i)
                      ? "drop-shadow(0 0 8px rgba(234,179,8,0.6))"
                      : step.sorted.includes(i)
                      ? "drop-shadow(0 0 6px rgba(34,197,94,0.4))"
                      : "none",
                  }}
                />

                {/* Value label above bar */}
                <motion.text
                  x={x + BAR_WIDTH / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={color}
                  animate={{ y: y - 6 }}
                  transition={{ duration: 0.25 }}
                >
                  {value}
                </motion.text>

                {/* State label below bar */}
                {label && (
                  <text
                    x={x + BAR_WIDTH / 2}
                    y={SVG_PADDING_TOP + MAX_HEIGHT + 18}
                    textAnchor="middle"
                    fontSize={9}
                    fontWeight={700}
                    fill={color}
                    style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {label}
                  </text>
                )}
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Baseline */}
        <line
          x1={SVG_PADDING_X}
          y1={SVG_PADDING_TOP + MAX_HEIGHT}
          x2={svgWidth - SVG_PADDING_X}
          y2={SVG_PADDING_TOP + MAX_HEIGHT}
          stroke="rgba(245,245,245,0.12)"
          strokeWidth={1}
        />
      </svg>

      {/* Step description */}
      <p
        className="min-h-[1.5rem] text-center text-sm"
        style={{ color: "rgba(245,245,245,0.55)" }}
      >
        {step.description}
      </p>
    </div>
  );
}

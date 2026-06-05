"use client";

import type { AlgorithmStep } from "@/lib/algorithms/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ANIM_DURATION,
  BAR_COLORS,
  BAR_GLOW,
  BAR_MAX_W,
  BAR_MIN_W,
  BAR_RATIO,
  BAR_RX,
  FONT_LABEL_SIZE,
  FONT_VALUE_SIZE,
  FONT_WEIGHT_BOLD,
  LABEL_LETTER_SPACING,
  MAX_BAR_H,
  PAD_BOTTOM,
  PAD_TOP,
  PAD_X,
  PANEL_BORDER,
  STATE_LABEL,
  SVG_H,
  TEXT_EMPTY,
} from "./styles";

type Props = {
  step: AlgorithmStep | null;
};

function getBarColor(i: number, step: AlgorithmStep): string {
  if (step.sorted.includes(i)) return BAR_COLORS.sorted;
  if (step.swapping.includes(i)) return BAR_COLORS.swapping;
  if (step.comparing.includes(i)) return BAR_COLORS.comparing;
  if (step.pivot === i) return BAR_COLORS.pivot;
  return BAR_COLORS.default;
}

function getBarGlow(i: number, step: AlgorithmStep): string {
  if (step.swapping.includes(i)) return BAR_GLOW.swapping;
  if (step.comparing.includes(i)) return BAR_GLOW.comparing;
  if (step.sorted.includes(i)) return BAR_GLOW.sorted;
  if (step.pivot === i) return BAR_GLOW.pivot;
  return BAR_GLOW.none;
}

function getStateLabel(i: number, step: AlgorithmStep): string {
  if (step.sorted.includes(i)) return STATE_LABEL.sorted;
  if (step.swapping.includes(i)) return STATE_LABEL.swapping;
  if (step.comparing.includes(i)) return STATE_LABEL.comparing;
  if (step.pivot === i) return STATE_LABEL.pivot;
  return "";
}

export function SortingVisualizer({ step }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(480);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSvgWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!step) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: SVG_H, color: TEXT_EMPTY }}
      >
        배열을 입력하고 시작하세요
      </div>
    );
  }

  const { array } = step;
  const n = array.length;
  const max = Math.max(...array);
  const usable = svgWidth - PAD_X * 2;
  const slot = usable / n;
  const barW = Math.max(BAR_MIN_W, Math.min(BAR_MAX_W, slot * BAR_RATIO));

  return (
    <svg ref={svgRef} width="100%" height={SVG_H} aria-label="정렬 시각화">
      {array.map((value, i) => {
        const barH = Math.max(6, (value / max) * MAX_BAR_H);
        const x = PAD_X + slot * i + (slot - barW) / 2;
        const y = PAD_TOP + MAX_BAR_H - barH;
        const color = getBarColor(i, step);
        const label = getStateLabel(i, step);

        return (
          <g key={i}>
            <motion.rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={BAR_RX}
              animate={{ fill: color }}
              transition={{ duration: ANIM_DURATION }}
              style={{ filter: getBarGlow(i, step) }}
            />

            <motion.text
              x={x + barW / 2}
              y={Math.max(PAD_TOP - 6, y - 6)}
              textAnchor="middle"
              fontSize={FONT_VALUE_SIZE}
              fontWeight={FONT_WEIGHT_BOLD}
              animate={{ fill: color }}
              transition={{ duration: ANIM_DURATION }}
            >
              {value}
            </motion.text>

            {label && (
              <text
                x={x + barW / 2}
                y={PAD_TOP + MAX_BAR_H + 18}
                textAnchor="middle"
                fontSize={FONT_LABEL_SIZE}
                fontWeight={FONT_WEIGHT_BOLD}
                fill={color}
                style={{ textTransform: "uppercase", letterSpacing: LABEL_LETTER_SPACING }}
              >
                {label}
              </text>
            )}
          </g>
        );
      })}

      <line
        x1={PAD_X}
        y1={PAD_TOP + MAX_BAR_H}
        x2={svgWidth - PAD_X}
        y2={PAD_TOP + MAX_BAR_H}
        stroke={PANEL_BORDER}
        strokeWidth={1}
      />
    </svg>
  );
}

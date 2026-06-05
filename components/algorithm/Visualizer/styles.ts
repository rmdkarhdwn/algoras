// ─── Bar colors ───────────────────────────────────────────────────────────────

export const BAR_COLORS = {
  default: "#D4AF37",
  comparing: "#eab308",
  swapping: "#ef4444",
  sorted: "#22c55e",
  pivot: "#a78bfa",
} as const;

// ─── Bar glow filters ─────────────────────────────────────────────────────────

export const BAR_GLOW = {
  swapping: "drop-shadow(0 0 8px rgba(239,68,68,0.7))",
  comparing: "drop-shadow(0 0 8px rgba(234,179,8,0.6))",
  sorted: "drop-shadow(0 0 6px rgba(34,197,94,0.35))",
  pivot: "drop-shadow(0 0 8px rgba(167,139,250,0.6))",
  none: "none",
} as const;

// ─── SVG canvas dimensions ────────────────────────────────────────────────────

export const MAX_BAR_H = 200;
export const PAD_X = 24;
export const PAD_TOP = 32;
export const PAD_BOTTOM = 44;
export const SVG_H = MAX_BAR_H + PAD_TOP + PAD_BOTTOM;

// ─── Bar geometry ─────────────────────────────────────────────────────────────

export const BAR_RATIO = 0.62;
export const BAR_MIN_W = 8;
export const BAR_MAX_W = 44;
export const BAR_RX = 5;

// ─── Typography ───────────────────────────────────────────────────────────────

export const FONT_VALUE_SIZE = 11;
export const FONT_LABEL_SIZE = 9;
export const FONT_WEIGHT_BOLD = 700;
export const LABEL_LETTER_SPACING = "0.06em";

// ─── State labels ─────────────────────────────────────────────────────────────

export const STATE_LABEL: Record<string, string> = {
  comparing: "cmp",
  swapping: "swap",
  sorted: "done",
  pivot: "pivot",
};

// ─── Animation ────────────────────────────────────────────────────────────────

export const ANIM_DURATION = 0.22;

// ─── Panel ────────────────────────────────────────────────────────────────────

export const PANEL_BG = "rgba(20,20,20,0.6)";
export const PANEL_BORDER = "rgba(245,245,245,0.1)";

// ─── Control button ───────────────────────────────────────────────────────────

export const CTRL_BTN_BORDER = "1px solid rgba(212,175,55,0.25)";
export const CTRL_BTN_BG = "rgba(212,175,55,0.06)";
export const CTRL_BTN_BG_HOVER = "rgba(212,175,55,0.14)";
export const CTRL_BTN_COLOR = "#D4AF37";

// ─── Text ─────────────────────────────────────────────────────────────────────

export const TEXT_MUTED = "rgba(245,245,245,0.4)";
export const TEXT_DIM = "rgba(245,245,245,0.35)";
export const TEXT_STEP_DESC = "rgba(245,245,245,0.75)";
export const TEXT_ERROR = "rgba(239,68,68,0.8)";
export const TEXT_EMPTY = "rgba(245,245,245,0.3)";

// ─── Input ────────────────────────────────────────────────────────────────────

export const INPUT_BORDER = "rgba(245,245,245,0.12)";
export const INPUT_BORDER_ERROR = "rgba(239,68,68,0.5)";

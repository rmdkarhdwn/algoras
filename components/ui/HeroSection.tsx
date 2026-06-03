"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type HeroSectionProps = {
  locale: string;
  heading: string;
  description: string;
  primaryCta: string;
};

// ─── Algorithm-themed floating cards ─────────────────────────────────────────

function SortBarsCard() {
  const bars = [28, 48, 20, 64, 36, 52];
  return (
    <div
      className="flex items-end gap-1.5 rounded-2xl border border-white/10 bg-[#141414]/90 px-4 pb-3 pt-4 backdrop-blur-md"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 28px rgba(212,175,55,0.12)" }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-5 rounded-t"
          style={{
            height: h,
            background: i === 3 ? "#D4AF37" : "rgba(212,175,55,0.22)",
            boxShadow: i === 3 ? "0 0 10px rgba(212,175,55,0.5)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

function GraphNodeCard() {
  return (
    <div className="relative" style={{ width: 100, height: 100 }}>
      <svg className="absolute inset-0" width={100} height={100} viewBox="0 0 100 100" fill="none">
        <line x1="50" y1="50" x2="10" y2="10" stroke="rgba(212,175,55,0.28)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="50" y1="50" x2="90" y2="18" stroke="rgba(212,175,55,0.28)" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="50" y1="50" x2="18" y2="90" stroke="rgba(212,175,55,0.28)" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="10" cy="10" r="7" fill="#141414" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
        <circle cx="90" cy="18" r="7" fill="#141414" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
        <circle cx="18" cy="90" r="7" fill="#141414" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
      </svg>
      <div
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-sm font-bold"
        style={{
          border: "1.5px solid rgba(212,175,55,0.7)",
          background: "rgba(20,20,20,0.92)",
          color: "#D4AF37",
          boxShadow: "0 0 20px rgba(212,175,55,0.2), inset 0 0 10px rgba(212,175,55,0.05)",
        }}
      >
        42
      </div>
    </div>
  );
}

function ArrayCard() {
  const items: [number, boolean][] = [
    [3, false], [1, false], [4, true], [1, false], [5, false],
  ];
  return (
    <div
      className="flex items-center rounded-xl border border-white/10 bg-[#141414]/90 px-4 py-3 font-mono text-sm backdrop-blur-md"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.08)", gap: 2 }}
    >
      <span className="mr-1 font-bold" style={{ color: "#D4AF37" }}>[</span>
      {items.map(([v, active], i) => (
        <span
          key={i}
          style={{ color: active ? "#D4AF37" : "rgba(245,245,245,0.45)", padding: "0 3px" }}
        >
          {v}{i < items.length - 1 ? "," : ""}
        </span>
      ))}
      <span className="ml-1 font-bold" style={{ color: "#D4AF37" }}>]</span>
    </div>
  );
}

function PartitionCard() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#141414]/90 px-5 py-4 font-mono backdrop-blur-md"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(212,175,55,0.08)" }}
    >
      <span style={{ color: "#D4AF37", fontSize: 26, lineHeight: 1, fontWeight: 300 }}>{`{`}</span>
      <div className="space-y-0.5 text-xs">
        <p>
          <span style={{ color: "#D4AF37" }}>pivot</span>
          <span style={{ color: "rgba(245,245,245,0.45)" }}>{`: 4`}</span>
        </p>
        <p>
          <span style={{ color: "rgba(212,175,55,0.65)" }}>left</span>
          <span style={{ color: "rgba(245,245,245,0.45)" }}>{`: [1, 3]`}</span>
        </p>
        <p>
          <span style={{ color: "rgba(212,175,55,0.65)" }}>right</span>
          <span style={{ color: "rgba(245,245,245,0.45)" }}>{`: [5]`}</span>
        </p>
      </div>
      <span style={{ color: "#D4AF37", fontSize: 26, lineHeight: 1, fontWeight: 300 }}>{`}`}</span>
    </div>
  );
}

function ComplexityCard({ label }: { label: string }) {
  return (
    <div
      className="rounded-full font-mono text-sm backdrop-blur-md"
      style={{
        border: "1px solid rgba(212,175,55,0.35)",
        background: "rgba(212,175,55,0.08)",
        color: "#D4AF37",
        padding: "9px 22px",
        boxShadow: "0 0 28px rgba(212,175,55,0.18)",
      }}
    >
      {label}
    </div>
  );
}

// ─── Float animation helper ───────────────────────────────────────────────────

type FloatConfig = { amp: number; dur: number; delay?: number };

function floatMotion({ amp, dur, delay = 0 }: FloatConfig) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, y: [-amp, amp] },
    transition: {
      opacity: { duration: 0.5, delay },
      y: { duration: dur, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const, delay },
    },
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HeroSection({ locale, heading, description, primaryCta }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 640 }}>
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "44px 44px",
        }}
      />

      {/* Gold ambient glow — right center */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: "8%",
          top: "15%",
          width: 580,
          height: 580,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)",
        }}
      />

      {/* Layout */}
      <div className="relative mx-auto flex min-h-[640px] w-full max-w-6xl items-center px-6 md:px-10">

        {/* ── Left: Text (58%) ── */}
        <motion.div
          className="flex w-full flex-col gap-7 py-24 md:w-[58%]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Heading */}
          <h1
            className="text-5xl font-bold leading-[1.15] tracking-tight md:text-[3.75rem]"
            style={{ color: "#F5F5F5" }}
          >
            {heading}
          </h1>

          {/* Description */}
          <p
            className="max-w-[440px] text-lg leading-[1.85]"
            style={{ color: "rgba(245,245,245,0.48)" }}
          >
            {description}
          </p>

          {/* CTA */}
          <div className="pt-1">
            <Link
              href={`/${locale}/algorithms`}
              className="inline-flex rounded-full px-7 py-3.5 text-sm font-bold transition hover:opacity-85"
              style={{
                background: "#D4AF37",
                color: "#0B0B0B",
                boxShadow: "0 0 32px rgba(212,175,55,0.4), 0 4px 16px rgba(212,175,55,0.2)",
              }}
            >
              {primaryCta}
            </Link>
          </div>
        </motion.div>

        {/* ── Right: Floating objects (hidden on mobile) ── */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 hidden md:block"
          style={{ width: "46%", perspective: 900 }}
        >
          {/* Sort bars — top */}
          <motion.div
            className="absolute"
            style={{ top: "6%", right: "12%" }}
            {...floatMotion({ amp: 8, dur: 4.2, delay: 0.3 })}
          >
            <div style={{ transform: "rotateX(10deg) rotateY(-18deg)" }}>
              <SortBarsCard />
            </div>
          </motion.div>

          {/* Graph node — mid-left */}
          <motion.div
            className="absolute"
            style={{ top: "28%", right: "54%" }}
            {...floatMotion({ amp: 7, dur: 3.8, delay: 0.7 })}
          >
            <div style={{ transform: "rotateX(-8deg) rotateY(14deg)" }}>
              <GraphNodeCard />
            </div>
          </motion.div>

          {/* Array — mid-right */}
          <motion.div
            className="absolute"
            style={{ top: "40%", right: "5%" }}
            {...floatMotion({ amp: 8, dur: 5.1, delay: 1.4 })}
          >
            <div style={{ transform: "rotateX(6deg) rotateY(-10deg)" }}>
              <ArrayCard />
            </div>
          </motion.div>

          {/* Partition object — lower center */}
          <motion.div
            className="absolute"
            style={{ top: "57%", right: "32%" }}
            {...floatMotion({ amp: 8, dur: 4.6, delay: 0.4 })}
          >
            <div style={{ transform: "rotateX(-5deg) rotateY(8deg)" }}>
              <PartitionCard />
            </div>
          </motion.div>

          {/* Complexity badge — bottom right */}
          <motion.div
            className="absolute"
            style={{ top: "74%", right: "9%" }}
            {...floatMotion({ amp: 7, dur: 3.5, delay: 1.1 })}
          >
            <div style={{ transform: "rotateX(4deg) rotateY(-6deg)" }}>
              <ComplexityCard label="O(n log n)" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Cell = { id: number; value: number; state: "default" | "highlight" | "new" | "removing" };

let idCounter = 100;

const INITIAL: Cell[] = [8, 13, 21, 5, 34].map((v, i) => ({ id: i, value: v, state: "default" }));

export function ArrayDemo() {
  const [cells, setCells] = useState<Cell[]>(INITIAL);
  const [input, setInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [log, setLog] = useState("배열이 준비됐습니다.");

  const reset = () => { setCells(INITIAL.map(c => ({ ...c, state: "default" })) ); setLog("초기화됐습니다."); };

  const access = () => {
    const idx = parseInt(indexInput, 10);
    if (isNaN(idx) || idx < 0 || idx >= cells.length) { setLog(`유효하지 않은 인덱스입니다.`); return; }
    setCells(cells.map((c, i) => ({ ...c, state: i === idx ? "highlight" : "default" })));
    setLog(`arr[${idx}] = ${cells[idx].value} 접근 완료 — O(1)`);
  };

  const insert = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) { setLog("숫자를 입력하세요."); return; }
    if (cells.length >= 8) { setLog("최대 8개까지 입력 가능합니다."); return; }
    const idx = parseInt(indexInput, 10);
    const pos = isNaN(idx) || idx < 0 ? cells.length : Math.min(idx, cells.length);
    const newCell: Cell = { id: idCounter++, value: val, state: "new" };
    const next = [...cells];
    next.splice(pos, 0, newCell);
    setCells(next.map(c => c.id === newCell.id ? c : { ...c, state: "default" }));
    setTimeout(() => setCells(prev => prev.map(c => ({ ...c, state: "default" }))), 800);
    setLog(`arr.splice(${pos}, 0, ${val}) — O(n) 삽입 완료`);
    setInput("");
  };

  const remove = () => {
    const idx = parseInt(indexInput, 10);
    if (isNaN(idx) || idx < 0 || idx >= cells.length) { setLog("유효하지 않은 인덱스입니다."); return; }
    setLog(`arr.splice(${idx}, 1) — O(n) 삭제 완료 (값: ${cells[idx].value})`);
    setCells(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-5">
      <div className="flex min-h-[80px] items-end gap-2 rounded-2xl border border-white/10 bg-[#0f0f0f] p-5">
        <AnimatePresence mode="popLayout">
          {cells.map((cell, idx) => (
            <motion.div
              key={cell.id}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
                animate={{
                  background: cell.state === "highlight" ? "rgba(212,175,55,0.3)"
                    : cell.state === "new" ? "rgba(34,197,94,0.25)"
                    : "rgba(255,255,255,0.07)",
                  borderColor: cell.state === "highlight" ? "#D4AF37"
                    : cell.state === "new" ? "#22c55e"
                    : "rgba(255,255,255,0.1)",
                  color: cell.state === "highlight" ? "#D4AF37"
                    : cell.state === "new" ? "#22c55e"
                    : "#F5F5F5",
                }}
                style={{ border: "1px solid" }}
              >
                {cell.value}
              </motion.div>
              <span className="text-[10px] text-white/25">[{idx}]</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="min-h-[1.25rem] text-sm" style={{ color: "rgba(245,245,245,0.55)" }}>{log}</p>

      <div className="flex flex-wrap gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="값"
          className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center text-sm outline-none focus:border-[#D4AF37]/50"
        />
        <input
          type="number"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          placeholder="idx"
          className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center text-sm outline-none focus:border-[#D4AF37]/50"
        />
        <Btn onClick={access} label="Access" color="#D4AF37" />
        <Btn onClick={insert} label="Insert" color="#22c55e" />
        <Btn onClick={remove} label="Delete" color="#ef4444" />
        <Btn onClick={reset} label="Reset" color="rgba(245,245,245,0.4)" />
      </div>
    </div>
  );
}

function Btn({ onClick, label, color }: { onClick: () => void; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-75"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {label}
    </button>
  );
}

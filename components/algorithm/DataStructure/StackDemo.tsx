"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { id: number; value: number; state: "default" | "new" | "removing" };

let idCounter = 0;

export function StackDemo() {
  const [items, setItems] = useState<Item[]>([
    { id: idCounter++, value: 3, state: "default" },
    { id: idCounter++, value: 7, state: "default" },
    { id: idCounter++, value: 1, state: "default" },
  ]);
  const [input, setInput] = useState("");
  const [log, setLog] = useState("스택이 준비됐습니다.");

  const push = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) { setLog("숫자를 입력하세요."); return; }
    if (items.length >= 7) { setLog("최대 7개까지 가능합니다."); return; }
    const newItem: Item = { id: idCounter++, value: val, state: "new" };
    setItems(prev => [...prev, newItem]);
    setTimeout(() => setItems(prev => prev.map(i => ({ ...i, state: "default" }))), 700);
    setLog(`push(${val}) — O(1) 완료. top = ${val}`);
    setInput("");
  };

  const pop = () => {
    if (!items.length) { setLog("스택이 비어 있습니다."); return; }
    const top = items[items.length - 1];
    setLog(`pop() = ${top.value} — O(1) 완료`);
    setItems(prev => prev.slice(0, -1));
  };

  const peek = () => {
    if (!items.length) { setLog("스택이 비어 있습니다."); return; }
    const top = items[items.length - 1];
    setItems(prev => prev.map((item, i) => ({ ...item, state: i === prev.length - 1 ? "new" : "default" })));
    setTimeout(() => setItems(prev => prev.map(i => ({ ...i, state: "default" }))), 800);
    setLog(`peek() = ${top.value} — O(1) 완료`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col-reverse items-center gap-2 rounded-2xl border border-white/10 bg-[#0f0f0f] p-5" style={{ minHeight: 200 }}>
        {items.length === 0 && (
          <span className="text-sm" style={{ color: "rgba(245,245,245,0.2)" }}>비어 있음</span>
        )}
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.2 }}
              className="flex w-32 items-center justify-between rounded-lg px-4 py-2 text-sm font-bold"
              style={{
                background: item.state === "new" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${item.state === "new" ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
                color: item.state === "new" ? "#D4AF37" : "#F5F5F5",
              }}
            >
              <span>{item.value}</span>
              {idx === items.length - 1 && (
                <span className="text-[10px] font-normal" style={{ color: "#D4AF37" }}>← top</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="min-h-[1.25rem] text-sm" style={{ color: "rgba(245,245,245,0.55)" }}>{log}</p>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && push()}
          placeholder="값"
          className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-center text-sm outline-none focus:border-[#D4AF37]/50"
        />
        <Btn onClick={push} label="Push" color="#22c55e" />
        <Btn onClick={pop} label="Pop" color="#ef4444" />
        <Btn onClick={peek} label="Peek" color="#D4AF37" />
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

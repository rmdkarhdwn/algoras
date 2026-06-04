"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Item = { id: number; value: number; state: "default" | "new" };

let idCounter = 0;

export function QueueDemo() {
  const [items, setItems] = useState<Item[]>([
    { id: idCounter++, value: 10, state: "default" },
    { id: idCounter++, value: 20, state: "default" },
    { id: idCounter++, value: 30, state: "default" },
  ]);
  const [input, setInput] = useState("");
  const [log, setLog] = useState("큐가 준비됐습니다.");

  const enqueue = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) { setLog("숫자를 입력하세요."); return; }
    if (items.length >= 7) { setLog("최대 7개까지 가능합니다."); return; }
    const newItem: Item = { id: idCounter++, value: val, state: "new" };
    setItems(prev => [...prev, newItem]);
    setTimeout(() => setItems(prev => prev.map(i => ({ ...i, state: "default" }))), 700);
    setLog(`enqueue(${val}) — O(1) 완료. rear에 추가`);
    setInput("");
  };

  const dequeue = () => {
    if (!items.length) { setLog("큐가 비어 있습니다."); return; }
    const front = items[0];
    setLog(`dequeue() = ${front.value} — O(1) 완료. front에서 제거`);
    setItems(prev => prev.slice(1));
  };

  const peek = () => {
    if (!items.length) { setLog("큐가 비어 있습니다."); return; }
    setItems(prev => prev.map((item, i) => ({ ...item, state: i === 0 ? "new" : "default" })));
    setTimeout(() => setItems(prev => prev.map(i => ({ ...i, state: "default" }))), 800);
    setLog(`peek() = ${items[0].value} — O(1) front 확인`);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5" style={{ minHeight: 100 }}>
        {items.length === 0 ? (
          <div className="flex h-12 items-center justify-center text-sm" style={{ color: "rgba(245,245,245,0.2)" }}>
            비어 있음
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30">front</span>
              <div className="flex-1 border-t border-dashed border-white/10" />
              <span className="text-[10px] text-white/30">rear</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="flex shrink-0 flex-col items-center gap-1"
                  >
                    <div
                      className="flex h-10 w-12 items-center justify-center rounded-lg text-sm font-bold transition-all"
                      style={{
                        background: item.state === "new" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${item.state === "new" ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
                        color: item.state === "new" ? "#D4AF37" : "#F5F5F5",
                      }}
                    >
                      {item.value}
                    </div>
                    {(idx === 0 || idx === items.length - 1) && (
                      <span className="text-[9px]" style={{ color: "#D4AF37" }}>
                        {idx === 0 ? "front" : "rear"}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <p className="min-h-[1.25rem] text-sm" style={{ color: "rgba(245,245,245,0.55)" }}>{log}</p>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enqueue()}
          placeholder="값"
          className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-center text-sm outline-none focus:border-[#D4AF37]/50"
        />
        <Btn onClick={enqueue} label="Enqueue" color="#22c55e" />
        <Btn onClick={dequeue} label="Dequeue" color="#ef4444" />
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

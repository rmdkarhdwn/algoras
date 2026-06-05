"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CellState = "default" | "highlight" | "searching" | "found" | "new";
type Cell = { id: number; value: number; state: CellState };

let idCounter = 100;

const INITIAL: Cell[] = [8, 13, 21, 5, 34].map((v, i) => ({ id: i, value: v, state: "default" }));
const SEARCH_DELAY_MS = 260;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function ArrayDemo() {
  const [cells, setCells] = useState<Cell[]>(INITIAL);
  const [input, setInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [log, setLog] = useState("배열이 준비됐습니다.");
  const [isBusy, setIsBusy] = useState(false);

  const reset = () => {
    setCells(INITIAL.map((cell) => ({ ...cell, state: "default" })));
    setLog("초기화됐습니다.");
    setInput("");
    setIndexInput("");
    setIsBusy(false);
  };

  const access = () => {
    const idx = parseInt(indexInput, 10);
    if (isNaN(idx) || idx < 0 || idx >= cells.length) {
      setLog("유효하지 않은 인덱스입니다.");
      return;
    }
    setCells(cells.map((cell, i) => ({ ...cell, state: i === idx ? "highlight" : "default" })));
    setLog(`arr[${idx}] = ${cells[idx].value} 접근 완료 — O(1)`);
  };

  const insert = () => {
    const val = parseInt(input, 10);
    if (isNaN(val)) {
      setLog("숫자를 입력하세요.");
      return;
    }
    if (cells.length >= 8) {
      setLog("최대 8개까지 입력 가능합니다.");
      return;
    }
    const idx = parseInt(indexInput, 10);
    const pos = isNaN(idx) || idx < 0 ? cells.length : Math.min(idx, cells.length);
    const newCell: Cell = { id: idCounter++, value: val, state: "new" };
    const next = [...cells];
    next.splice(pos, 0, newCell);
    setCells(next.map((cell) => (cell.id === newCell.id ? cell : { ...cell, state: "default" })));
    setTimeout(() => setCells((prev) => prev.map((cell) => ({ ...cell, state: "default" }))), 800);
    setLog(`arr.splice(${pos}, 0, ${val}) — O(n) 삽입 완료`);
    setInput("");
  };

  const remove = () => {
    const idx = parseInt(indexInput, 10);
    if (isNaN(idx) || idx < 0 || idx >= cells.length) {
      setLog("유효하지 않은 인덱스입니다.");
      return;
    }
    setLog(`arr.splice(${idx}, 1) — O(n) 삭제 완료 (값: ${cells[idx].value})`);
    setCells((prev) => prev.filter((_, i) => i !== idx));
  };

  const search = async () => {
    const target = parseInt(input, 10);
    if (isNaN(target)) {
      setLog("탐색할 숫자를 입력하세요.");
      return;
    }

    setIsBusy(true);
    setLog(`${target} 탐색 시작 — 순차 탐색 O(n)`);

    for (let index = 0; index < cells.length; index += 1) {
      setCells((prev) =>
        prev.map((cell, cellIndex) => ({
          ...cell,
          state: cellIndex === index ? "searching" : "default",
        }))
      );
      await sleep(SEARCH_DELAY_MS);

      if (cells[index]?.value === target) {
        setCells((prev) =>
          prev.map((cell, cellIndex) => ({
            ...cell,
            state: cellIndex === index ? "found" : "default",
          }))
        );
        setLog(`arr[${index}] = ${target} 발견 — 탐색 완료 O(n)`);
        setIsBusy(false);
        return;
      }
    }

    setCells((prev) => prev.map((cell) => ({ ...cell, state: "default" })));
    setLog(`${target} 를 찾지 못했습니다 — 전체 순회 O(n)`);
    setIsBusy(false);
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
                  background:
                    cell.state === "highlight"
                      ? "rgba(212,175,55,0.3)"
                      : cell.state === "searching"
                        ? "rgba(59,130,246,0.22)"
                        : cell.state === "found"
                          ? "rgba(34,197,94,0.3)"
                          : cell.state === "new"
                            ? "rgba(34,197,94,0.25)"
                            : "rgba(255,255,255,0.07)",
                  borderColor:
                    cell.state === "highlight"
                      ? "#D4AF37"
                      : cell.state === "searching"
                        ? "#3b82f6"
                        : cell.state === "found"
                          ? "#22c55e"
                          : cell.state === "new"
                            ? "#22c55e"
                            : "rgba(255,255,255,0.1)",
                  color:
                    cell.state === "highlight"
                      ? "#D4AF37"
                      : cell.state === "searching"
                        ? "#60a5fa"
                        : cell.state === "found"
                          ? "#22c55e"
                          : cell.state === "new"
                            ? "#22c55e"
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
          disabled={isBusy}
          className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center text-sm outline-none focus:border-[#D4AF37]/50"
        />
        <input
          type="number"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value)}
          placeholder="idx"
          disabled={isBusy}
          className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center text-sm outline-none focus:border-[#D4AF37]/50"
        />
        <Btn onClick={access} label="Access" color="#D4AF37" disabled={isBusy} />
        <Btn onClick={search} label="Search" color="#3b82f6" disabled={isBusy} />
        <Btn onClick={insert} label="Insert" color="#22c55e" disabled={isBusy} />
        <Btn onClick={remove} label="Delete" color="#ef4444" disabled={isBusy} />
        <Btn onClick={reset} label="Reset" color="rgba(245,245,245,0.4)" disabled={isBusy} />
      </div>
    </div>
  );
}

function Btn({
  onClick,
  label,
  color,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  color: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-40"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {label}
    </button>
  );
}

type VisualizerProps = {
  values: number[];
};

export function Visualizer({ values }: VisualizerProps) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-white/70 p-5">
      <div className="flex h-64 items-end gap-3">
        {values.map((value, index) => (
          <div key={`${value}-${index}`} className="flex min-w-0 flex-1 flex-col items-center gap-3">
            <div
              className="w-full rounded-t-2xl bg-gradient-to-b from-accent to-accent-strong"
              style={{ height: `${Math.max(value, 8)}%` }}
            />
            <span className="text-xs font-medium text-muted">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

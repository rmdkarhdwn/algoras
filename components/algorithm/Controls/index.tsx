import { Button } from "@/components/ui/Button";

export function Controls() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-border bg-white/70 p-4">
      <Button type="button">Play</Button>
      <Button type="button" variant="secondary">
        Pause
      </Button>
      <Button type="button" variant="ghost">
        Reset
      </Button>
      <span className="ml-auto text-sm text-muted">1.0x speed</span>
    </div>
  );
}

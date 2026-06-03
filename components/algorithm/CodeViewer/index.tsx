type CodeViewerProps = {
  code: string;
  language?: string;
};

export function CodeViewer({ code, language = "ts" }: CodeViewerProps) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-[#1b1f24]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white/55">
        <span>{language}</span>
        <span>Shiki-ready viewer slot</span>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-[#f7f2e8]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

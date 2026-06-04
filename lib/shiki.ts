import { createHighlighter } from "shiki";

const SUPPORTED_LANGS = [
  "java", "kotlin", "python", "javascript", "typescript",
  "dart", "c", "cpp", "csharp", "go", "rust", "swift", "php",
] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export type SerializedToken = { content: string; color?: string };
export type CodeTokens = {
  lines: SerializedToken[][];
  fg: string;
};

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [...SUPPORTED_LANGS],
    });
  }
  return highlighterPromise;
}

export async function tokenizeCode(code: string, lang: SupportedLang): Promise<CodeTokens> {
  const hl = await getHighlighter();
  const result = hl.codeToTokens(code, { lang, theme: "github-dark" });
  return {
    lines: result.tokens.map((line) =>
      line.map((t) => ({ content: t.content, color: t.color }))
    ),
    fg: result.fg ?? "#e1e4e8",
  };
}

import { tokenizeCode } from "@/lib/shiki";
import { getAnnotation } from "@/data/algorithms/code-annotations";
import { CodeViewerClient } from "./CodeViewerClient";
import type { SupportedLang } from "@/lib/shiki";

type Props = {
  algorithmSlug: string;
  codeExamples: Record<string, string | undefined>;
};

export async function CodeViewer({ algorithmSlug, codeExamples }: Props) {
  const langs = (Object.keys(codeExamples) as SupportedLang[]).filter(
    (l) => codeExamples[l] != null
  );

  const tokensByLang = Object.fromEntries(
    await Promise.all(
      langs.map(async (lang) => [lang, await tokenizeCode(codeExamples[lang]!, lang)])
    )
  );

  const annotationsByLang = Object.fromEntries(
    langs.map((lang) => [lang, getAnnotation(algorithmSlug, lang)])
  );

  return (
    <CodeViewerClient
      tokensByLang={tokensByLang}
      annotationsByLang={annotationsByLang}
      defaultLang={langs[0] ?? "typescript"}
    />
  );
}

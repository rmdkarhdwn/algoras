import algorithmsData from "@/data/algorithms/algorithms.json";
import dataStructuresData from "@/data/algorithms/data-structures.json";

export type TLocalizedText = {
  ko: string;
  en: string;
};

export type TCodeExamples = Record<string, string | undefined>;

export type TAlgorithmEntry = {
  slug: string;
  name: string;
  category: string;
  difficulty: string;
  sampleInput: number[];
  description: TLocalizedText;
  complexity: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  codeExamples: TCodeExamples;
};

export type TDataStructureEntry = {
  slug: string;
  name: string;
  category: string;
  description: TLocalizedText;
  primaryUseCase: TLocalizedText;
  useCases: {
    ko: string[];
    en: string[];
  };
  complexity: {
    access?: string;
    search?: string;
    insertion?: string;
    deletion?: string;
    best?: string;
    average?: string;
    worst?: string;
    space?: string;
  };
  codeExamples: TCodeExamples;
};

export const algorithms = algorithmsData as TAlgorithmEntry[];
export const dataStructures = dataStructuresData as TDataStructureEntry[];

export function getAlgorithmBySlug(slug: string) {
  return algorithms.find((algorithm) => algorithm.slug === slug);
}

export function getDataStructureBySlug(slug: string) {
  return dataStructures.find((structure) => structure.slug === slug);
}


export type AlgorithmStep = {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  pivot?: number;
  description: string;
};

export type ComplexityProfile = {
  best: string;
  average: string;
  worst: string;
  space: string;
};

export type AlgorithmStep = {
  values: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  description: string;
};

export type ComplexityProfile = {
  best: string;
  average: string;
  worst: string;
  space: string;
};

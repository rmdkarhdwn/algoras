# Algoras Context

- App Router lives in `app/` with locale-prefixed routes under `app/[locale]`.
- Shared UI is organized under `components/ui`, `components/layout`, and `components/algorithm`.
- Algorithm metadata and code samples live in `data/algorithms/*.json`.
- Step-generation logic for visualizations lives in `lib/algorithms/sorting`.
- Global visualization playback state is reserved for `stores/visualizationStore.ts`.

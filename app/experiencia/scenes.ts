export const SCENES = [
  { key: "acto1", actoLabel: 1, showProgress: false },
  { key: "acto2", actoLabel: 2, showProgress: true },
  { key: "acto3", actoLabel: 3, showProgress: true },
  { key: "acto4", actoLabel: 4, showProgress: true },
  { key: "puente", actoLabel: null, showProgress: false },
  { key: "acto5", actoLabel: 5, showProgress: true },
  { key: "acto6", actoLabel: 6, showProgress: true },
  { key: "acto7", actoLabel: 7, showProgress: false },
] as const;

export type SceneKey = (typeof SCENES)[number]["key"];

export const TOTAL_ACTOS = 7;

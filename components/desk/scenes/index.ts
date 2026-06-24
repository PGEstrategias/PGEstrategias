"use client";

/* Registro de escenas REALES por índice. Si una escena no está
   aquí todavía, DeskExperience muestra su stub de andamiaje. */
import type { ComponentType } from "react";
import type { SceneProps } from "./types";
import S01_Letter from "./S01_Letter";

export const SCENE_COMPONENTS: Record<number, ComponentType<SceneProps>> = {
  0: S01_Letter,
};

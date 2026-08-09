"use client";

/* ============================================================
   MÁQUINA DE ESCENAS — VSL "El Escritorio" (Sistema PG)
   ------------------------------------------------------------
   Estado global mínimo (Zustand) que controla qué escena está
   activa, la dirección del avance (para animaciones de entrada/
   salida) y un candado que bloquea clics durante la transición.

   El "objeto que avanza" es parte de la historia: cada escena
   llama a next() / go() desde su propio Hotspot, no hay un botón
   genérico de "siguiente".
   ============================================================ */

import { create } from "zustand";

/* ---------- Metadatos de las 10 escenas (sin arte final) ----------
   Esto es el guion del paso 1: títulos, objeto interactivo y la
   microcopy del "clic". El arte 2.5D entra en pasos posteriores.   */
export type SceneMeta = {
  id: string;
  titulo: string; // tu sección narrativa
  objeto: string; // objeto del escritorio sobre el que se hace clic
  hint: string; // microtexto que indica dónde/qué clicar
};

export const SCENES: SceneMeta[] = [
  { id: "S01", titulo: "El gancho", objeto: "La carta sellada", hint: "Rompe el sello de cera" },
  { id: "S02", titulo: "Mundo sin sistema", objeto: "El escritorio: caos vs. orden", hint: "Toca el lado limpio" },
  { id: "S03", titulo: "Video 1", objeto: "La laptop", hint: "Entra a la pantalla" },
  { id: "S04", titulo: "Caso 1 · San Bartolo", objeto: "Polaroid + nota", hint: "Revela la foto" },
  { id: "S05", titulo: "Video 2", objeto: "La tablet", hint: "Entra a la pantalla" },
  { id: "S06", titulo: "Caso 2 · Dr. Fernández", objeto: "Segunda polaroid", hint: "Revela la foto" },
  { id: "S07", titulo: "El Sistema PG", objeto: "El blueprint", hint: "Despliega los 5 pasos" },
  { id: "S08", titulo: "Quiénes somos", objeto: "Tarjetas de presentación", hint: "Abre el abanico" },
  { id: "S09", titulo: "Cliente ideal", objeto: "El dossier + mapa", hint: "Suelta los pins" },
  { id: "S10", titulo: "Cierre + CTA", objeto: "La carta vuelve (WhatsApp)", hint: "Abre la carta" },
];

export const LAST = SCENES.length - 1; // 9

type SceneState = {
  index: number; // 0..9 (escena activa)
  dir: 1 | -1; // dirección del último avance (para entrada/salida)
  locked: boolean; // bloquea clics mientras corre la transición
  go: (to: number) => void; // salto directo a una escena
  next: () => void; // avanzar
  prev: () => void; // retroceder
};

export const useScene = create<SceneState>((set, get) => ({
  index: 0,
  dir: 1,
  locked: false,
  go: (to) => {
    const { locked, index } = get();
    if (locked || to === index || to < 0 || to > LAST) return;
    set({ locked: true, dir: to > index ? 1 : -1, index: to });
  },
  next: () => get().go(get().index + 1),
  prev: () => get().go(get().index - 1),
}));

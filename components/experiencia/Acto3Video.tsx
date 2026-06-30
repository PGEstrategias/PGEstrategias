"use client";

import { useEffect } from "react";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import VideoActo from "./VideoActo";
import { ASSETS } from "@/app/experiencia/assets";

export default function Acto3Video({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return <VideoActo src={ASSETS.video1} label="VIDEO 1 — ACTO 3" />;
}

"use client";

import { useEffect } from "react";
import type { ActProps } from "@/app/experiencia/ExperienciaClient";
import VideoActo from "./VideoActo";
import { VIDEOS_ACTO_3 } from "@/app/experiencia/assets";

export default function Acto3Video({ registerHandle }: ActProps) {
  useEffect(() => {
    registerHandle(null);
    return () => registerHandle(null);
  }, [registerHandle]);

  return <VideoActo sources={VIDEOS_ACTO_3} label="VIDEOS — ACTO 3" />;
}

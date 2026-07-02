"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SCENES, TOTAL_ACTOS } from "./scenes";
import Acto1Identidad from "@/components/experiencia/Acto1Identidad";
import Acto2Propuesta from "@/components/experiencia/Acto2Propuesta";
import Acto3Video from "@/components/experiencia/Acto3Video";
import Acto4Video from "@/components/experiencia/Acto4Video";
import FrasePuente from "@/components/experiencia/FrasePuente";
import Acto5Sistema from "@/components/experiencia/Acto5Sistema";
import Acto6Evidencia from "@/components/experiencia/Acto6Evidencia";
import Acto7Cierre from "@/components/experiencia/Acto7Cierre";
import ProgressDots from "@/components/experiencia/ProgressDots";

export type SceneHandle = {
  forward?: () => boolean; // return true if the scene consumed the action
  back?: () => boolean;
};

export type ActProps = {
  isActive: boolean;
  onAdvance: () => void;
  onBack: () => void;
  registerHandle: (h: SceneHandle | null) => void;
};

export default function ExperienciaClient() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const handleRef = useRef<SceneHandle | null>(null);
  const lockRef = useRef(false);

  const goTo = useCallback((next: number) => {
    if (lockRef.current) return;
    const clamped = Math.max(0, Math.min(SCENES.length - 1, next));
    if (clamped === sceneIndex) return;

    // Flash blanco entre Acto 3 (index 2) y Acto 4 (index 3)
    const isAct3ToAct4 = sceneIndex === 2 && clamped === 3;
    lockRef.current = true;
    if (isAct3ToAct4) {
      setFlash(true);
      window.setTimeout(() => {
        setFlash(false);
        setSceneIndex(clamped);
        lockRef.current = false;
      }, 90);
    } else {
      setSceneIndex(clamped);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 220);
    }
  }, [sceneIndex]);

  const advance = useCallback(() => {
    if (handleRef.current?.forward?.()) return;
    goTo(sceneIndex + 1);
  }, [goTo, sceneIndex]);

  const back = useCallback(() => {
    if (handleRef.current?.back?.()) return;
    goTo(sceneIndex - 1);
  }, [goTo, sceneIndex]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back]);

  // Swipe (mobile)
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) advance();
      else back();
    }
  };

  const onClick = (e: React.MouseEvent) => {
    // Ignorar clics dentro de elementos interactivos marcados
    const target = e.target as HTMLElement;
    if (target.closest("[data-interactive]")) return;
    advance();
  };

  const registerHandle = useCallback((h: SceneHandle | null) => {
    handleRef.current = h;
  }, []);

  const currentScene = SCENES[sceneIndex];

  const renderScene = () => {
    const props: ActProps = {
      isActive: true,
      onAdvance: advance,
      onBack: back,
      registerHandle,
    };
    switch (currentScene.key) {
      case "acto1":
        return <Acto1Identidad {...props} />;
      case "acto2":
        return <Acto2Propuesta {...props} />;
      case "acto3":
        return <Acto3Video {...props} />;
      case "acto4":
        return <Acto4Video {...props} />;
      case "puente":
        return <FrasePuente {...props} />;
      case "acto5":
        return <Acto5Sistema {...props} />;
      case "acto6":
        return <Acto6Evidencia {...props} />;
      case "acto7":
        return <Acto7Cierre {...props} />;
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full cursor-pointer"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Flash blanco entre Acto 3 y Acto 4 */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.04 }}
            className="absolute inset-0 bg-white pointer-events-none z-50"
          />
        )}
      </AnimatePresence>

      {currentScene.showProgress && currentScene.actoLabel !== null && (
        <ProgressDots
          total={TOTAL_ACTOS}
          activeActo={currentScene.actoLabel}
        />
      )}
    </div>
  );
}

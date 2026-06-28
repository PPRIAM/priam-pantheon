"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Composant AuroraBackground — Version mouvement ultra-lent et majestueux (Hypnotic Flow)
// Vitesses d'animation ralenties (45s - 60s) pour une présence hypnotique et élégante.
// ─────────────────────────────────────────────────────────────────────────────
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-[#050505] text-[#F5EDD8] transition-colors overflow-hidden w-full",
        className
      )}
      {...props}
    >
      {/* Couche de fond : Lueurs néon lime extra-douces en mouvement lent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Halo 1 — Orbe supérieur gauche lime (#BEFF39) majestueux */}
        <div
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] rounded-full animate-aurora-float will-change-transform opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(190, 255, 57, 0.18) 0%, rgba(190, 255, 57, 0.04) 50%, transparent 75%)',
            filter: 'blur(110px)',
          }}
        />

        {/* Halo 2 — Orbe inférieur droit bronze (#A89880) & lime majestueux */}
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[75vw] h-[75vh] rounded-full animate-aurora-float will-change-transform opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(168, 152, 128, 0.15) 0%, rgba(190, 255, 57, 0.05) 55%, transparent 80%)',
            filter: 'blur(120px)',
            animationDelay: '-15s',
          }}
        />

        {/* Halo 3 — Pulsation centrale ultra-lente (25s) derrière le titre */}
        <div
          className="absolute top-[20%] left-[20%] w-[60vw] h-[60vh] rounded-full animate-pulse will-change-transform opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(190, 255, 57, 0.12) 0%, rgba(190, 255, 57, 0.02) 65%, transparent 80%)',
            filter: 'blur(130px)',
            animationDuration: '25s',
          }}
        />

        {/* Couche de vagues répètes animées en défilement hypnotique (45s) */}
        <div
          className="absolute -inset-[20px] animate-aurora pointer-events-none will-change-transform opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(100deg, rgba(190, 255, 57, 0.15) 10%, rgba(168, 152, 128, 0.1) 15%, rgba(190, 255, 57, 0.1) 20%, rgba(245, 237, 216, 0.05) 25%, rgba(190, 255, 57, 0.15) 30%),
              repeating-linear-gradient(100deg, rgba(5, 5, 5, 0.7) 0%, rgba(5, 5, 5, 0.7) 7%, transparent 10%, transparent 12%, rgba(5, 5, 5, 0.7) 16%)
            `,
            backgroundSize: '300% 200%',
            filter: 'blur(12px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Contenu principal de la page */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

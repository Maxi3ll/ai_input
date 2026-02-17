import { useEffect, useRef } from 'react';
import type { GradientColors } from '../types';
import './BackgroundAurora.css';

interface BackgroundAuroraProps {
  colors: GradientColors;
  opacity: number;
  blur: number;
  mouseFollow: number;
  enabled: boolean;
}

interface BlobConfig {
  /** sine/cosine frequency multiplier */
  freqX: number;
  freqY: number;
  /** phase offset so blobs don't all move in sync */
  phaseX: number;
  phaseY: number;
  /** amplitude in vw-equivalent pixels */
  ampX: number;
  ampY: number;
  /** how strongly this blob follows the mouse (0–1 range scaled by prop) */
  mouseMul: number;
  /** size as vw */
  size: number;
}

const BLOB_CONFIGS: BlobConfig[] = [
  { freqX: 0.0003, freqY: 0.0004, phaseX: 0, phaseY: 1.2, ampX: 120, ampY: 80, mouseMul: 0.6, size: 60 },
  { freqX: 0.00035, freqY: 0.00025, phaseX: 2.1, phaseY: 0.5, ampX: 100, ampY: 100, mouseMul: 0.8, size: 55 },
  { freqX: 0.00025, freqY: 0.00035, phaseX: 4.0, phaseY: 3.1, ampX: 90, ampY: 110, mouseMul: 1.0, size: 65 },
  { freqX: 0.0004, freqY: 0.0003, phaseX: 1.5, phaseY: 4.5, ampX: 110, ampY: 90, mouseMul: 0.4, size: 50 },
];

export function BackgroundAurora({ colors, opacity, blur, mouseFollow, enabled }: BackgroundAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  // Mouse tracking
  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 … 0.5 range
      mouseTarget.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseTarget.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled]);

  // Animation loop
  useEffect(() => {
    if (!enabled) {
      mouseCurrent.current = { x: 0, y: 0 };
      return;
    }

    const animate = (time: number) => {
      // Lerp mouse position
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.02;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.02;

      const mx = mouseCurrent.current.x * mouseFollow * 200;
      const my = mouseCurrent.current.y * mouseFollow * 200;

      for (let i = 0; i < BLOB_CONFIGS.length; i++) {
        const blob = blobRefs.current[i];
        if (!blob) continue;

        const cfg = BLOB_CONFIGS[i];
        const x = Math.sin(time * cfg.freqX + cfg.phaseX) * cfg.ampX + mx * cfg.mouseMul;
        const y = Math.cos(time * cfg.freqY + cfg.phaseY) * cfg.ampY + my * cfg.mouseMul;

        blob.style.transform = `translate(${x}px, ${y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [enabled, mouseFollow]);

  if (!enabled) return null;

  const colorValues = [colors.color1, colors.color2, colors.color3, colors.color4];

  return (
    <div
      ref={containerRef}
      className="bg-aurora"
      style={{
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      {BLOB_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el; }}
          className={`bg-aurora-blob bg-aurora-blob--${i}`}
          style={{
            width: `${cfg.size}vw`,
            height: `${cfg.size}vw`,
            background: `radial-gradient(circle, ${colorValues[i]}55 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}

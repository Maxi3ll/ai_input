import { useState, useCallback } from 'react';
import type { GradientColors } from '../types';

interface AuroraCSSDebugPanelProps {
  colors: GradientColors;
  opacity: number;
  blur: number;
  mouseFollow: number;
}

function buildAuroraCode({ colors, opacity, blur, mouseFollow }: AuroraCSSDebugPanelProps): string {
  return `/* Background Aurora — animated gradient blobs */

/* Container — fixed full-viewport overlay */
.bg-aurora {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  opacity: ${opacity};
  filter: blur(${blur}px);
}

/* Blob base — absolute positioned circles */
.bg-aurora-blob {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

/* Blob 1 */
.bg-aurora-blob--0 {
  top: -10%; left: -10%;
  width: 60vw; height: 60vw;
  background: radial-gradient(circle,
    ${colors.color1}55 0%, transparent 70%);
}

/* Blob 2 */
.bg-aurora-blob--1 {
  top: -10%; right: -10%;
  width: 55vw; height: 55vw;
  background: radial-gradient(circle,
    ${colors.color2}55 0%, transparent 70%);
}

/* Blob 3 */
.bg-aurora-blob--2 {
  bottom: -15%; left: 25%;
  width: 65vw; height: 65vw;
  background: radial-gradient(circle,
    ${colors.color3}55 0%, transparent 70%);
}

/* Blob 4 */
.bg-aurora-blob--3 {
  top: 20%; left: -5%;
  width: 50vw; height: 50vw;
  background: radial-gradient(circle,
    ${colors.color4}55 0%, transparent 70%);
}

/* ---- Mouse-follow animation (JS) ---- */
/*
const BLOB_CONFIGS = [
  { freqX: 0.0003, freqY: 0.0004, phaseX: 0, phaseY: 1.2,
    ampX: 120, ampY: 80, mouseMul: 0.6 },
  { freqX: 0.00035, freqY: 0.00025, phaseX: 2.1, phaseY: 0.5,
    ampX: 100, ampY: 100, mouseMul: 0.8 },
  { freqX: 0.00025, freqY: 0.00035, phaseX: 4.0, phaseY: 3.1,
    ampX: 90, ampY: 110, mouseMul: 1.0 },
  { freqX: 0.0004, freqY: 0.0003, phaseX: 1.5, phaseY: 4.5,
    ampX: 110, ampY: 90, mouseMul: 0.4 },
];

const mouseFollow = ${mouseFollow};
let mouseTarget = { x: 0, y: 0 };
let mouseCurrent = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
  mouseTarget.x = (e.clientX / innerWidth) - 0.5;
  mouseTarget.y = (e.clientY / innerHeight) - 0.5;
});

function animate(time) {
  mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.02;
  mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.02;
  const mx = mouseCurrent.x * mouseFollow * 200;
  const my = mouseCurrent.y * mouseFollow * 200;

  blobs.forEach((blob, i) => {
    const cfg = BLOB_CONFIGS[i];
    const x = Math.sin(time * cfg.freqX + cfg.phaseX)
              * cfg.ampX + mx * cfg.mouseMul;
    const y = Math.cos(time * cfg.freqY + cfg.phaseY)
              * cfg.ampY + my * cfg.mouseMul;
    blob.style.transform = \`translate(\${x}px, \${y}px)\`;
  });

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
*/`;
}

export function AuroraCSSDebugPanel(props: AuroraCSSDebugPanelProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const code = buildAuroraCode(props);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className={`css-debug-panel ${open ? 'css-debug-panel--open' : ''}`}>
      <div className="css-debug-header" onClick={() => setOpen(!open)} role="button" tabIndex={0}>
        <span className="css-debug-title">Live CSS — Background Aurora</span>
        <div className="css-debug-actions">
          <button className="css-debug-copy" onClick={(e) => { e.stopPropagation(); handleCopy(); }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <span className="css-debug-chevron">{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && <pre className="css-debug-code"><code>{code}</code></pre>}
    </div>
  );
}

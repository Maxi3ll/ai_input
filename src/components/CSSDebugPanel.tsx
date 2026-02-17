import { useState, useCallback } from 'react';
import type { GradientControlValues } from '../types';

interface CSSDebugPanelProps {
  controls: GradientControlValues;
}

function buildCssCode(controls: GradientControlValues): string {
  const { colors, glow, animation, border } = controls;

  return `/* Aurora Glow — 4 animated radial-gradient layers */
/* Layer 1: Base horizon glow */
background: radial-gradient(
  ellipse 80% 50% at 50% 110%,
  ${colors.color1} 0%, transparent 70%);
opacity: 0.7 → 1 → 0.7;  /* ${animation.speed}s loop */

/* Layer 2: Aurora sweep */
background: radial-gradient(
  ellipse 55% 45% at 15%→50%→85% 80%,
  ${colors.color2} → ${colors.color3});
duration: ${(animation.speed * 1.67).toFixed(1)}s;

/* Layer 3: Counter sweep */
background: radial-gradient(
  ellipse 50% 40% at 80%→45%→15% 85%,
  ${colors.color1});
duration: ${(animation.speed * 2).toFixed(1)}s;

/* Layer 4: Top-edge shine */
background: linear-gradient(90deg,
  transparent, ${colors.color1}88,
  ${colors.color2}66, transparent);

/* Glow container */
filter: blur(${glow.blur}px);
opacity: ${glow.intensity};
inset: -${glow.spread}px;
border-radius: ${border.radius}px;`;
}

export function CSSDebugPanel({ controls }: CSSDebugPanelProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const cssCode = buildCssCode(controls);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [cssCode]);

  return (
    <div className={`css-debug-panel ${open ? 'css-debug-panel--open' : ''}`}>
      <div className="css-debug-header" onClick={() => setOpen(!open)} role="button" tabIndex={0}>
        <span className="css-debug-title">Live CSS — Aurora</span>
        <div className="css-debug-actions">
          <button className="css-debug-copy" onClick={(e) => { e.stopPropagation(); handleCopy(); }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <span className="css-debug-chevron">{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && <pre className="css-debug-code"><code>{cssCode}</code></pre>}
    </div>
  );
}

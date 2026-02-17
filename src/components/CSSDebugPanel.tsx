import { useState, useCallback } from 'react';
import type { GradientControlValues } from '../types';

interface CSSDebugPanelProps {
  controls: GradientControlValues;
}

function buildCssCode(controls: GradientControlValues): string {
  const { colors, glow, animation, border, gradientType } = controls;

  if (gradientType === 'aurora') {
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

  if (gradientType === 'trace') {
    return `/* Trace — orbiting light beam */
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes trace { to { --angle: 360deg; } }

.element {
  border-radius: ${border.radius}px;
  border: ${border.width}px solid transparent;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    conic-gradient(
      from var(--angle),
      ${colors.color1} 0%,
      ${colors.color2} 4%,
      transparent 12%,
      transparent 88%,
      ${colors.color3} 94%,
      ${colors.color1} 100%
    ) border-box;
  animation: trace ${animation.speed}s linear infinite;
}

/* Glow follows the beam */
.element::before {
  background: conic-gradient(
    from var(--angle),
    ${colors.color1} 0%, ${colors.color2} 5%,
    transparent 15%, transparent 85%,
    ${colors.color3} 92%, ${colors.color1} 100%);
  opacity: ${glow.intensity};
  filter: blur(${glow.blur}px);
  inset: -${glow.spread}px;
}`;
  }

  // spin
  return `/* Spin — conic-gradient rotation */
.element {
  border-radius: ${border.radius}px;
  border: ${border.width}px solid transparent;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    conic-gradient(
      from var(--angle),
      ${colors.color1},
      ${colors.color2},
      ${colors.color3},
      ${colors.color1}
    ) border-box;
  animation: rotate ${animation.speed}s linear infinite;
}

/* Glow */
.element::before {
  background: conic-gradient(
    from var(--angle),
    ${colors.color1}, ${colors.color2},
    ${colors.color3}, ${colors.color1});
  opacity: ${glow.intensity};
  filter: blur(${glow.blur}px);
  inset: -${glow.spread}px;
}`;
}

const labels: Record<string, string> = {
  aurora: 'Aurora',
  trace: 'Trace',
  spin: 'Spin',
};

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
        <span className="css-debug-title">Live CSS — {labels[controls.gradientType]}</span>
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

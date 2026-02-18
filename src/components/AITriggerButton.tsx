import type { CSSProperties } from 'react';
import type { GradientControlValues } from '../types';
import { AuroraLayers } from './AIInputField/AuroraGlow';
import { SparkleIcon } from './SparkleIcon';
import './AITriggerButton.css';

interface AITriggerButtonProps {
  label: string;
  borderRadius: number;
  controls: GradientControlValues;
  onTrigger?: () => void;
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V10.5C13.5 11.0523 13.0523 11.5 12.5 11.5H9L6 13.5V11.5H3.5C2.94772 11.5 2.5 11.0523 2.5 10.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="5.5" cy="7" r="0.75" fill="currentColor" />
      <circle cx="8" cy="7" r="0.75" fill="currentColor" />
      <circle cx="10.5" cy="7" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function AITriggerButton({
  label,
  borderRadius,
  controls,
  onTrigger,
}: AITriggerButtonProps) {
  const { colors, glow, animation, aurora, border } = controls;

  const glowSpread = glow.spread;
  const glowRadius = `${borderRadius + glowSpread}px`;
  const borderPad = border.width;
  const borderContainerRadius = `${borderRadius + borderPad}px`;

  const wrapStyle = {
    '--trigger-radius': `${borderRadius}px`,
  } as CSSProperties;

  return (
    <div className="ai-trigger-outer" style={wrapStyle}>
      {/* Aurora glow layer — behind everything */}
      <div
        className="ai-trigger-aurora-glow"
        style={{
          position: 'absolute',
          zIndex: 0,
          inset: `-${glowSpread}px`,
          borderRadius: glowRadius,
          opacity: glow.intensity,
          filter: `blur(${glow.blur}px)`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AuroraLayers colors={colors} speed={animation.speed} running={animation.running} aurora={aurora} />
      </div>

      {/* Aurora border layer */}
      <div
        className="ai-trigger-aurora-border"
        style={{
          position: 'absolute',
          zIndex: 1,
          inset: `-${borderPad}px`,
          borderRadius: borderContainerRadius,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AuroraLayers colors={colors} speed={animation.speed} running={animation.running} aurora={aurora} />
      </div>

      {/* Glass content */}
      <div className="ai-trigger-wrap">
        <button
          className="ai-trigger-primary"
          type="button"
          onClick={onTrigger}
        >
          <SparkleIcon className="ai-trigger-sparkle" />
          <span>{label}</span>
        </button>
        <button
          className="ai-trigger-secondary"
          type="button"
          aria-label="Open chat"
        >
          <ChatIcon />
        </button>
      </div>
    </div>
  );
}

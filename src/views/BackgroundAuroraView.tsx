import { AuroraCSSDebugPanel } from '../components/AuroraCSSDebugPanel';
import type { GradientColors } from '../types';

interface BackgroundAuroraViewProps {
  colors: GradientColors;
  bgOpacity: number;
  bgBlur: number;
  mouseFollow: number;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}

export function BackgroundAuroraView({
  colors,
  bgOpacity,
  bgBlur,
  mouseFollow,
  enabled,
  setEnabled,
}: BackgroundAuroraViewProps) {
  return (
    <>
      <div className="app-toolbar">
        <span className="app-toolbar-label">Background Aurora</span>
        <button
          type="button"
          className={`toggle-switch ${enabled ? 'toggle-switch--active' : ''}`}
          onClick={() => setEnabled(!enabled)}
          aria-pressed={enabled}
          aria-label="Toggle background aurora"
        >
          <span className="toggle-switch-thumb" />
        </button>
      </div>
      <div className="input-stage">
        {/* <AuroraPresetButtons setColors={setColors} setBgAurora={setBgAurora} /> */}
      </div>
      <AuroraCSSDebugPanel
        colors={colors}
        opacity={bgOpacity}
        blur={bgBlur}
        mouseFollow={mouseFollow}
      />
    </>
  );
}

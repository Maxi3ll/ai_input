import type { GradientColors } from '../types';

interface AuroraPreset {
  name: string;
  colors: GradientColors;
  opacity: number;
  blur: number;
  mouseFollow: number;
}

const presets: AuroraPreset[] = [
  {
    name: 'Northern Lights',
    colors: { color1: '#00ff87', color2: '#60efff', color3: '#0ea5e9', color4: '#22d3ee' },
    opacity: 0.35,
    blur: 80,
    mouseFollow: 0.6,
  },
  {
    name: 'Sunset Blaze',
    colors: { color1: '#ff6b35', color2: '#f7c948', color3: '#e84393', color4: '#fd79a8' },
    opacity: 0.3,
    blur: 90,
    mouseFollow: 0.4,
  },
  {
    name: 'Ocean Deep',
    colors: { color1: '#0077b6', color2: '#00b4d8', color3: '#0096c7', color4: '#48cae4' },
    opacity: 0.35,
    blur: 100,
    mouseFollow: 0.3,
  },
  {
    name: 'Cosmic Purple',
    colors: { color1: '#7c3aed', color2: '#a78bfa', color3: '#c084fc', color4: '#e879f9' },
    opacity: 0.3,
    blur: 85,
    mouseFollow: 0.7,
  },
  {
    name: 'Minimal Frost',
    colors: { color1: '#94a3b8', color2: '#cbd5e1', color3: '#e2e8f0', color4: '#94a3b8' },
    opacity: 0.2,
    blur: 120,
    mouseFollow: 0.2,
  },
];

interface AuroraPresetButtonsProps {
  setColors: (v: Partial<GradientColors>) => void;
  setBgAurora: (v: { bgOpacity?: number; bgBlur?: number; mouseFollow?: number }) => void;
}

export function AuroraPresetButtons({ setColors, setBgAurora }: AuroraPresetButtonsProps) {
  const applyPreset = (preset: AuroraPreset) => {
    setColors(preset.colors);
    setBgAurora({
      bgOpacity: preset.opacity,
      bgBlur: preset.blur,
      mouseFollow: preset.mouseFollow,
    });
  };

  return (
    <div className="preset-buttons">
      {presets.map((preset) => (
        <button
          key={preset.name}
          className="preset-button"
          onClick={() => applyPreset(preset)}
        >
          <span
            className="preset-dot"
            style={{ background: preset.colors.color1 }}
          />
          {preset.name}
        </button>
      ))}
    </div>
  );
}

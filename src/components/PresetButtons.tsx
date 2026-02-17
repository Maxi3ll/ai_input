import type { GradientSetters } from '../hooks/useGradientControls';
import type { Preset } from '../types';

const presets: Preset[] = [
  {
    name: 'Vision Blue',
    colors: { color1: '#4285f4', color2: '#9b72cb', color3: '#d96570', color4: '#4285f4' },
    glow: { intensity: 0.4, spread: 15, blur: 20 },
    speed: 3,
  },
  {
    name: 'AMG Fire',
    colors: { color1: '#ff6b35', color2: '#f7c948', color3: '#e84393', color4: '#ff6b35' },
    glow: { intensity: 0.5, spread: 20, blur: 25 },
    speed: 4,
  },
  {
    name: 'Neon Green',
    colors: { color1: '#00ff87', color2: '#60efff', color3: '#00ff87', color4: '#60efff' },
    glow: { intensity: 0.6, spread: 20, blur: 30 },
    speed: 2,
  },
  {
    name: 'Monochrome',
    colors: { color1: '#888888', color2: '#cccccc', color3: '#888888', color4: '#cccccc' },
    glow: { intensity: 0.3, spread: 10, blur: 15 },
    speed: 5,
  },
  {
    name: 'Merlin Echo',
    colors: { color1: '#00c9ff', color2: '#92fe9d', color3: '#ff00ff', color4: '#00c9ff' },
    glow: { intensity: 0.5, spread: 25, blur: 35 },
    speed: 6,
  },
];

interface PresetButtonsProps {
  setters: GradientSetters;
}

export function PresetButtons({ setters }: PresetButtonsProps) {
  const { setColors, setGlow, setAnimation } = setters;

  const applyPreset = (preset: Preset) => {
    setColors(preset.colors);
    setGlow(preset.glow);
    setAnimation({ speed: preset.speed });
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

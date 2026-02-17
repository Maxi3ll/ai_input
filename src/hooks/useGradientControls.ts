import { useControls, folder } from 'leva';
import type { GradientControlValues } from '../types';
import type { ActiveView } from '../App';

export function useGradientControls(activeView: ActiveView) {
  const isInput = activeView === 'input';

  // 1. Gradient Colors
  const [colors] = useControls(() => ({
    'Gradient Colors': folder({
      color1: { value: '#0078d6', label: 'Color 1' },
      color2: { value: '#800080', label: 'Color 2' },
      color3: { value: '#ffffff', label: 'Color 3' },
    }),
  }), []);

  // 2. Glow
  const [glow] = useControls(() => ({
    Glow: folder({
      intensity: { value: 0.4, min: 0, max: 1, step: 0.05, label: 'Intensity' },
      spread: { value: 15, min: 0, max: 60, step: 1, label: 'Spread (px)' },
      blur: { value: 20, min: 0, max: 80, step: 1, label: 'Blur (px)' },
    }, { render: () => isInput }),
  }), [activeView]);

  // 3. Border
  const [border] = useControls(() => ({
    Border: folder({
      width: { value: 2, min: 1, max: 8, step: 1, label: 'Width (px)' },
      radius: { value: 8, min: 0, max: 32, step: 1, label: 'Radius (px)' },
      top: { value: 0, min: 0, max: 12, step: 0.5, label: 'Top (px)' },
      right: { value: 0, min: 0, max: 12, step: 0.5, label: 'Right (px)' },
      bottom: { value: 0, min: 0, max: 12, step: 0.5, label: 'Bottom (px)' },
      left: { value: 0, min: 0, max: 12, step: 0.5, label: 'Left (px)' },
    }, { render: () => isInput }),
  }), [activeView]);

  // 4. Aurora Direction
  const [aurora] = useControls(() => ({
    'Aurora Direction': folder({
      auroraTop: { value: false, label: 'Top' },
      auroraRight: { value: false, label: 'Right' },
      auroraBottom: { value: true, label: 'Bottom' },
      auroraLeft: { value: false, label: 'Left' },
      auroraX: { value: 0, min: -50, max: 50, step: 1, label: 'Offset X' },
      auroraY: { value: 0, min: -50, max: 50, step: 1, label: 'Offset Y' },
    }, { render: () => isInput }),
  }), [activeView]);

  // Animation (used by input field internally)
  const [animation] = useControls(() => ({
    Animation: folder({
      speed: { value: 3, min: 0.5, max: 15, step: 0.5, label: 'Speed (sec)' },
      running: { value: true, label: 'Running' },
    }, { render: () => isInput }),
  }), [activeView]);

  const values: GradientControlValues = {
    colors: {
      color1: colors.color1,
      color2: colors.color2,
      color3: colors.color3,
    },
    glow: {
      intensity: glow.intensity,
      spread: glow.spread,
      blur: glow.blur,
    },
    animation: {
      speed: animation.speed,
      running: animation.running,
    },
    border: {
      width: border.width,
      radius: border.radius,
      top: border.top,
      right: border.right,
      bottom: border.bottom,
      left: border.left,
    },
    aurora: {
      top: aurora.auroraTop,
      right: aurora.auroraRight,
      bottom: aurora.auroraBottom,
      left: aurora.auroraLeft,
      x: aurora.auroraX,
      y: aurora.auroraY,
    },
  };

  return [values] as const;
}

import { useControls, folder } from 'leva';
import type { GradientControlValues, GradientType } from '../types';
import type { ActiveView } from '../App';

export function useGradientControls(activeView: ActiveView) {
  const isInput = activeView === 'input';

  const [colors, setColors] = useControls(() => ({
    'Gradient Colors': folder({
      color1: { value: '#4285f4', label: 'Color 1' },
      color2: { value: '#9b72cb', label: 'Color 2' },
      color3: { value: '#d96570', label: 'Color 3' },
      color4: { value: '#4285f4', label: 'Color 4' },
    }),
  }), []);

  const [glow, setGlow] = useControls(() => ({
    Glow: folder({
      intensity: { value: 0.4, min: 0, max: 1, step: 0.05, label: 'Intensity' },
      spread: { value: 15, min: 0, max: 60, step: 1, label: 'Spread (px)' },
      blur: { value: 20, min: 0, max: 80, step: 1, label: 'Blur (px)' },
    }, { render: () => isInput }),
  }), [activeView]);

  const [animation, setAnimation] = useControls(() => ({
    Animation: folder({
      speed: { value: 3, min: 0.5, max: 15, step: 0.5, label: 'Speed (sec)' },
      running: { value: true, label: 'Running' },
    }, { render: () => isInput }),
  }), [activeView]);

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

  const [type] = useControls(() => ({
    Type: folder({
      gradientType: {
        value: 'aurora' as GradientType,
        options: { Aurora: 'aurora', Trace: 'trace', Spin: 'spin' },
        label: 'Gradient Type',
      },
    }, { render: () => isInput }),
  }), [activeView]);

  const values: GradientControlValues = {
    colors: {
      color1: colors.color1,
      color2: colors.color2,
      color3: colors.color3,
      color4: colors.color4,
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
    gradientType: type.gradientType as GradientType,
  };

  const setters = { setColors, setGlow, setAnimation };

  return [values, setters] as const;
}

export type GradientSetters = ReturnType<typeof useGradientControls>[1];

import { useControls, folder } from 'leva';
import type { ActiveView } from '../App';

export function useBackgroundAuroraControls(activeView: ActiveView) {
  const isAurora = activeView === 'aurora';

  const [values] = useControls(() => ({
    'Background Aurora': folder({
      enabled: { value: true, label: 'Enabled', render: () => isAurora },
      bgOpacity: { value: 0.25, min: 0, max: 1, step: 0.05, label: 'Opacity', render: () => isAurora },
      bgBlur: { value: 60, min: 0, max: 200, step: 5, label: 'Blur (px)', render: () => isAurora },
      speed: { value: 1.0, min: 0.1, max: 5, step: 0.1, label: 'Speed', render: () => isAurora },
      amplitude: { value: 1.0, min: 0.1, max: 3, step: 0.1, label: 'Amplitude', render: () => isAurora },
      blend: { value: 0.5, min: 0, max: 1, step: 0.05, label: 'Blend', render: () => isAurora },
      mouseFollow: { value: 0.7, min: 0, max: 1, step: 0.05, label: 'Mouse Follow', render: () => isAurora },
    }),
  }), [activeView]);

  return values;
}

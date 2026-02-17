import { useControls, folder } from 'leva';
import type { ActiveView } from '../App';

export function useBackgroundAuroraControls(activeView: ActiveView) {
  const isAurora = activeView === 'aurora';

  const [values, set] = useControls(() => ({
    'Background Aurora': folder({
      enabled: { value: true, label: 'Enabled', render: () => isAurora },
      bgOpacity: { value: 0.3, min: 0, max: 1, step: 0.05, label: 'Opacity', render: () => isAurora },
      bgBlur: { value: 80, min: 20, max: 200, step: 5, label: 'Blur (px)', render: () => isAurora },
      mouseFollow: { value: 0.5, min: 0, max: 1, step: 0.05, label: 'Mouse Follow', render: () => isAurora },
    }),
  }), [activeView]);

  const setEnabled = (v: boolean) => set({ enabled: v });

  return { ...values, setEnabled, set };
}

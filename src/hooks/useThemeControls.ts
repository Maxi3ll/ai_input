import { useControls, folder } from 'leva';
import type { ThemeMode } from '../types';

export function useThemeControls() {
  const { mode } = useControls({
    Theme: folder({
      mode: {
        value: 'light' as ThemeMode,
        options: { Light: 'light', Dark: 'dark' },
        label: 'Mode',
      },
    }),
  });

  return mode as ThemeMode;
}

import { useControls, folder } from 'leva';
import type { ActiveView } from '../App';

export function useAITriggerControls(activeView: ActiveView) {
  const isTrigger = activeView === 'trigger';

  const values = useControls({
    'AI Trigger': folder({
      label: {
        value: 'Help me choose',
        render: () => isTrigger,
      },
      borderRadius: {
        value: 10,
        min: 0,
        max: 40,
        step: 1,
        render: () => isTrigger,
      },
      stickyPreview: {
        value: true,
        label: 'Sticky Preview',
        render: () => isTrigger,
      },
    }),
  });

  return values;
}

import { useState } from 'react';
import { Leva } from 'leva';
import { SegmentedButton } from './components/SegmentedButton';
import { InputFieldView } from './views/InputFieldView';
import { BackgroundAuroraView } from './views/BackgroundAuroraView';
import { AITriggerView } from './views/AITriggerView';
import { useGradientControls } from './hooks/useGradientControls';
import { useBackgroundAuroraControls } from './hooks/useBackgroundAuroraControls';
import { useAITriggerControls } from './hooks/useAITriggerControls';

export type ActiveView = 'input' | 'aurora' | 'trigger';

const VIEW_SEGMENTS = ['Input Field', 'Background Aurora', 'AI Trigger'];
const VIEW_KEYS: ActiveView[] = ['input', 'aurora', 'trigger'];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('input');
  const [controls] = useGradientControls(activeView);
  const bgAurora = useBackgroundAuroraControls(activeView);
  const triggerControls = useAITriggerControls(activeView);

  return (
    <div className="app-root">
      <Leva collapsed={false} titleBar={{ title: 'AI Settings' }} />
      <SegmentedButton
        segments={VIEW_SEGMENTS}
        activeIndex={VIEW_KEYS.indexOf(activeView)}
        onChange={(i) => setActiveView(VIEW_KEYS[i])}
      />
      {activeView === 'input' && <InputFieldView controls={controls} />}
      {activeView === 'aurora' && (
        <BackgroundAuroraView
          colors={controls.colors}
          bgOpacity={bgAurora.bgOpacity}
          bgBlur={bgAurora.bgBlur}
          speed={bgAurora.speed}
          amplitude={bgAurora.amplitude}
          blend={bgAurora.blend}
          mouseFollow={bgAurora.mouseFollow}
          enabled={bgAurora.enabled}
        />
      )}
      {activeView === 'trigger' && (
        <AITriggerView
          label={triggerControls.label}
          borderRadius={triggerControls.borderRadius}
          stickyPreview={triggerControls.stickyPreview}
          controls={controls}
        />
      )}
    </div>
  );
}

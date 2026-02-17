import { useState } from 'react';
import { Leva } from 'leva';
import { SegmentedButton } from './components/SegmentedButton';
import { InputFieldView } from './views/InputFieldView';
import { BackgroundAuroraView } from './views/BackgroundAuroraView';
import { useGradientControls } from './hooks/useGradientControls';
import { useBackgroundAuroraControls } from './hooks/useBackgroundAuroraControls';

export type ActiveView = 'input' | 'aurora';

const VIEW_SEGMENTS = ['Input Field', 'Background Aurora'];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('input');
  const [controls] = useGradientControls(activeView);
  const bgAurora = useBackgroundAuroraControls(activeView);

  return (
    <div className="app-root">
      <Leva collapsed={false} titleBar={{ title: 'AI Settings' }} />
      <SegmentedButton
        segments={VIEW_SEGMENTS}
        activeIndex={activeView === 'input' ? 0 : 1}
        onChange={(i) => setActiveView(i === 0 ? 'input' : 'aurora')}
      />
      {activeView === 'input' ? (
        <InputFieldView controls={controls} />
      ) : (
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
    </div>
  );
}

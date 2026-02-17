import { useState } from 'react';
import { Leva } from 'leva';
import { BackgroundAurora } from './components/BackgroundAurora';
import { SegmentedButton } from './components/SegmentedButton';
import { InputFieldView } from './views/InputFieldView';
import { BackgroundAuroraView } from './views/BackgroundAuroraView';
import { useGradientControls } from './hooks/useGradientControls';
import { useThemeControls } from './hooks/useThemeControls';
import { useBackgroundAuroraControls } from './hooks/useBackgroundAuroraControls';

export type ActiveView = 'input' | 'aurora';

const VIEW_SEGMENTS = ['Input Field', 'Background Aurora'];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('input');
  const [controls, setters] = useGradientControls(activeView);
  const theme = useThemeControls();
  const bgAurora = useBackgroundAuroraControls(activeView);

  return (
    <div className="app-root" data-theme={theme}>
      {activeView === 'aurora' && (
        <BackgroundAurora
          colors={controls.colors}
          opacity={bgAurora.bgOpacity}
          blur={bgAurora.bgBlur}
          mouseFollow={bgAurora.mouseFollow}
          enabled={bgAurora.enabled}
        />
      )}
      <Leva collapsed={false} titleBar={{ title: 'Gradient Shine' }} />
      <SegmentedButton
        segments={VIEW_SEGMENTS}
        activeIndex={activeView === 'input' ? 0 : 1}
        onChange={(i) => setActiveView(i === 0 ? 'input' : 'aurora')}
      />
      {activeView === 'input' ? (
        <InputFieldView controls={controls} setters={setters} />
      ) : (
        <BackgroundAuroraView
          colors={controls.colors}
          bgOpacity={bgAurora.bgOpacity}
          bgBlur={bgAurora.bgBlur}
          mouseFollow={bgAurora.mouseFollow}
          enabled={bgAurora.enabled}
          setEnabled={bgAurora.setEnabled}
          setColors={setters.setColors}
          setBgAurora={bgAurora.set}
        />
      )}
    </div>
  );
}

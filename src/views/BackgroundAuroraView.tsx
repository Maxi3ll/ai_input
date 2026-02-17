import { useState } from 'react';
import { BackgroundAurora } from '../components/BackgroundAurora';
import { AuroraCSSDebugPanel } from '../components/AuroraCSSDebugPanel';
import type { GradientColors } from '../types';
import './BackgroundAuroraView.css';

type AuroraSubView = 'teaser' | 'fullscreen';

interface BackgroundAuroraViewProps {
  colors: GradientColors;
  bgOpacity: number;
  bgBlur: number;
  speed: number;
  amplitude: number;
  blend: number;
  mouseFollow: number;
  enabled: boolean;
}

export function BackgroundAuroraView({
  colors,
  bgOpacity,
  bgBlur,
  speed,
  amplitude,
  blend,
  mouseFollow,
  enabled,
}: BackgroundAuroraViewProps) {
  const [subView, setSubView] = useState<AuroraSubView>('teaser');

  const auroraProps = {
    colors,
    opacity: bgOpacity,
    blur: bgBlur,
    speed,
    amplitude,
    blend,
    mouseFollow,
    enabled,
  };

  return (
    <>
      <div className="aurora-sub-toggle">
        <button
          className={`aurora-sub-toggle__btn${subView === 'teaser' ? ' aurora-sub-toggle__btn--active' : ''}`}
          onClick={() => setSubView('teaser')}
        >
          Teaser
        </button>
        <button
          className={`aurora-sub-toggle__btn${subView === 'fullscreen' ? ' aurora-sub-toggle__btn--active' : ''}`}
          onClick={() => setSubView('fullscreen')}
        >
          Full Background
        </button>
      </div>

      {subView === 'teaser' ? (
        <div className="ai-teaser">
          <BackgroundAurora {...auroraProps} />
          <div className="ai-teaser__content">
            <span className="ai-teaser__tag">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l1.796 4.95L15 7.5l-4.1 3.3L12.09 16 8 12.85 3.91 16l1.19-5.2L1 7.5l5.204-1.55L8 1z" fill="currentColor"/>
              </svg>
              AI Powered
            </span>
            <h2 className="ai-teaser__heading">
              Discover AI&#8209;powered&nbsp;search
            </h2>
            <button className="ai-teaser__cta">Explore now</button>
          </div>
        </div>
      ) : (
        <BackgroundAurora {...auroraProps} fullscreen />
      )}

      <AuroraCSSDebugPanel
        colors={colors}
        opacity={bgOpacity}
        blur={bgBlur}
        mouseFollow={mouseFollow}
      />
    </>
  );
}

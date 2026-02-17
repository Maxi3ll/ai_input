import { useState, useRef, useCallback, type CSSProperties, type ChangeEvent, type KeyboardEvent } from 'react';
import type { GradientControlValues } from '../../types';
import { SparkleIcon } from '../SparkleIcon';
import { SendButton } from '../SendButton';
import { AuroraLayers } from './AuroraGlow';
import './AIInputField.css';
import './GradientShine.css';

interface AIInputFieldProps {
  controls: GradientControlValues;
}

export function AIInputField({ controls }: AIInputFieldProps) {
  const { colors, glow, animation, border } = controls;

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const radius = border.radius;

  const cssVars = {
    '--color-1': colors.color1,
    '--color-2': colors.color2,
    '--color-3': colors.color3,
    '--color-4': colors.color1,
    '--glow-intensity': glow.intensity,
    '--glow-spread': `${glow.spread}px`,
    '--glow-blur': `${glow.blur}px`,
    '--shine-speed': `${animation.speed}s`,
    '--shine-play-state': animation.running ? 'running' : 'paused',
    '--border-width': `${border.width}px`,
    '--border-radius-tl': `${radius}px`,
    '--border-radius-tr': `${radius}px`,
    '--border-radius-bl': `${radius}px`,
    '--border-radius-br': `${radius}px`,
  } as CSSProperties;

  const bTop = border.top;
  const bRight = border.right;
  const bBottom = border.bottom;
  const bLeft = border.left;

  const borderContainerRadius = `${radius + bTop}px ${radius + bRight}px ${radius + bBottom}px ${radius + bLeft}px`;
  const glowContainerRadius = `${radius + glow.spread}px ${radius + glow.spread}px ${radius + glow.spread}px ${radius + glow.spread}px`;

  // Derived states
  const isFilled = value.trim().length > 0 && !loading;
  const isCancel = loading;

  let buttonVariant: 'default' | 'active' | 'stop' = 'default';
  if (isFilled) buttonVariant = 'active';
  if (isCancel) buttonVariant = 'stop';

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    autoResize();
  };

  const handleSend = () => {
    if (!isFilled) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }, 3000);
  };

  const handleCancel = () => {
    setLoading(false);
  };

  const handleButtonClick = () => {
    if (isCancel) handleCancel();
    else if (isFilled) handleSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const contentClasses = 'ai-input-content';

  return (
    <div
      className="ai-input-wrapper"
      style={cssVars}
      data-gradient-type="aurora"
    >
      <div
        className="aurora-glow-container"
        style={{
          position: 'absolute',
          zIndex: 0,
          inset: `-${glow.spread}px`,
          borderRadius: glowContainerRadius,
          opacity: glow.intensity,
          filter: `blur(${glow.blur}px)`,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AuroraLayers colors={colors} speed={animation.speed} running={animation.running} aurora={controls.aurora} />
      </div>

      <div
        className="aurora-border-container"
        style={{
          position: 'absolute',
          zIndex: 1,
          inset: `-${bTop}px -${bRight}px -${bBottom}px -${bLeft}px`,
          borderRadius: borderContainerRadius,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AuroraLayers colors={colors} speed={animation.speed} running={animation.running} aurora={controls.aurora} />
      </div>

      <div className="ai-input-container">
        <div className={contentClasses}>
          <div className="ai-input-start">
            <div className="ai-input-icon">
              <SparkleIcon className="sparkle-icon" />
            </div>
            <div className="ai-input-field-wrap">
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Ask a follow-up..."
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
            </div>
          </div>
          <div className="ai-input-end">
            <SendButton variant={buttonVariant} onClick={handleButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

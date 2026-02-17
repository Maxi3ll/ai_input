import { AIInputField } from '../components/AIInputField/AIInputField';
import { PresetButtons } from '../components/PresetButtons';
import { CSSDebugPanel } from '../components/CSSDebugPanel';
import type { GradientControlValues } from '../types';
import type { GradientSetters } from '../hooks/useGradientControls';

interface InputFieldViewProps {
  controls: GradientControlValues;
  setters: GradientSetters;
}

export function InputFieldView({ controls, setters }: InputFieldViewProps) {
  return (
    <>
      <div className="input-stage">
        <AIInputField controls={controls} />
        <PresetButtons setters={setters} />
      </div>
      <CSSDebugPanel controls={controls} />
    </>
  );
}

import { AIInputField } from '../components/AIInputField/AIInputField';
import { CSSDebugPanel } from '../components/CSSDebugPanel';
import type { GradientControlValues } from '../types';

interface InputFieldViewProps {
  controls: GradientControlValues;
}

export function InputFieldView({ controls }: InputFieldViewProps) {
  return (
    <>
      <div className="input-stage">
        <AIInputField controls={controls} />
      </div>
      <CSSDebugPanel controls={controls} />
    </>
  );
}

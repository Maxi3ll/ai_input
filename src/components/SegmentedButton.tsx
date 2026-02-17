interface SegmentedButtonProps {
  segments: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export function SegmentedButton({ segments, activeIndex, onChange }: SegmentedButtonProps) {
  return (
    <div className="segmented-button">
      {segments.map((label, i) => (
        <button
          key={label}
          type="button"
          className={`segmented-button__option ${i === activeIndex ? 'segmented-button__option--active' : ''}`}
          onClick={() => onChange(i)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

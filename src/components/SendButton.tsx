interface SendButtonProps {
  variant?: 'default' | 'active' | 'stop';
  onClick?: () => void;
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2.5L3.5 7.5M8 2.5L12.5 7.5M8 2.5V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="10" height="10" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function SendButton({ variant = 'default', onClick }: SendButtonProps) {
  const isActive = variant === 'active';
  const isStop = variant === 'stop';
  const isDark = isActive || isStop;

  return (
    <button
      className={`send-button ${isDark ? 'send-button--active' : ''}`}
      type="button"
      aria-label={isStop ? 'Stop' : 'Send message'}
      onClick={onClick}
    >
      {isStop ? <StopIcon /> : <ArrowUpIcon />}
    </button>
  );
}

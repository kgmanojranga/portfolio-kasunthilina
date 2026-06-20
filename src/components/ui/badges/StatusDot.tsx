type StatusType = 'online' | 'busy' | 'offline';

interface StatusDotProps {
  status: StatusType;
}

const statusStyles: Record<StatusType, React.CSSProperties> = {
  online: {
    background: 'var(--success)',
    boxShadow: '0 0 0 3px var(--success-tint)',
    animation: 'pulse-dot 2.4s ease-in-out infinite',
  },
  busy: {
    background: 'var(--warning)',
  },
  offline: {
    background: 'var(--text-muted)',
  },
};

export function StatusDot({ status }: StatusDotProps) {
  return (
    <span
      style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        display: 'inline-block',
        flexShrink: 0,
        ...statusStyles[status],
      }}
    />
  );
}

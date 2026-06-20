import { type ReactNode } from 'react';

type BadgeVariant = 'success' | 'info' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  success: {
    background: 'var(--success-tint)',
    color: 'var(--success)',
    border: '1px solid rgba(74,222,128,0.22)',
  },
  info: {
    background: 'var(--accent-tint)',
    color: 'var(--accent-secondary)',
    border: '1px solid rgba(59,130,196,0.22)',
  },
  warning: {
    background: 'rgba(245,158,11,0.10)',
    color: 'var(--warning)',
    border: '1px solid rgba(245,158,11,0.22)',
  },
  error: {
    background: 'rgba(248,113,113,0.10)',
    color: 'var(--error)',
    border: '1px solid rgba(248,113,113,0.22)',
  },
  neutral: {
    background: 'rgba(255,255,255,0.07)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-default)',
  },
};

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        borderRadius: 'var(--r-pill)',
        padding: '4px 10px',
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}

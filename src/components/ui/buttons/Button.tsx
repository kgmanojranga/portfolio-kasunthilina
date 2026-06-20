import {
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'accent' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonAsButton = {
  as?: 'button';
} & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonAsAnchor = { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = (ButtonAsButton | ButtonAsAnchor) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: '#ffffff',
    color: '#0a0c10',
    boxShadow: 'var(--shadow-sm)',
    border: 'none',
  },
  ghost: {
    background: 'var(--glass-bg)',
    color: 'rgba(255,255,255,0.80)',
    border: '1px solid var(--glass-border)',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
  },
  accent: {
    background: 'var(--accent-primary)',
    color: '#ffffff',
    boxShadow: '0 2px 12px rgba(28,53,87,0.5)',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'rgba(255,255,255,0.75)',
    border: '1.5px solid rgba(255,255,255,0.20)',
  },
  danger: {
    background: 'rgba(248,113,113,0.12)',
    color: 'var(--error)',
    border: '1px solid rgba(248,113,113,0.25)',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '7px 16px', fontSize: '12px' },
  md: { padding: '12px 26px', fontSize: '13px' },
  lg: { padding: '16px 36px', fontSize: '15px' },
};

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  letterSpacing: '0.03em',
  borderRadius: 'var(--r-pill)',
  cursor: 'pointer',
  transition:
    'transform var(--t-fast), background var(--t-base), box-shadow var(--t-base)',
  outline: 'none',
  textDecoration: 'none',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  as,
  ...props
}: ButtonProps) {
  const composedStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  if (as === 'a') {
    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        style={composedStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      style={composedStyle}
    >
      {children}
    </button>
  );
}

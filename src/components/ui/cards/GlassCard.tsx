import { type ReactNode } from 'react';

type GlassCardVariant = 'default' | 'accent' | 'success';

interface GlassCardProps {
  variant?: GlassCardVariant;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const variantBorder: Record<GlassCardVariant, string> = {
  default: 'var(--glass-border)',
  accent: 'rgba(59,130,196,0.30)',
  success: 'rgba(74,222,128,0.25)',
};

export function GlassCard({
  variant = 'default',
  children,
  style,
  className,
}: GlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--glass-bg)',
        border: `1px solid ${variantBorder[variant]}`,
        borderRadius: 'var(--r-lg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        padding: '20px 24px',
        transition:
          'background var(--t-base), border-color var(--t-base), transform var(--t-base)',
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'var(--glass-bg-hover)';
        el.style.borderColor = 'var(--glass-border-hover)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'var(--glass-bg)';
        el.style.borderColor = variantBorder[variant];
        el.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </div>
  );
}

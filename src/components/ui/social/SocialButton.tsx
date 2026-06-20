import { type ReactNode } from 'react';

interface SocialButtonProps {
  href: string;
  title: string;
  icon: ReactNode;
}

export function SocialButton({ href, title, icon }: SocialButtonProps) {
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        transition: 'background var(--t-base), border-color var(--t-base), color var(--t-fast)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = 'var(--glass-bg-hover)';
        el.style.borderColor = 'var(--glass-border-hover)';
        el.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = 'var(--glass-bg)';
        el.style.borderColor = 'var(--glass-border)';
        el.style.color = 'var(--text-secondary)';
      }}
    >
      {icon}
    </a>
  );
}

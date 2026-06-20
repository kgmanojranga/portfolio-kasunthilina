interface SkillPillProps {
  children: string;
  featured?: boolean;
}

export function SkillPill({ children, featured = false }: SkillPillProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: featured ? '#fff' : 'rgba(255,255,255,0.65)',
        background: featured ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
        border: `1px solid ${featured ? 'rgba(255,255,255,0.20)' : 'var(--border-default)'}`,
        borderRadius: 'var(--r-pill)',
        padding: '4px 12px',
        transition: 'background var(--t-fast), color var(--t-fast)',
        cursor: 'default',
      }}
    >
      {children}
    </span>
  );
}

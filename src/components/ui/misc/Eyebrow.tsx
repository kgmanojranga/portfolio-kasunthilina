interface EyebrowProps {
  children: string;
  color?: string;
}

export function Eyebrow({ children, color = 'var(--accent-secondary)' }: EyebrowProps) {
  return (
    <div
      style={{
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span
        style={{
          width: '24px',
          height: '1px',
          background: color,
          display: 'block',
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

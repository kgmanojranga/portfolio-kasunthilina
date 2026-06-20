interface StatCardProps {
  number: string;
  label: string;
  style?: React.CSSProperties;
}

export function StatCard({ number, label, style }: StatCardProps) {
  return (
    <div
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--r-md)',
        padding: '18px 22px',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-2xl)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1,
          marginBottom: '6px',
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  if (label) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--text-hint)',
          fontSize: '11px',
          margin: '24px 0',
        }}
      >
        <span
          style={{
            flex: 1,
            height: '1px',
            background: 'var(--border-subtle)',
          }}
        />
        {label}
        <span
          style={{
            flex: 1,
            height: '1px',
            background: 'var(--border-subtle)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        height: '1px',
        background: 'var(--border-subtle)',
        margin: '24px 0',
      }}
    />
  );
}

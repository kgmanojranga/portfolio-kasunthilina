interface TimelineItemProps {
  year: string;
  company: string;
  role: string;
  active?: boolean;
}

export function TimelineItem({
  year,
  company,
  role,
  active = false,
}: TimelineItemProps) {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '28px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-28px',
          top: '4px',
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          background: active ? 'var(--accent-secondary)' : 'var(--bg-page)',
          border: `2px solid ${active ? 'var(--accent-secondary)' : 'var(--border-emphasis)'}`,
          transition: 'border-color var(--t-base)',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          marginBottom: '4px',
        }}
      >
        {year}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        {company}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          marginTop: '2px',
        }}
      >
        {role}
      </div>
    </div>
  );
}

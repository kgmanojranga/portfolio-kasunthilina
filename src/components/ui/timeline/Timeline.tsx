import { type ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: '28px',
      }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          left: '5px',
          top: '8px',
          bottom: '8px',
          width: '1px',
          background: 'var(--border-default)',
        }}
      />
      {children}
    </div>
  );
}

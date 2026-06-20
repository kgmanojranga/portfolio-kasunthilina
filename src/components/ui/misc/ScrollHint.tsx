export function ScrollHint() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0.45,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#fff',
        }}
      >
        Scroll
      </div>
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0), #fff)',
          animation: 'scrollDrop 1.8s ease-in-out infinite',
        }}
      />
    </div>
  );
}

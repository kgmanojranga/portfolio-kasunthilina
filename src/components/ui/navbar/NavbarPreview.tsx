const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export function NavbarPreview() {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-xl)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: '60px',
        gap: 0,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--r-sm)',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          KT
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            Kasun Thilina
          </div>
          <div
            style={{
              fontSize: '9px',
              color: 'var(--text-muted)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginTop: '1px',
            }}
          >
            Senior Software Engineer
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '28px',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {NAV_LINKS.map(link => (
          <span
            key={link}
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: link === 'Experience' ? 'var(--text-primary)' : 'var(--text-muted)',
              paddingBottom: '2px',
              borderBottom: link === 'Experience' ? '2px solid rgba(255,255,255,0.55)' : 'none',
              cursor: 'pointer',
            }}
          >
            {link}
          </span>
        ))}
      </div>

      <button
        style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: 'var(--text-primary)',
          background: 'transparent',
          border: '1.5px solid rgba(255,255,255,0.22)',
          borderRadius: 'var(--r-pill)',
          padding: '7px 16px',
          cursor: 'pointer',
          transition: 'border-color var(--t-fast), background var(--t-fast)',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.borderColor = 'rgba(255,255,255,0.45)';
          el.style.background = 'rgba(255,255,255,0.05)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.borderColor = 'rgba(255,255,255,0.22)';
          el.style.background = 'transparent';
        }}
      >
        Available for Work
      </button>
    </div>
  );
}

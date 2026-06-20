import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(
      l => document.querySelector(l.href) as HTMLElement | null
    ).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHash('#' + entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          height: 64px;
          display: flex;
          align-items: center;
          transition: background var(--t-base), backdrop-filter var(--t-base), border-color var(--t-base);
          border-bottom: 1px solid transparent;
        }
        .site-nav.scrolled {
          background: rgba(10, 12, 16, 0.75);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
          border-bottom-color: var(--border-subtle);
        }

        .nav-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--sp-6);
          display: flex;
          align-items: center;
          gap: var(--sp-8);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-badge {
          width: 32px;
          height: 32px;
          border-radius: var(--r-sm);
          background: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          color: #fff;
        }
        .nav-logo-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .nav-logo-role {
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-top: 1px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
          flex: 1;
          justify-content: center;
        }
        .nav-link {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
          transition: color var(--t-fast), border-color var(--t-fast);
        }
        .nav-link:hover { color: var(--text-secondary); }
        .nav-link.active {
          color: var(--text-primary);
          border-bottom-color: rgba(255,255,255,0.55);
        }

        .nav-cta {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.22);
          border-radius: var(--r-pill);
          padding: 7px 16px;
          cursor: pointer;
          transition: border-color var(--t-fast), background var(--t-fast);
          flex-shrink: 0;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .nav-cta:hover {
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.05);
        }

        .nav-hamburger {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          padding: var(--sp-2);
          border-radius: var(--r-sm);
          transition: color var(--t-fast), background var(--t-fast);
        }
        .nav-hamburger:hover {
          color: var(--text-primary);
          background: var(--glass-bg);
        }

        .nav-mobile {
          display: none;
          flex-direction: column;
          gap: var(--sp-1);
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: rgba(10, 12, 16, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          padding: var(--sp-4) var(--sp-6);
          z-index: 49;
        }
        .nav-mobile.open { display: flex; }
        .nav-mobile-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          padding: var(--sp-3) 0;
          border-bottom: 1px solid var(--border-subtle);
          transition: color var(--t-fast);
        }
        .nav-mobile-link:last-child { border-bottom: none; }
        .nav-mobile-link:hover,
        .nav-mobile-link.active { color: var(--text-primary); }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .nav-hamburger { display: flex; align-items: center; justify-content: center; }
        }
      `}</style>

      <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <div className="nav-logo-badge">KT</div>
            <div>
              <div className="nav-logo-name">Kasun Thilina</div>
              <div className="nav-logo-role">Senior Software Engineer</div>
            </div>
          </a>

          <nav className="nav-links">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${activeHash === link.href ? ' active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="nav-cta">
            Available for Work
          </a>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <nav className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-mobile-link${activeHash === link.href ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-mobile-link"
          onClick={() => setMenuOpen(false)}
        >
          Available for Work
        </a>
      </nav>
    </>
  );
};

export default Navbar;

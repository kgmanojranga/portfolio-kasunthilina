/**
 * DESIGN SANDBOX — remove this file and the two lines in App.tsx to delete entirely.
 * Access at: http://localhost:5173/?sandbox
 */

import { useState } from 'react';

const BACKGROUNDS = [
  { label: 'White', value: '#ffffff' },
  { label: 'Grey', value: '#f1f5f9' },
  { label: 'Sky', value: 'linear-gradient(135deg,#e0f2fe 0%,#f0fdf4 100%)' },
  {
    label: 'Lavender',
    value: 'linear-gradient(135deg,#ede9fe 0%,#fce7f3 100%)',
  },
  {
    label: 'Midnight',
    value: 'linear-gradient(135deg,#0a0f1e 0%,#0d1530 100%)',
  },
  { label: 'Slate', value: '#1e293b' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SVG DISPLACEMENT FILTER  (spec: Step 2)
   Must be rendered once in the DOM for url(#glass-filter) to resolve.
───────────────────────────────────────────────────────────────────────────── */
const GlassFilter = () => (
  <svg
    style={{ position: 'absolute', width: 0, height: 0, zIndex: -1 }}
    aria-hidden="true"
  >
    <defs>
      <filter id="glass-filter" primitiveUnits="objectBoundingBox">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur" />
        <feDisplacementMap
          in="blur"
          in2="SourceGraphic"
          scale="0.012"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────────────────────────────────────────── */
const Section = ({
  title,
  tag,
  isDark,
  children,
}: {
  title: string;
  tag?: string;
  isDark: boolean;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: 48 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.25)',
          margin: 0,
        }}
      >
        {title}
      </p>
      {tag && (
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            background: 'rgba(99,102,241,0.15)',
            color: '#6366f1',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 99,
            padding: '2px 8px',
          }}
        >
          {tag}
        </span>
      )}
    </div>
    {children}
  </div>
);

/* ═════════════════════════════════════════════════════════════════════════════
   A — ORIGINAL APPROACH  (manual rgba + shimmer sweep)
═════════════════════════════════════════════════════════════════════════════ */

const origGlassBase: React.CSSProperties = {
  background: 'rgba(255,255,255,0.25)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.55)',
  boxShadow:
    '0 2px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.8) inset',
};

const OrigLiquidButton = ({
  children,
  isDark,
  size = 'md',
}: {
  children: React.ReactNode;
  isDark: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const [hovered, setHovered] = useState(false);
  const padding =
    size === 'sm' ? '6px 16px' : size === 'lg' ? '14px 32px' : '10px 24px';
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding,
        fontSize,
        fontWeight: 600,
        borderRadius: 999,
        cursor: 'pointer',
        color: isDark ? 'rgba(255,255,255,0.90)' : '#3730a3',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.65)'}`,
        background: hovered
          ? isDark
            ? 'rgba(255,255,255,0.18)'
            : 'rgba(255,255,255,0.45)'
          : isDark
            ? 'rgba(255,255,255,0.10)'
            : 'rgba(255,255,255,0.22)',
        backdropFilter: 'blur(28px) saturate(220%)',
        WebkitBackdropFilter: 'blur(28px) saturate(220%)',
        boxShadow:
          '0 2px 12px rgba(99,102,241,0.10), 0 0.5px 0px rgba(255,255,255,0.6) inset',
        transform: hovered ? 'translateY(-1px)' : 'none',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        letterSpacing: '0.01em',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

const OrigIconBtn = ({ isDark }: { isDark: boolean }) => (
  <button
    style={{
      ...origGlassBase,
      background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.50)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.75)'}`,
      width: 44,
      height: 44,
      borderRadius: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: isDark ? 'rgba(255,255,255,0.80)' : '#2563eb',
    }}
  >
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  </button>
);

/* ═════════════════════════════════════════════════════════════════════════════
   B — SPEC APPROACH  (liquid-glass-ui.md)
   Uses: SVG displacement filter · color-mix() · CSS variable reflex system
═════════════════════════════════════════════════════════════════════════════ */

/* CSS variable sets per theme — injected via style prop on a wrapper div */
const SPEC_VARS_LIGHT = {
  '--c-glass': '#bbbbbc',
  '--c-light': '#fff',
  '--c-dark': '#000',
  '--glass-reflex-light': '1',
  '--glass-reflex-dark': '1',
  '--saturation': '150%',
} as React.CSSProperties;

const SPEC_VARS_DARK = {
  '--c-glass': '#bbbbbc',
  '--c-light': '#fff',
  '--c-dark': '#000',
  '--glass-reflex-light': '0.3',
  '--glass-reflex-dark': '2',
  '--saturation': '150%',
} as React.CSSProperties;

/* The full 10-layer box-shadow from the spec */
const specBoxShadow = `
  inset 0 0 0 1px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 10%), transparent),
  inset 1.8px 1px 0px -2px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 60%), transparent),
  inset -2px -0.5px 0px -2px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 50%), transparent),
  inset -3px -1.5px 1px -6px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 30%), transparent),
  inset -0.3px -0.5px 3px 0px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent),
  inset -1.5px 1px 0px -2px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 12%), transparent),
  inset 0px 0.5px 1px -1px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent),
  inset 2px -1.5px 1px -4px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 6%), transparent),
  0px 1px 3px 0px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 6%), transparent),
  0px 2px 6px 0px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 4%), transparent)
`;

/* Card uses denser fill (36%) */
const specCardBoxShadow = `
  inset 0 0 0 1px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 10%), transparent),
  inset 2px 1px 0px -1px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 90%), transparent),
  inset -1.5px -1px 0px -1px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 80%), transparent),
  inset -2px -6px 1px -5px
    color-mix(in srgb, var(--c-light) calc(var(--glass-reflex-light) * 60%), transparent),
  inset -1px 2px 3px -1px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 20%), transparent),
  inset 0px -4px 1px -2px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 10%), transparent),
  0px 3px 6px 0px
    color-mix(in srgb, var(--c-dark) calc(var(--glass-reflex-dark) * 8%), transparent)
`;

const SpecButton = ({
  children,
  isDark,
  size = 'md',
}: {
  children: React.ReactNode;
  isDark: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const [hovered, setHovered] = useState(false);
  const padding =
    size === 'sm' ? '6px 16px' : size === 'lg' ? '14px 32px' : '12px 24px';
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding,
        fontSize,
        fontWeight: 500,
        borderRadius: '99em',
        border: 'none',
        cursor: 'pointer',
        color: isDark ? 'rgba(255,255,255,0.88)' : '#1e224e',
        backgroundColor: hovered
          ? 'color-mix(in srgb, var(--c-glass) 22%, transparent)'
          : 'color-mix(in srgb, var(--c-glass) 12%, transparent)',
        backdropFilter: `blur(8px) url(#glass-filter) saturate(var(--saturation))`,
        WebkitBackdropFilter: `blur(8px) saturate(var(--saturation))`,
        boxShadow: specBoxShadow,
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition:
          'background-color 400ms cubic-bezier(1,0,0.4,1), box-shadow 400ms cubic-bezier(1,0,0.4,1), transform 160ms cubic-bezier(0.5,0,0,1)',
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </button>
  );
};

const SpecIconBtn = ({ isDark }: { isDark: boolean }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44,
        height: 44,
        borderRadius: 14,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: isDark ? 'rgba(255,255,255,0.80)' : '#2563eb',
        backgroundColor: hovered
          ? 'color-mix(in srgb, var(--c-glass) 22%, transparent)'
          : 'color-mix(in srgb, var(--c-glass) 12%, transparent)',
        backdropFilter: `blur(8px) url(#glass-filter) saturate(var(--saturation))`,
        WebkitBackdropFilter: `blur(8px) saturate(var(--saturation))`,
        boxShadow: specBoxShadow,
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition:
          'background-color 400ms cubic-bezier(1,0,0.4,1), transform 160ms cubic-bezier(0.5,0,0,1)',
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </button>
  );
};

const SpecBadge = ({ isDark }: { isDark: boolean }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 14px',
      borderRadius: '99em',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: isDark ? 'rgba(255,255,255,0.85)' : '#1d4ed8',
      backgroundColor: 'color-mix(in srgb, var(--c-glass) 12%, transparent)',
      backdropFilter: `blur(8px) url(#glass-filter) saturate(var(--saturation))`,
      WebkitBackdropFilter: `blur(8px) saturate(var(--saturation))`,
      boxShadow: specBoxShadow,
      border: 'none',
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#3b82f6',
        boxShadow: '0 0 6px rgba(59,130,246,0.8)',
      }}
    />
    Available for work
  </span>
);

const SpecNavPill = ({ isDark }: { isDark: boolean }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '6px 8px',
      borderRadius: 16,
      backgroundColor: 'color-mix(in srgb, var(--c-glass) 12%, transparent)',
      backdropFilter: `blur(8px) url(#glass-filter) saturate(var(--saturation))`,
      WebkitBackdropFilter: `blur(8px) saturate(var(--saturation))`,
      boxShadow: specBoxShadow,
    }}
  >
    {['About', 'Skills', 'Work', 'Contact'].map(l => (
      <span
        key={l}
        style={{
          padding: '4px 12px',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          color: isDark ? 'rgba(255,255,255,0.75)' : '#334155',
          backgroundColor:
            l === 'About'
              ? 'color-mix(in srgb, var(--c-glass) 22%, transparent)'
              : 'transparent',
        }}
      >
        {l}
      </span>
    ))}
  </div>
);

const SpecStatCard = ({
  value,
  label,
  isDark,
}: {
  value: string;
  label: string;
  isDark: boolean;
}) => (
  <div
    style={{
      padding: '18px 24px',
      borderRadius: '1.2em',
      minWidth: 110,
      backgroundColor: 'color-mix(in srgb, var(--c-glass) 36%, transparent)',
      backdropFilter: `blur(8px) url(#glass-filter) saturate(var(--saturation))`,
      WebkitBackdropFilter: `blur(8px) saturate(var(--saturation))`,
      boxShadow: specCardBoxShadow,
      border: 'none',
    }}
  >
    <p
      style={{
        fontWeight: 700,
        fontSize: 24,
        color: isDark ? '#fff' : '#0f172a',
        margin: 0,
      }}
    >
      {value}
    </p>
    <p
      style={{
        fontSize: 12,
        color: isDark ? 'rgba(255,255,255,0.45)' : '#64748b',
        margin: '4px 0 0',
      }}
    >
      {label}
    </p>
  </div>
);

const SpecContentCard = ({ isDark }: { isDark: boolean }) => (
  <div
    style={{
      padding: '28px 32px',
      borderRadius: '1.2em',
      maxWidth: 420,
      backgroundColor: 'color-mix(in srgb, var(--c-glass) 36%, transparent)',
      backdropFilter: `blur(8px) url(#glass-filter) saturate(var(--saturation))`,
      WebkitBackdropFilter: `blur(8px) saturate(var(--saturation))`,
      boxShadow: specCardBoxShadow,
      border: 'none',
    }}
  >
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#3b82f6',
        margin: '0 0 8px',
      }}
    >
      Senior Software Engineer
    </p>
    <p
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: isDark ? '#fff' : '#0f172a',
        margin: '0 0 6px',
      }}
    >
      Cambio Software Engineering
    </p>
    <p
      style={{
        fontSize: 13,
        color: isDark ? 'rgba(255,255,255,0.45)' : '#64748b',
        margin: '0 0 16px',
      }}
    >
      Sep 2022 – Present · Colombo, Sri Lanka
    </p>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {['Java 8', 'Spring Boot', 'Angular 13', 'REST'].map(tag => (
        <span
          key={tag}
          style={{
            fontSize: 11,
            padding: '3px 10px',
            borderRadius: 999,
            background: isDark
              ? 'rgba(59,130,246,0.15)'
              : 'rgba(59,130,246,0.10)',
            color: isDark ? 'rgba(147,197,253,0.9)' : '#1d4ed8',
            border: `1px solid ${isDark ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.20)'}`,
            fontWeight: 500,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/* ═════════════════════════════════════════════════════════════════════════════
   C — DARK GLASS CARD  (Refer and Earn — inspired by dribbble.com/shots/24579329)
   Uses: backdrop-filter blur · radial gradient border · ::before mask trick
   implemented via a wrapping div + absolutely-positioned border overlay
═════════════════════════════════════════════════════════════════════════════ */

const ReferCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('7D45564JK355').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  /* Card uses a pseudo-border achieved with a sibling overlay div since React
     inline styles cannot target ::before. The overlay sits inset-0 with a
     transparent background and a 1px border drawn via a CSS gradient mask. */
  return (
    <div style={{ position: 'relative', maxWidth: 500, borderRadius: 16 }}>
      {/* gradient border overlay (replicates .card::before) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 16,
          border: '1px solid transparent',
          background:
            'linear-gradient(hsl(259 13% 28%), hsl(252 9% 22%)) border-box',
          WebkitMask:
            'linear-gradient(#000,#000) border-box, linear-gradient(#000,#000) padding-box',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'subtract',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* card body */}
      <div
        style={{
          position: 'relative',
          borderRadius: 16,
          padding: 21,
          display: 'grid',
          gap: '1.5rem',
          background: 'hsl(243 26% 15% / 0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'hsl(240 15% 76%)',
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {/* header */}
        <div>
          <h1
            style={{
              color: '#fff',
              fontSize: '1.325rem',
              fontWeight: 500,
              margin: '0 0 2px',
            }}
          >
            Refer and Earn
          </h1>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            Refer Friends, Earn Points and Fees
          </p>
        </div>

        {/* referral code + referred users row */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <h2
              style={{
                color: 'hsl(240 15% 76%)',
                fontSize: '1.125rem',
                fontWeight: 400,
                margin: '0 0 8px',
              }}
            >
              Referral Code
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'hsl(256 43% 7% / 0.5)',
                padding: '0.5ex 1ch',
                fontSize: '1.125rem',
                borderRadius: 12,
                color: '#fff',
                letterSpacing: 3,
              }}
            >
              <kbd
                style={{
                  fontFamily: 'inherit',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                7D45564JK355
              </kbd>
              <button
                onClick={handleCopy}
                aria-label="copy code"
                title={copied ? 'Copied!' : 'Copy code'}
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  height: '1.5lh',
                  color: copied ? 'hsl(93 60% 69%)' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 512 512"
                >
                  <rect
                    width="336"
                    height="336"
                    x="128"
                    y="128"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    rx="57"
                    ry="57"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'end' }}>
            <h2
              style={{
                color: 'hsl(240 15% 76%)',
                fontSize: '1.125rem',
                fontWeight: 400,
                margin: '0 0 4px',
              }}
            >
              Referred Users
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#fff', margin: 0 }}>4</p>
          </div>
        </div>

        {/* rewards */}
        <div
          style={{
            textAlign: 'center',
            color: '#fff',
            background: 'hsl(256 43% 7% / 0.5)',
            padding: '1ex 3ch',
            borderRadius: 12,
          }}
        >
          <h2
            style={{
              color: 'hsl(240 15% 76%)',
              fontSize: '1.125rem',
              fontWeight: 400,
              margin: '0 0 4px',
            }}
          >
            Rewards
          </h2>
          <p style={{ margin: 0 }}>
            <span style={{ color: 'hsl(93 60% 69%)' }}>20%</span> Platform Fees
            + <span style={{ color: 'hsl(93 60% 69%)' }}>10%</span> Extra points
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═════════════════════════════════════════════════════════════════════════════
   DIVIDER
═════════════════════════════════════════════════════════════════════════════ */
const Divider = ({
  isDark,
  labelA,
  labelB,
}: {
  isDark: boolean;
  labelA: string;
  labelB: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      margin: '48px 0 40px',
    }}
  >
    <div
      style={{
        flex: 1,
        height: 1,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      }}
    />
    <span
      style={{
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.22)',
        whiteSpace: 'nowrap',
      }}
    >
      {labelA} vs {labelB}
    </span>
    <div
      style={{
        flex: 1,
        height: 1,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      }}
    />
  </div>
);

/* ═════════════════════════════════════════════════════════════════════════════
   SANDBOX PAGE
═════════════════════════════════════════════════════════════════════════════ */
const SandboxPage = () => {
  const [bgIndex, setBgIndex] = useState(2); // default to Sky so glass is visible
  const bg = BACKGROUNDS[bgIndex];
  const isDark = bgIndex >= 4;
  const specVars = isDark ? SPEC_VARS_DARK : SPEC_VARS_LIGHT;

  return (
    <div
      style={{ minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* SVG displacement filter — required once in DOM for spec approach */}
      <GlassFilter />

      {/* ── Background switcher toolbar ────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          background: 'rgba(15,23,42,0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 999,
          padding: '6px 12px',
        }}
      >
        {BACKGROUNDS.map((b, i) => (
          <button
            key={b.label}
            onClick={() => setBgIndex(i)}
            title={b.label}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: b.value,
              border:
                i === bgIndex
                  ? '2px solid white'
                  : '2px solid rgba(255,255,255,0.20)',
              cursor: 'pointer',
              outline: 'none',
              flexShrink: 0,
            }}
          />
        ))}
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
            paddingLeft: 6,
          }}
        >
          {bg.label}
        </span>
      </div>

      {/* ── Canvas ─────────────────────────────────────────────────────── */}
      <div
        style={{
          minHeight: '100vh',
          background: bg.value,
          padding: '96px 48px 80px',
          transition: 'background 0.4s ease',
        }}
      >
        {/* Page title */}
        <p
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.20)' : 'rgba(0,0,0,0.18)',
            marginBottom: 48,
          }}
        >
          Design Sandbox — {bg.label}
        </p>

        {/* ════════════════════════════════════════════════════════════════
            SECTION A — Original approach
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.40)',
            marginBottom: 24,
          }}
        >
          A — Original{' '}
          <span style={{ opacity: 0.5, fontWeight: 400 }}>
            (rgba + shimmer sweep)
          </span>
        </div>

        <Section title="Buttons" isDark={isDark}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <OrigLiquidButton isDark={isDark} size="sm">
              Small
            </OrigLiquidButton>
            <OrigLiquidButton isDark={isDark} size="md">
              Hire Me
            </OrigLiquidButton>
            <OrigLiquidButton isDark={isDark} size="md">
              View My Work →
            </OrigLiquidButton>
            <OrigLiquidButton isDark={isDark} size="lg">
              Download CV
            </OrigLiquidButton>
          </div>
        </Section>

        <Section title="Icon Buttons" isDark={isDark}>
          <div style={{ display: 'flex', gap: 10 }}>
            <OrigIconBtn isDark={isDark} />
            <OrigIconBtn isDark={isDark} />
            <OrigIconBtn isDark={isDark} />
          </div>
        </Section>

        <Section title="Stat Cards" isDark={isDark}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              ['7+', 'Years exp.'],
              ['9+', 'Projects'],
              ['7', 'Companies'],
            ].map(([v, l]) => (
              <div
                key={l}
                style={{
                  ...origGlassBase,
                  background: isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(255,255,255,0.50)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.72)'}`,
                  borderRadius: 20,
                  padding: '18px 24px',
                  minWidth: 110,
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 24,
                    color: isDark ? '#fff' : '#0f172a',
                    margin: 0,
                  }}
                >
                  {v}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: isDark ? 'rgba(255,255,255,0.45)' : '#64748b',
                    margin: '4px 0 0',
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════════
            DIVIDER
        ════════════════════════════════════════════════════════════════ */}
        <Divider
          isDark={isDark}
          labelA="A  Original"
          labelB="B  Spec (liquid-glass-ui.md)"
        />

        {/* ════════════════════════════════════════════════════════════════
            SECTION B — Spec approach (liquid-glass-ui.md)
            Wraps everything in a div that injects CSS variables
        ════════════════════════════════════════════════════════════════ */}
        <div style={specVars}>
          <div
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.40)',
              marginBottom: 24,
            }}
          >
            B — Spec{' '}
            <span style={{ opacity: 0.5, fontWeight: 400 }}>
              (SVG displacement · color-mix · reflex vars)
            </span>
          </div>

          <Section title="Buttons" tag="spec" isDark={isDark}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <SpecButton isDark={isDark} size="sm">
                Small
              </SpecButton>
              <SpecButton isDark={isDark} size="md">
                Hire Me
              </SpecButton>
              <SpecButton isDark={isDark} size="md">
                View My Work →
              </SpecButton>
              <SpecButton isDark={isDark} size="lg">
                Download CV
              </SpecButton>
            </div>
          </Section>

          <Section title="Icon Buttons" tag="spec" isDark={isDark}>
            <div style={{ display: 'flex', gap: 10 }}>
              <SpecIconBtn isDark={isDark} />
              <SpecIconBtn isDark={isDark} />
              <SpecIconBtn isDark={isDark} />
            </div>
          </Section>

          <Section title="Badge / Pill" tag="spec" isDark={isDark}>
            <SpecBadge isDark={isDark} />
          </Section>

          <Section title="Navigation Pill" tag="spec" isDark={isDark}>
            <SpecNavPill isDark={isDark} />
          </Section>

          <Section title="Stat Cards" tag="spec" isDark={isDark}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <SpecStatCard value="7+" label="Years exp." isDark={isDark} />
              <SpecStatCard value="9+" label="Projects" isDark={isDark} />
              <SpecStatCard value="7" label="Companies" isDark={isDark} />
            </div>
          </Section>

          <Section title="Content Card" tag="spec" isDark={isDark}>
            <SpecContentCard isDark={isDark} />
          </Section>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SECTION C — Dark glass card (Refer and Earn)
        ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.40)',
            margin: '48px 0 24px',
          }}
        >
          C — Dark glass card{' '}
          <span style={{ opacity: 0.5, fontWeight: 400 }}>
            (backdrop-blur · gradient border mask)
          </span>
        </div>

        <Section title="Refer and Earn Card" isDark={isDark}>
          <ReferCard />
        </Section>
      </div>
    </div>
  );
};

export default SandboxPage;

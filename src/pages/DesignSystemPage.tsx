import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/buttons/Button';
import { GlassCard } from '../components/ui/cards/GlassCard';
import { StatCard } from '../components/ui/cards/StatCard';
import { Badge } from '../components/ui/badges/Badge';
import { SkillPill } from '../components/ui/badges/SkillPill';
import { StatusDot } from '../components/ui/badges/StatusDot';
import { Input } from '../components/ui/forms/Input';
import { Timeline } from '../components/ui/timeline/Timeline';
import { TimelineItem } from '../components/ui/timeline/TimelineItem';
import { SocialButton } from '../components/ui/social/SocialButton';
import { Divider } from '../components/ui/misc/Divider';
import { Eyebrow } from '../components/ui/misc/Eyebrow';
import { ScrollHint } from '../components/ui/misc/ScrollHint';
import { NavbarPreview } from '../components/ui/navbar/NavbarPreview';

const SECTIONS = [
  { id: 'tokens', label: 'Color Tokens', group: 'Foundation' },
  { id: 'typography', label: 'Typography', group: 'Foundation' },
  { id: 'spacing', label: 'Spacing & Radius', group: 'Foundation' },
  { id: 'navbar', label: 'Navigation Bar', group: 'Components' },
  { id: 'buttons', label: 'Buttons', group: 'Components' },
  { id: 'cards', label: 'Glass Cards', group: 'Components' },
  { id: 'badges', label: 'Badges & Pills', group: 'Components' },
  { id: 'inputs', label: 'Form Inputs', group: 'Components' },
  { id: 'stats', label: 'Stat Cards', group: 'Components' },
  { id: 'timeline', label: 'Timeline', group: 'Components' },
  { id: 'social', label: 'Social Buttons', group: 'Components' },
  { id: 'misc', label: 'Misc Elements', group: 'Components' },
  { id: 'animations', label: 'Animations', group: 'Reference' },
  { id: 'cssref', label: 'CSS Variables', group: 'Reference' },
];

const TIMELINE_ITEMS = [
  {
    year: 'Sep 2022 – Present',
    company: 'Cambio Software Engineering',
    role: 'Senior Software Engineer',
    active: true,
  },
  {
    year: 'May 2018 – Jul 2022',
    company: 'Mobitel (Pvt) Ltd',
    role: 'Senior Software Engineer',
    active: false,
  },
  {
    year: 'Mar 2017 – Mar 2018',
    company: 'Virtusa (Pvt) Ltd',
    role: 'Associate Engineer – Technology',
    active: false,
  },
  {
    year: 'Aug 2016 – Mar 2017',
    company: 'Cosmoforge Technologies',
    role: 'Associate Software Engineer',
    active: false,
  },
];

const SKILL_PILLS_FEATURED = [
  'Java 8',
  'Spring Boot',
  'Angular 2+',
  'REST / SOAP',
];
const SKILL_PILLS_DEFAULT = [
  'JPA / Hibernate',
  'MySQL',
  'Oracle',
  'Maven',
  'JUnit',
  'AWS',
  'Jenkins',
  'Git',
];

function TokenCard({
  name,
  value,
  swatchStyle,
}: {
  name: string;
  value: string;
  swatchStyle: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: '52px', ...swatchStyle }} />
      <div style={{ padding: '10px 12px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            marginBottom: '2px',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function TokenGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '48px',
      }}
    >
      {children}
    </div>
  );
}

function CompLabel({
  children,
  style,
}: {
  children: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: 'var(--text-hint)',
        margin: '32px 0 14px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PreviewStrip({
  children,
  darkBg,
  column,
  style,
}: {
  children: React.ReactNode;
  darkBg?: boolean;
  column?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: darkBg ? '#080810' : 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-lg)',
        padding: '32px',
        marginBottom: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: column ? 'flex-start' : 'center',
        flexDirection: column ? 'column' : 'row',
        gap: '14px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SpecRow({ pills }: { pills: string[] }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '6px',
        flexWrap: 'wrap',
      }}
    >
      {pills.map(p => (
        <div
          key={p}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--r-pill)',
            padding: '3px 10px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {p}
        </div>
      ))}
    </div>
  );
}

function SectionHeader({
  tag,
  title,
  desc,
}: {
  tag: string;
  title: string;
  desc?: string;
}) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div
        style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent-secondary)',
          marginBottom: '8px',
        }}
      >
        {tag}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-2xl)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {desc && (
        <p
          style={{
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-muted)',
            marginTop: '8px',
            maxWidth: '520px',
            lineHeight: 1.7,
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--r-md)',
        padding: '20px 24px',
        margin: '16px 0 32px',
        overflowX: 'auto',
      }}
    >
      <pre
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.70)',
          whiteSpace: 'pre',
        }}
      >
        {children}
      </pre>
    </div>
  );
}

function CC({ children }: { children: string }) {
  return <span style={{ color: 'rgba(255,255,255,0.25)' }}>{children}</span>;
}
function CK({ children }: { children: string }) {
  return <span style={{ color: '#93c5fd' }}>{children}</span>;
}
function CV({ children }: { children: string }) {
  return <span style={{ color: '#86efac' }}>{children}</span>;
}
function CS({ children }: { children: string }) {
  return <span style={{ color: '#fca5a5' }}>{children}</span>;
}

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const EmailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.876L0 24l6.334-1.521A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.735.897.94-3.617-.235-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.578 6.578 2.182 12 2.182c5.423 0 9.818 4.396 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818z" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="#0a0c10"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 2v7M4 6l3 3 3-3M2 11h10"
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState('tokens');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ds-visible');
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.08, rootMargin: '-60px 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('.ds-reveal-section');
    sections.forEach(s => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(id);
  };

  const groups = SECTIONS.reduce<Record<string, typeof SECTIONS>>((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {});

  return (
    <>
      <style>{`
        .ds-reveal-section {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .ds-reveal-section.ds-visible {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .ds-reveal-section {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          width: '100%',
          background: 'var(--bg-page)',
          minHeight: '100vh',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Sidebar */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '220px',
            height: '100vh',
            background: 'var(--bg-surface)',
            borderRight: '1px solid var(--border-subtle)',
            padding: '32px 0',
            overflowY: 'auto',
            zIndex: 100,
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          <div
            style={{
              padding: '0 24px 28px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                background: 'var(--accent-primary)',
                borderRadius: 'var(--r-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '10px',
              }}
            >
              KT
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
              }}
            >
              Kasun Thilina
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                marginTop: '2px',
              }}
            >
              Design System v1.0
            </div>
          </div>

          {Object.entries(groups).map(([group, items], gi) => (
            <div
              key={group}
              style={{
                padding: '0 16px',
                marginBottom: '8px',
                marginTop: gi > 0 ? '16px' : 0,
              }}
            >
              <div
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--text-hint)',
                  padding: '0 8px',
                  marginBottom: '4px',
                }}
              >
                {group}
              </div>
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 500,
                    color:
                      activeSection === item.id
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                    padding: '6px 8px',
                    borderRadius: 'var(--r-sm)',
                    background:
                      activeSection === item.id
                        ? 'var(--bg-raised)'
                        : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background var(--t-fast), color var(--t-fast)',
                  }}
                  onMouseEnter={e => {
                    if (activeSection !== item.id) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'var(--bg-raised)';
                      (e.currentTarget as HTMLButtonElement).style.color =
                        'var(--text-secondary)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeSection !== item.id) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color =
                        'var(--text-muted)';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main
          ref={mainRef}
          style={{
            marginLeft: '220px',
            flex: 1,
            minWidth: 0,
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          <div className="container-custom" style={{ paddingBottom: '120px' }}>
            {/* Cover */}
            <div
              style={{
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '64px 0 56px',
                borderBottom: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse 60% 100% at 80% 50%, rgba(28,53,87,0.35) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-secondary)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '1px',
                    background: 'var(--accent-secondary)',
                    display: 'block',
                  }}
                />
                Design System
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                Kasun Thilina
                <br />
                Portfolio UI Kit
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  maxWidth: '480px',
                  lineHeight: 1.7,
                }}
              >
                Complete component library, color tokens, typography scale, and
                implementation patterns for the portfolio website.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  marginTop: '32px',
                  fontSize: '11px',
                  color: 'var(--text-hint)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>Version 1.0</span>
                <span>·</span>
                <span>Dark Theme</span>
                <span>·</span>
                <span>2024</span>
              </div>
            </div>

            {/* ═══ 1. COLOR TOKENS ═══ */}
            <section
              id="tokens"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Foundation · 01"
                title="Color Tokens"
                desc={`Every color in the system is defined as a CSS variable on :root. Never use raw hex values in components — always reference a token.`}
              />

              <CompLabel>Backgrounds</CompLabel>
              <TokenGrid>
                <TokenCard
                  name="--bg-page"
                  value="#0a0c10"
                  swatchStyle={{ background: '#0a0c10' }}
                />
                <TokenCard
                  name="--bg-surface"
                  value="#0f1117"
                  swatchStyle={{ background: '#0f1117' }}
                />
                <TokenCard
                  name="--bg-raised"
                  value="#161820"
                  swatchStyle={{ background: '#161820' }}
                />
                <TokenCard
                  name="--bg-card"
                  value="rgba(255,255,255,0.055)"
                  swatchStyle={{ background: 'rgba(255,255,255,0.055)' }}
                />
              </TokenGrid>

              <CompLabel>Text</CompLabel>
              <TokenGrid>
                <TokenCard
                  name="--text-primary"
                  value="#ffffff"
                  swatchStyle={{ background: '#ffffff' }}
                />
                <TokenCard
                  name="--text-secondary"
                  value="rgba(255,255,255,0.60)"
                  swatchStyle={{ background: 'rgba(255,255,255,0.60)' }}
                />
                <TokenCard
                  name="--text-muted"
                  value="rgba(255,255,255,0.32)"
                  swatchStyle={{ background: 'rgba(255,255,255,0.32)' }}
                />
                <TokenCard
                  name="--text-hint"
                  value="rgba(255,255,255,0.18)"
                  swatchStyle={{ background: 'rgba(255,255,255,0.18)' }}
                />
              </TokenGrid>

              <CompLabel>Accent</CompLabel>
              <TokenGrid>
                <TokenCard
                  name="--accent-primary"
                  value="#1C3557"
                  swatchStyle={{ background: '#1C3557' }}
                />
                <TokenCard
                  name="--accent-secondary"
                  value="#3B82C4"
                  swatchStyle={{ background: '#3B82C4' }}
                />
                <TokenCard
                  name="--accent-tint"
                  value="rgba(59,130,196,0.15)"
                  swatchStyle={{ background: 'rgba(59,130,196,0.15)' }}
                />
              </TokenGrid>

              <CompLabel>Semantic</CompLabel>
              <TokenGrid>
                <TokenCard
                  name="--success"
                  value="#4ade80"
                  swatchStyle={{ background: '#4ade80' }}
                />
                <TokenCard
                  name="--warning"
                  value="#f59e0b"
                  swatchStyle={{ background: '#f59e0b' }}
                />
                <TokenCard
                  name="--error"
                  value="#f87171"
                  swatchStyle={{ background: '#f87171' }}
                />
              </TokenGrid>
            </section>

            {/* ═══ 2. TYPOGRAPHY ═══ */}
            <section
              id="typography"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Foundation · 02"
                title="Typography"
                desc="Three font families, each with a specific role. Never mix roles."
              />

              <PreviewStrip column>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '20px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Plus Jakarta Sans — Display &amp; Headings
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    Display / Hero Name{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      800 · 60px · -0.02em
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(36px,5vw,60px)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.0,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Kasun Thilina
                  </div>
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    Section Heading{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      700 · 32px · -0.01em
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Work Experience
                  </div>
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    Sub-heading{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      600 · 20px
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Cambio Software Engineering
                  </div>
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    Card Title{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      600 · 17px
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Senior Software Engineer
                  </div>
                </div>
              </PreviewStrip>

              <PreviewStrip column style={{ marginTop: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '20px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Inter — Body &amp; UI
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    Body{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      400 · 15px · 1.7
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 400,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      maxWidth: '480px',
                    }}
                  >
                    Senior Software Engineer crafting robust enterprise systems
                    with Java, Spring Boot &amp; Angular. 7+ years building
                    things that scale.
                  </div>
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    UI Label{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      600 · 11px · 0.10em uppercase
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Core Technologies
                  </div>
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '8px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    Caption / Eyebrow{' '}
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontWeight: 400,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      500 · 10px · 0.22em uppercase
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-secondary)',
                    }}
                  >
                    Available for work
                  </div>
                </div>
              </PreviewStrip>

              <PreviewStrip column style={{ marginTop: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  JetBrains Mono — Code &amp; Data
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    lineHeight: 2,
                  }}
                >
                  Java 8 &nbsp;·&nbsp; Spring Boot &nbsp;·&nbsp; Angular 2+
                  &nbsp;·&nbsp; REST / SOAP
                  <br />
                  <span
                    style={{ fontSize: '10px', color: 'var(--text-muted)' }}
                  >
                    2022–Present &nbsp;·&nbsp; kgkasunthilina@gmail.com
                  </span>
                </div>
              </PreviewStrip>
            </section>

            {/* ═══ 3. SPACING & RADIUS ═══ */}
            <section
              id="spacing"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader tag="Foundation · 03" title="Spacing & Radius" />

              <CompLabel>Spacing Scale</CompLabel>
              <PreviewStrip
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {(
                    [
                      ['4px', '--sp-1'],
                      ['8px', '--sp-2'],
                      ['12px', '--sp-3'],
                      ['16px', '--sp-4'],
                      ['24px', '--sp-6'],
                      ['32px', '--sp-8'],
                      ['48px', '--sp-12'],
                    ] as [string, string][]
                  ).map(([w, label]) => (
                    <span
                      key={label}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginLeft: label === '--sp-1' ? 0 : '8px',
                      }}
                    >
                      <span
                        style={{
                          width: w,
                          height: '20px',
                          background: 'var(--accent-secondary)',
                          borderRadius: '2px',
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {label}: {w}
                      </span>
                    </span>
                  ))}
                </div>
              </PreviewStrip>

              <CompLabel style={{ marginTop: '28px' }}>Border Radius</CompLabel>
              <PreviewStrip style={{ gap: '20px', flexWrap: 'wrap' }}>
                {(
                  [
                    ['4px', '--r-xs: 4px'],
                    ['8px', '--r-sm: 8px'],
                    ['12px', '--r-md: 12px'],
                    ['16px', '--r-lg: 16px'],
                    ['20px', '--r-xl: 20px'],
                    ['999px', '--r-pill'],
                  ] as [string, string][]
                ).map(([r, label]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        background: 'var(--bg-raised)',
                        border: '1px solid var(--border-default)',
                        borderRadius: r,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </PreviewStrip>
            </section>

            {/* ═══ 4. NAVBAR ═══ */}
            <section
              id="navbar"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Component · 01"
                title="Navigation Bar"
                desc="Fixed at top, full width, 64px height. Frosted surface on scroll. Identity block left, links centered, CTA right."
              />
              <PreviewStrip>
                <NavbarPreview />
              </PreviewStrip>
              <SpecRow
                pills={[
                  'height: 64px',
                  'backdrop-filter: blur(12px)',
                  'position: fixed',
                  'Inter 500 · 12px',
                  'Plus Jakarta Sans 700 · 13px',
                ]}
              />
            </section>

            {/* ═══ 5. BUTTONS ═══ */}
            <section
              id="buttons"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Component · 02"
                title="Buttons"
                desc="Five variants across three sizes. All use Inter 600, border-radius pill, and translateY(-2px) on hover."
              />

              <CompLabel>Variants</CompLabel>
              <PreviewStrip darkBg>
                <Button variant="primary">Primary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
              </PreviewStrip>

              <CompLabel>Sizes</CompLabel>
              <PreviewStrip darkBg style={{ alignItems: 'center' }}>
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Default
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </PreviewStrip>

              <CompLabel>With Icon</CompLabel>
              <PreviewStrip darkBg>
                <Button variant="primary">
                  <span>View My Work</span>
                  <ArrowRightIcon />
                </Button>
                <Button variant="ghost">
                  <span>Download CV</span>
                  <DownloadIcon />
                </Button>
              </PreviewStrip>

              <SpecRow
                pills={[
                  'border-radius: var(--r-pill)',
                  'font: Inter 600 13px',
                  'hover: translateY(-2px)',
                  'active: scale(0.97)',
                  'transition: 150ms ease',
                ]}
              />
            </section>

            {/* ═══ 6. GLASS CARDS ═══ */}
            <section
              id="cards"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Component · 03"
                title="Glass Cards"
                desc="The core surface. Requires a non-solid background (image, gradient, or colored surface) to show the blur effect."
              />

              <CompLabel>Variants</CompLabel>
              <PreviewStrip
                darkBg
                style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}
              >
                <GlassCard
                  variant="default"
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '12px',
                    }}
                  >
                    Default Card
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-md)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Cambio Software
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--fs-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    Senior Software Engineer working on Healthcare Management
                    Systems.
                  </div>
                </GlassCard>
                <GlassCard
                  variant="accent"
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '12px',
                    }}
                  >
                    Accent Card
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-md)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Spring Boot
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--fs-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    Featured technology with accent border highlight.
                  </div>
                </GlassCard>
                <GlassCard
                  variant="success"
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <div
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-hint)',
                      marginBottom: '12px',
                    }}
                  >
                    Status Card
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-md)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Currently Active
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--fs-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    Success-tinted border indicates current role or open status.
                  </div>
                </GlassCard>
              </PreviewStrip>

              <CompLabel style={{ marginTop: '28px' }}>
                Status Card (Hero variant)
              </CompLabel>
              <PreviewStrip darkBg>
                <GlassCard
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <StatusDot status="online" />
                  <div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Currently at Cambio Software Engineering
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        marginTop: '2px',
                      }}
                    >
                      Senior Software Engineer · Sep 2022 – Present
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Badge variant="success">Active</Badge>
                  </div>
                </GlassCard>
              </PreviewStrip>

              <SpecRow
                pills={[
                  'backdrop-filter: blur(20px) saturate(160%)',
                  'background: rgba(255,255,255,0.055)',
                  'border: 1px solid rgba(255,255,255,0.10)',
                  'border-radius: var(--r-lg)',
                  'hover: translateY(-4px)',
                ]}
              />
            </section>

            {/* ═══ 7. BADGES & PILLS ═══ */}
            <section
              id="badges"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader tag="Component · 04" title="Badges & Pills" />

              <CompLabel>Status Badges</CompLabel>
              <PreviewStrip darkBg>
                <Badge variant="success">● Active</Badge>
                <Badge variant="info">● Available</Badge>
                <Badge variant="warning">● Busy</Badge>
                <Badge variant="error">● Unavailable</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </PreviewStrip>

              <CompLabel>Status Dots</CompLabel>
              <PreviewStrip darkBg style={{ gap: '24px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <StatusDot status="online" />
                  <span
                    style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
                  >
                    Online / Active
                  </span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <StatusDot status="busy" />
                  <span
                    style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
                  >
                    Busy
                  </span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <StatusDot status="offline" />
                  <span
                    style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
                  >
                    Offline
                  </span>
                </div>
              </PreviewStrip>

              <CompLabel>Skill / Technology Pills</CompLabel>
              <PreviewStrip darkBg style={{ flexWrap: 'wrap', gap: '8px' }}>
                {SKILL_PILLS_FEATURED.map(s => (
                  <SkillPill key={s} featured>
                    {s}
                  </SkillPill>
                ))}
                {SKILL_PILLS_DEFAULT.map(s => (
                  <SkillPill key={s}>{s}</SkillPill>
                ))}
              </PreviewStrip>

              <SpecRow
                pills={[
                  'font: JetBrains Mono 11px',
                  'padding: 4px 12px',
                  'border-radius: var(--r-pill)',
                ]}
              />
            </section>

            {/* ═══ 8. FORM INPUTS ═══ */}
            <section
              id="inputs"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Component · 05"
                title="Form Inputs"
                desc="Used in the Contact section. Steel Blue focus ring with tinted background on focus."
              />

              <PreviewStrip column style={{ gap: '20px', maxWidth: '520px' }}>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Kasun Thilina"
                  style={{ width: '100%' }}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="kgkasunthilina@gmail.com"
                  style={{ width: '100%' }}
                />
                <Input
                  label="Message"
                  type="textarea"
                  placeholder="Write your message here..."
                  style={{ width: '100%' }}
                />
                <Button variant="primary" style={{ alignSelf: 'flex-start' }}>
                  <span>Send Message</span>
                  <ArrowRightIcon />
                </Button>
              </PreviewStrip>

              <SpecRow
                pills={[
                  'background: rgba(255,255,255,0.05)',
                  'border: 1px solid rgba(255,255,255,0.10)',
                  'focus: border #3B82C4 + glow',
                  'border-radius: var(--r-sm)',
                  'font: Inter 400 13px',
                ]}
              />
            </section>

            {/* ═══ 9. STAT CARDS ═══ */}
            <section
              id="stats"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Component · 06"
                title="Stat Cards"
                desc="Used in the Hero section. Plus Jakarta Sans 700 for the number, Inter uppercase for the label."
              />

              <PreviewStrip darkBg style={{ gap: '14px' }}>
                <StatCard
                  number="7+"
                  label="Years Experience"
                  style={{ flex: 1 }}
                />
                <StatCard
                  number="10+"
                  label="Systems Built"
                  style={{ flex: 1 }}
                />
                <StatCard number="3" label="Companies" style={{ flex: 1 }} />
              </PreviewStrip>

              <CompLabel style={{ marginTop: '28px' }}>
                Inline Stat Row (Hero variant)
              </CompLabel>
              <PreviewStrip darkBg>
                <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
                  {[
                    ['7+', 'Years Exp.'],
                    ['10+', 'Systems Built'],
                    ['3', 'Companies'],
                  ].map(([num, lbl], i) => (
                    <div
                      key={lbl}
                      style={{
                        paddingRight: i < 2 ? '28px' : 0,
                        marginRight: i < 2 ? '28px' : 0,
                        borderRight:
                          i < 2 ? '1px solid var(--border-subtle)' : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '26px',
                          fontWeight: 700,
                          color: '#fff',
                          lineHeight: 1,
                          marginBottom: '4px',
                        }}
                      >
                        {num}
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
                        {lbl}
                      </div>
                    </div>
                  ))}
                </div>
              </PreviewStrip>
            </section>

            {/* ═══ 10. TIMELINE ═══ */}
            <section
              id="timeline"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Component · 07"
                title="Timeline"
                desc="Used in the Experience section. Active item has a Steel Blue filled dot."
              />

              <PreviewStrip darkBg column style={{ maxWidth: '420px' }}>
                <Timeline>
                  {TIMELINE_ITEMS.map(item => (
                    <TimelineItem key={item.company} {...item} />
                  ))}
                </Timeline>
              </PreviewStrip>
            </section>

            {/* ═══ 11. SOCIAL BUTTONS ═══ */}
            <section
              id="social"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader tag="Component · 08" title="Social Buttons" />
              <PreviewStrip darkBg style={{ gap: '10px' }}>
                <SocialButton
                  href="#"
                  title="LinkedIn"
                  icon={<LinkedInIcon />}
                />
                <SocialButton href="#" title="Email" icon={<EmailIcon />} />
                <SocialButton href="#" title="GitHub" icon={<GitHubIcon />} />
                <SocialButton
                  href="#"
                  title="WhatsApp"
                  icon={<WhatsAppIcon />}
                />
              </PreviewStrip>
              <SpecRow
                pills={[
                  'size: 36×36px',
                  'border-radius: 50%',
                  'background: rgba(255,255,255,0.07)',
                ]}
              />
            </section>

            {/* ═══ 12. MISC ELEMENTS ═══ */}
            <section
              id="misc"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader tag="Component · 09" title="Misc Elements" />

              <CompLabel>Dividers</CompLabel>
              <PreviewStrip column style={{ gap: '16px' }}>
                <Divider />
                <Divider label="or" />
              </PreviewStrip>

              <CompLabel style={{ marginTop: '24px' }}>
                Eyebrow with Rule
              </CompLabel>
              <PreviewStrip darkBg column style={{ gap: '6px' }}>
                <Eyebrow>Available for work</Eyebrow>
                <Eyebrow color="var(--text-muted)">Career Journey</Eyebrow>
              </PreviewStrip>

              <CompLabel style={{ marginTop: '24px' }}>Scroll Hint</CompLabel>
              <PreviewStrip darkBg style={{ justifyContent: 'center' }}>
                <ScrollHint />
              </PreviewStrip>
            </section>

            {/* ═══ 13. ANIMATIONS ═══ */}
            <section
              id="animations"
              className="ds-reveal-section"
              style={{
                padding: '72px 0 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <SectionHeader
                tag="Reference · 01"
                title="Animations"
                desc="All motion uses these three keyframes. Copy directly into your stylesheet."
              />

              <CodeBlock>
                <CC>{'/* Entry — used on all section reveals */'}</CC>
                {'\n'}
                <CK>{'@keyframes'}</CK>
                {' fadeUp {\n'}
                {'  from { '}
                <CV>opacity</CV>
                {': '}
                <CS>0</CS>
                {'; '}
                <CV>transform</CV>
                {': '}
                <CS>translateY(20px)</CS>
                {'; }\n'}
                {'  to   { '}
                <CV>opacity</CV>
                {': '}
                <CS>1</CS>
                {'; '}
                <CV>transform</CV>
                {': '}
                <CS>translateY(0)</CS>
                {'; }\n'}
                {'}\n\n'}
                <CC>{'/* Scroll indicator line drop */'}</CC>
                {'\n'}
                <CK>{'@keyframes'}</CK>
                {' scrollDrop {\n'}
                {'  0%   { '}
                <CV>transform</CV>
                {': '}
                <CS>scaleY(0)</CS>
                {'; '}
                <CV>transform-origin</CV>
                {': '}
                <CS>top</CS>
                {'; '}
                <CV>opacity</CV>
                {': '}
                <CS>0</CS>
                {'; }\n'}
                {'  50%  { '}
                <CV>transform</CV>
                {': '}
                <CS>scaleY(1)</CS>
                {'; '}
                <CV>transform-origin</CV>
                {': '}
                <CS>top</CS>
                {'; '}
                <CV>opacity</CV>
                {': '}
                <CS>1</CS>
                {'; }\n'}
                {'  100% { '}
                <CV>transform</CV>
                {': '}
                <CS>scaleY(1)</CS>
                {'; '}
                <CV>transform-origin</CV>
                {': '}
                <CS>bottom</CS>
                {'; '}
                <CV>opacity</CV>
                {': '}
                <CS>0</CS>
                {'; }\n'}
                {'}\n\n'}
                <CC>{'/* Status dot pulse */'}</CC>
                {'\n'}
                <CK>{'@keyframes'}</CK>
                {' pulse-dot {\n'}
                {'  0%,100% { '}
                <CV>box-shadow</CV>
                {': '}
                <CS>0 0 0 3px rgba(74,222,128,0.18)</CS>
                {'; }\n'}
                {'  50%     { '}
                <CV>box-shadow</CV>
                {': '}
                <CS>0 0 0 6px rgba(74,222,128,0.06)</CS>
                {'; }\n'}
                {'}\n\n'}
                <CC>{'/* Stagger pattern for hero */'}</CC>
                {'\n'}
                <CK>{'.hero-eyebrow'}</CK>
                {'   { '}
                <CV>animation</CV>
                {': '}
                <CS>fadeUp 0.7s 0.20s both</CS>
                {'; }\n'}
                <CK>{'.hero-name'}</CK>
                {'      { '}
                <CV>animation</CV>
                {': '}
                <CS>fadeUp 0.7s 0.35s both</CS>
                {'; }\n'}
                <CK>{'.hero-tagline'}</CK>
                {'   { '}
                <CV>animation</CV>
                {': '}
                <CS>fadeUp 0.7s 0.50s both</CS>
                {'; }\n'}
                <CK>{'.hero-btns'}</CK>
                {'      { '}
                <CV>animation</CV>
                {': '}
                <CS>fadeUp 0.7s 0.65s both</CS>
                {'; }\n'}
                <CK>{'.hero-stats'}</CK>
                {'     { '}
                <CV>animation</CV>
                {': '}
                <CS>fadeUp 0.7s 0.80s both</CS>
                {'; }\n\n'}
                <CC>
                  {'/* Scroll-triggered reveal (via IntersectionObserver) */'}
                </CC>
                {'\n'}
                <CK>{'.reveal'}</CK>
                {'         { '}
                <CV>opacity</CV>
                {': '}
                <CS>0</CS>
                {'; '}
                <CV>transform</CV>
                {': '}
                <CS>translateY(24px)</CS>
                {'; '}
                <CV>transition</CV>
                {': '}
                <CS>opacity 0.6s ease, transform 0.6s ease</CS>
                {'; }\n'}
                <CK>{'.reveal.visible'}</CK>
                {'  { '}
                <CV>opacity</CV>
                {': '}
                <CS>1</CS>
                {'; '}
                <CV>transform</CV>
                {': '}
                <CS>none</CS>
                {'; }\n\n'}
                <CC>{'/* Respect reduced motion */'}</CC>
                {'\n'}
                <CK>{'@media (prefers-reduced-motion: reduce)'}</CK>
                {' {\n'}
                {'  '}
                <CK>{'*, *::before, *::after'}</CK>
                {'  { '}
                <CV>animation-duration</CV>
                {': '}
                <CS>0.01ms !important</CS>
                {'; '}
                <CV>transition-duration</CV>
                {': '}
                <CS>0.01ms !important</CS>
                {'; }\n}'}
              </CodeBlock>
            </section>

            {/* ═══ 14. CSS VARIABLES ═══ */}
            <section
              id="cssref"
              className="ds-reveal-section"
              style={{ padding: '72px 0 0' }}
            >
              <SectionHeader
                tag="Reference · 02"
                title="CSS Variables — Full Reference"
                desc="Copy this block into your globals.css as the first thing after your font imports."
              />

              <CodeBlock>
                <CK>{':root'}</CK>
                {' {\n'}
                {'  '}
                <CC>{'/* ── Backgrounds ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--bg-page'}</CK>
                {':\t\t'}
                <CS>{'#0a0c10'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--bg-surface'}</CK>
                {':  '}
                <CS>{'#0f1117'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--bg-raised'}</CK>
                {':   '}
                <CS>{'#161820'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--bg-card'}</CK>
                {':     '}
                <CS>{'rgba(255,255,255,0.055)'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Glass ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--glass-bg'}</CK>
                {':\t\t\t '}
                <CS>{'rgba(255,255,255,0.055)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--glass-bg-hover'}</CK>
                {':\t '}
                <CS>{'rgba(255,255,255,0.085)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--glass-border'}</CK>
                {':\t\t '}
                <CS>{'rgba(255,255,255,0.10)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--glass-border-hover'}</CK>
                {':'}
                <CS>{'rgba(255,255,255,0.18)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--glass-blur'}</CK>
                {':\t\t '}
                <CS>{'blur(20px) saturate(160%)'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Text ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--text-primary'}</CK>
                {':\t '}
                <CS>{'#ffffff'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--text-secondary'}</CK>
                {': '}
                <CS>{'rgba(255,255,255,0.60)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--text-muted'}</CK>
                {':\t '}
                <CS>{'rgba(255,255,255,0.32)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--text-hint'}</CK>
                {':\t\t '}
                <CS>{'rgba(255,255,255,0.18)'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Accent ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--accent-primary'}</CK>
                {':\t '}
                <CS>{'#1C3557'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--accent-secondary'}</CK>
                {': '}
                <CS>{'#3B82C4'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--accent-tint'}</CK>
                {':\t '}
                <CS>{'rgba(59,130,196,0.15)'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Semantic ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--success'}</CK>
                {':\t\t '}
                <CS>{'#4ade80'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--success-tint'}</CK>
                {': '}
                <CS>{'rgba(74,222,128,0.10)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--warning'}</CK>
                {':\t\t '}
                <CS>{'#f59e0b'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--error'}</CK>
                {':\t\t '}
                <CS>{'#f87171'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Borders ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--border-subtle'}</CK>
                {':\t '}
                <CS>{'rgba(255,255,255,0.07)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--border-default'}</CK>
                {':\t '}
                <CS>{'rgba(255,255,255,0.10)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--border-emphasis'}</CK>
                {': '}
                <CS>{'rgba(255,255,255,0.20)'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Shadows ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--shadow-sm'}</CK>
                {': '}
                <CS>{'0 1px 3px rgba(0,0,0,0.4)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--shadow-md'}</CK>
                {': '}
                <CS>{'0 4px 16px rgba(0,0,0,0.5)'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--shadow-lg'}</CK>
                {': '}
                <CS>{'0 12px 40px rgba(0,0,0,0.6)'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Radius ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--r-xs'}</CK>
                {':\t '}
                <CS>{'4px'}</CS>
                {';\t'}
                <CK>{'--r-sm'}</CK>
                {': '}
                <CS>{'8px'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--r-md'}</CK>
                {':\t '}
                <CS>{'12px'}</CS>
                {';\t'}
                <CK>{'--r-lg'}</CK>
                {': '}
                <CS>{'16px'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--r-xl'}</CK>
                {':\t '}
                <CS>{'20px'}</CS>
                {';\t'}
                <CK>{'--r-pill'}</CK>
                {': '}
                <CS>{'999px'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Spacing ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--sp-1'}</CK>
                {':'}
                <CS>{'4px'}</CS>
                {';\t'}
                <CK>{'--sp-2'}</CK>
                {':'}
                <CS>{'8px'}</CS>
                {';\t'}
                <CK>{'--sp-3'}</CK>
                {':'}
                <CS>{'12px'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--sp-4'}</CK>
                {':'}
                <CS>{'16px'}</CS>
                {';\t'}
                <CK>{'--sp-5'}</CK>
                {':'}
                <CS>{'20px'}</CS>
                {';\t'}
                <CK>{'--sp-6'}</CK>
                {':'}
                <CS>{'24px'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--sp-8'}</CK>
                {':'}
                <CS>{'32px'}</CS>
                {';\t'}
                <CK>{'--sp-10'}</CK>
                {':'}
                <CS>{'40px'}</CS>
                {';\t'}
                <CK>{'--sp-12'}</CK>
                {':'}
                <CS>{'48px'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Transitions ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--t-fast'}</CK>
                {': '}
                <CS>{'150ms ease'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--t-base'}</CK>
                {': '}
                <CS>{'250ms ease'}</CS>
                {';\n'}
                {'  '}
                <CK>{'--t-slow'}</CK>
                {': '}
                <CS>{'400ms ease'}</CS>
                {';\n\n'}
                {'  '}
                <CC>{'/* ── Font families ── */'}</CC>
                {'\n'}
                {'  '}
                <CK>{'--font-display'}</CK>
                {': '}
                <CS>{"'Plus Jakarta Sans', sans-serif"}</CS>
                {';\n'}
                {'  '}
                <CK>{'--font-body'}</CK>
                {':\t '}
                <CS>{"'Inter', sans-serif"}</CS>
                {';\n'}
                {'  '}
                <CK>{'--font-mono'}</CK>
                {':\t '}
                <CS>{"'JetBrains Mono', monospace"}</CS>
                {';\n'}
                {'}'}
              </CodeBlock>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

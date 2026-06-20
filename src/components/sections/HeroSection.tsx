import profile from '../../data/profile';
import { Button } from '../ui/buttons/Button';
import { GlassCard } from '../ui/cards/GlassCard';
import { Badge } from '../ui/badges/Badge';
import { SkillPill } from '../ui/badges/SkillPill';
import { StatusDot } from '../ui/badges/StatusDot';
import { SocialButton } from '../ui/social/SocialButton';
import { ScrollHint } from '../ui/misc/ScrollHint';

const FEATURED_SKILLS = ['Java 8', 'Spring Boot', 'Angular 2+', 'REST / SOAP'];
const OTHER_SKILLS = ['JPA / Hibernate', 'MySQL', 'Oracle', 'Maven', 'JUnit', 'AWS', 'Jenkins', 'Docker'];

const EXP_ROWS = [
  { company: 'Cambio Software Engineering', role: 'Senior Software Engineer', year: '2022–Now', active: true },
  { company: 'Mobitel (Pvt) Ltd',           role: 'Senior Software Engineer', year: '2018–2022', active: false },
  { company: 'Virtusa (Pvt) Ltd',           role: 'Associate Engineer',       year: '2017–2018', active: false },
];

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.876L0 24l6.334-1.521A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.735.897.94-3.617-.235-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.578 6.578 2.182 12 2.182c5.423 0 9.818 4.396 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="#0a0c10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeroSection = () => {
  const { contact } = profile;

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg-page);
        }

        .hero-photo {
          position: absolute;
          inset: 0;
          background-image: url('/hero-image.jpeg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        .hero-photo-mask {
          position: absolute;
          inset: 0;
          background: rgba(28, 53, 87, 0.30);
        }

        .hero-radial {
          display: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--sp-6);
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          min-height: 100vh;
        }

        /* ── Left ── */
        .hero-text {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 80px 0;
        }

        .hero-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-secondary);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--sp-5);
          animation: fadeUp 0.7s 0.20s both;
        }
        .hero-eyebrow::before {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--accent-secondary);
          display: block;
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin-bottom: var(--sp-5);
          animation: fadeUp 0.7s 0.35s both;
        }
        .hero-name span {
          display: block;
          font-size: 0.42em;
          font-weight: 400;
          color: var(--text-muted);
          letter-spacing: 0;
          margin-bottom: var(--sp-2);
        }

        .hero-tagline {
          font-size: var(--fs-base);
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: var(--sp-8);
          animation: fadeUp 0.7s 0.50s both;
        }

        .hero-btns {
          display: flex;
          gap: var(--sp-3);
          flex-wrap: wrap;
          margin-bottom: var(--sp-10);
          animation: fadeUp 0.7s 0.65s both;
        }

        .hero-stats {
          display: flex;
          gap: 0;
          animation: fadeUp 0.7s 0.80s both;
        }
        .hero-stat {
          padding-right: 28px;
          margin-right: 28px;
          border-right: 1px solid var(--border-subtle);
        }
        .hero-stat:last-child {
          border-right: none;
          padding-right: 0;
          margin-right: 0;
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: var(--sp-1);
        }
        .hero-stat-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        /* ── Right ── */
        .hero-cards {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 80px 0;
        }

        .hero-cards > *:nth-child(1) { animation: fadeUp 0.7s 0.40s both; }
        .hero-cards > *:nth-child(2) { animation: fadeUp 0.7s 0.55s both; }
        .hero-cards > *:nth-child(3) { animation: fadeUp 0.7s 0.70s both; }
        .hero-cards > *:nth-child(4) { animation: fadeUp 0.7s 0.85s both; }

        .exp-row {
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .exp-row:first-child { padding-top: 0; }
        .exp-row:last-child  { border-bottom: none; padding-bottom: 0; }

        .exp-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        .exp-dot.active { background: var(--accent-secondary); }

        .exp-company {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          flex: 1;
        }
        .exp-role {
          font-size: 11px;
          font-weight: 400;
          color: var(--text-muted);
          margin-top: 1px;
        }
        .exp-year {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-hint);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .card-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-hint);
          margin-bottom: 14px;
        }

        .contact-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 3px;
        }
        .contact-email {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        /* ── Scroll hint ── */
        .hero-scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          animation: fadeIn 1s 1.4s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @media (max-width: 860px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: var(--sp-8);
          }
          .hero-text  { padding: 100px 0 0; }
          .hero-cards { padding: 0 0 80px; }
        }
      `}</style>

      <section className="hero-section" id="hero">
        <div className="hero-photo">
          <div className="hero-photo-mask" />
        </div>
        <div className="hero-radial" />

        <div className="hero-content">

          {/* ── LEFT: Text ── */}
          <div className="hero-text">

            <p className="hero-eyebrow">Available for work</p>

            <h1 className="hero-name">
              <span>Hello, I'm</span>
              Kasun<br />Thilina
            </h1>

            <p className="hero-tagline">
              Senior Software Engineer crafting robust enterprise systems with Java, Spring Boot &amp; Angular. 7+ years building things that scale.
            </p>

            <div className="hero-btns">
              <Button variant="primary" as="a" href="#experience">
                View My Work <ArrowRightIcon />
              </Button>
              <Button variant="ghost" as="a" href="#contact">
                Download CV <DownloadIcon />
              </Button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">7+</div>
                <div className="hero-stat-label">Years Exp.</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">10+</div>
                <div className="hero-stat-label">Systems Built</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">3</div>
                <div className="hero-stat-label">Companies</div>
              </div>
            </div>

          </div>

        </div>

        <div className="hero-scroll-hint">
          <ScrollHint />
        </div>
      </section>
    </>
  );
};

export default HeroSection;

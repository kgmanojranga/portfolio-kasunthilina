import { useEffect } from 'react';

type Token = { t: string; v: string };
type CodeLine = { tokens: Token[] };

interface IdeModalProps {
  open: boolean;
  onClose: () => void;
  codeLines: CodeLine[];
  tokenColor: (t: string) => string;
  filename?: string;
  language?: string;
}

const IdeModal = ({
  open,
  onClose,
  codeLines,
  tokenColor,
  filename = 'kasun.ts',
  language = 'TypeScript — UTF-8',
}: IdeModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <style>{`
        .ide-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,0);
          pointer-events: none;
          transition: background 0.4s ease;
        }
        .ide-modal-backdrop.open {
          background: rgba(0,0,0,0.50);
          pointer-events: auto;
        }

        .ide-modal-panel {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          width: min(620px, 90vw);
          height: min(520px, 85vh);
          z-index: 101;
          border-radius: 20px;
          background: rgba(10,12,16,0.55);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 32px 80px rgba(0,0,0,0.60), 0 8px 24px rgba(0,0,0,0.40);
          transform: translate(-50%, -44%) scale(0.96);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease;
          overflow: hidden;
          flex-direction: column;
          pointer-events: none;
        }
        .ide-modal-panel.open {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          pointer-events: auto;
        }
        @media (min-width: 769px) {
          .ide-modal-panel { display: flex; }
        }

        .ide-modal-titlebar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .ide-modal-dots { display: flex; gap: 7px; align-items: center; }
        .ide-modal-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          transition: filter 0.15s ease;
          flex-shrink: 0;
        }
        .ide-modal-dot:hover { filter: brightness(1.2); }
        .ide-modal-dot.red    { background: #ff5f57; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.3); }
        .ide-modal-dot.yellow { background: #febc2e; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.3); }
        .ide-modal-dot.green  { background: #28c840; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.3); }
        .ide-modal-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 700;
          color: rgba(0,0,0,0.5);
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .ide-modal-dot.red:hover::after    { content: '✕'; opacity: 1; }
        .ide-modal-dot.yellow:hover::after { content: '−'; opacity: 1; }
        .ide-modal-dot.green:hover::after  { content: '+'; opacity: 1; }

        .ide-modal-tab {
          margin-left: 12px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 3px 12px 3px 10px;
          border-radius: 6px 6px 0 0;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          border-bottom: none;
        }
        .ide-modal-tab-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3b82c4;
          flex-shrink: 0;
        }
        .ide-modal-tab-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.55);
        }
        .ide-modal-title-text {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.04em;
        }

        .ide-modal-body { display: flex; flex: 1; overflow: hidden; }

        .ide-modal-gutter {
          width: 44px;
          flex-shrink: 0;
          padding: 16px 10px 16px 0;
          background: rgba(255,255,255,0.03);
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .ide-modal-ln {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.9;
          color: rgba(255,255,255,0.18);
          user-select: none;
          min-height: 22.8px;
        }

        .ide-modal-code {
          flex: 1;
          padding: 16px 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .ide-modal-code-line {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.9;
          white-space: pre;
          min-height: 22.8px;
        }
        .ide-modal-cursor {
          display: inline-block;
          width: 2px; height: 14px;
          background: #3b82c4;
          vertical-align: middle;
          margin-left: 1px;
          animation: ide-blink 1.1s step-end infinite;
        }
        @keyframes ide-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .ide-modal-statusbar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 5px 16px;
          background: rgba(59,130,196,0.25);
          border-top: 1px solid rgba(59,130,196,0.30);
          flex-shrink: 0;
        }
        .ide-modal-status-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.60);
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .ide-modal-status-item.right { margin-left: auto; }
      `}</style>

      <div
        className={`ide-modal-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
      />

      <div className={`ide-modal-panel${open ? ' open' : ''}`}>
        <div className="ide-modal-titlebar">
          <div className="ide-modal-dots">
            <div className="ide-modal-dot red"    onClick={onClose} title="Close" />
            <div className="ide-modal-dot yellow" onClick={onClose} title="Minimize" />
            <div className="ide-modal-dot green"  onClick={onClose} title="Expand" />
          </div>
          <div className="ide-modal-tab">
            <span className="ide-modal-tab-dot" />
            <span className="ide-modal-tab-name">{filename}</span>
          </div>
          <span className="ide-modal-title-text">{language}</span>
        </div>

        <div className="ide-modal-body">
          <div className="ide-modal-gutter">
            {codeLines.map((_, i) => (
              <div key={i} className="ide-modal-ln">{i + 1}</div>
            ))}
          </div>
          <div className="ide-modal-code">
            {codeLines.map((line, i) => (
              <div key={i} className="ide-modal-code-line">
                {line.tokens.length === 0 ? ' ' : line.tokens.map((tok, j) => (
                  <span key={j} style={{ color: tokenColor(tok.t) }}>{tok.v}</span>
                ))}
                {i === codeLines.length - 1 && <span className="ide-modal-cursor" />}
              </div>
            ))}
          </div>
        </div>

        <div className="ide-modal-statusbar">
          <span className="ide-modal-status-item">⎇ main</span>
          <span className="ide-modal-status-item">✓ TypeScript</span>
          <span className="ide-modal-status-item">Ln {codeLines.length}, Col 1</span>
          <span className="ide-modal-status-item right">kasun-portfolio</span>
        </div>
      </div>
    </>
  );
};

export default IdeModal;

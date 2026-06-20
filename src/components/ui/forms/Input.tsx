import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface BaseInputProps {
  label?: string;
}

interface TextInputProps
  extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'email';
}

interface TextareaInputProps
  extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  type: 'textarea';
}

type InputProps = TextInputProps | TextareaInputProps;

const inputBaseStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--r-sm)',
  padding: '11px 14px',
  outline: 'none',
  transition: 'border-color var(--t-fast), background var(--t-fast)',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
};

function handleFocus(
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const el = e.currentTarget;
  el.style.borderColor = 'var(--accent-secondary)';
  el.style.background = 'rgba(59,130,196,0.06)';
  el.style.boxShadow = '0 0 0 3px rgba(59,130,196,0.12)';
}

function handleBlur(
  e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const el = e.currentTarget;
  el.style.borderColor = 'var(--border-default)';
  el.style.background = 'rgba(255,255,255,0.05)';
  el.style.boxShadow = 'none';
}

function handleMouseEnter(
  e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const el = e.currentTarget;
  if (document.activeElement !== el) {
    el.style.borderColor = 'var(--border-emphasis)';
    el.style.background = 'rgba(255,255,255,0.07)';
  }
}

function handleMouseLeave(
  e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const el = e.currentTarget;
  if (document.activeElement !== el) {
    el.style.borderColor = 'var(--border-default)';
    el.style.background = 'rgba(255,255,255,0.05)';
  }
}

export function Input(props: InputProps) {
  const { label, ...rest } = props;

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  };

  const placeholderStyle = `
    .ds-input::placeholder { color: var(--text-hint); }
  `;

  return (
    <div style={fieldStyle}>
      <style>{placeholderStyle}</style>
      {label && <label style={labelStyle}>{label}</label>}
      {props.type === 'textarea' ? (
        <textarea
          className="ds-input"
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          style={{
            ...inputBaseStyle,
            resize: 'vertical',
            minHeight: '90px',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ) : (
        <input
          className="ds-input"
          type={(props as TextInputProps).type || 'text'}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          style={inputBaseStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
}

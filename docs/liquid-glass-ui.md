# Liquid Glass Effect — React + TypeScript Implementation Guide

This guide extracts the liquid glass visual system from the reference implementation and explains how to apply it to buttons, cards, and widgets in your React TypeScript project.

---

## How the Effect Works

The glass effect is built from three layers working together:

1. **Backdrop filter** — blurs and saturates whatever is behind the element
2. **SVG displacement filter** — distorts the blurred background to simulate refraction (the "wet glass" warping)
3. **Layered inset box-shadows** — simulate light reflections and depth on the glass edge

The CSS variables `--glass-reflex-light` and `--glass-reflex-dark` control how intense the highlights/shadows appear — this lets the same glass style adapt correctly across light, dark, and tinted themes.

---

## Step 1 — Add CSS Variables to Your Theme

Add these to your global CSS (e.g. `globals.css`, `index.css`, or your theme provider):

```css
/* Light theme (default) */
:root {
  --c-glass: #bbbbbc;
  --c-light: #fff;
  --c-dark: #000;
  --glass-reflex-light: 1;
  --glass-reflex-dark: 1;
  --saturation: 150%;
}

/* Dark theme */
[data-theme='dark'] {
  --c-glass: #bbbbbc;
  --c-light: #fff;
  --c-dark: #000;
  --glass-reflex-light: 0.3;
  --glass-reflex-dark: 2;
  --saturation: 150%;
}

/* Dim / tinted theme */
[data-theme='dim'] {
  --c-light: #99deff;
  --c-dark: #20001b;
  --c-glass: hsl(335 250% 74% / 1);
  --glass-reflex-light: 0.7;
  --glass-reflex-dark: 2;
  --saturation: 200%;
}
```

Set `data-theme` on `<body>` or your root element to switch themes.

---

## Step 2 — Add the SVG Displacement Filter

Place this **once** in your app root (e.g. `App.tsx` or `Layout.tsx`). It must be rendered in the DOM for `url(#glass-filter)` to resolve.

```tsx
// GlassFilter.tsx
export function GlassFilter() {
  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, zIndex: -1 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="glass-filter" primitiveUnits="objectBoundingBox">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="0.04"
            result="blur"
          />
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
}
```

> **Note:** The reference uses a pre-baked WebP displacement map image for richer refraction. For most UI use cases, the simplified version above gives a good result without the image dependency. To use the original map, copy the `feImage` block with the base64 `href` from the reference HTML and add it back inside `<filter>`.

Use it in your app root:

```tsx
// App.tsx
import { GlassFilter } from './GlassFilter';

export default function App() {
  return (
    <>
      <GlassFilter />
      {/* rest of your app */}
    </>
  );
}
```

---

## Step 3 — The Glass Mixin (CSS)

This is the core CSS that creates the glass surface. Apply it to any element:

```css
.glass {
  /* Translucent glass fill */
  background-color: color-mix(in srgb, var(--c-glass) 12%, transparent);

  /* Blur + displacement filter + color boost */
  backdrop-filter: blur(8px) url(#glass-filter) saturate(var(--saturation));
  -webkit-backdrop-filter: blur(8px) saturate(var(--saturation));

  /*
   * Layered box-shadows simulate:
   * - Top-left light reflection (bright inset)
   * - Bottom-right shadow (dark inset)
   * - Outer drop shadow
   */
  box-shadow:
    /* Outer rim highlight */
    inset 0 0 0 1px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 10%),
        transparent
      ),
    /* Top-left bright reflection */ inset 1.8px 3px 0px -2px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 90%),
        transparent
      ),
    /* Bottom-right soft reflection */ inset -2px -2px 0px -2px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 80%),
        transparent
      ),
    /* Lower specular */ inset -3px -8px 1px -6px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 60%),
        transparent
      ),
    /* Inner shadow top */ inset -0.3px -1px 4px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 12%),
        transparent
      ),
    /* Inner shadow left */ inset -1.5px 2.5px 0px -2px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 20%),
        transparent
      ),
    /* Inner shadow bottom */ inset 0px 3px 4px -2px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 20%),
        transparent
      ),
    /* Inner shadow right */ inset 2px -6.5px 1px -4px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
        transparent
      ),
    /* Outer drop shadow (near) */ 0px 1px 5px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
        transparent
      ),
    /* Outer drop shadow (far) */ 0px 6px 16px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 8%),
        transparent
      );

  transition:
    background-color 400ms cubic-bezier(1, 0, 0.4, 1),
    box-shadow 400ms cubic-bezier(1, 0, 0.4, 1);
}
```

---

## Step 4 — Glass Button Component

```tsx
// GlassButton.tsx
import React from 'react';
import './GlassButton.css';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GlassButton({
  children,
  className = '',
  ...props
}: GlassButtonProps) {
  return (
    <button className={`glass-button ${className}`} {...props}>
      {children}
    </button>
  );
}
```

```css
/* GlassButton.css */
.glass-button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 99em; /* pill shape — adjust to 0.5em for rounded rect */
  cursor: pointer;

  /* Typography */
  font-size: 1rem;
  font-weight: 500;
  color: var(--c-content, #224);

  /* Glass surface */
  background-color: color-mix(in srgb, var(--c-glass) 12%, transparent);
  backdrop-filter: blur(8px) url(#glass-filter) saturate(var(--saturation));
  -webkit-backdrop-filter: blur(8px) saturate(var(--saturation));

  box-shadow:
    inset 0 0 0 1px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 10%),
        transparent
      ),
    inset 1.8px 3px 0px -2px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 90%),
        transparent
      ),
    inset -2px -2px 0px -2px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 80%),
        transparent
      ),
    inset -3px -8px 1px -6px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 60%),
        transparent
      ),
    inset -0.3px -1px 4px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 12%),
        transparent
      ),
    inset -1.5px 2.5px 0px -2px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 20%),
        transparent
      ),
    inset 0px 3px 4px -2px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 20%),
        transparent
      ),
    inset 2px -6.5px 1px -4px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
        transparent
      ),
    0px 1px 5px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
        transparent
      ),
    0px 6px 16px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 8%),
        transparent
      );

  transition:
    background-color 400ms cubic-bezier(1, 0, 0.4, 1),
    box-shadow 400ms cubic-bezier(1, 0, 0.4, 1),
    scale 160ms cubic-bezier(0.5, 0, 0, 1);
}

.glass-button:hover {
  background-color: color-mix(in srgb, var(--c-glass) 22%, transparent);
  scale: 1.04;
}

.glass-button:active {
  scale: 0.97;
}

.glass-button:focus-visible {
  outline: 2px solid var(--c-action, #0052f5);
  outline-offset: 3px;
}
```

---

## Step 5 — Glass Card Component

The card uses a slightly denser glass fill (36% vs 12%) to feel more substantial:

```tsx
// GlassCard.tsx
import React from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}
```

```css
/* GlassCard.css */
.glass-card {
  padding: 24px;
  border-radius: 1.2em;

  background-color: color-mix(in srgb, var(--c-glass) 36%, transparent);
  backdrop-filter: blur(8px) url(#glass-filter) saturate(var(--saturation));
  -webkit-backdrop-filter: blur(8px) saturate(var(--saturation));

  box-shadow:
    inset 0 0 0 1px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 10%),
        transparent
      ),
    inset 2px 1px 0px -1px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 90%),
        transparent
      ),
    inset -1.5px -1px 0px -1px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 80%),
        transparent
      ),
    inset -2px -6px 1px -5px
      color-mix(
        in srgb,
        var(--c-light) calc(var(--glass-reflex-light) * 60%),
        transparent
      ),
    inset -1px 2px 3px -1px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 20%),
        transparent
      ),
    inset 0px -4px 1px -2px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 10%),
        transparent
      ),
    0px 3px 6px 0px
      color-mix(
        in srgb,
        var(--c-dark) calc(var(--glass-reflex-dark) * 8%),
        transparent
      );

  transition:
    background-color 400ms cubic-bezier(1, 0, 0.4, 1),
    box-shadow 400ms cubic-bezier(1, 0, 0.4, 1);
}
```

---

## Step 6 — Tailwind CSS Alternative (if you use Tailwind)

If you prefer not to write vanilla CSS, add this to your `tailwind.config.ts` and use it as a utility class:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      backdropFilter: {
        glass: 'blur(8px) saturate(150%)',
      },
    },
  },
  plugins: [
    ({ addUtilities }: any) => {
      addUtilities({
        '.glass': {
          'background-color':
            'color-mix(in srgb, var(--c-glass, #bbb) 12%, transparent)',
          'backdrop-filter':
            'blur(8px) url(#glass-filter) saturate(var(--saturation, 150%))',
          '-webkit-backdrop-filter':
            'blur(8px) saturate(var(--saturation, 150%))',
          'box-shadow': [
            'inset 0 0 0 1px color-mix(in srgb, var(--c-light, #fff) 10%, transparent)',
            'inset 1.8px 3px 0px -2px color-mix(in srgb, var(--c-light, #fff) 90%, transparent)',
            '0px 6px 16px 0px color-mix(in srgb, var(--c-dark, #000) 8%, transparent)',
          ].join(', '),
        },
        '.glass-dense': {
          'background-color':
            'color-mix(in srgb, var(--c-glass, #bbb) 36%, transparent)',
          'backdrop-filter':
            'blur(8px) url(#glass-filter) saturate(var(--saturation, 150%))',
          '-webkit-backdrop-filter':
            'blur(8px) saturate(var(--saturation, 150%))',
        },
      });
    },
  ],
};

export default config;
```

---

## Tips for Claude When Implementing

When you ask Claude to implement this in your project, include these notes:

- **Always render `<GlassFilter />` once** at the app root, before any glass elements.
- **Glass only works over non-opaque backgrounds** — place glass elements over images, gradients, or colorful content for maximum effect. Over a flat solid color it will appear nearly invisible.
- **The `url(#glass-filter)` in `backdrop-filter`** is the displacement effect. Safari ignores it but the blur + saturation still look good.
- **`color-mix(in srgb, ...)`** requires Chrome 111+, Safari 16.2+, Firefox 113+. Add a fallback `background` with opacity for older browsers.
- **Theme switching**: Set `data-theme="dark"` on `<body>` and the variables in Step 1 handle the rest — no component changes needed.
- The **pill shape** (border-radius: 99em) is what the reference uses for the switcher. Use `border-radius: 0.8em` for card corners.

---

## Quick Usage Example

```tsx
import { GlassFilter } from './components/GlassFilter';
import { GlassButton } from './components/GlassButton';
import { GlassCard } from './components/GlassCard';

export default function App() {
  return (
    <>
      <GlassFilter />
      <main
        style={{
          background: 'linear-gradient(135deg, #e8e8e9, #c8d8f0)',
          minHeight: '100vh',
        }}
      >
        <GlassCard>
          <h2>Hello World</h2>
          <p>This card has a liquid glass surface.</p>
          <GlassButton>Click me</GlassButton>
        </GlassCard>
      </main>
    </>
  );
}
```

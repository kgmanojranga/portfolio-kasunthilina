# Portfolio Image Prompts — Kasun Thilina

## Design System Reference

| Token                | Value                       | Used in                              |
| -------------------- | --------------------------- | ------------------------------------ |
| `--bg-page`          | `#0a0c10`                   | Hero dark base                       |
| `--bg-surface`       | `#0f1117`                   | Hero surface                         |
| `--accent-primary`   | `#1c3557`                   | Hero overlay, nav                    |
| `--accent-secondary` | `#3b82c4`                   | Eyebrow, dots, CTA                   |
| `neutral-0`          | `#ffffff`                   | About, Experience, Education cards   |
| `neutral-50`         | `#f8fafc`                   | Skills, Projects, Contact section bg |
| `neutral-100`        | `#f1f5f9`                   | Tag pills, icon bg                   |
| `neutral-200`        | `#e2e8f0`                   | Card borders, dividers               |
| `--glass-bg`         | `rgba(255,255,255,0.055)`   | Dark glass cards (hero)              |
| `--glass-blur`       | `blur(20px) saturate(160%)` | Apple glass effect                   |

**Apple Glass Effect:** Soft frosted translucency, light milky blur, subtle inner glow, thin luminous border — not dark,
not opaque. Captures the visionOS / macOS Sonoma aesthetic.

**Section alternation:**

- White `#ffffff` — About, Experience, Education
- Soft slate `#f8fafc` — Skills, Projects, Contact

---

## 1. About Section — Client Portrait (Centered, Full Composition)

**Usage:** The client's real photo placed centre-stage in the About section. The image is the hero of the composition — surrounded by the website's glass-effect UI elements (stats cards, detail rows) on either side. Portrait orientation so it anchors the layout vertically.

**Concept:** Place the client image at the exact centre of the About section. Left side holds bio text and personal details; right side holds stats. The portrait sits between them as the visual focal point — tall, upright, confident. The background of the photo should blend naturally with the section's white `#ffffff` to pale slate `#f8fafc` tones so it feels embedded, not pasted.

**Note:** Use the client's real photo directly. Retouch or re-stage using the style guide below. If regenerating with AI, use `--cref [client-photo]` to preserve the face.

**Portrait style prompt (for retouching reference or AI regeneration):**

```
Professional studio portrait of an Asian male in his early thirties, full
portrait orientation — head to mid-torso framing, subject centred. Confident,
calm expression with a slight natural smile, looking directly at camera. Wearing
a well-fitted dark navy blazer (#1c3557) over a crisp white or pale blue
collared shirt. Shot against a very pale blue-grey to white gradient background
(#f1f5f9 to #ffffff), smooth and seamless — no visible backdrop edges or creases.
Soft diffused studio lighting from upper-left, gentle fill light from the right —
no harsh shadows, no warm colour cast, no vignette. Tack-sharp focus on the eyes
and face. 85mm lens equivalent, f/2.0. Tall portrait framing: subject fills
roughly 70% of frame height, generous breathing room above the head and below
the waist. Apple product photography quality: ultra-clean, high-key, cool neutral
tones. The image edges — especially the bottom — fade softly into white (#ffffff)
so the photo merges into the page background without a hard cut-off.
4K resolution, no background objects, no props, no patterns.
```

**Background fade note:** The bottom 20% of the image should fade to white `#ffffff` using a soft gradient in post — this lets the portrait sit on the page without a visible rectangular crop.

**Negative:** warm tones, busy background, harsh shadows, vignette, casual attire, multiple people, visible backdrop seams  
**Specs:** `600×800px` portrait (3:4), PNG with soft bottom fade  
**Midjourney:** `--ar 3:4 --v 6.1 --style raw --q 2 --s 100 --cref [client-photo]`

---

## 3. Skills Section — Light Frosted Texture

**Usage:** Extremely subtle background layer for the Skills section (`#f8fafc` base, white `#ffffff` cards with
`#e2e8f0` borders).

```
Abstract minimal frosted glass surface texture. Near-white base (#f8fafc) with a
very soft, barely perceptible blur diffusion effect — like looking through a single
pane of matte white glass. No patterns, no circuit boards, no icons. The texture
reads as premium frosted acrylic or Apple visionOS panel material. Perfectly flat,
even lighting, no gradients, no shadows. So subtle it functions only as a surface
quality — not a graphic. Seamlessly tileable.
```

**Negative:** visible patterns, grid lines, dark tones, gradients, any recognisable shapes  
**Specs:** `2000×2000px`, PNG  
**Tool:** Adobe Firefly or Stable Diffusion (better for textures than Midjourney)

---

## 4. Projects Section — Minimal Desk Scene

**Usage:** Decorative scene in the Projects section. Section bg is `#f8fafc`, detail card is white `#ffffff` with
`#e2e8f0` border.

```
Overhead flat-lay photograph on a clean white surface with an extremely subtle
cool-grey (#f8fafc) shadow wash giving the scene a frosted glass quality. Three
objects only: a slim closed silver MacBook, a thin matte-black hardcover notebook,
and a single matte-black pen laid diagonally. Arranged asymmetrically with generous
white space — objects occupy no more than 40% of the frame. Pure white to off-white
background, perfectly diffused soft-box studio lighting, shadows are barely present —
soft and cool-toned. Tones: white, silver, black, pale blue-grey. Shot directly from
above, perfectly perpendicular. Apple product photography quality, ultra-sharp
throughout, 4K. No text visible, no visible logos, no people, no other objects.
```

**Negative:** warm tones, heavy shadows, props, multiple items, visible logos, people  
**Specs:** `1600×1066px` (3:2), JPG  
**Midjourney:** `--ar 3:2 --v 6.1 --style raw --q 2 --s 60`

---

## 5. Experience Section — Clean Workspace Scene

**Usage:** Accent image for the Experience / Career timeline section. White `#ffffff` background with `#e2e8f0` borders
and `#0f172a` timeline dots.

```
Minimalistic interior photograph of a pristine empty desk in a bright, airy modern
office. A single slim laptop sits open on a white or light ash wood desk surface,
screen emitting a very soft, cool blue-white glow. No other objects on the desk.
Floor-to-ceiling windows behind the desk, soft diffused morning light flooding in
from outside — pale, cool, luminous. The overall image has a frosted, high-key
quality: whites feel slightly luminous, shadows are very soft and cool-toned,
giving an Apple visionOS spatial computing aesthetic. Shot straight-on at desk height.
f/5.6, everything in focus. 4K, architectural interior editorial quality.
Tones: white (#ffffff), pale slate (#f1f5f9), soft blue-white light.
No people, no decor, no text.
```

**Negative:** dark shadows, warm tones, clutter, people, bold colours, busy backgrounds  
**Specs:** `1600×900px` (16:9), JPG  
**Midjourney:** `--ar 16:9 --v 6.1 --style raw --q 2 --s 80`

---

## 6. Education Section — Minimal Book Flat-Lay

**Usage:** Decorative image for the Education section. White `#ffffff` bg, `#e2e8f0` bordered cards.

```
Minimalistic overhead flat-lay on a pure white surface. Two objects only: one slim
closed hardcover book with a plain deep navy cover (#1e293b), and a single silver
or white pen placed gently beside it at a slight angle. Enormous negative space —
the two objects occupy roughly 30% of the frame, centred with breathing room on all
sides. Background is pure white (#ffffff), lighting is perfectly flat and even —
soft-box diffused, no cast shadows at all, giving the surface a crisp frosted-paper
quality. Tones: white, deep navy (#1e293b), silver. Ultra-sharp throughout,
commercial editorial product photography quality, 4K. No text visible on book cover,
no logos, no other objects, no people.
```

**Negative:** warm tones, cast shadows, multiple objects, text on book, logos, people  
**Specs:** `1400×933px` (3:2), JPG  
**Midjourney:** `--ar 3:2 --v 6.1 --style raw --q 2 --s 40`

---

## 7. Contact Section — Abstract Connection Graphic

**Usage:** Decorative graphic for the Contact section. Section bg is `#f8fafc`, cards are white `#ffffff` with `#e2e8f0`
borders.

```
Abstract minimal graphic on a near-white background (#f8fafc). A small, sparse
cluster of five perfect circles connected by ultra-thin hairline straight lines
in cool blue-grey (#94a3b8 at 40% opacity). One circle — slightly larger — is
filled with steel blue (#3b82c4) and emits a very faint, soft frosted glow
suggesting the Apple glass light-diffusion effect. The remaining circles are
outlined only, in pale grey (#e2e8f0). The entire cluster occupies roughly 20%
of the frame centred with enormous white space on all sides. Flat vector-clean
rendering, no texture, no drop shadows, no gradients other than the single
node's subtle glow. Background blends seamlessly into #f8fafc.
```

**Negative:** dark bg, multiple colours, text, labels, heavy borders, 3D effects  
**Specs:** `1400×800px`, PNG  
**Tool:** Ideogram 2.0 or Adobe Illustrator (vector-clean output preferred over Midjourney)

---

## 8. Open Graph / Social Preview Background

**Usage:** `og:image` background — visible when the URL is shared on LinkedIn, Twitter/X, WhatsApp. Client portrait and
name/title will be layered on top externally.

**Light version (for light sections):**

```
Clean minimal banner background. Pure white (#ffffff) at top corners fading to
very pale blue-slate (#f1f5f9) at the centre-bottom. Smooth, perfectly seamless
gradient — no banding, no texture, no visible patterns. A single hairline-thin
horizontal line in pale grey (#e2e8f0) sits at the lower quarter of the frame.
Nothing else. Designed as a blank canvas for portrait and typography overlay.
Apple visionOS ambient background quality — luminous, frosted, premium.
```

**Slightly dark version (matching hero's `#1c3557` accent):**

```
Minimal dark-to-mid banner background. Deep navy (#1c3557) at the left third
fading smoothly to near-black (#0f1117) on the right. Very subtle noise texture
at 3% opacity over the gradient. A single faint accent: a barely-visible thin
diagonal line or radial glow in steel blue (#3b82c4) at 8% opacity near the
left edge suggesting depth. No other elements. Canvas for portrait overlay.
```

**Negative:** busy patterns, text, logos, heavy gradients, warm tones  
**Specs:** `1200×630px` (OG standard), JPG  
**Midjourney:** `--ar 1200:630 --v 6.1 --style raw --q 2 --s 30`

---

## General Notes

### Negative Prompts (all images)

```
dark dramatic background, moody shadows, warm yellow tones, neon, glow effects,
clutter, busy composition, cartoon, illustration style, anime, watermark,
text overlay, logo, low quality, blurry, noise, heavy vignette, oversaturated,
multiple people, stock photo feel, unrealistic proportions
```

### Quality Keywords (append to any prompt)

```
ultra-high resolution, 4K, photorealistic, tack-sharp focus, professional
photography, commercial editorial quality, Apple product photography aesthetic,
clean, minimal, cool neutral tones, no compression artifacts
```

### Midjourney Quick Reference

| Use case          | Flags                                         |
| ----------------- | --------------------------------------------- |
| Portrait (square) | `--ar 1:1 --v 6.1 --style raw --q 2 --s 100`  |
| Portrait (tall)   | `--ar 9:11 --v 6.1 --style raw --q 2 --s 100` |
| Landscape scene   | `--ar 16:9 --v 6.1 --style raw --q 2 --s 80`  |
| Flat-lay          | `--ar 3:2 --v 6.1 --style raw --q 2 --s 50`   |
| Client face ref   | append `--cref [your-photo-url]`              |

### Apple Glass Effect — What to Look For

The images should feel like they belong in macOS Sonoma or visionOS:

- Backgrounds look **slightly luminous**, not flat white
- Surfaces suggest **frosted acrylic** — slightly translucent, cool-toned
- Shadows are **barely-there**, cool-grey, never warm or harsh
- Colours stay in the `#f8fafc → #ffffff → #e2e8f0` range for light surfaces
- The one dark anchor is `#1c3557` (hero accent blue) — used sparingly

---

_Color reference: `src/index.css` — `:root` variables + Tailwind `@theme` neutral scale_  
_Section bg mapping: About/Experience/Education = `#ffffff` · Skills/Projects/Contact = `#f8fafc`_

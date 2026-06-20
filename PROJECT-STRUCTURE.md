# Kasun Portfolio — Project Structure

Single-page portfolio for a Technical Lead at Cambio Engineering Sri Lanka.
Built with React + TypeScript + Vite + Tailwind CSS.

---

## Page Sections (scroll order)

| #   | Section    | Description                                                                         |
| --- | ---------- | ----------------------------------------------------------------------------------- |
| 1   | Hero       | Name, title, tagline, CTA buttons (Resume + Contact)                                |
| 2   | About      | Bio, photo, quick stats (years exp, projects, team size)                            |
| 3   | Skills     | Tech stack grouped by category (Languages, Frameworks, Tools, Cloud, Methodologies) |
| 4   | Experience | Timeline of roles with company, period, key responsibilities                        |
| 5   | Projects   | Featured project cards with tech tags, role, and links                              |
| 6   | Education  | Degrees and certifications                                                          |
| 7   | Contact    | Email, LinkedIn, GitHub, optional contact form                                      |

---

## Directory Structure

```
kasun-portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
│       └── profile.jpg              # Profile photo
├── src/
│   ├── assets/
│   │   ├── fonts/                   # Custom font files (.woff2, .woff)
│   │   └── images/                  # Optimized images (WebP preferred)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx            # Tech tag / label chip
│   │   │   ├── Button.tsx           # Reusable button (primary, outline, ghost)
│   │   │   ├── Container.tsx        # Max-width wrapper
│   │   │   ├── SectionHeading.tsx   # Section title + subtitle
│   │   │   └── ThemeToggle.tsx      # Dark / light mode switch
│   │   ├── layout/
│   │   │   ├── Layout.tsx           # Root layout wrapper
│   │   │   ├── Navbar.tsx           # Sticky top nav with anchor links
│   │   │   └── Footer.tsx           # Footer with social links
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── SkillsSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       ├── EducationSection.tsx
│   │       └── ContactSection.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx          # Dark / light theme state
│   ├── data/
│   │   └── portfolio.ts             # All content data (single source of truth)
│   ├── hooks/
│   │   └── useScrollSpy.ts          # Highlight active nav link on scroll
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces for all data shapes
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.js               # Custom colors, fonts, animations
├── postcss.config.js
├── eslint.config.js
├── .prettierrc.json
└── .gitignore
```

---

## Data Model (`src/types/index.ts`)

```typescript
export interface PortfolioData {
  about: AboutData;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  contact: ContactInfo;
}

export interface AboutData {
  name: string;
  title: string; // e.g. "Technical Lead"
  company: string; // e.g. "Cambio Engineering"
  location: string; // e.g. "Sri Lanka"
  tagline: string;
  bio: string;
  image: string;
  resumeUrl: string;
  stats: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  category: string; // e.g. "Languages", "Frameworks", "Cloud"
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string; // e.g. "Jan 2022 – Present"
  location: string;
  description: string;
  technologies: string[];
  highlights: string[]; // 2–4 key bullet points
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  period: string;
  technologies: string[];
  highlights: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  achievements?: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
}
```

---

## Navigation (anchor-based, no routing)

Since this is a single page, navigation uses anchor links — no React Router needed.

```
#hero  →  #about  →  #skills  →  #experience  →  #projects  →  #education  →  #contact
```

Each section gets an `id` matching its anchor. The `useScrollSpy` hook tracks the active section to highlight the correct nav link.

---

## Theme

- Default: dark mode (common for tech portfolios)
- Toggle persisted in `localStorage`
- Implemented via `ThemeContext` + `class` strategy on `<html>`

---

## Key Files to Edit for Client Content

| File                        | What to fill in                                    |
| --------------------------- | -------------------------------------------------- |
| `src/data/portfolio.ts`     | All personal content (bio, skills, projects, etc.) |
| `public/images/profile.jpg` | Client's profile photo                             |
| `tailwind.config.js`        | Brand color palette                                |
| `src/index.css`             | Custom fonts                                       |
| `index.html`                | Page title, meta description, OG tags              |

# DESIGN.md — Healthy Together Style System

> Visual design system extracted from [healthytogether.co](https://www.healthytogether.co/).  
> Use this document to recreate a similar premium dark SaaS / gov-tech landing page aesthetic for your own product.

---

## 1. Brand Personality

- **Tone**: Serious, trustworthy, modern government-tech / civic-tech. Calm authority mixed with forward-looking AI energy.
- **Feel**: Dark, spacious, cinematic. High-end enterprise SaaS that still feels human and approachable.
- **Keywords**: Precision, speed, modularity, human-centered, trustworthy, scalable.

---

## 2. Color Palette

### Core Backgrounds
| Token              | Hex       | RGB              | Usage                                      |
|--------------------|-----------|------------------|--------------------------------------------|
| `--bg-primary`     | `#101722` | 16, 23, 34       | Main page background (deep navy-black)     |
| `--bg-surface`     | `#161E2E` | ~22, 30, 46      | Cards, panels, elevated surfaces           |
| `--bg-surface-2`   | `#1C2638` | ~28, 38, 56      | Nested cards / hover states                |
| `--bg-nav`         | `#0D131C` | ~13, 19, 28      | Sticky header (slightly darker)            |

### Text
| Token              | Hex       | Usage                                      |
|--------------------|-----------|--------------------------------------------|
| `--text-primary`   | `#F9F0FF` | Headlines (slight lavender-white)          |
| `--text-secondary` | `#A0AEC0` | Body copy, descriptions (muted blue-gray)  |
| `--text-muted`     | `#6B7A90` | Captions, footnotes, tertiary text         |
| `--text-inverse`   | `#FFFFFF` | Buttons on colored backgrounds             |

### Accent / Semantic Colors
| Token              | Hex       | Usage                                      |
|--------------------|-----------|--------------------------------------------|
| `--accent-primary` | `#6366F1` | Primary CTA button (indigo / violet-blue)  |
| `--accent-pink`    | `#FF5779` | Section label "The Problem"                |
| `--accent-green`   | `#57FF9D` | Section label "Solutions"                  |
| `--accent-cyan`    | `#7CE2FE` | Section label "Social Proof"               |
| `--accent-purple`  | `#A78BFA` | Highlights, logos, secondary accents       |

### Gradients & Atmospherics
- Soft radial gradient blobs behind key sections (teal → purple → dark).
- Example: `radial-gradient(ellipse at center, rgba(45, 90, 110, 0.35) 0%, transparent 70%)`
- Very subtle noise or vignette is optional; keep it clean.

### Borders & Dividers
- Card borders: `1px solid rgba(255,255,255,0.06–0.10)`
- Focus rings: soft indigo glow

---

## 3. Typography

### Font Stack
- **Primary**: Inter (or system-ui / ui-sans-serif as fallback)
- Weights used: 400 (body), 500 (labels), 600–700 (headings)

### Scale (Desktop)
| Element            | Size          | Weight | Line Height | Letter Spacing |
|--------------------|---------------|--------|-------------|----------------|
| Hero H1            | 56–72px       | 700    | 1.05–1.1    | -0.02em        |
| Section H2         | 40–52px       | 700    | 1.15        | -0.015em       |
| Subsection H3      | 24–28px       | 600    | 1.3         | -0.01em        |
| Body               | 16–18px       | 400    | 1.6         | 0              |
| Small / Caption    | 14px          | 400    | 1.5         | 0              |
| Section Label      | 13–14px       | 500    | 1.4         | 0.04em         |
| Nav links          | 14–15px       | 500    | 1            | 0              |

### Rules
- Headlines are large, confident, and tightly tracked.
- Body text is light gray on dark — never pure white for long paragraphs.
- Section labels sit above H2s in a bright accent color (pink / green / cyan).

---

## 4. Layout & Spacing

### Overall Structure
- Full-width dark canvas.
- Content max-width ≈ 1200–1280px, centered.
- Extremely generous vertical rhythm (sections often 120–180px padding top/bottom).
- Hero is almost full-viewport height with centered text.

### Grid
- Mostly single-column centered text for narrative sections.
- Product showcase: floating dashboard cards in a loose collage / overlapping layout.
- Social proof: horizontal card carousel or 4–5 column grid of testimonial cards.
- Program pills: horizontal scrolling or wrapping pill row.

### Spacing Tokens
```
--space-xs:  4px
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  40px
--space-2xl: 64px
--space-3xl: 96px
--space-4xl: 128px+
```

---

## 5. Components

### 5.1 Navigation
- Sticky top bar, transparent → slightly darker on scroll.
- Logo left (circular gradient mark + wordmark).
- Centered or right-aligned nav links (AI Offerings, Solutions by Program, Company, Resources).
- Primary CTA on far right: rounded pill button "Need Help?" in indigo (`#6366F1`).
- Height ≈ 64–72px.
- Links: muted white, hover → full white.

### 5.2 Primary Button
```css
background: #6366F1;
color: white;
border-radius: 9999px; /* full pill */
padding: 12px 24px;
font-weight: 500;
font-size: 14–15px;
box-shadow: 0 0 0 0 transparent;
transition: background 0.2s, transform 0.15s;
```
Hover: slightly brighter indigo + subtle lift.

### 5.3 Secondary / Ghost Button
- Transparent background, thin white border (`rgba(255,255,255,0.15)`), pill shape.

### 5.4 Cards (UI Mockups & Testimonials)
- Background: `#161E2E` or slightly lighter.
- Border-radius: 16–20px.
- Border: `1px solid rgba(255,255,255,0.08)`.
- Soft inner glow or very light gradient overlay optional.
- Shadow: minimal or none (the dark theme relies on elevation via background difference).

### 5.5 Program / Tag Pills
- Rounded full pills.
- Dark surface + colored icon + white text.
- Examples: SNAP (green), Communications (orange), WIC (purple), TANF (pink).
- Border: subtle, padding 8px 16px.

### 5.6 Section Labels
- Small uppercase or sentence-case text above the big headline.
- Bright accent color matching the section theme.
- Example: "The Problem" → `#FF5779`, "Solutions" → `#57FF9D`.

### 5.7 Chat Widget (bottom-right)
- Floating blue circle with chat icon.
- Optional bubble: "Hi. Need any help?" with close button.
- Keep it subtle and non-intrusive.

---

## 6. Page Sections (Landing Page Flow)

1. **Hero**
   - Full-bleed dark background.
   - Large centered H1: "AI & digital transformation for immediate government impact."
   - No heavy subcopy under the hero headline on the very first screen (or very light).
   - Optional subtle gradient orb behind text.

2. **Problem Statement**
   - Soft multi-color radial gradient background (teal/purple).
   - Pink label "The Problem".
   - Big white headline + supporting paragraph in muted gray.

3. **Solutions Intro**
   - Green label "Solutions".
   - Headline about speed, agility, human-centered delivery.
   - Short descriptive paragraph.

4. **AI / Product Highlight**
   - Large headline: "The first composable AI system…"
   - Supporting copy about automation and government agencies.

5. **Modular Systems / Program Pills**
   - Headline about modular, configurable, interoperable systems.
   - Horizontal row of program pills (SNAP, WIC, TANF, etc.) with icons.

6. **Product UI Showcase**
   - Floating / overlapping dark dashboard cards showing real product UI (charts, lists, sidebars, progress bars).
   - Cards have realistic data, progress bars in teal/cyan, status badges.
   - Creates a "product in action" collage feel.

7. **Social Proof**
   - Cyan label "Social Proof".
   - Big headline: "People love us, and it shows".
   - Grid or carousel of testimonial cards (App Store / Play Store logos, quotes, star ratings, large stat cards like "50% of households…").

8. **Footer** (standard SaaS)
   - Multi-column links, logo, legal, social.

---

## 7. Visual Effects & Motion

- **Gradients**: Soft, large, low-opacity radial blobs behind problem/solution sections.
- **Cards**: Slight parallax or staggered fade-in on scroll is nice but not required.
- **Hover**: Buttons lift 1–2px + brightness increase. Cards can subtly brighten border.
- **No heavy glassmorphism** — keep surfaces solid dark with soft borders.
- **Lottie / video**: The real site uses subtle transparent video and Lottie; for most implementations, static high-quality product screenshots + soft gradients are sufficient.

---

## 8. Iconography & Imagery

- Logo: Circular multi-color gradient (pink heart / blue-purple swirl) + clean white wordmark.
- Product screenshots: Dark-themed UI with blue/teal accent charts and progress bars.
- Icons inside pills: Simple, colored, filled icons (not outline).
- Avoid bright white illustrations; keep everything in the dark palette family.

---

## 9. Accessibility & Practical Notes

- Contrast: Headlines on dark are excellent. Body text uses mid-gray — ensure ≥ 4.5:1.
- Focus states: Visible indigo ring.
- Mobile: Stack everything, reduce hero font size to ~36–40px, keep generous padding, make pills wrap or horizontally scroll.
- Chat widget should be dismissible.

---

## 10. Implementation Guidance for AI Tools

When generating code:

- Use Tailwind CSS with a custom dark theme or plain CSS variables matching the tokens above.
- Prefer `Inter` font (Google Fonts or local).
- Make the primary CTA a full pill (`rounded-full`).
- Section labels must use the bright accent colors.
- Keep vertical spacing very generous.
- Product showcase should feel like floating dark glass cards, not a flat grid.
- Never use pure black (`#000`) — always the deep navy `#101722`.
- Avoid light-mode styles; this is a dark-first design system.

### Tailwind Starter Snippet (example)
```js
// tailwind.config.js theme extension
colors: {
  background: '#101722',
  surface: '#161E2E',
  primary: '#6366F1',
  'accent-pink': '#FF5779',
  'accent-green': '#57FF9D',
  'accent-cyan': '#7CE2FE',
  'text-primary': '#F9F0FF',
  'text-secondary': '#A0AEC0',
}
```

---

## 11. Do’s and Don’ts

**Do**
- Large, confident headlines
- Bright tiny section labels
- Soft atmospheric gradients
- Realistic dark product UI mockups
- Pill-shaped primary buttons
- Generous whitespace

**Don’t**
- Light backgrounds or pure white cards
- Heavy drop shadows
- Neon everything
- Cluttered multi-column text walls
- Generic blue SaaS gradients that look 2019

---

*This design system is inspired by Healthy Together’s public website. It is not affiliated with or endorsed by Healthy Together. All trademarks belong to their respective owners. Use for inspiration and original work only.*

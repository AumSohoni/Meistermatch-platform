# GEMINI.md — MeisterMatch Platform Engineering & Design Standards

## 1. Project Overview & Identity
- **Product**: MeisterMatch Platform
- **Scope**: Two-sided marketplace connecting homeowners and businesses with vetted skilled tradespeople in Latvia (and broader European markets).
- **Architecture**: Next.js 14+ (App Router), TypeScript (strict mode), Tailwind CSS v4, Lucide React, Framer Motion, Supabase (PostgreSQL + Auth + Storage).

---

## 2. Core Philosophy: Anti-"Vibe-Coded" Aesthetic & Functional Clarity

### ❌ STRICTLY FORBIDDEN (No "Vibe-Coded" or AI-Dribbble Tropes)
- **NO Glows or Neon Halos**: Absolutely no `box-shadow: 0 0 25px rgba(...)`, neon colored drop-shadows, or blooming highlights.
- **NO Glowing Text / Text Shadows**: Do NOT use `text-shadow`, glowing gradients on typography, or gradient text strokes.
- **NO Gratuitous Glassmorphism**: Avoid excessive frosted glass overlays (`backdrop-blur-md` with translucent saturated backgrounds) where plain solid panels are clearer and performant.
- **NO Cyberpunk / Futuristic Elements**: This is a professional trade & craft service platform (plumbers, electricians, carpenters, masons), not a crypto dashboard or sci-fi UI.
- **NO Flashy Gimmicks / Pointless Floating Spheres**: Do not inject ambient gradient blobs, floating background bubbles, or meaningless 3D animations that distract from trade listings and hiring workflows.

### ✅ DESIGN MANDATES (Utilitarian, Trustworthy, Robust Craftsmanship)
- **Visual Tone**: Pragmatic, dependable, clean, high-contrast, robust. Think Dieter Rams, Linear, Stripe, or high-end industrial tool interfaces (Festool, Bosch Professional).
- **Palette**:
  - Crisp high-contrast whites and dark neutrals (`#111111`, `#1c1c1c`, `#262626`).
  - Muted borders (`#e5e7eb`, `#d1d5db`, or crisp 1px borders with explicit contrast).
  - Purposeful functional accents (e.g., deep construction safety amber/orange or structured royal navy) used solely for primary actions, badges, and status indicators.
- **Typography**: Clean Latin grotesque or geometric sans (e.g., `Inter`), legible hierarchy, structured tabular numbers for prices, rates, and timestamps (`tabular-nums`).
- **Surface Elevation**: Flat or subtle, crisp 1px borders (`border border-neutral-200`) and restrained, physically believable shadows (`shadow-sm` or `shadow-md` with low opacity black, e.g., `rgba(0, 0, 0, 0.05)`).
- **Motion**: Purposeful, snappy micro-interactions (150ms–200ms easing), drawer/modal slides, and subtle button active feedback. No delayed or bouncy elastic physics.

---

## 3. Frontend Architecture & Next.js Standards

### Next.js App Router Conventions
- **Server Components by Default**: Place components in `src/app/` as React Server Components (RSC). Only mark components with `'use client'` when they require browser APIs, event listeners, local React hooks (`useState`, `useEffect`), or Framer Motion.
- **Data Fetching**: Fetch data in Server Components where possible; avoid fetching in client-side `useEffect` waterfalls.
- **File Organization**:
  ```
  src/
  ├── app/                  # App router routes & pages
  │   ├── (auth)/           # Route groups for auth (login, register)
  │   ├── (dashboard)/      # User / Tradesperson dashboard routes
  │   ├── chat/             # Chat & messaging system
  │   ├── components/       # Shared page-level UI blocks
  │   ├── lib/              # Client utilities, store, state helpers
  │   └── globals.css       # Tailwind & root theme variables
  ├── components/           # Atomic, reusable UI design system primitives
  │   ├── ui/               # Button, Input, Modal, Badge, Card, Avatar
  │   └── feedback/         # Toast, Alert, Skeleton
  ├── lib/                  # Shared business logic, Supabase client, formatting
  └── types/                # TypeScript interface and type definitions
  ```

### TypeScript & Strictness
- **Strict Typing**: No `any`. Explicitly type all component props, API responses, and database entities.
- **Shared Domain Models**: Place Supabase database typings and shared business entities under `src/types/` (e.g., `tradesperson.ts`, `job.ts`, `review.ts`).
- **Props Interfaces**: Export component prop interfaces (`export interface ButtonProps ...`) for maintainability and testing.

---

## 4. UI Component & Styling Standards

### Tailwind CSS Guidelines
- **Use Semantic Utilities**: Rely on theme variables (`--color-background`, `--color-foreground`, `--color-border`) and standardized spacing scales.
- **Utility Order**: Group utilities logically: layout (`flex`, `grid`, `relative`) → sizing (`w-full`, `max-w-md`) → spacing (`p-4`, `m-2`) → typography (`text-sm`, `font-semibold`) → colors & backgrounds → borders → interaction states (`hover:`, `focus-visible:`).
- **No Inlined Styles**: Avoid `style={{ ... }}` except for dynamic values that cannot be precomputed (e.g., dynamic coordinates or progress percentages).
- **Accessible Focus States**: Every interactive element (`<button>`, `<a>`, `<input>`) must have explicit keyboard focus indicators:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2`.

### Icons & Imagery
- **Icons**: Use `lucide-react` with consistent stroke widths (`strokeWidth={2}` or `1.75`) and standard icon sizes (`w-4 h-4` for compact, `w-5 h-5` for standard buttons, `w-6 h-6` for headers).
- **Images**: Always use `next/image` with explicit `width`/`height` or `fill` with appropriate `sizes` attribute. Avoid layout shifts.

---

## 5. State Management & Data Patterns

- **URL State First**: Use search parameters (`useSearchParams`, `useRouter`, `usePathname`) for filtering, pagination, modal query strings, and active tabs so URLs are shareable and bookmarkable.
- **Local State**: Use `useState` / `useReducer` for contained UI state.
- **Cross-Component Sync**: For client-side stores (like ongoing messaging or active search filter drafts), use structured stores (e.g., lightweight Zustand or typed React Context) with immutable state updates.

---

## 6. Performance, Accessibility (a11y) & SEO

- **Accessibility**:
  - Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`).
  - Inputs must have matching `<label>` elements or `aria-label`.
  - Contrast ratios must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
- **Performance**:
  - Keep bundle size small. Import icons and libraries modularly.
  - Optimize fonts using `next/font`.
  - Avoid layout thrashing by specifying fixed heights or skeletons for asynchronous content.
- **SEO & Metadata**:
  - Provide descriptive, localized `metadata` titles and descriptions for every public route.

---

## 7. Development Workflow & Code Quality Checklist

Before submitting or committing any change, ensure:
1. `npm run lint` passes with 0 errors and 0 warnings.
2. The UI looks clean, grounded, and functional—zero neon glows, zero hazy gradient blobs, zero text shadows.
3. Interactive states (hover, active, disabled, loading) are completely specified.
4. Mobile viewport and responsive breakpoints (`sm:`, `md:`, `lg:`) work fluidly without horizontal scroll leaks.

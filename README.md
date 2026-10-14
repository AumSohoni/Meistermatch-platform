# Meistermatch Platform

> A research project and prototype platform for matching job seekers with employers using AI‑driven recommendation algorithms.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Setup & Development](#setup--development)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Thesis Documentation](#thesis-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview
The **Meistermatch Platform** is a thesis‑level research project that explores data‑driven matchmaking between candidates and job listings. The repository contains both the **Next.js** web prototype (`meistermatch-web`) and the accompanying academic material (`thesis_work`).

## Features
- **Dynamic job‑matching UI** – swipe‑based interface for candidates to express interest.
- **Employer dashboard** – create and manage job postings.
- **AI recommendation engine** – prototype algorithms for ranking matches.
- **Responsive design** – built with modern CSS and optimized for mobile devices.
- **Comprehensive thesis** – literature review, methodology, results, and appendices.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, React, Tailwind (optional), Vercel for deployment.
- **Backend**: Supabase (PostgreSQL) for data storage, server‑less functions for matchmaking logic.
- **Styling**: CSS modules, modern CSS variables, dark‑mode support.
- **Testing**: Jest & React Testing Library for UI components.
- **Version Control**: Git + GitHub.

## Repository Structure
```
Meistermatch-platform/
├─ meistermatch-web/            # Next.js application (frontend & API routes)
│   ├─ src/                    # Source code (pages, components, styles)
│   ├─ public/                 # Static assets (icons, images)
│   ├─ package.json            # Project dependencies
│   └─ ...
├─ thesis_work/                 # Academic documents, PDFs, LaTeX sources
│   ├─ Bachelor_Thesis/        # Full thesis manuscript and appendices
│   └─ Research_papers/        # Supporting literature
├─ .gitignore
└─ README.md                   # This file
```

## Setup & Development
1. **Prerequisites**
   - Node.js ≥ 18 (LTS)
   - npm ≥ 9 (or Yarn / pnpm)
   - GitHub CLI (`gh`) for repository interaction (optional)
2. **Clone the repository**
   ```bash
   git clone https://github.com/AumSohoni/Meistermatch-platform.git
   cd Meistermatch-platform
   ```
3. **Install dependencies**
   ```bash
   cd meistermatch-web
   npm install
   ```
4. **Configure environment variables**
   Create a `.env.local` in `meistermatch-web/` containing:
   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
   (Replace the placeholders with your Supabase project credentials.)
5. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Running the Application
- **Development** – `npm run dev` (hot‑reloading)
- **Lint & format** – `npm run lint` and `npm run format`
- **Storybook (optional)** – `npm run storybook`

## Building for Production
```bash
npm run build   # Generates an optimized static site in .next
npm start       # Starts the production server
```
Deploy to Vercel or any Node.js hosting platform.

## Testing
```bash
npm test        # Runs unit and integration tests
npm run test:watch  # Watch mode during development
```
Coverage reports are generated under `coverage/`.

## Thesis Documentation
All thesis‑related files are located in `thesis_work/`. Key documents include:
- `Bachelor_Thesis/Thesis_Complete_Document.docx` – full manuscript.
- `Bachelor_Thesis/RTU_Semester_Report.pdf` – PDF version for submission.
- `Research_papers/` – PDFs of cited literature.

Feel free to explore the LaTeX source (if present) for reproducibility of figures and tables.

## Contributing
Contributions are welcome. Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with clear messages.
4. Open a Pull Request targeting `master`.
5. Ensure all CI checks pass (lint, tests, build).

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

## Acknowledgments
Special thanks to my supervisors, the research committee, and the open‑source community for tools such as Next.js, Supabase, and Jest that made this work possible.

---
*Prepared for academic evaluation and open‑source sharing.*

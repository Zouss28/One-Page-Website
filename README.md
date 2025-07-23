# Inventory Workflow Setup MVP

A modern, multi-step inventory workflow setup form built with Next.js, React, and a rich set of UI components. This MVP allows users to submit their information, select an inventory program, and upload relevant documents, providing a smooth onboarding experience for inventory management solutions.

---

## Features

- **Multi-step Form:** Collects user info, program selection, and document upload in a guided, step-by-step process.
- **Form Validation:** Real-time validation for required fields, email format, and file type/size.
- **File Upload:** Supports PDF, PNG, JPG uploads up to 5MB with instant feedback.
- **Responsive UI:** Built with a custom component library and Tailwind CSS for a polished, mobile-friendly experience.
- **Component-driven Architecture:** Reusable, accessible UI components for rapid development.
- **Theming Support:** Easily switchable themes using `next-themes` and custom theme provider.
- **No backend/API routes:** All logic is client-side; no serverless/API endpoints are present in this MVP.

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript
- **UI:** Custom component library (Radix UI, shadcn/ui, Lucide icons)
- **Styling:** Tailwind CSS, PostCSS, CSS Modules
- **Form Handling:** React Hook Form, Zod (for validation)
- **State Management:** React useState/useContext
- **Theming:** next-themes, Geist font
- **Build Tools:** pnpm, PostCSS, Tailwind CLI
- **Linting:** ESLint (Next.js default)
- **Other Libraries:** date-fns, clsx, embla-carousel-react, recharts, sonner, vaul

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd inventory-form-mvp
```

### 2. Install dependencies

This project uses **pnpm** (recommended). You can also use npm or yarn.

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Build for production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

---

## Environment Variables

- **No required environment variables detected.**
- The codebase does not reference `process.env` or require a `.env` file for operation.
- You may add environment variables as needed for future backend/API integration.

**Example `.env` file:**
```env
# No variables required for this MVP
```

---

## Usage

- **Development:** Run `pnpm dev` and open [http://localhost:3000](http://localhost:3000).
- **Testing:** No test scripts or test framework are set up in this MVP.
- **Production:** Run `pnpm build` then `pnpm start` to serve the production build.

---

## Docker

- **No Dockerfile found.**
- To add Docker support, create a `Dockerfile` based on the Next.js official image.

---

## Database & Migrations

- **No database or migration tools detected.**
- This MVP is frontend-only and does not persist data.

---

## Folder Structure Overview

```
inventory-form-mvp/
├── app/                # Next.js app directory (entry, layout, global styles)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/         # Reusable React components
│   ├── theme-provider.tsx
│   └── ui/             # UI primitives (buttons, forms, dialogs, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets (images, logos)
├── styles/             # Global CSS (Tailwind)
├── package.json        # Project metadata and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── next.config.mjs     # Next.js configuration
└── postcss.config.mjs  # PostCSS configuration
```

---

## API Routes

- **No API routes present.**
- All logic is client-side. For backend/API, add files to `app/api/` as needed.

---

## Contributing

- **Linting:** Run `pnpm lint` (or `npm run lint`) to check code style.
- **Formatting:** No Prettier or formatting scripts detected, but you may add them.
- **Husky:** Not configured. Add Husky for git hooks if desired.
- **Pull Requests:** Please open issues or PRs for discussion before major changes.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) if present, or use the following:

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[...]
```

---

**Generated automatically by codebase analysis.**  
For questions or support, please contact the project maintainer.
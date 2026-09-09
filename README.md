# AiVinix Frontend Assignment - Submission

Welcome to the **AiVinix Frontend Assignment** submission repository. This project contains two main parts completed in full alignment with the assignment guidelines:

1. **Part 1: Figma to Responsive HTML/CSS** – A responsive landing page for **TIRAN Steak House** translated from the Figma design.
2. **Part 2: Product Admin Application** – A production-grade React + TypeScript CRUD application integrated with the hosted Product Admin API, featuring TanStack Query, Zustand, and Tailwind CSS v4.

---

## Live Demo

You can preview the live deployments directly at:

- **Part 1 (Landing Page - TIRAN Steak House):** [https://tiran.dpx1999.uk](https://tiran.dpx1999.uk)
- **Part 2 (Product Admin Application):** [https://admin.dpx1999.uk](https://admin.dpx1999.uk)

---

## Project Structure

```text
aivinix-frontend-assignment/
├── README.md                     # Root project documentation & submission guide
├── part-1-landing/               # Part 1: Figma to HTML/CSS Landing Page
│   ├── assets/                   # Optimized images & icons (SVG, WebP)
│   ├── css/                      # CSS stylesheets
│   │   ├── index.css             # Base styles, typography, layout & components (BEM)
│   │   └── responsive.css        # Responsive media queries (390px, 768px, 1440px)
│   ├── js/                       # Client-side scripts
│   │   └── main.js               # Mobile drawer, navigation & smooth scroll interactions
│   ├── index.html                # Semantic HTML5 document
│   ├── package.json              # Part 1 run scripts
│   └── server.js                 # Lightweight zero-dependency HTTP static server
└── part-2-admin/                 # Part 2: Product Admin Web Application
    ├── public/                   # Static public assets
    ├── src/
    │   ├── api/                  # Axios HTTP client configuration & API constants
    │   ├── components/           # Shared reusable UI primitives (Button, Input, Badge, Table, Modal)
    │   ├── features/products/    # Product feature domain
    │   │   ├── api/              # TanStack Query hooks (getProducts, getProduct, mutations)
    │   │   ├── components/       # ProductTable, ProductForm, ProductFilters, Pagination
    │   │   ├── schemas/          # Zod form validation schemas
    │   │   └── types/            # TypeScript interfaces & types
    │   ├── hooks/                # Custom React hooks (useDebounce, useProductFilters)
    │   ├── layouts/              # MainLayout, Header, and Sidebar components
    │   ├── lib/                  # Shared library configs & instances (TanStack QueryClient)
    │   ├── pages/                # Route pages (List, Detail, Create, Edit, Favorites, 404)
    │   ├── routes/               # React Router configuration
    │   ├── stores/               # Zustand global state (Favorites, Recently Viewed, Sidebar)
    │   ├── types/                # Global shared TypeScript interfaces (API response contracts)
    │   ├── App.tsx               # Root component with QueryClientProvider
    │   └── main.tsx              # Application entry point
    ├── .env.example              # Environment variables template
    ├── package.json              # Project dependencies & scripts
    ├── tsconfig.json             # TypeScript configuration
    └── vite.config.ts            # Vite build configuration
```

---

## Tech Stack & Technologies

### Part 1: Landing Page (`/part-1-landing`)
- **HTML5:** Clean semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<figure>`).
- **CSS3:** Native CSS variables (Design Tokens), Flexbox, CSS Grid, BEM architecture, fluid typography.
- **JavaScript (ES6+):** Vanilla JS for interactive mobile drawer navigation and sticky header transitions.
- **Performance:** Optimized WebP assets, Google Fonts non-blocking preload, and zero external runtime dependencies.

### Part 2: Product Admin Application (`/part-2-admin`)
- **Core & Framework:** React 19, TypeScript, Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Data Fetching & Server State:** TanStack Query v5 (`@tanstack/react-query`) with cache invalidation and optimistic UX
- **Client State & Persistence:** Zustand v5 with `persist` middleware backed by `localStorage`
- **Form Management & Validation:** Zod schema validation with real-time error messages
- **Styling:** Tailwind CSS v4 with modern utility tokens
- **HTTP Client:** Axios with centralized base URL configuration
- **Icons:** Lucide React

---

## Quick Start & Installation

### Prerequisites
- **Node.js:** `>= 18.x`
- **npm:** `>= 9.x`

---

### Running Part 1 (Landing Page)

1. Open a terminal and navigate to `part-1-landing`:
   ```bash
   cd part-1-landing
   ```

2. Start the local server:
   ```bash
   # Option A: Using the built-in Node.js server (zero npm dependencies required)
   node server.js

   # Option B: Or using npx serve
   npm run dev
   ```

3. Open your browser at:
   ```text
   http://localhost:3000
   ```
   *(Or simply double-click `index.html` to view directly in any modern browser).*

---

### Running Part 2 (Product Admin App)

1. Open a terminal and navigate to `part-2-admin`:
   ```bash
   cd part-2-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Copy example environment configuration
   cp .env.example .env
   ```
   *Verify that `.env` contains the API base URL:*
   ```env
   VITE_API_BASE_URL=https://[IP_ADDRESS]
   VITE_API_TIMEOUT=10000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at:
   ```text
   http://localhost:5173
   ```

6. To build for production:
   ```bash
   npm run build
   npm run preview
   ```

---

## Features Completed

### Part 1: Figma to HTML/CSS
- [x] **Pixel & Visual Fidelity:** Accurately translates colors, typography (Cormorant Upright & Open Sans), spacing, and visual hierarchy from the Figma design.
- [x] **Responsive Breakpoints:** Tested and styled across:
  - Mobile: `~390px` (Collapsible slide-in menu drawer)
  - Tablet: `~768px` (Fluid column adaptations)
  - Desktop: `~1440px` (Editorial multi-column layout)
- [x] **Asset Optimization:** WebP image formats, inline SVGs, and preloaded critical assets for fast Core Web Vitals (LCP/CLS).

### Part 2: Product Admin App
- [x] **Full API Integration & CRUD:**
  - `GET /products` with search, category/status filters, sorting, and pagination.
  - `GET /products/:id` with comprehensive product details.
  - `POST /products` to create new products.
  - `PUT /products/:id` to update existing records.
  - `DELETE /products/:id` with accessible confirmation modal.
- [x] **Product Data Table:**
  - Debounced search (300ms delay).
  - Multi-criteria filtering (Category, Status: Active / Inactive).
  - Multi-column sorting (Name, Price, Stock, Created Date).
  - Server-side pagination with dynamic page controls.
  - Interactive row actions (View, Edit, Delete, Quick Star/Bookmark).
- [x] **Bi-directional URL Synchronization:**
  - Search query, category, status, sortBy, sortOrder, and page are mirrored to URL query parameters (`?search=...&page=...`), supporting bookmarkable links and browser back/forward history.
- [x] **Form Validation (Create & Edit):**
  - Schema-enforced validation with Zod (`name >= 3 chars`, `price > 0`, `stock >= 0`, valid status, max description length).
  - Instant error feedback, field disablement during submission, and API failure alert handling.
- [x] **State Management & `localStorage` Persistence:**
  - **Favorites:** Bookmark products directly from the table or detail page.
  - **Recently Viewed:** Automatically logs viewed products upon visiting detail pages.
  - **Saved & Activity View (`/favorites`):** Dedicated page to browse bookmarked products and clear viewing history.
  - **Sidebar State:** Collapsible state remembered across sessions.
- [x] **UX & Edge Cases:**
  - Skeleton loaders and spinner states during network requests.
  - Graceful error banners with retry buttons.
  - Empty state placeholders when no products match filters.

---

## Routes Overview (Part 2)

| Route | Description |
| :--- | :--- |
| `/products` | Main product catalog table with search, filters, sorting, and pagination |
| `/products/new` | Create product form with Zod schema validation |
| `/products/:id` | Detailed product specifications and recently viewed slider |
| `/products/:id/edit` | Edit product form prefilled with product data |
| `/favorites` | Bookmarked favorite items and browsing history (`localStorage`) |
| `*` | Custom 404 Not Found fallback page |

---

## Assumptions & Decisions

1. **Server-side Search & Pagination:** The application leverages backend API query parameters (`search`, `category`, `status`, `sortBy`, `sortOrder`, `page`, `pageSize`) for filtering and sorting, ensuring scalability when managing large datasets.
2. **Dynamic Categories:** Categories in the filter dropdown are dynamically computed by combining default categories with unique categories present in returned API records.
3. **URL Search Parameters as Source of Truth:** Table filters and pagination states are synchronized with URL search params so users can share specific filtered views or navigate via browser history buttons.
4. **Resilient LocalStorage:** Zustand persistence includes defensive parsing to handle missing or corrupt `localStorage` values without throwing runtime errors.

---

## AI and MCP Tooling Usage Note

- **AI Tools & Protocols Used:**
  - **Google Antigravity IDE** (Gemini 3.7).
  - **Figma Dev Mode MCP Server (`figma-dev-mode-mcp-server`):** Model Context Protocol server integrated into the IDE to inspect Figma node trees, layout metrics, and inspect structural hierarchy.
- **Use Cases:**
  1. **Part 1 (Figma to Responsive HTML/CSS):** AI and the Figma MCP server were utilized solely to scaffold the initial HTML structural skeleton and inspect the layout node hierarchy. All graphic assets (images, icons, vectors) were manually extracted, sliced, and optimized from the Figma design, and the CSS was written and calibrated manually to achieve exact pixel alignment, proper typography scales, visual gradients/overlays, and responsive adaptations.
  2. **Part 2 (Product Admin App):** Generated initial TypeScript interfaces and Zod validation schemas, scaffolded TanStack Query mutation hooks, and configured Zustand persistence.
- **Verification, Correction & Engineering Decisions:**
  - *Part 1 (Refining AI/MCP Scaffolding for Pixel-Level Fidelity):* Starting from the baseline layout and initial styling generated by AI and the Figma MCP server, I thoroughly reviewed and adjusted the code to match the Figma design with highest accuracy. I manually sliced and exported all image and vector assets (WebP/SVG) directly from the Figma file, fine-tuned margins, paddings, typography scales (font weights, line-heights, letter-spacing), and visual effects (shadows, overlays, borders), and completed the responsive behavior across mobile (`390px`), tablet (`768px`), and desktop (`1440px`).
  - *Part 2 (Project Architecture & AI Governance Rules):* The AI initially suggested a cluttered, monolithic project structure with tightly coupled components and API logic. I researched best practices and established a clean, modular feature-sliced architecture (separating `features/products/` with dedicated `api/`, `components/`, `schemas/`, and `types/` from global UI primitives and stores). I formalized this structure into explicit project rules (`AGENTS.md`) for the AI to strictly follow throughout development.
  - *Part 2 (State Architecture Refinement):* AI initially suggested maintaining table filter/search states solely in local component `useState`. I adjusted this to a dedicated `useProductFilters` hook that syncs all filter parameters with URL `SearchParams`, ensuring shareable deep links and browser history navigation.
  - *Part 2 (Environment Variable Configuration):* The AI originally proposed hardcoding the backend API endpoint directly inside the Axios client code. I rejected this and instructed the AI to extract the configuration into `.env` environment variables (`VITE_API_BASE_URL`, `VITE_API_TIMEOUT`) with a corresponding `.env.example` template, allowing dynamic configuration across different deployment environments without modifying source code.

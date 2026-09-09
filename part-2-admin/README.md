# Apex Product Admin Application

A high-performance, responsive Product Management Admin Dashboard built with React 19, TypeScript, Vite, TanStack Query, Zustand, and Tailwind CSS v4 following Alexandria High-End Editorial design principles.

---

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Installation
Install all required project dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a local `.env` file in the project root directory by copying the example configuration:
```bash
cp .env.example .env
```
Set your backend API endpoint and request timeout inside `.env`:
```env
VITE_API_BASE_URL=https://your-backend-api-endpoint
VITE_API_TIMEOUT=10000
```

### 3. Running Locally (Development Mode)
Start the Vite local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build & Preview
To build the optimized static production bundle:
```bash
npm run build
npm run preview
```

---

## Tech Stack & Architecture

- **Core & Framework:** React 19, TypeScript, Vite 6
- **Routing:** React Router DOM v7
- **Server State & Data Fetching:** TanStack Query v5 (`@tanstack/react-query`) with automatic cache invalidation
- **Client State & Persistence:** Zustand v5 with `persist` middleware (`localStorage`)
- **Form Management & Validation:** Zod schema validation
- **Styling:** TailwindCSS v4 with Alexandria high-end editorial UI system
- **Icons:** Lucide React
- **HTTP Client:** Axios with centralized client interceptors

### Directory Structure (`src/`)
```text
src/
├── api/                        # Shared Axios client configuration & base URL
├── components/                 # Global shared UI primitives
│   ├── ui/                     # Button, Input, Select, Badge, Table
│   └── ConfirmDialog.tsx       # Accessible deletion modal dialog
├── features/                   # Feature-sliced business domains
│   └── products/
│       ├── api/                # Query hooks (getProducts, getProduct, mutations)
│       ├── components/         # ProductTable, ProductTableRow, ProductForm, ProductFilters, ProductPagination
│       ├── schemas/            # Zod validation schema (productSchema.ts)
│       └── types/              # Product, ProductPayload, ProductFilterParams
├── hooks/                      # Custom reusable hooks
│   ├── useDebounce.ts          # Search input debouncing (300ms)
│   └── useProductFilters.ts    # Bi-directional URL search params synchronization
├── layouts/                    # Layout shells
│   ├── MainLayout.tsx          # Responsive layout container
│   ├── Header.tsx              # Global search, notifications, favorites counter & mobile toggle
│   └── Sidebar.tsx             # Collapsible desktop sidebar & mobile drawer
├── lib/                        # Shared library clients & setup
│   └── queryClient.ts          # TanStack QueryClient with default cache & retry rules
├── pages/                      # Application route pages
│   ├── ProductListPage.tsx     # /products (Data table, search, filter, sort, pagination)
│   ├── ProductDetailPage.tsx   # /products/:id (Full overview, inventory, recently viewed slider)
│   ├── ProductCreatePage.tsx   # /products/new (Create product form)
│   ├── ProductEditPage.tsx     # /products/:id/edit (Edit product form with preloaded data)
│   ├── FavoritesPage.tsx       # /favorites (Bookmarked favorites & Recently viewed history tabs)
│   └── NotFoundPage.tsx        # 404 fallback page
├── routes/                     # React Router configuration
├── stores/                     # Global client state (Zustand)
│   ├── useFavoriteStore.ts     # Favorites & Recently viewed with localStorage persistence
│   └── useSidebarStore.ts      # Sidebar collapse & mobile drawer toggle
├── types/                      # Shared global TypeScript definitions
│   └── api.ts                  # Generic API responses & metadata interfaces
├── App.tsx                     # Root application component with Providers
└── main.tsx                    # React DOM entry point
```

---

## Features Completed

### 1. Product Catalog & Data Table (`/products`)
- **Server-side Search, Filter & Pagination:** Fetches dynamically via backend REST API (configured via `VITE_API_BASE_URL`).
- **Bi-directional URL Synchronization:** Search queries, category filters, status filters, sorting column/order, and page numbers sync seamlessly with URL parameters (`?search=...&category=...&page=...`).
- **Debounced Search:** 300ms debounce prevents API query hammering during rapid keystrokes.
- **Sorting:** Interactive column headers for Name, Price, and Stock.
- **Bulk Selection & Row Actions:** Multi-row checkboxes, quick View, Edit, and Delete modal triggers.
- **Star Toggle:** Click star on any product row to bookmark/unfavorite instantly.

### 2. Product Detail (`/products/:id`)
- Displays overview specifications, pricing, stock levels, category, status, and creation timestamps.
- **Recently Viewed Tracking:** Automatically records the viewed product into `localStorage`.
- **Cross-Navigation Cards:** Displays other recently viewed products at the bottom of the page for rapid context switching.

### 3. Unified Product Form (`/products/new` & `/products/:id/edit`)
- **Zod Validation Schema:** Enforces name length (>= 3 chars), positive price (> 0), non-negative integer stock (>= 0), required category, and status.
- Real-time inline field error feedback and disabled submit state while mutating.

### 4. Saved & Activity (`/favorites`)
- **Favorites Tab:** Grid of all bookmarked products with quick-inspect and remove capabilities.
- **Recently Viewed Tab:** Complete history of products inspected across sessions with a "Clear History" button.
- **Persistent Storage:** Fully backed by `localStorage` via Zustand `persist` middleware.

### 5. Header & Navigation
- Global product search input with submit button.
- Live badge displaying the total number of favorited items.
- Full mobile drawer support with backdrop overlay.

---

## Assumptions & Architectural Decisions

1. **Server vs. Client State:** All product records and pagination are managed via TanStack Query (server state). User preferences, favorite bookmarks, and inspection history are stored in Zustand + `localStorage` (client state).
2. **Category Taxonomy:** Category filter dynamically aggregates the default list with unique categories found in returned records to support dynamically added categories.
3. **URL Search Params:** Table state is fully reflected in the URL so that filtered views can be bookmarked or shared directly.

---

## AI Usage Note

- **AI Tools Used:** Google Antigravity IDE (Gemini 3.7).
- **Purposes:**
  1. Designing Alexandria editorial layout tokens with Tailwind CSS v4.
  2. Generating TypeScript interfaces and Zod validation schemas.
  3. Scaffolding boilerplate for TanStack Query mutation hooks and Zustand store configuration.
- **Check & Correction Example:**
  - *AI Suggestion:* The initial scaffold suggested keeping the search query exclusively in local component state.
  - *Review & Refinement:* Corrected to extract a dedicated `useProductFilters` hook that syncs all filter parameters (search, category, status, sortBy, sortOrder, page) with URL `SearchParams`, ensuring shareable URLs and browser history back/forward navigation support.

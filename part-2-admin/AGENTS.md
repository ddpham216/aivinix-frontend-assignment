# Project Architecture & Coding Rules

## 1. Architectural Overview (Feature-Driven Architecture)
The project follows a **Feature-Driven Architecture** combined with shared modular layers.
- The codebase prioritizes encapsulation, scalability, and strict separation of concerns.
- All internal imports within `src` **must use the `@/` path alias** (configured in `vite.config.ts`).

---

## 2. Standard Directory Structure (`src/`)

```text
src/
├── api/                        # Shared HTTP client & network configurations
│   └── client.ts               # Axios instance (baseURL: [IP_ADDRESS], interceptors)
│
├── components/                 # Global shared UI components
│   ├── ui/                     # Primitive / Atomic components (Button, Input, Table, Modal, Badge, ...)
│   ├── Feedback/               # Feedback states (LoadingSpinner, EmptyState, ErrorBoundary, ...)
│   └── ConfirmDialog.tsx       # Confirmation dialog/modal (for deletion and destructive actions)
│
├── features/                   # Independent business domains (Feature-sliced)
│   └── products/
│       ├── api/                # TanStack Query hooks, query keys & API call functions
│       │   ├── productKeys.ts  # Centralized query keys for cache invalidation
│       │   ├── getProducts.ts  # useProducts (search, filter, sort, pagination)
│       │   ├── getProduct.ts   # useProduct (product details by ID)
│       │   ├── createProduct.ts# useCreateProduct (mutation)
│       │   ├── updateProduct.ts# useUpdateProduct (mutation)
│       │   └── deleteProduct.ts# useDeleteProduct (mutation)
│       ├── components/         # UI components scoped specifically to the products feature
│       │   ├── ProductTable.tsx        # Main product data table
│       │   ├── ProductTableRow.tsx     # Table row (view, edit, delete actions)
│       │   ├── ProductForm.tsx         # Unified form for both Create & Edit modes
│       │   ├── ProductFilters.tsx      # Category & Status filter bar
│       │   ├── ProductPagination.tsx   # Pagination controls
│       │   └── FavoriteButton.tsx      # Toggle favorite state button
│       ├── schemas/            # Zod validation schemas
│       │   └── productSchema.ts        # Form validation schema (name, price, stock, ...)
│       └── types/              # Type definitions scoped to the feature
│           └── index.ts        # Product, ProductPayload, ProductFilterParams
│
├── hooks/                      # Global reusable custom hooks
│   ├── useDebounce.ts          # Search input debouncing
│   └── useProductFilters.ts    # Sync URL search params with filter/sort/pagination states
│
├── layouts/                    # Application layout wrappers
│   ├── MainLayout.tsx          # Main shell: Sidebar + Header + <Outlet />
│   ├── Header.tsx              # Top header bar (search bar, user profile, etc.)
│   └── Sidebar.tsx             # Main navigation sidebar
│
├── pages/                      # Route page components
│   ├── ProductListPage.tsx     # Route: /products
│   ├── ProductDetailPage.tsx   # Route: /products/:id
│   ├── ProductCreatePage.tsx   # Route: /products/new
│   ├── ProductEditPage.tsx     # Route: /products/:id/edit
│   ├── FavoritesPage.tsx       # Route: /favorites (or /recently-viewed)
│   └── NotFoundPage.tsx        # Route: * (404 Not Found)
│
├── routes/                     # Router configuration
│   └── index.tsx               # createBrowserRouter with nested layouts & error boundaries
│
├── stores/                     # Global client state management via Zustand
│   ├── useFavoriteStore.ts     # Favorites / Recently viewed management (with persist middleware)
│   └── useSidebarStore.ts      # Sidebar open/collapsed toggle state
│
├── types/                      # Global shared & API types
│   └── api.ts                  # ApiResponse<T>, PaginatedMeta, ApiError
│
├── App.tsx                     # Root App: QueryClientProvider, RouterProvider, Toaster
└── main.tsx                    # React DOM entrypoint
```

---

## 3. Naming Conventions

| Item | Convention | Example |
| :--- | :--- | :--- |
| **Components / Pages / Layouts** | `PascalCase.tsx` | `ProductTable.tsx`, `ProductListPage.tsx`, `MainLayout.tsx` |
| **Custom Hooks** | `camelCase.ts` prefixed with `use` | `useDebounce.ts`, `useProductFilters.ts`, `useProducts.ts` |
| **Zustand Stores** | `camelCase.ts` matching `use...Store` | `useFavoriteStore.ts`, `useSidebarStore.ts` |
| **API & Service Functions** | `camelCase.ts` with descriptive action verbs | `getProducts.ts`, `createProduct.ts`, `deleteProduct.ts` |
| **Query Keys** | `camelCase.ts` ending with `Keys` | `productKeys.ts` |
| **Validation Schemas** | `camelCase.ts` ending with `Schema` | `productSchema.ts` |
| **Types / Interfaces** | `PascalCase` within `types.ts` or `index.ts` | `Product`, `ProductPayload`, `ApiResponse` |

---

## 4. Design Principles & Layer Responsibilities

### 4.1. Server State vs Client State vs URL State
- **Server State (API Data)**:
  - Exclusively managed by **TanStack Query** (`@tanstack/react-query`).
  - All API calls and query/mutation hooks must reside in `features/<feature>/api/`.
  - Maintain centralized cache management via `queryKeys` (e.g., `productKeys.all`, `productKeys.list(params)`, `productKeys.detail(id)`).
- **Client Global State**:
  - Managed by **Zustand** inside `src/stores/`.
  - Reserved strictly for data shared across disconnected components or persisted locally (e.g., Favorites, Recently Viewed, Theme, Sidebar state).
- **URL State**:
  - For search queries, category filters, sorting, and pagination, synchronize state directly with URL search params via `useProductFilters.ts`.

### 4.2. UI Components & Style Guidelines
- **TailwindCSS v4**: Use native Tailwind utility classes; avoid arbitrary inline styles.
- **Design System**: Strictly adhere to Alexandria — High-End Editorial:
  - **No-Line Rule**: Avoid harsh 1px borders; establish hierarchy through background shifts (`surface` tonal layering).
  - Use whitespace as structural design.
  - Apply a minimum corner radius of `rounded-sm`.
- **Component Classification**:
  - `components/ui/`: Atomic primitives without business logic (e.g., `Button`, `Input`, `Table`).
  - `features/<feature>/components/`: Feature-bound components handling domain data and logic.
  - `pages/`: Thin orchestration layer connecting hooks and assembled components.

### 4.3. Form & Validation
- Use **Zod** to declare schemas and validate user inputs.
- Reuse form logic (Create / Edit) via `ProductForm.tsx` by passing initial data or form mode (`create` | `edit`).

### 4.4. Error Handling & Feedback
- Always handle and display `isLoading`, `isError`, and `EmptyState` during data fetching.
- Destructive actions (e.g., deleting a product) must prompt the user via `ConfirmDialog` before dispatching mutations.

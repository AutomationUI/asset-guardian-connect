# MaintControl — Industrial Maintenance Ecosystem

> Sistema inteligente de gestão de ativos e manutenção industrial.

## Tech Stack

- **Vite** — Build tool & dev server
- **React 18** + **TypeScript** — UI framework
- **Tailwind CSS** + **shadcn/ui** — Styling & components
- **Supabase** — Auth, database, real-time, edge functions
- **TanStack Query** — Server state management
- **Recharts** — Data visualization
- **React Hook Form** + **Zod** — Form management & validation

## Features

| Module              | Capabilities                                                         |
| ------------------- | -------------------------------------------------------------------- |
| **Dashboard**       | KPI widgets (MTBF, MTTR, Availability), drag-and-drop customization  |
| **Assets**          | Equipment registry, hierarchy, criticality classification            |
| **Work Orders**     | CRUD, approval flow (PCM → Supervisor), audit trail, permissions     |
| **Preventive Plans**| Scheduling by time/cycles, calendar view, overdue alerts             |
| **Parts & Stock**   | Inventory control, min/max stock, Protheus ERP integration           |
| **Requests**        | Maintenance requests with type and priority filters                  |
| **Reports**         | Charts, export to PDF/Excel/CSV                                     |
| **Users**           | Role-based access (Admin, PCM, Technician, Requester, etc.)          |
| **Settings**        | System config, notification settings, Protheus sync monitoring       |
| **Alerts**          | Real-time machine-stopped alerts via Supabase Realtime               |

## Getting Started

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project
cd asset-guardian-main

# 3. Install dependencies
npm install

# 4. Configure environment
# Copy .env.example to .env and fill Supabase credentials
# Required: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY

# 5. Start the development server (port 8081)
npm run dev
```

The app will be available at **http://localhost:8081**.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server (port 8081)         |
| `npm run build`   | Production build                     |
| `npm run preview` | Preview production build             |
| `npm run lint`    | Run ESLint                           |
| `npm run test`    | Run unit tests (Vitest)              |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # MainLayout, PageLayout, AppSidebar
│   ├── dashboard/    # Dashboard widgets
│   ├── ui/           # shadcn/ui primitives
│   └── ...           # Feature-specific components
├── hooks/            # Custom React hooks (auth, reports, permissions)
├── integrations/     # Supabase client & generated types
├── lib/              # Utilities (export, string, cn)
├── pages/            # Route-level page components
├── types/            # TypeScript type definitions
└── utils/            # Status configs, helpers
supabase/
├── migrations/       # Database migrations (SQL)
└── functions/        # Edge Functions (Deno)
```

## Roles & Permissions

| Role          | Access Level                                          |
| ------------- | ----------------------------------------------------- |
| Admin         | Full system access                                    |
| PCM           | Planning, work order approval, reports                |
| Supervisor    | Approve high-cost orders, team management             |
| Technician    | Execute work orders, update status                    |
| Stockkeeper   | Inventory management, parts CRUD                      |
| Requester     | Create maintenance requests                           |

## License

Private — All rights reserved.


# Roadmap Features — MaintControl

## Goal
Implementar as 8 funcionalidades faltantes do roadmap para completar o MaintControl.

## Tasks

- [x] **1. Notification Center** — Bell icon dropdown com lista de notificações (OS aprovada, estoque baixo, plano vencido, máquina parada)
  → Criado `useNotifications.ts` (hook com Supabase Realtime, CRUD, helpers)
  → Criado `NotificationCenter.tsx` (popover com lista, mark as read, delete)
  → Integrado no `PageLayout.tsx` no lugar do bell estático

- [x] **2. Dark Mode Completo** — Revisado CSS para garantir dark mode funcional
  → Adicionadas CSS variables para glass dark mode (`--glass-bg`, `--glass-border`)
  → Fixado seletor `html.dark body` para background gradient
  → Adicionadas classes `dark:` em PageLayout, PageSection, StatCard, dropdowns

- [x] **3. Global Search (⌘K)** — Barra de busca global com Command Palette
  → Criado `GlobalSearch.tsx` (Command dialog, Ctrl+K shortcut, debounced search)
  → Busca multi-entidade: Assets, Work Orders, Parts, Preventive Plans
  → Integrado no header do `PageLayout.tsx`

- [x] **4. Cost Dashboard** — Widget de custos no Dashboard
  → Criado `CostOverview.tsx` (estimado vs realizado, mão de obra, variação, gráfico por tipo)
  → Adicionado tipo `cost-overview` em `dashboard.ts`
  → Integrado no `WidgetRenderer.tsx`

- [x] **5. Mobile Responsiveness** — Layout responsivo para mobile/tablet
  → Adicionadas media queries em `index.css` (640px mobile, 641-1024px tablet)
  → Ajustes em page-header, sidebar, dialogs, metric-cards, tables
  → Touch targets mínimos de 44px via `pointer: coarse`

- [x] **6. Image Upload na OS** — Upload de fotos/documentos
  → Criado `WorkOrderAttachments.tsx` (drag-and-drop, grid, preview fullscreen)
  → Supabase Storage com CRUD operations
  → Suporte a imagens e documentos

- [x] **7. Export PDF/Excel Refinado** — Exports com branding e custos
  → Adicionado logo SVG no PDF
  → Adicionada seção "Resumo de Custos" no PDF
  → Atualizado branding de "Asset Guardian" para "MaintControl"
  → Tipo `ExportData` expandido com `costData` opcional

- [x] **8. Testes Automatizados** — 17 testes unitários passando
  → `useNotifications.test.tsx` — 4 testes (init, helpers, icons, time formatting)
  → `useRoleAccess.test.ts` — 10 testes (hasRole, hasAnyRole, menu filtering)
  → `exportUtils.test.ts` — 3 testes (CSV, PDF, PDF com custo)

## Verification
- [x] `tsc --noEmit` — Zero erros TypeScript
- [x] `vite build` — Build de produção OK
- [x] `vitest run` — 17/17 testes passando
- [x] Dev server rodando em http://localhost:8081/

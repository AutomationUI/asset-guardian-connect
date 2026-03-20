import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings as SettingsIcon,
  Wrench,
  ClipboardList,
  CalendarClock,
  Package,
  MessageSquarePlus,
  BarChart3,
  Users,
  ChevronLeft,
  Factory,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assets", label: "Ativos", icon: Factory },
  { to: "/work-orders", label: "Ordens de Serviço", icon: Wrench },
  { to: "/preventive-plans", label: "Planos Preventivos", icon: CalendarClock },
  { to: "/parts", label: "Peças e Estoque", icon: Package },
  { to: "/requests", label: "Solicitações", icon: MessageSquarePlus },
  { to: "/reports", label: "Relatórios", icon: BarChart3 },
  { to: "/users", label: "Usuários", icon: Users },
  { to: "/settings", label: "Configurações", icon: SettingsIcon },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r transition-all duration-300",
        "bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] border-[hsl(var(--sidebar-border))]",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[hsl(var(--sidebar-border))]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--sidebar-primary))]">
              <ClipboardList className="h-4 w-4 text-[hsl(var(--sidebar-primary-foreground))]" />
            </div>
            <span className="text-sm font-semibold text-[hsl(var(--sidebar-accent-foreground))]">
              MaintControl
            </span>
          </div>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--sidebar-primary))] mx-auto">
            <ClipboardList className="h-4 w-4 text-[hsl(var(--sidebar-primary-foreground))]" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]",
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))]"
                  : "text-[hsl(var(--sidebar-muted))]",
                collapsed && "justify-center px-2"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-full text-[hsl(var(--sidebar-muted))] hover:text-[hsl(var(--sidebar-accent-foreground))] hover:bg-[hsl(var(--sidebar-accent))]"
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </Button>
      </div>
    </aside>
  );
}

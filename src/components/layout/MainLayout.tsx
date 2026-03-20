import { useLocation } from "react-router-dom";
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/assets": "Ativos",
  "/work-orders": "Ordens de Serviço",
  "/preventive-plans": "Planos Preventivos",
  "/parts": "Peças e Estoque",
  "/requests": "Solicitações",
  "/reports": "Relatórios",
  "/users": "Usuários",
  "/settings": "Configurações",
};

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "MaintControl";

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "lg:ml-16" : "lg:ml-60"
        )}
      >
        <TopBar title={title} onMenuToggle={() => setCollapsed(!collapsed)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

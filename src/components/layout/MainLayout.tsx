import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  title?: string;
}

export function MainLayout({ title = "Dashboard" }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

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

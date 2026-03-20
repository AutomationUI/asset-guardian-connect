import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentWorkOrders } from "@/components/dashboard/RecentWorkOrders";
import { Activity, Clock, CheckCircle, AlertTriangle, Gauge, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="MTBF"
          value="342h"
          change="+12% vs mês anterior"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
        />
        <StatCard
          title="MTTR"
          value="4.2h"
          change="-8% vs mês anterior"
          changeType="positive"
          icon={Clock}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title="Disponibilidade"
          value="96.8%"
          change="+1.5% vs mês anterior"
          changeType="positive"
          icon={Gauge}
          iconColor="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
        />
        <StatCard
          title="OS Abertas"
          value="23"
          change="5 urgentes"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
        />
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Recent Work Orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentWorkOrders />
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="text-base font-semibold mb-4">Alertas Ativos</h3>
            <div className="space-y-3">
              {[
                { msg: "Compressor GA-55 — Vibração acima do limite", level: "critical" },
                { msg: "Bomba KSB 150 — Manutenção preventiva vencida", level: "warning" },
                { msg: "Estoque baixo: Rolamento 6205-2RS (2 un.)", level: "warning" },
              ].map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-lg p-3 text-sm ${
                    alert.level === "critical"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{alert.msg}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="OS Concluídas (Mês)" value="48" icon={CheckCircle} iconColor="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" />
            <StatCard title="Backlog" value="12" icon={Activity} iconColor="bg-destructive/10 text-destructive" />
          </div>
        </div>
      </div>
    </div>
  );
}

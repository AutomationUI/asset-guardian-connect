import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Wrench, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const recentOrders = [
  { id: "OS-2024-0147", asset: "Compressor Atlas Copco GA-55", type: "Corretiva", priority: "Alta", status: "Em Andamento", assignee: "Carlos Mendes" },
  { id: "OS-2024-0146", asset: "Esteira Transportadora L3", type: "Preventiva", priority: "Média", status: "Pendente", assignee: "Ana Ribeiro" },
  { id: "OS-2024-0145", asset: "Motor WEG 75CV", type: "Corretiva", priority: "Urgente", status: "Em Andamento", assignee: "Pedro Alves" },
  { id: "OS-2024-0144", asset: "Bomba KSB 150-400", type: "Preventiva", priority: "Baixa", status: "Concluída", assignee: "Maria Costa" },
  { id: "OS-2024-0143", asset: "CLP Siemens S7-1200", type: "Corretiva", priority: "Alta", status: "Concluída", assignee: "João Ferreira" },
];

const priorityColors: Record<string, string> = {
  Urgente: "bg-destructive/10 text-destructive border-destructive/20",
  Alta: "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)] border-[hsl(38,92%,50%)]/20",
  Média: "bg-primary/10 text-primary border-primary/20",
  Baixa: "bg-muted text-muted-foreground border-border",
};

const statusIcons: Record<string, typeof Clock> = {
  "Em Andamento": Wrench,
  Pendente: Clock,
  Concluída: CheckCircle,
  Atrasada: AlertTriangle,
};

export function RecentWorkOrders() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Ordens Recentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentOrders.map((order) => {
          const StatusIcon = statusIcons[order.status] || Clock;
          return (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <StatusIcon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    order.status === "Concluída" && "text-[hsl(var(--success))]",
                    order.status === "Em Andamento" && "text-primary",
                    order.status === "Pendente" && "text-[hsl(var(--warning))]",
                    order.status === "Atrasada" && "text-destructive"
                  )}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{order.id} — {order.asset}</p>
                  <p className="text-xs text-muted-foreground">{order.assignee} · {order.type}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("shrink-0 text-xs", priorityColors[order.priority])}>
                {order.priority}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

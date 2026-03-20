import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkOrders } from "@/hooks/useWorkOrders";
import { CreateWorkOrderDialog } from "@/components/forms/CreateWorkOrderDialog";
import { Constants } from "@/integrations/supabase/types";
import type { Enums } from "@/integrations/supabase/types";
import { format } from "date-fns";

const priorityColors: Record<Enums<"work_order_priority">, string> = {
  Urgente: "bg-destructive/10 text-destructive border-destructive/20",
  Alta: "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)] border-[hsl(38,92%,50%)]/20",
  Média: "bg-primary/10 text-primary border-primary/20",
  Baixa: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<Enums<"work_order_status">, string> = {
  "Em Andamento": "bg-primary/10 text-primary",
  Aberta: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  Concluída: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Cancelada: "bg-destructive/10 text-destructive",
};

export default function WorkOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { data: workOrders, isLoading, error } = useWorkOrders();

  const filtered = (workOrders ?? []).filter((wo) => {
    const matchSearch = wo.code.toLowerCase().includes(search.toLowerCase()) || wo.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || wo.status === statusFilter;
    const matchPriority = priorityFilter === "all" || wo.priority === priorityFilter;
    const matchType = typeFilter === "all" || wo.type === typeFilter;
    return matchSearch && matchStatus && matchPriority && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Ordens de Serviço</h2>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Carregando..." : `${workOrders?.length ?? 0} ordens registradas`}
          </p>
        </div>
        <CreateWorkOrderDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Lista de OS</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar OS..." className="pl-9 h-9 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Constants.public.Enums.work_order_status.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Prioridade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {Constants.public.Enums.work_order_priority.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Tipo" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Constants.public.Enums.work_order_type.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-destructive py-4">Erro ao carregar ordens. Verifique se você está autenticado.</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>{Array.from({ length: 8 }).map((_, j) => (<TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>))}</TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    {search || statusFilter !== "all" || priorityFilter !== "all" || typeFilter !== "all" ? "Nenhuma OS encontrada com esses filtros." : "Nenhuma ordem de serviço cadastrada."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((wo) => (
                  <TableRow key={wo.id} className="cursor-pointer">
                    <TableCell className="font-medium">{wo.code}</TableCell>
                    <TableCell>{wo.title}</TableCell>
                    <TableCell>{wo.assets?.name ?? "—"}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{wo.type}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className={cn("text-xs", priorityColors[wo.priority])}>{wo.priority}</Badge></TableCell>
                    <TableCell><Badge variant="secondary" className={cn("text-xs", statusColors[wo.status])}>{wo.status}</Badge></TableCell>
                    <TableCell>{wo.assigned_profile?.full_name ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(wo.created_at), "dd/MM/yyyy")}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

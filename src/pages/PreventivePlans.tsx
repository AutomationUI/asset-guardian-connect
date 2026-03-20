import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreventivePlans } from "@/hooks/usePreventivePlans";
import { CreatePreventivePlanDialog } from "@/components/forms/CreatePreventivePlanDialog";
import { Constants } from "@/integrations/supabase/types";
import type { Enums } from "@/integrations/supabase/types";
import { format } from "date-fns";

const statusColors: Record<Enums<"preventive_status">, string> = {
  "No Prazo": "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Vencido: "bg-destructive/10 text-destructive",
  Próximo: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
};

export default function PreventivePlans() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [freqFilter, setFreqFilter] = useState<string>("all");
  const { data: plans, isLoading, error } = usePreventivePlans();

  const filtered = (plans ?? []).filter((p) => {
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchFreq = freqFilter === "all" || p.frequency === freqFilter;
    return matchStatus && matchFreq;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Planos Preventivos</h2>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Carregando..." : `${plans?.length ?? 0} planos ativos`}
          </p>
        </div>
        <CreatePreventivePlanDialog />
      </div>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarClock className="h-4 w-4" /> Cronograma
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Constants.public.Enums.preventive_status.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={freqFilter} onValueChange={setFreqFilter}>
                <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Frequência" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {Constants.public.Enums.preventive_frequency.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-destructive py-4">Erro ao carregar planos. Verifique se você está autenticado.</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Próxima Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>{Array.from({ length: 6 }).map((_, j) => (<TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>))}</TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {statusFilter !== "all" || freqFilter !== "all" ? "Nenhum plano encontrado com esses filtros." : "Nenhum plano preventivo cadastrado."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer">
                    <TableCell className="font-medium">{p.code}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.assets?.name ?? "—"}</TableCell>
                    <TableCell>{p.frequency}</TableCell>
                    <TableCell>{format(new Date(p.next_date), "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("text-xs", statusColors[p.status])}>{p.status}</Badge>
                    </TableCell>
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

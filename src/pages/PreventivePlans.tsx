import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  { id: "PP-001", name: "Lubrificação Compressores", asset: "Compressor GA-55", frequency: "Mensal", nextDate: "2024-07-01", status: "No Prazo" },
  { id: "PP-002", name: "Inspeção Esteiras", asset: "Esteira L3", frequency: "Semanal", nextDate: "2024-06-20", status: "No Prazo" },
  { id: "PP-003", name: "Troca Filtros Caldeira", asset: "Caldeira ATA 10t/h", frequency: "Trimestral", nextDate: "2024-06-10", status: "Vencido" },
  { id: "PP-004", name: "Revisão Motor 75CV", asset: "Motor WEG 75CV", frequency: "Semestral", nextDate: "2024-08-15", status: "No Prazo" },
  { id: "PP-005", name: "Calibração Sensores", asset: "CLP Siemens S7-1200", frequency: "Mensal", nextDate: "2024-06-25", status: "Próximo" },
];

const statusColors: Record<string, string> = {
  "No Prazo": "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Vencido: "bg-destructive/10 text-destructive",
  Próximo: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
};

export default function PreventivePlans() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Planos Preventivos</h2>
          <p className="text-sm text-muted-foreground">{plans.length} planos ativos</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Novo Plano</Button>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarClock className="h-4 w-4" /> Cronograma
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              {plans.map((p) => (
                <TableRow key={p.id} className="cursor-pointer">
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.asset}</TableCell>
                  <TableCell>{p.frequency}</TableCell>
                  <TableCell>{p.nextDate}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("text-xs", statusColors[p.status])}>{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

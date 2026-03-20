import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

const requests = [
  { id: "SOL-001", description: "Vazamento na tubulação de ar comprimido", requester: "Roberto Silva", area: "Utilidades", priority: "Alta", status: "Aberta", date: "2024-06-15" },
  { id: "SOL-002", description: "Ruído anormal no redutor da esteira", requester: "Fernanda Souza", area: "Linha 3", priority: "Média", status: "Em Análise", date: "2024-06-14" },
  { id: "SOL-003", description: "Troca de lâmpada no galpão", requester: "Marcos Oliveira", area: "Expedição", priority: "Baixa", status: "OS Gerada", date: "2024-06-13" },
  { id: "SOL-004", description: "Sensor de temperatura com defeito", requester: "Juliana Pereira", area: "Caldeira", priority: "Urgente", status: "Aberta", date: "2024-06-15" },
];

const priorityColors: Record<string, string> = {
  Urgente: "bg-destructive/10 text-destructive",
  Alta: "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)]",
  Média: "bg-primary/10 text-primary",
  Baixa: "bg-muted text-muted-foreground",
};

const statusColors: Record<string, string> = {
  Aberta: "bg-primary/10 text-primary",
  "Em Análise": "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  "OS Gerada": "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
};

export default function Requests() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Solicitações</h2>
          <p className="text-sm text-muted-foreground">{requests.length} solicitações</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Nova Solicitação</Button>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><MessageSquarePlus className="h-4 w-4" />Solicitações de Manutenção</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((r) => (
                <TableRow key={r.id} className="cursor-pointer">
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell>{r.description}</TableCell>
                  <TableCell>{r.requester}</TableCell>
                  <TableCell>{r.area}</TableCell>
                  <TableCell><Badge variant="secondary" className={cn("text-xs", priorityColors[r.priority])}>{r.priority}</Badge></TableCell>
                  <TableCell><Badge variant="secondary" className={cn("text-xs", statusColors[r.status])}>{r.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

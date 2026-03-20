import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const workOrders = [
  { id: "OS-2024-0147", asset: "Compressor Atlas Copco GA-55", type: "Corretiva", priority: "Urgente", status: "Em Andamento", assignee: "Carlos Mendes", date: "2024-06-15" },
  { id: "OS-2024-0146", asset: "Esteira Transportadora L3", type: "Preventiva", priority: "Média", status: "Pendente", assignee: "Ana Ribeiro", date: "2024-06-14" },
  { id: "OS-2024-0145", asset: "Motor WEG 75CV", type: "Corretiva", priority: "Alta", status: "Em Andamento", assignee: "Pedro Alves", date: "2024-06-14" },
  { id: "OS-2024-0144", asset: "Bomba KSB 150-400", type: "Preventiva", priority: "Baixa", status: "Concluída", assignee: "Maria Costa", date: "2024-06-13" },
  { id: "OS-2024-0143", asset: "CLP Siemens S7-1200", type: "Corretiva", priority: "Alta", status: "Concluída", assignee: "João Ferreira", date: "2024-06-12" },
  { id: "OS-2024-0142", asset: "Torno CNC Romi G-240", type: "Preventiva", priority: "Média", status: "Atrasada", assignee: "Lucas Santos", date: "2024-06-10" },
  { id: "OS-2024-0141", asset: "Ponte Rolante 10t", type: "Corretiva", priority: "Baixa", status: "Concluída", assignee: "Paulo Lima", date: "2024-06-09" },
];

const priorityColors: Record<string, string> = {
  Urgente: "bg-destructive/10 text-destructive border-destructive/20",
  Alta: "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)] border-[hsl(38,92%,50%)]/20",
  Média: "bg-primary/10 text-primary border-primary/20",
  Baixa: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<string, string> = {
  "Em Andamento": "bg-primary/10 text-primary",
  Pendente: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  Concluída: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Atrasada: "bg-destructive/10 text-destructive",
};

export default function WorkOrders() {
  const [search, setSearch] = useState("");
  const filtered = workOrders.filter(
    (wo) =>
      wo.id.toLowerCase().includes(search.toLowerCase()) ||
      wo.asset.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Ordens de Serviço</h2>
          <p className="text-sm text-muted-foreground">{workOrders.length} ordens registradas</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova OS
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Lista de OS</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar OS..." className="pl-9 h-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((wo) => (
                <TableRow key={wo.id} className="cursor-pointer">
                  <TableCell className="font-medium">{wo.id}</TableCell>
                  <TableCell>{wo.asset}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{wo.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-xs", priorityColors[wo.priority])}>{wo.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("text-xs", statusColors[wo.status])}>{wo.status}</Badge>
                  </TableCell>
                  <TableCell>{wo.assignee}</TableCell>
                  <TableCell className="text-muted-foreground">{wo.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

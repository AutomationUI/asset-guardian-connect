import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Factory } from "lucide-react";
import { cn } from "@/lib/utils";

const assets = [
  { id: "EQ-001", name: "Compressor Atlas Copco GA-55", location: "Utilidades", criticality: "A", status: "Operando", type: "Compressor" },
  { id: "EQ-002", name: "Esteira Transportadora L3", location: "Linha 3", criticality: "B", status: "Operando", type: "Transportador" },
  { id: "EQ-003", name: "Motor WEG 75CV", location: "Acionamentos", criticality: "A", status: "Parado", type: "Motor Elétrico" },
  { id: "EQ-004", name: "Bomba KSB 150-400", location: "Casa de Bombas", criticality: "A", status: "Operando", type: "Bomba" },
  { id: "EQ-005", name: "CLP Siemens S7-1200", location: "Automação L1", criticality: "B", status: "Operando", type: "Controlador" },
  { id: "EQ-006", name: "Torno CNC Romi G-240", location: "Usinagem", criticality: "C", status: "Manutenção", type: "Máquina CNC" },
  { id: "EQ-007", name: "Ponte Rolante 10t", location: "Expedição", criticality: "B", status: "Operando", type: "Ponte Rolante" },
  { id: "EQ-008", name: "Caldeira ATA 10t/h", location: "Utilidades", criticality: "A", status: "Operando", type: "Caldeira" },
];

const critColors: Record<string, string> = {
  A: "bg-destructive/10 text-destructive border-destructive/20",
  B: "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)] border-[hsl(38,92%,50%)]/20",
  C: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<string, string> = {
  Operando: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Parado: "bg-destructive/10 text-destructive",
  Manutenção: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
};

export default function Assets() {
  const [search, setSearch] = useState("");
  const filtered = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Ativos</h2>
          <p className="text-sm text-muted-foreground">{assets.length} equipamentos cadastrados</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Ativo
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Lista de Equipamentos</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar ativo..."
                  className="pl-9 h-9 w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
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
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Criticidade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((asset) => (
                <TableRow key={asset.id} className="cursor-pointer">
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Factory className="h-4 w-4 text-muted-foreground" />
                      {asset.name}
                    </div>
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-xs", critColors[asset.criticality])}>
                      {asset.criticality}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("text-xs", statusColors[asset.status])}>
                      {asset.status}
                    </Badge>
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

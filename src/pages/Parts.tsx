import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const parts = [
  { id: "PT-001", name: "Rolamento 6205-2RS", category: "Rolamentos", stock: 2, min: 5, max: 20, unit: "un", status: "Crítico" },
  { id: "PT-002", name: "Correia A-68", category: "Correias", stock: 12, min: 5, max: 30, unit: "un", status: "Normal" },
  { id: "PT-003", name: "Óleo ISO VG 68", category: "Lubrificantes", stock: 45, min: 20, max: 100, unit: "L", status: "Normal" },
  { id: "PT-004", name: "Filtro de Ar Compressor", category: "Filtros", stock: 3, min: 4, max: 15, unit: "un", status: "Baixo" },
  { id: "PT-005", name: "Selo Mecânico 50mm", category: "Vedações", stock: 8, min: 3, max: 12, unit: "un", status: "Normal" },
  { id: "PT-006", name: "Fusível NH 160A", category: "Elétricos", stock: 1, min: 5, max: 20, unit: "un", status: "Crítico" },
];

const stockColors: Record<string, string> = {
  Normal: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Baixo: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  Crítico: "bg-destructive/10 text-destructive",
};

export default function Parts() {
  const [search, setSearch] = useState("");
  const filtered = parts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Peças e Estoque</h2>
          <p className="text-sm text-muted-foreground">{parts.length} itens em estoque</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Nova Peça</Button>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Package className="h-4 w-4" />Inventário</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar peça..." className="pl-9 h-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead className="text-right">Mín</TableHead>
                <TableHead className="text-right">Máx</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.stock} {p.unit}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.min}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.max}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("text-xs", stockColors[p.status])}>{p.status}</Badge>
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

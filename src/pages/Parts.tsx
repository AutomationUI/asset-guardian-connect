import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useParts } from "@/hooks/useParts";
import type { Enums } from "@/integrations/supabase/types";

const stockColors: Record<Enums<"part_status">, string> = {
  Normal: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Baixo: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  Crítico: "bg-destructive/10 text-destructive",
};

export default function Parts() {
  const [search, setSearch] = useState("");
  const { data: parts, isLoading, error } = useParts();

  const filtered = (parts ?? []).filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Peças e Estoque</h2>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Carregando..." : `${parts?.length ?? 0} itens em estoque`}
          </p>
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
          {error && (
            <p className="text-sm text-destructive py-4">Erro ao carregar peças. Verifique se você está autenticado.</p>
          )}
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    {search ? "Nenhuma peça encontrada." : "Nenhuma peça cadastrada."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.code}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category ?? "—"}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.stock} {p.unit}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.min_stock}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.max_stock}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("text-xs", stockColors[p.status])}>{p.status}</Badge>
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

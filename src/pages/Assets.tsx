import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Factory } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAssets } from "@/hooks/useAssets";
import { CreateAssetDialog } from "@/components/forms/CreateAssetDialog";
import { Constants } from "@/integrations/supabase/types";
import type { Enums } from "@/integrations/supabase/types";

const critColors: Record<Enums<"asset_criticality">, string> = {
  A: "bg-destructive/10 text-destructive border-destructive/20",
  B: "bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,40%)] border-[hsl(38,92%,50%)]/20",
  C: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<Enums<"asset_status">, string> = {
  Operacional: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Parado: "bg-destructive/10 text-destructive",
  "Em Manutenção": "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
};

export default function Assets() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [critFilter, setCritFilter] = useState<string>("all");
  const { data: assets, isLoading, error } = useAssets();

  const filtered = (assets ?? []).filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchCrit = critFilter === "all" || a.criticality === critFilter;
    return matchSearch && matchStatus && matchCrit;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Ativos</h2>
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Carregando..." : `${assets?.length ?? 0} equipamentos cadastrados`}
          </p>
        </div>
        <CreateAssetDialog />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Lista de Equipamentos</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar ativo..." className="pl-9 h-9 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {Constants.public.Enums.asset_status.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={critFilter} onValueChange={setCritFilter}>
                <SelectTrigger className="h-9 w-40"><SelectValue placeholder="Criticidade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {Constants.public.Enums.asset_criticality.map((c) => (
                    <SelectItem key={c} value={c}>Criticidade {c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-destructive py-4">Erro ao carregar ativos. Verifique se você está autenticado.</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Criticidade</TableHead>
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
                    {search || statusFilter !== "all" || critFilter !== "all" ? "Nenhum ativo encontrado com esses filtros." : "Nenhum ativo cadastrado ainda."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((asset) => (
                  <TableRow key={asset.id} className="cursor-pointer">
                    <TableCell className="font-medium">{asset.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4 text-muted-foreground" />
                        {asset.name}
                      </div>
                    </TableCell>
                    <TableCell>{asset.location ?? "—"}</TableCell>
                    <TableCell>{asset.category ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs", critColors[asset.criticality])}>{asset.criticality}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn("text-xs", statusColors[asset.status])}>{asset.status}</Badge>
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

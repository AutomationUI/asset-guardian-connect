import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Users as UsersIcon } from "lucide-react";

const users = [
  { id: 1, name: "Admin Sistema", email: "admin@maintcontrol.com", role: "Admin", status: "Ativo" },
  { id: 2, name: "Carlos Mendes", email: "carlos.mendes@empresa.com", role: "Técnico", status: "Ativo" },
  { id: 3, name: "Ana Ribeiro", email: "ana.ribeiro@empresa.com", role: "PCM", status: "Ativo" },
  { id: 4, name: "Pedro Alves", email: "pedro.alves@empresa.com", role: "Técnico", status: "Ativo" },
  { id: 5, name: "Maria Costa", email: "maria.costa@empresa.com", role: "Supervisor", status: "Ativo" },
  { id: 6, name: "Roberto Silva", email: "roberto.silva@empresa.com", role: "Solicitante", status: "Ativo" },
  { id: 7, name: "Fernanda Souza", email: "fernanda.souza@empresa.com", role: "Almoxarife", status: "Inativo" },
];

const roleColors: Record<string, string> = {
  Admin: "bg-primary/10 text-primary",
  PCM: "bg-[hsl(270,50%,50%)]/10 text-[hsl(270,50%,45%)]",
  Supervisor: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  "Técnico": "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  Almoxarife: "bg-muted text-muted-foreground",
  Solicitante: "bg-secondary text-secondary-foreground",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Usuários</h2>
          <p className="text-sm text-muted-foreground">{users.length} usuários cadastrados</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Novo Usuário</Button>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><UsersIcon className="h-4 w-4" />Gerenciar Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} className="cursor-pointer">
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell><Badge variant="secondary" className={`text-xs ${roleColors[u.role] || ""}`}>{u.role}</Badge></TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs ${u.status === "Ativo" ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" : "bg-muted text-muted-foreground"}`}>
                      {u.status}
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

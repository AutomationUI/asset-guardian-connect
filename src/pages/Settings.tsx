import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Database, Shield } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold">Configurações</h2>
        <p className="text-sm text-muted-foreground">Ajustes gerais do sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><SettingsIcon className="h-4 w-4" />Geral</CardTitle>
          <CardDescription>Informações da empresa e sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Nome da Empresa</Label>
              <Input id="company" defaultValue="Indústria ABC Ltda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" defaultValue="12.345.678/0001-90" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" />Notificações</CardTitle>
          <CardDescription>Configurações de alertas e avisos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Alertas de máquina parada", desc: "Notificação em tempo real", defaultChecked: true },
            { label: "Plano preventivo vencido", desc: "Alerta quando uma manutenção atrasa", defaultChecked: true },
            { label: "Estoque abaixo do mínimo", desc: "Aviso de reposição necessária", defaultChecked: true },
            { label: "OS aprovada/rejeitada", desc: "Notificação sobre aprovações", defaultChecked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Database className="h-4 w-4" />Integração ERP</CardTitle>
          <CardDescription>Conexão com Protheus / SAP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="erp-url">URL do ERP</Label>
            <Input id="erp-url" placeholder="https://erp.empresa.com/api" />
          </div>
          <Button variant="outline">Testar Conexão</Button>
        </CardContent>
      </Card>
    </div>
  );
}

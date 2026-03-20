import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, FileSpreadsheet } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from "recharts";

const costData = [
  { month: "Jan", maodeobra: 12400, pecas: 8200, servicos: 3100 },
  { month: "Fev", maodeobra: 11800, pecas: 6500, servicos: 4200 },
  { month: "Mar", maodeobra: 14200, pecas: 9800, servicos: 2800 },
  { month: "Abr", maodeobra: 10500, pecas: 7100, servicos: 5400 },
  { month: "Mai", maodeobra: 13100, pecas: 8900, servicos: 3600 },
  { month: "Jun", maodeobra: 12800, pecas: 7400, servicos: 4100 },
];

const typeData = [
  { name: "Preventiva", value: 55, color: "hsl(217, 72%, 46%)" },
  { name: "Corretiva", value: 30, color: "hsl(38, 92%, 50%)" },
  { name: "Preditiva", value: 10, color: "hsl(142, 72%, 29%)" },
  { name: "Melhoria", value: 5, color: "hsl(270, 50%, 50%)" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Relatórios</h2>
          <p className="text-sm text-muted-foreground">Análises e exportações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" />PDF</Button>
          <Button variant="outline" size="sm"><FileSpreadsheet className="mr-2 h-4 w-4" />Excel</Button>
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />CSV</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Custos por Mês (R$)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
                <Legend />
                <Bar dataKey="maodeobra" fill="hsl(217, 72%, 46%)" radius={[3, 3, 0, 0]} name="Mão de Obra" />
                <Bar dataKey="pecas" fill="hsl(38, 92%, 50%)" radius={[3, 3, 0, 0]} name="Peças" />
                <Bar dataKey="servicos" fill="hsl(142, 72%, 29%)" radius={[3, 3, 0, 0]} name="Serviços" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Distribuição por Tipo de Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                  {typeData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

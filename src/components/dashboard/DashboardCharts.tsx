import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "Jan", preventivas: 24, corretivas: 12 },
  { month: "Fev", preventivas: 28, corretivas: 8 },
  { month: "Mar", preventivas: 32, corretivas: 15 },
  { month: "Abr", preventivas: 26, corretivas: 10 },
  { month: "Mai", preventivas: 30, corretivas: 7 },
  { month: "Jun", preventivas: 35, corretivas: 11 },
];

const statusData = [
  { name: "Concluída", value: 48, color: "hsl(142, 72%, 29%)" },
  { name: "Em Andamento", value: 18, color: "hsl(217, 72%, 46%)" },
  { name: "Pendente", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "Atrasada", value: 5, color: "hsl(0, 72%, 51%)" },
];

const availabilityData = [
  { month: "Jan", disponibilidade: 94.2 },
  { month: "Fev", disponibilidade: 96.1 },
  { month: "Mar", disponibilidade: 91.8 },
  { month: "Abr", disponibilidade: 95.5 },
  { month: "Mai", disponibilidade: 97.3 },
  { month: "Jun", disponibilidade: 96.8 },
];

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* OS por Mês */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Ordens de Serviço por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 46%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(214, 20%, 90%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Legend />
              <Bar dataKey="preventivas" fill="hsl(217, 72%, 46%)" radius={[4, 4, 0, 0]} name="Preventivas" />
              <Bar dataKey="corretivas" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Corretivas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status das OS */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Status das OS</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Disponibilidade */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Disponibilidade dos Equipamentos (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={availabilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 46%)" />
              <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 46%)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="disponibilidade"
                stroke="hsl(142, 72%, 29%)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Disponibilidade %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

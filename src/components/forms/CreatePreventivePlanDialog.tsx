import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useCreatePreventivePlan } from "@/hooks/usePreventivePlans";
import { useAssets } from "@/hooks/useAssets";
import { Constants } from "@/integrations/supabase/types";
import { toast } from "sonner";

export function CreatePreventivePlanDialog() {
  const [open, setOpen] = useState(false);
  const createPlan = useCreatePreventivePlan();
  const { data: assets } = useAssets();
  const [form, setForm] = useState({
    code: "", name: "", description: "",
    frequency: "Mensal" as any,
    next_date: "", asset_id: "", estimated_hours: "", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim() || !form.next_date) {
      toast.error("Código, nome e próxima data são obrigatórios.");
      return;
    }
    try {
      await createPlan.mutateAsync({
        code: form.code,
        name: form.name,
        description: form.description || null,
        frequency: form.frequency,
        next_date: form.next_date,
        asset_id: form.asset_id || null,
        estimated_hours: form.estimated_hours ? Number(form.estimated_hours) : null,
        notes: form.notes || null,
      });
      toast.success("Plano preventivo criado!");
      setOpen(false);
      setForm({ code: "", name: "", description: "", frequency: "Mensal", next_date: "", asset_id: "", estimated_hours: "", notes: "" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar plano.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" />Novo Plano</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Plano Preventivo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Código *</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="PP-001" maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Lubrificação geral" maxLength={100} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select value={form.frequency} onValueChange={(v) => setForm({ ...form, frequency: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.preventive_frequency.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Próxima data *</Label>
              <Input type="date" value={form.next_date} onChange={(e) => setForm({ ...form, next_date: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Ativo</Label>
            <Select value={form.asset_id} onValueChange={(v) => setForm({ ...form, asset_id: v })}>
              <SelectTrigger><SelectValue placeholder="Selecione um ativo" /></SelectTrigger>
              <SelectContent>
                {(assets ?? []).map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.code} — {a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Horas estimadas</Label>
            <Input type="number" min="0" step="0.5" value={form.estimated_hours} onChange={(e) => setForm({ ...form, estimated_hours: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} maxLength={1000} />
          </div>
          <Button type="submit" className="w-full" disabled={createPlan.isPending}>
            {createPlan.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar Plano
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

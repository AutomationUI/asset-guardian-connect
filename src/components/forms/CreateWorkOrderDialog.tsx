import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useCreateWorkOrder } from "@/hooks/useWorkOrders";
import { useAssets } from "@/hooks/useAssets";
import { Constants } from "@/integrations/supabase/types";
import { toast } from "sonner";

export function CreateWorkOrderDialog() {
  const [open, setOpen] = useState(false);
  const createWO = useCreateWorkOrder();
  const { data: assets } = useAssets();
  const [form, setForm] = useState({
    code: "",
    title: "",
    description: "",
    type: "Corretiva" as "Corretiva" | "Preventiva" | "Preditiva",
    priority: "Média" as "Urgente" | "Alta" | "Média" | "Baixa",
    asset_id: "",
    estimated_hours: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.title.trim()) {
      toast.error("Código e título são obrigatórios.");
      return;
    }
    try {
      await createWO.mutateAsync({
        code: form.code,
        title: form.title,
        description: form.description || null,
        type: form.type,
        priority: form.priority,
        asset_id: form.asset_id || null,
        estimated_hours: form.estimated_hours ? Number(form.estimated_hours) : null,
      });
      toast.success("Ordem de serviço criada!");
      setOpen(false);
      setForm({ code: "", title: "", description: "", type: "Corretiva", priority: "Média", asset_id: "", estimated_hours: "" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar OS.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" />Nova OS</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Ordem de Serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Código *</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="OS-001" maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Título *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Reparo compressor" maxLength={200} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.work_order_type.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.work_order_priority.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <Button type="submit" className="w-full" disabled={createWO.isPending}>
            {createWO.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar OS
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useCreatePart } from "@/hooks/useParts";
import { toast } from "sonner";

export function CreatePartDialog() {
  const [open, setOpen] = useState(false);
  const createPart = useCreatePart();
  const [form, setForm] = useState({
    code: "", name: "", category: "", unit: "un", stock: "0",
    min_stock: "0", max_stock: "0", unit_cost: "", supplier: "", location: "", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim()) {
      toast.error("Código e nome são obrigatórios.");
      return;
    }
    try {
      await createPart.mutateAsync({
        code: form.code,
        name: form.name,
        category: form.category || null,
        unit: form.unit || "un",
        stock: Number(form.stock) || 0,
        min_stock: Number(form.min_stock) || 0,
        max_stock: Number(form.max_stock) || 0,
        unit_cost: form.unit_cost ? Number(form.unit_cost) : null,
        supplier: form.supplier || null,
        location: form.location || null,
        notes: form.notes || null,
      });
      toast.success("Peça criada com sucesso!");
      setOpen(false);
      setForm({ code: "", name: "", category: "", unit: "un", stock: "0", min_stock: "0", max_stock: "0", unit_cost: "", supplier: "", location: "", notes: "" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar peça.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" />Nova Peça</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Peça</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Código *</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="PÇ-001" maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Rolamento 6205" maxLength={100} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Estoque</Label>
              <Input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Mínimo</Label>
              <Input type="number" min="0" value={form.min_stock} onChange={(e) => setForm({ ...form, min_stock: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Máximo</Label>
              <Input type="number" min="0" value={form.max_stock} onChange={(e) => setForm({ ...form, max_stock: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Unidade</Label>
              <Input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="un" />
            </div>
            <div className="space-y-2">
              <Label>Custo unitário</Label>
              <Input type="number" min="0" step="0.01" value={form.unit_cost} onChange={(e) => setForm({ ...form, unit_cost: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Fornecedor</Label>
              <Input value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} maxLength={1000} />
          </div>
          <Button type="submit" className="w-full" disabled={createPart.isPending}>
            {createPart.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar Peça
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

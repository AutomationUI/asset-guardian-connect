import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useCreateAsset } from "@/hooks/useAssets";
import { Constants } from "@/integrations/supabase/types";
import { toast } from "sonner";

export function CreateAssetDialog() {
  const [open, setOpen] = useState(false);
  const createAsset = useCreateAsset();
  const [form, setForm] = useState({
    code: "",
    name: "",
    location: "",
    category: "",
    criticality: "C" as "A" | "B" | "C",
    status: "Operacional" as "Operacional" | "Em Manutenção" | "Parado",
    manufacturer: "",
    model: "",
    serial_number: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim()) {
      toast.error("Código e nome são obrigatórios.");
      return;
    }
    try {
      await createAsset.mutateAsync({
        code: form.code,
        name: form.name,
        location: form.location || null,
        category: form.category || null,
        criticality: form.criticality,
        status: form.status,
        manufacturer: form.manufacturer || null,
        model: form.model || null,
        serial_number: form.serial_number || null,
        notes: form.notes || null,
      });
      toast.success("Ativo criado com sucesso!");
      setOpen(false);
      setForm({ code: "", name: "", location: "", category: "", criticality: "C", status: "Operacional", manufacturer: "", model: "", serial_number: "", notes: "" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar ativo.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" />Novo Ativo</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Ativo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Código *</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="EQ-001" maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Compressor GA-55" maxLength={100} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Localização</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Área 1" />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Compressores" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Criticidade</Label>
              <Select value={form.criticality} onValueChange={(v) => setForm({ ...form, criticality: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.asset_criticality.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.asset_status.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fabricante</Label>
              <Input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Modelo</Label>
              <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nº de Série</Label>
            <Input value={form.serial_number} onChange={(e) => setForm({ ...form, serial_number: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} maxLength={1000} />
          </div>
          <Button type="submit" className="w-full" disabled={createAsset.isPending}>
            {createAsset.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar Ativo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

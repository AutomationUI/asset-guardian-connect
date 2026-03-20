import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type PreventivePlan = Tables<"preventive_plans">;

export function usePreventivePlans() {
  return useQuery({
    queryKey: ["preventive_plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("preventive_plans")
        .select("*, assets(name, code)")
        .order("next_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreatePreventivePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (plan: TablesInsert<"preventive_plans">) => {
      const { data, error } = await supabase.from("preventive_plans").insert(plan).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["preventive_plans"] }),
  });
}

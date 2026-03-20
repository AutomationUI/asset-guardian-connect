import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Asset = Tables<"assets">;

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .order("code", { ascending: true });
      if (error) throw error;
      return data as Asset[];
    },
  });
}

export function useCreateAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (asset: TablesInsert<"assets">) => {
      const { data, error } = await supabase.from("assets").insert(asset).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["assets"] }),
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Part = Tables<"parts">;

export function useParts() {
  return useQuery({
    queryKey: ["parts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parts")
        .select("*")
        .order("code", { ascending: true });
      if (error) throw error;
      return data as Part[];
    },
  });
}

export function useCreatePart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (part: TablesInsert<"parts">) => {
      const { data, error } = await supabase.from("parts").insert(part).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parts"] }),
  });
}

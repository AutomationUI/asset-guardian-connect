export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      assets: {
        Row: {
          category: string | null
          code: string
          created_at: string
          criticality: Database["public"]["Enums"]["asset_criticality"]
          id: string
          install_date: string | null
          location: string | null
          manufacturer: string | null
          model: string | null
          name: string
          notes: string | null
          serial_number: string | null
          status: Database["public"]["Enums"]["asset_status"]
          updated_at: string
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string
          criticality?: Database["public"]["Enums"]["asset_criticality"]
          id?: string
          install_date?: string | null
          location?: string | null
          manufacturer?: string | null
          model?: string | null
          name: string
          notes?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["asset_status"]
          updated_at?: string
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string
          criticality?: Database["public"]["Enums"]["asset_criticality"]
          id?: string
          install_date?: string | null
          location?: string | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          notes?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["asset_status"]
          updated_at?: string
        }
        Relationships: []
      }
      parts: {
        Row: {
          category: string | null
          code: string
          created_at: string
          id: string
          location: string | null
          max_stock: number
          min_stock: number
          name: string
          notes: string | null
          status: Database["public"]["Enums"]["part_status"]
          stock: number
          supplier: string | null
          unit: string
          unit_cost: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string
          id?: string
          location?: string | null
          max_stock?: number
          min_stock?: number
          name: string
          notes?: string | null
          status?: Database["public"]["Enums"]["part_status"]
          stock?: number
          supplier?: string | null
          unit?: string
          unit_cost?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string
          id?: string
          location?: string | null
          max_stock?: number
          min_stock?: number
          name?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["part_status"]
          stock?: number
          supplier?: string | null
          unit?: string
          unit_cost?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      preventive_plans: {
        Row: {
          asset_id: string | null
          checklist: Json | null
          code: string
          created_at: string
          description: string | null
          estimated_hours: number | null
          frequency: Database["public"]["Enums"]["preventive_frequency"]
          id: string
          last_executed: string | null
          name: string
          next_date: string
          notes: string | null
          responsible: string | null
          status: Database["public"]["Enums"]["preventive_status"]
          updated_at: string
        }
        Insert: {
          asset_id?: string | null
          checklist?: Json | null
          code: string
          created_at?: string
          description?: string | null
          estimated_hours?: number | null
          frequency?: Database["public"]["Enums"]["preventive_frequency"]
          id?: string
          last_executed?: string | null
          name: string
          next_date: string
          notes?: string | null
          responsible?: string | null
          status?: Database["public"]["Enums"]["preventive_status"]
          updated_at?: string
        }
        Update: {
          asset_id?: string | null
          checklist?: Json | null
          code?: string
          created_at?: string
          description?: string | null
          estimated_hours?: number | null
          frequency?: Database["public"]["Enums"]["preventive_frequency"]
          id?: string
          last_executed?: string | null
          name?: string
          next_date?: string
          notes?: string | null
          responsible?: string | null
          status?: Database["public"]["Enums"]["preventive_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "preventive_plans_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "preventive_plans_responsible_fkey"
            columns: ["responsible"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      work_orders: {
        Row: {
          actual_hours: number | null
          asset_id: string | null
          assigned_to: string | null
          code: string
          completed_at: string | null
          cost: number | null
          created_at: string
          description: string | null
          estimated_hours: number | null
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["work_order_priority"]
          requested_by: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["work_order_status"]
          title: string
          type: Database["public"]["Enums"]["work_order_type"]
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          asset_id?: string | null
          assigned_to?: string | null
          code: string
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          estimated_hours?: number | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["work_order_priority"]
          requested_by?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["work_order_status"]
          title: string
          type?: Database["public"]["Enums"]["work_order_type"]
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          asset_id?: string | null
          assigned_to?: string | null
          code?: string
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          estimated_hours?: number | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["work_order_priority"]
          requested_by?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["work_order_status"]
          title?: string
          type?: Database["public"]["Enums"]["work_order_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      asset_criticality: "A" | "B" | "C"
      asset_status: "Operacional" | "Em Manutenção" | "Parado"
      part_status: "Normal" | "Baixo" | "Crítico"
      preventive_frequency:
        | "Diária"
        | "Semanal"
        | "Quinzenal"
        | "Mensal"
        | "Trimestral"
        | "Semestral"
        | "Anual"
      preventive_status: "No Prazo" | "Próximo" | "Vencido"
      work_order_priority: "Urgente" | "Alta" | "Média" | "Baixa"
      work_order_status: "Aberta" | "Em Andamento" | "Concluída" | "Cancelada"
      work_order_type: "Corretiva" | "Preventiva" | "Preditiva"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_criticality: ["A", "B", "C"],
      asset_status: ["Operacional", "Em Manutenção", "Parado"],
      part_status: ["Normal", "Baixo", "Crítico"],
      preventive_frequency: [
        "Diária",
        "Semanal",
        "Quinzenal",
        "Mensal",
        "Trimestral",
        "Semestral",
        "Anual",
      ],
      preventive_status: ["No Prazo", "Próximo", "Vencido"],
      work_order_priority: ["Urgente", "Alta", "Média", "Baixa"],
      work_order_status: ["Aberta", "Em Andamento", "Concluída", "Cancelada"],
      work_order_type: ["Corretiva", "Preventiva", "Preditiva"],
    },
  },
} as const

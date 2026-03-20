
-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE public.asset_criticality AS ENUM ('A', 'B', 'C');
CREATE TYPE public.asset_status AS ENUM ('Operacional', 'Em Manutenção', 'Parado');
CREATE TYPE public.work_order_status AS ENUM ('Aberta', 'Em Andamento', 'Concluída', 'Cancelada');
CREATE TYPE public.work_order_priority AS ENUM ('Urgente', 'Alta', 'Média', 'Baixa');
CREATE TYPE public.work_order_type AS ENUM ('Corretiva', 'Preventiva', 'Preditiva');
CREATE TYPE public.part_status AS ENUM ('Normal', 'Baixo', 'Crítico');
CREATE TYPE public.preventive_status AS ENUM ('No Prazo', 'Próximo', 'Vencido');
CREATE TYPE public.preventive_frequency AS ENUM ('Diária', 'Semanal', 'Quinzenal', 'Mensal', 'Trimestral', 'Semestral', 'Anual');

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ASSETS TABLE
-- ============================================
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  location TEXT,
  criticality public.asset_criticality NOT NULL DEFAULT 'C',
  status public.asset_status NOT NULL DEFAULT 'Operacional',
  category TEXT,
  manufacturer TEXT,
  model TEXT,
  serial_number TEXT,
  install_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view assets" ON public.assets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert assets" ON public.assets FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update assets" ON public.assets FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete assets" ON public.assets FOR DELETE TO authenticated USING (true);

-- ============================================
-- WORK ORDERS TABLE
-- ============================================
CREATE TABLE public.work_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
  type public.work_order_type NOT NULL DEFAULT 'Corretiva',
  priority public.work_order_priority NOT NULL DEFAULT 'Média',
  status public.work_order_status NOT NULL DEFAULT 'Aberta',
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  requested_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  estimated_hours NUMERIC(6,2),
  actual_hours NUMERIC(6,2),
  cost NUMERIC(12,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view work_orders" ON public.work_orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert work_orders" ON public.work_orders FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update work_orders" ON public.work_orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete work_orders" ON public.work_orders FOR DELETE TO authenticated USING (true);

-- ============================================
-- PARTS TABLE
-- ============================================
CREATE TABLE public.parts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  max_stock INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'un',
  status public.part_status NOT NULL DEFAULT 'Normal',
  unit_cost NUMERIC(12,2),
  location TEXT,
  supplier TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view parts" ON public.parts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert parts" ON public.parts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update parts" ON public.parts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete parts" ON public.parts FOR DELETE TO authenticated USING (true);

-- ============================================
-- PREVENTIVE PLANS TABLE
-- ============================================
CREATE TABLE public.preventive_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
  frequency public.preventive_frequency NOT NULL DEFAULT 'Mensal',
  next_date DATE NOT NULL,
  last_executed DATE,
  status public.preventive_status NOT NULL DEFAULT 'No Prazo',
  description TEXT,
  checklist JSONB,
  responsible UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  estimated_hours NUMERIC(6,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.preventive_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view preventive_plans" ON public.preventive_plans FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert preventive_plans" ON public.preventive_plans FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update preventive_plans" ON public.preventive_plans FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete preventive_plans" ON public.preventive_plans FOR DELETE TO authenticated USING (true);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON public.assets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON public.work_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON public.parts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_preventive_plans_updated_at BEFORE UPDATE ON public.preventive_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_assets_code ON public.assets(code);
CREATE INDEX idx_assets_status ON public.assets(status);
CREATE INDEX idx_work_orders_code ON public.work_orders(code);
CREATE INDEX idx_work_orders_status ON public.work_orders(status);
CREATE INDEX idx_work_orders_asset ON public.work_orders(asset_id);
CREATE INDEX idx_parts_code ON public.parts(code);
CREATE INDEX idx_parts_status ON public.parts(status);
CREATE INDEX idx_preventive_plans_code ON public.preventive_plans(code);
CREATE INDEX idx_preventive_plans_next_date ON public.preventive_plans(next_date);
CREATE INDEX idx_preventive_plans_asset ON public.preventive_plans(asset_id);

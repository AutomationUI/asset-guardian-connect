
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_PUBLISHABLE_KEY não encontrados no .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log(`Testando conexão com: ${supabaseUrl}`);

    const { data, error } = await supabase.from('profiles').select('*').limit(1);

    if (error) {
        if (error.code === 'PGRST116') {
            console.log("✅ Conexão estabelecida! (A tabela 'profiles' existe, mas está vazia).");
        } else if (error.message.includes('relation "public.profiles" does not exist')) {
            console.error("❌ Erro: A tabela 'profiles' não existe. Você precisa rodar o script SQL no dashboard do Supabase.");
        } else {
            console.error("❌ Erro na conexão:", error.message);
        }
    } else {
        console.log("✅ Conexão estabelecida com sucesso! Tabelas encontradas.");
    }
}

testConnection();

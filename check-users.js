// Script para listar usuários do Supabase
// Execute: node check-users.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfbrkbksutzfinwpkeod.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYnJrYmtzdXR6Zmlud3BrZW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1OTIzMTEsImV4cCI6MjA4NDE2ODMxMX0.7W4OCjUaaqmBul6u8xs4-f5_Mm2bpDlZr1VqTDvEwY8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
  console.log('\n🔍 Consultando usuários...\n');
  
  // Buscar perfis (que contém informações dos usuários)
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Erro ao buscar usuários:', error.message);
    return;
  }

  if (!profiles || profiles.length === 0) {
    console.log('⚠️  Nenhum usuário encontrado no banco de dados.\n');
    console.log('💡 Você precisa criar sua primeira conta através da página de registro.\n');
    return;
  }

  console.log(`✅ ${profiles.length} usuário(s) encontrado(s):\n`);
  console.log('─'.repeat(80));
  
  for (const profile of profiles) {
    console.log(`📧 Email: (verificar na tabela auth.users com id: ${profile.id})`);
    console.log(`👤 Nome: ${profile.full_name || 'N/A'}`);
    console.log(`🏢 Departamento: ${profile.department || 'N/A'}`);
    console.log(`📅 Criado em: ${new Date(profile.created_at).toLocaleString('pt-BR')}`);
    console.log('─'.repeat(80));
  }

  // Buscar roles dos usuários
  console.log('\n🔐 Roles dos usuários:\n');
  const { data: roles, error: rolesError } = await supabase
    .from('user_roles')
    .select('user_id, role');

  if (!rolesError && roles && roles.length > 0) {
    for (const role of roles) {
      const user = profiles.find(p => p.id === role.user_id);
      console.log(`👤 ${user?.full_name || 'Usuário'}: ${role.role}`);
    }
  } else {
    console.log('⚠️  Nenhuma role atribuída ainda.');
  }

  console.log('\n' + '='.repeat(80));
  console.log('⚠️  IMPORTANTE SOBRE SENHAS:');
  console.log('='.repeat(80));
  console.log('As senhas NÃO podem ser recuperadas do banco de dados!');
  console.log('Elas são armazenadas com hash bcrypt por segurança.\n');
  console.log('ALTERNATIVAS:');
  console.log('1. Se você lembra do email, use "Esqueci minha senha" no login');
  console.log('2. Crie uma nova conta de teste através da página de registro');
  console.log('3. Acesse o Supabase Dashboard para resetar a senha:');
  console.log('   https://supabase.com/dashboard/project/vfbrkbksutzfinwpkeod/auth/users');
  console.log('='.repeat(80) + '\n');
}

checkUsers();

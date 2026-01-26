-- Corrigir RLS para tabela users - permitir acesso do próprio usuário

-- Remover policies antigas
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Criar policies corretas - converter auth.uid() para text
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (
  auth.uid()::text = id
);

CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (
  auth.uid()::text = id
);

CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (
  auth.uid()::text = id
);

-- Verificar se RLS está habilitado
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Adicionar policy para leitura do próprio usuário
CREATE POLICY "Users can read own profile" ON users FOR SELECT USING (
  auth.uid()::text = id
);

-- Verificar se a policy foi criada
SELECT * FROM pg_policies WHERE tablename = 'users';

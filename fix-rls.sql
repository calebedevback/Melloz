-- Corrigir RLS (Row Level Security) para todas as tabelas
-- Isso garante que só usuários autenticados possam acessar os dados

-- Tabela events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view events" ON events;
CREATE POLICY "Users can view events" ON events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own events" ON events FOR UPDATE USING (auth.uid() = "events"."createdby");
CREATE POLICY "Users can delete own events" ON events FOR DELETE USING (auth.uid() = "events"."createdby");

-- Tabela users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view profiles" ON users;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Tabela event_attendees
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage event attendees" ON event_attendees;
CREATE POLICY "Users can manage event attendees" ON event_attendees FOR ALL USING (auth.role() = 'authenticated');

-- Tabela profiles (se existir)
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Users can view profiles" ON profiles;
-- CREATE POLICY "Users can view profiles" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
-- CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Simples - sem referenciar colunas específicas
-- Isso remove o acesso público e permite apenas usuários autenticados

-- Tabela events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON events;
CREATE POLICY "Enable all for authenticated users" ON events FOR ALL USING (auth.role() = 'authenticated');

-- Tabela users  
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON users;
CREATE POLICY "Enable all for authenticated users" ON users FOR ALL USING (auth.role() = 'authenticated');

-- Tabela event_attendees
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON event_attendees;
CREATE POLICY "Enable all for authenticated users" ON event_attendees FOR ALL USING (auth.role() = 'authenticated');

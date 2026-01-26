-- Inserir evento mínimo - só campos básicos
INSERT INTO events (id, title, description, location, date, vibe, createdby) 
VALUES 
  ('evt_1', 'Open Bar Eletrônico', 'Festa com DJs', 'Vila Madalena', 'weekend', 'Eletrônico', 'user_1');

-- Inserir usuário mínimo
INSERT INTO users (id, email, name) 
VALUES 
  ('user_1', 'gabrielcalebe58@gmail.com', 'Gabriel');

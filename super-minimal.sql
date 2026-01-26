-- Inserir evento sem createdby - só campos obrigatórios
INSERT INTO events (id, title, description, location, date, vibe) 
VALUES 
  ('evt_1', 'Open Bar Eletrônico', 'Festa com DJs', 'Vila Madalena', 'weekend', 'Eletrônico');

-- Inserir usuário básico
INSERT INTO users (id, email, name) 
VALUES 
  ('user_1', 'gabrielcalebe58@gmail.com', 'Gabriel');

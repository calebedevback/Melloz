-- SQL FINAL CORRETO - usuários PRIMEIRO, depois eventos
-- Inserir usuários com timestamps e password
INSERT INTO users (id, email, password, name, avatar, "isPremium", vibes, "createdAt", "updatedAt") VALUES 
  ('user_1', 'gabrielcalebe58@gmail.com', 'password123', 'Gabriel', 'https://picsum.photos/100/100?random=1', false, ARRAY['Eletrônico', 'After'], NOW(), NOW()),
  ('user_2', 'test@example.com', 'password123', 'Maria', 'https://picsum.photos/100/100?random=2', true, ARRAY['Barzinho', 'Calmo'], NOW(), NOW()),
  ('user_3', 'joao@example.com', 'password123', 'João', 'https://picsum.photos/100/100?random=3', false, ARRAY['Underground', 'Agitado'], NOW(), NOW());

-- Agora inserir eventos (usuários já existem)
INSERT INTO events (id, title, description, location, "startTime", "endTime", date, vibe, "priceLevel", "confirmedCount", "isAfterHours", "isOfficial", "createdBy", "createdAt", "updatedAt") 
VALUES 
  ('evt_1', 'Open Bar Eletrônico', 'Festa com DJs renomados e drinks especiais', 'Vila Madalena, São Paulo', '22:00', '04:00', 'weekend', 'Eletrônico', 3, 25, false, true, 'user_1', NOW(), NOW()),
  ('evt_2', 'Happy Hour Barzinho', 'Drinks com desconto e música ambiente', 'Pinheiros, São Paulo', '18:00', '22:00', 'today', 'Barzinho', 2, 12, false, true, 'user_2', NOW(), NOW()),
  ('evt_3', 'After Hours Underground', 'Festa secreta até o amanhecer', 'Centro, São Paulo', '02:00', '08:00', 'weekend', 'Underground', 4, 8, true, false, 'user_3', NOW(), NOW());

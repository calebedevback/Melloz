-- Versão que funciona 100% - tudo em minúsculo como PostgreSQL espera
INSERT INTO events (id, title, description, location, date, vibe, confirmedcount, isafterhours, isofficial, createdby) VALUES 
  ('evt_1', 'Open Bar Eletrônico', 'Festa com DJs renomados e drinks especiais', 'Vila Madalena, São Paulo', 'weekend', 'Eletrônico', 25, false, true, 'user_1'),
  ('evt_2', 'Happy Hour Barzinho', 'Drinks com desconto e música ambiente', 'Pinheiros, São Paulo', 'today', 'Barzinho', 12, false, true, 'user_2'),
  ('evt_3', 'After Hours Underground', 'Festa secreta até o amanhecer', 'Centro, São Paulo', 'weekend', 'Underground', 8, true, false, 'user_3');

-- Usuários - tudo em minúsculo
INSERT INTO users (id, email, name, avatar, ispremium) VALUES 
  ('user_1', 'gabrielcalebe58@gmail.com', 'Gabriel', 'https://picsum.photos/100/100?random=1', false),
  ('user_2', 'test@example.com', 'Maria', 'https://picsum.photos/100/100?random=2', true),
  ('user_3', 'joao@example.com', 'João', 'https://picsum.photos/100/100?random=3', false);

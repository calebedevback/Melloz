-- Inserir alguns eventos de exemplo
INSERT INTO events (
  id, title, description, location, startTime, endTime, date, dateLabel, image, vibe, priceLevel, confirmedCount, isAfterHours, isOfficial, createdBy, friendsGoing
) VALUES 
  (
    'evt_1', 
    'Open Bar Eletrônico', 
    'Festa com DJs renomados e drinks especiais', 
    'Vila Madalena, São Paulo', 
    '22:00', 
    '04:00', 
    'weekend', 
    'Sábado, 18 Jan', 
    'https://picsum.photos/600/400?random=1', 
    'Eletrônico', 
    3, 
    25, 
    false, 
    true, 
    'user_1', 
    ARRAY['user_2', 'user_3']
  ),
  (
    'evt_2', 
    'Happy Hour Barzinho', 
    'Drinks com desconto e música ambiente', 
    'Pinheiros, São Paulo', 
    '18:00', 
    '22:00', 
    'today', 
    'Hoje', 
    'https://picsum.photos/600/400?random=2', 
    'Barzinho', 
    2, 
    12, 
    false, 
    true, 
    'user_2', 
    ARRAY['user_1']
  ),
  (
    'evt_3', 
    'After Hours Underground', 
    'Festa secreta até o amanhecer', 
    'Centro, São Paulo', 
    '02:00', 
    '08:00', 
    'weekend', 
    'Domingo, 19 Jan', 
    'https://picsum.photos/600/400?random=3', 
    'Underground', 
    4, 
    8, 
    true, 
    false, 
    'user_3', 
    ARRAY[]
  );

-- Inserir usuários de exemplo
INSERT INTO users (id, email, name, avatar, isPremium, vibes) VALUES 
  ('user_1', 'gabrielcalebe58@gmail.com', 'Gabriel', 'https://picsum.photos/100/100?random=1', false, ARRAY['Eletrônico', 'After']),
  ('user_2', 'test@example.com', 'Maria', 'https://picsum.photos/100/100?random=2', true, ARRAY['Barzinho', 'Calmo']),
  ('user_3', 'joao@example.com', 'João', 'https://picsum.photos/100/100?random=3', false, ARRAY['Underground', 'Agitado']);

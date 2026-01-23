import prisma from './config/database.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    // Limpar dados existentes
    await prisma.eventAttendee.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('🗑️  Dados anteriores limpos');

    // Criar usuários
    const users = await Promise.all([
      prisma.user.create({
        data: {
          name: 'Ana Silva',
          email: 'ana@melloz.com',
          password: await bcrypt.hash('password123', 10),
          avatar: 'https://picsum.photos/100/100?random=1',
          isPremium: true,
          vibes: ['Eletrônico', 'Underground'],
        },
      }),
      prisma.user.create({
        data: {
          name: 'Pedro',
          email: 'pedro@melloz.com',
          password: await bcrypt.hash('password123', 10),
          avatar: 'https://picsum.photos/100/100?random=2',
          isPremium: false,
          vibes: ['Barzinho', 'Calmo'],
        },
      }),
      prisma.user.create({
        data: {
          name: 'Julia',
          email: 'julia@melloz.com',
          password: await bcrypt.hash('password123', 10),
          avatar: 'https://picsum.photos/100/100?random=3',
          isPremium: true,
          vibes: ['Agitado'],
        },
      }),
      prisma.user.create({
        data: {
          name: 'Lucas',
          email: 'lucas@melloz.com',
          password: await bcrypt.hash('password123', 10),
          avatar: 'https://picsum.photos/100/100?random=4',
          isPremium: false,
          vibes: ['After'],
        },
      }),
      prisma.user.create({
        data: {
          name: 'Mari',
          email: 'mari@melloz.com',
          password: await bcrypt.hash('password123', 10),
          avatar: 'https://picsum.photos/100/100?random=5',
          isPremium: true,
          vibes: ['Underground'],
        },
      }),
    ]);

    console.log(`✅ ${users.length} usuários criados`);

    // Criar eventos
    const events = await Promise.all([
      prisma.event.create({
        data: {
          title: 'Sunset Rooftop',
          description: 'O pôr do sol mais bonito de SP com drinks autorais e house music fino.',
          location: 'Sky Bar, Pinheiros',
          startTime: '18:00',
          date: 'today',
          image: 'https://picsum.photos/600/400?random=10',
          vibe: 'Agitado',
          priceLevel: 3,
          confirmedCount: 1,
          isAfterHours: false,
          isOfficial: true,
          createdBy: users[0].id,
        },
      }),
      prisma.event.create({
        data: {
          title: 'Jazz & Wine',
          description: 'Noite de jazz clássico e carta de vinhos selecionada.',
          location: 'Porão do Jazz',
          startTime: '20:30',
          date: 'today',
          image: 'https://picsum.photos/600/400?random=11',
          vibe: 'Calmo',
          priceLevel: 2,
          confirmedCount: 1,
          isAfterHours: false,
          isOfficial: true,
          createdBy: users[2].id,
        },
      }),
      prisma.event.create({
        data: {
          title: 'Techno Bunker',
          description: 'Line-up pesado com atrações internacionais.',
          location: 'Galpão 9',
          startTime: '23:00',
          date: 'weekend',
          dateLabel: 'Sábado',
          image: 'https://picsum.photos/600/400?random=12',
          vibe: 'Eletrônico',
          priceLevel: 2,
          confirmedCount: 1,
          isAfterHours: false,
          isOfficial: true,
          createdBy: users[0].id,
        },
      }),
      prisma.event.create({
        data: {
          title: 'Secret After',
          description: 'Local exato liberado apenas para confirmados 1h antes.',
          location: 'Avenida Paulista',
          startTime: '04:00',
          date: 'today',
          image: 'https://picsum.photos/600/400?random=13',
          vibe: 'After',
          priceLevel: 1,
          confirmedCount: 1,
          isAfterHours: true,
          isOfficial: false,
          createdBy: users[4].id,
        },
      }),
      prisma.event.create({
        data: {
          title: 'Esquenta Universitário',
          description: 'Litrinho barato e mesa de bilhar.',
          location: 'Bar do Zé',
          startTime: '19:00',
          date: 'tomorrow',
          image: 'https://picsum.photos/600/400?random=14',
          vibe: 'Barzinho',
          priceLevel: 1,
          confirmedCount: 1,
          isAfterHours: false,
          isOfficial: false,
          createdBy: users[1].id,
        },
      }),
    ]);

    console.log(`✅ ${events.length} eventos criados`);

    // Criar alguns EventAttendees
    await Promise.all([
      prisma.eventAttendee.create({
        data: { eventId: events[0].id, userId: users[0].id },
      }),
      prisma.eventAttendee.create({
        data: { eventId: events[0].id, userId: users[1].id },
      }),
      prisma.eventAttendee.create({
        data: { eventId: events[2].id, userId: users[0].id },
      }),
      prisma.eventAttendee.create({
        data: { eventId: events[2].id, userId: users[3].id },
      }),
      prisma.eventAttendee.create({
        data: { eventId: events[2].id, userId: users[4].id },
      }),
    ]);

    console.log(`✅ EventAttendees criados`);

    console.log(`
╔════════════════════════════════════════╗
║   ✅ SEED CONCLUÍDO COM SUCESSO       ║
╠════════════════════════════════════════╣
║   Usuários criados: ${users.length}
║   Eventos criados: ${events.length}
║   
║   Usuário teste: ana@melloz.com
║   Senha: password123
╚════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante seed:', error);
    process.exit(1);
  }
};

seedDatabase();

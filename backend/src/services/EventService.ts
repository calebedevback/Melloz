import prisma from '../config/database.js';
import { IEvent } from '../models/Event.js';

export class EventService {
  async createEvent(eventData: any, userId: string) {
    const event = await prisma.event.create({
      data: {
        ...eventData,
        createdBy: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
    });

    // Adicionar o criador aos attendees
    await prisma.eventAttendee.create({
      data: {
        eventId: event.id,
        userId: userId,
      },
    });

    return event;
  }

  async getEvents(filters?: {
    date?: string;
    vibe?: string;
    location?: string;
    limit?: number;
    page?: number;
  }) {
    const where: any = {};
    
    if (filters?.date) where.date = filters.date;
    if (filters?.vibe) where.vibe = filters.vibe;
    if (filters?.location) where.location = { contains: filters.location, mode: 'insensitive' };

    const limit = filters?.limit || 10;
    const page = filters?.page || 1;
    const skip = (page - 1) * limit;

    const events = await prisma.event.findMany({
      where,
      take: limit,
      skip,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.event.count({ where });

    return {
      events,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async getEventById(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      throw new Error('Evento não encontrado');
    }

    return event;
  }

  async updateEvent(eventId: string, userId: string, data: Partial<IEvent>) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Evento não encontrado');
    }

    if (event.createdBy !== userId) {
      throw new Error('Apenas o criador pode editar o evento');
    }

    const updated = await prisma.event.update({
      where: { id: eventId },
      data,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
    });

    return updated;
  }

  async deleteEvent(eventId: string, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Evento não encontrado');
    }

    if (event.createdBy !== userId) {
      throw new Error('Apenas o criador pode deletar o evento');
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return { message: 'Evento deletado com sucesso' };
  }

  async joinEvent(eventId: string, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Evento não encontrado');
    }

    // Verificar se já está
    const existing = await prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!existing) {
      await prisma.eventAttendee.create({
        data: {
          eventId,
          userId,
        },
      });

      // Incrementar confirmados
      await prisma.event.update({
        where: { id: eventId },
        data: {
          confirmedCount: event.confirmedCount + 1,
        },
      });
    }

    const updated = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
    });

    return updated;
  }

  async leaveEvent(eventId: string, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Evento não encontrado');
    }

    // Deletar o attendee
    await prisma.eventAttendee.deleteMany({
      where: {
        eventId,
        userId,
      },
    });

    // Decrementar confirmados
    await prisma.event.update({
      where: { id: eventId },
      data: {
        confirmedCount: Math.max(0, event.confirmedCount - 1),
      },
    });

    const updated = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
    });

    return updated;
  }

  async getTrendingEvents(limit: number = 10) {
    return prisma.event.findMany({
      orderBy: { confirmedCount: 'desc' },
      take: limit,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isPremium: true,
          },
        },
        attendees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isPremium: true,
              },
            },
          },
        },
      },
    });
  }
}

export default new EventService();

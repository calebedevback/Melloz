import { Request, Response, NextFunction } from 'express';
import EventService from '../services/EventService.js';

export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const eventData = req.body;
      const event = await EventService.createEvent(eventData, userId);

      res.status(201).json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { date, vibe, location, limit, page } = req.query;

      const result = await EventService.getEvents({
        date: date as string,
        vibe: vibe as string,
        location: location as string,
        limit: limit ? parseInt(limit as string) : 10,
        page: page ? parseInt(page as string) : 1,
      });

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventService.getEventById(id);

      res.status(200).json(event);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { id } = req.params;
      const data = req.body;
      const event = await EventService.updateEvent(id, userId, data);

      res.status(200).json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { id } = req.params;
      const result = await EventService.deleteEvent(id, userId);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async joinEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { id } = req.params;
      const event = await EventService.joinEvent(id, userId);

      res.status(200).json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async leaveEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { id } = req.params;
      const event = await EventService.leaveEvent(id, userId);

      res.status(200).json(event);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTrendingEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit } = req.query;
      const events = await EventService.getTrendingEvents(
        limit ? parseInt(limit as string) : 10
      );

      res.status(200).json({ events });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new EventController();

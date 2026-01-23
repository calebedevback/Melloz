import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService.js';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
        return;
      }

      const result = await AuthService.register(email, password, name);
      res.status(201).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
      }

      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const user = await AuthService.getUserById(userId);
      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isPremium: user.isPremium,
          vibes: user.vibes,
        },
      });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId?.toString();
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { name, avatar, vibes } = req.body;
      const user = await AuthService.updateUser(userId, { name, avatar, vibes });

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isPremium: user.isPremium,
          vibes: user.vibes,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();

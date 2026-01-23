import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.post('/register', (req, res, next) => AuthController.register(req, res, next));
router.post('/login', (req, res, next) => AuthController.login(req, res, next));

// Rotas privadas (requer autenticação)
router.get('/me', authMiddleware, (req, res, next) => AuthController.getMe(req, res, next));
router.put('/profile', authMiddleware, (req, res, next) =>
  AuthController.updateProfile(req, res, next)
);

export default router;

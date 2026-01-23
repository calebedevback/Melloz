import express from 'express';
import EventController from '../controllers/EventController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.get('/', (req, res, next) => EventController.getEvents(req, res, next));
router.get('/trending', (req, res, next) => EventController.getTrendingEvents(req, res, next));
router.get('/:id', (req, res, next) => EventController.getEventById(req, res, next));

// Rotas privadas (requer autenticação)
router.post('/', authMiddleware, (req, res, next) => EventController.createEvent(req, res, next));
router.put('/:id', authMiddleware, (req, res, next) => EventController.updateEvent(req, res, next));
router.delete('/:id', authMiddleware, (req, res, next) => EventController.deleteEvent(req, res, next));

// Ações do evento
router.post('/:id/join', authMiddleware, (req, res, next) => EventController.joinEvent(req, res, next));
router.post('/:id/leave', authMiddleware, (req, res, next) => EventController.leaveEvent(req, res, next));

export default router;

import { Router } from 'express';
import { ingestEvents, getSession, getAllSessions } from '../controllers/eventsController';

const router = Router();

// POST /api/events - Ingest events from SDK
router.post('/events', ingestEvents);

// GET /api/sessions - Get all sessions
router.get('/sessions', getAllSessions);

// GET /api/sessions/:sessionId - Get single session with events
router.get('/sessions/:sessionId', getSession);

export default router;
import { Router } from 'express';
import { ingestEvents, getSession, getAllSessions } from '../controllers/eventsController';
import { analyzeSessionErrors, getSessionInsights } from '../controllers/aiController';

const router = Router();

// Events endpoints
router.post('/events', ingestEvents);
router.get('/sessions', getAllSessions);
router.get('/sessions/:sessionId', getSession);

// AI endpoints
router.get('/sessions/:sessionId/analyze', analyzeSessionErrors);
router.get('/sessions/:sessionId/insights', getSessionInsights);

export default router;
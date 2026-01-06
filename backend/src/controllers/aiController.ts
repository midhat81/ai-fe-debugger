import { Request, Response } from 'express';
import { memoryStore } from '../storage/memoryStore';
import { analyzeError, analyzeSession } from '../services/aiService';

export const analyzeSessionErrors = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = memoryStore.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Find all errors in session
    const errors = session.events.filter((e) => e.type === 'error');

    if (errors.length === 0) {
      return res.json({
        message: 'No errors found in this session',
        analyses: [],
      });
    }

    // Analyze each error
    const analyses = await Promise.all(
      errors.map((error) =>
        analyzeError(error as any, {
          sessionId,
          recentEvents: session.events,
        })
      )
    );

    res.json({
      sessionId,
      errorCount: errors.length,
      analyses: errors.map((error, i) => ({
        eventId: error.id,
        error: error.data,
        analysis: analyses[i],
      })),
    });
  } catch (error) {
    console.error('Error analyzing session:', error);
    res.status(500).json({ error: 'Failed to analyze session' });
  }
};

export const getSessionInsights = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = memoryStore.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const insights = await analyzeSession({
      events: session.events,
      errorCount: session.errorCount,
    });

    res.json({
      sessionId,
      insights,
    });
  } catch (error) {
    console.error('Error getting insights:', error);
    res.status(500).json({ error: 'Failed to get insights' });
  }
};
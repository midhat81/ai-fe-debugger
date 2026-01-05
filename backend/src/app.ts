import express from 'express';
import cors from 'cors';
import eventsRoutes from './routes/eventsRoutes'; // ADD THIS

export const createApp = () => {
  const app = express();

  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }));

  app.use(express.json({ limit: '10mb' }));

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: Date.now(),
      service: 'ai-fe-debugger' 
    });
  });

  // API routes - ADD THIS
  app.use('/api', eventsRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // Error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};
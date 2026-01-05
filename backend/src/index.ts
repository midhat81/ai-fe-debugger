import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    console.log('🔄 Starting server...');
    console.log('⚠️  Running in MEMORY MODE (no database)');
    
    const app = createApp();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📡 Events API: http://localhost:${PORT}/api/events`);
      console.log(`📋 Sessions API: http://localhost:${PORT}/api/sessions`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();
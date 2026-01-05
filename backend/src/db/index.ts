import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDB = async () => {
  try {
    // Create sessions table
    await query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        last_event_at TIMESTAMP DEFAULT NOW(),
        error_count INT DEFAULT 0
      );
    `);

    // Create events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        timestamp BIGINT NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_session_id ON events(session_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_timestamp ON events(timestamp);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_sessions_created ON sessions(created_at DESC);`);
    
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};
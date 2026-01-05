interface Session {
    id: string;
    userId?: string;
    userAgent: string;
    createdAt: Date;
    lastEventAt: Date;
    errorCount: number;
    events: Event[];
  }
  
  interface Event {
    id: number;
    sessionId: string;
    type: string;
    timestamp: number;
    data: Record<string, any>;
    createdAt: Date;
  }
  
  class MemoryStore {
    private sessions: Map<string, Session> = new Map();
    private eventIdCounter = 1;
  
    // Create or get session
    getOrCreateSession(sessionId: string, userAgent: string = 'unknown'): Session {
      if (!this.sessions.has(sessionId)) {
        const session: Session = {
          id: sessionId,
          userAgent,
          createdAt: new Date(),
          lastEventAt: new Date(),
          errorCount: 0,
          events: [],
        };
        this.sessions.set(sessionId, session);
        console.log(`📝 Created new session: ${sessionId}`);
      }
      return this.sessions.get(sessionId)!;
    }
  
    // Add events to session
    addEvents(sessionId: string, events: any[], userAgent?: string): number {
      const session = this.getOrCreateSession(sessionId, userAgent);
      
      let errorCount = 0;
      
      events.forEach((evt) => {
        const event: Event = {
          id: this.eventIdCounter++,
          sessionId,
          type: evt.type,
          timestamp: evt.timestamp,
          data: evt.data,
          createdAt: new Date(),
        };
        
        session.events.push(event);
        
        if (evt.type === 'error') {
          errorCount++;
        }
      });
  
      session.lastEventAt = new Date();
      session.errorCount += errorCount;
  
      console.log(`✅ Added ${events.length} events to session ${sessionId} (${errorCount} errors)`);
      
      return events.length;
    }
  
    // Get session by ID
    getSession(sessionId: string): Session | undefined {
      return this.sessions.get(sessionId);
    }
  
    // Get all sessions
    getAllSessions(): Session[] {
      return Array.from(this.sessions.values()).sort(
        (a, b) => b.lastEventAt.getTime() - a.lastEventAt.getTime()
      );
    }
  
    // Get session stats
    getStats() {
      const sessions = Array.from(this.sessions.values());
      const totalEvents = sessions.reduce((sum, s) => sum + s.events.length, 0);
      const totalErrors = sessions.reduce((sum, s) => sum + s.errorCount, 0);
  
      return {
        totalSessions: sessions.length,
        totalEvents,
        totalErrors,
      };
    }
  }
  
  export const memoryStore = new MemoryStore();
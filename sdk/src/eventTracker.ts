import { DebugEvent, EventType } from './types';

export class EventTracker {
  private events: DebugEvent[] = [];
  private sessionId: string;
  private apiUrl: string;
  private flushInterval: number;
  private flushTimer?: ReturnType<typeof setInterval>;

  constructor(sessionId: string, apiUrl: string, flushInterval: number = 5000) {
    this.sessionId = sessionId;
    this.apiUrl = apiUrl;
    this.flushInterval = flushInterval;
    this.startAutoFlush();
  }

  track(type: EventType, data: Record<string, any>) {
    this.events.push({
      type,
      timestamp: Date.now(),
      data,
    });

    console.log(`[AI Debugger] ${type}:`, data);
  }

  private startAutoFlush() {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  async flush() {
    if (this.events.length === 0) return;

    const batch = [...this.events];
    this.events = [];

    try {
      await fetch(`${this.apiUrl}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: batch,
        }),
      });
      
      console.log(`[AI Debugger] Flushed ${batch.length} events`);
    } catch (error) {
      console.error('[AI Debugger] Failed to send events:', error);
      // Re-add events to queue
      this.events.unshift(...batch);
    }
  }

  destroy() {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.flush(); // Final flush
  }
}
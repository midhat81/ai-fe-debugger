export interface DebuggerConfig {
    apiUrl: string;
    sessionId?: string;
    userId?: string;
    flushInterval?: number; // milliseconds
  }
  
  export type EventType = 'click' | 'input' | 'api_call' | 'error' | 'navigation';
  
  export interface DebugEvent {
    type: EventType;
    timestamp: number;
    data: Record<string, any>;
  }
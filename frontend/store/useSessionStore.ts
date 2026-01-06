import { create } from 'zustand';

interface Event {
  id: number;
  sessionId: string;
  type: string;
  timestamp: number;
  data: Record<string, any>;
  createdAt: string;
}

interface Session {
  id: string;
  userAgent: string;
  createdAt: string;
  lastEventAt: string;
  eventCount: number;
  errorCount: number;
  events?: Event[];
}

interface Stats {
  totalSessions: number;
  totalEvents: number;
  totalErrors: number;
}

interface SessionStore {
  sessions: Session[];
  currentSession: Session | null;
  stats: Stats | null;
  loading: boolean;
  error: string | null;

  fetchSessions: () => Promise<void>;
  fetchSession: (sessionId: string) => Promise<void>;
  clearError: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  currentSession: null,
  stats: null,
  loading: false,
  error: null,

  fetchSessions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/sessions`);
      if (!res.ok) throw new Error('Failed to fetch sessions');
      const data = await res.json();
      set({
        sessions: data.sessions,
        stats: data.stats,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      });
    }
  },

  fetchSession: async (sessionId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/api/sessions/${sessionId}`);
      if (!res.ok) throw new Error('Session not found');
      const data = await res.json();
      set({
        currentSession: data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
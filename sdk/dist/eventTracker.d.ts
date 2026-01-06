import { EventType } from './types';
export declare class EventTracker {
    private events;
    private sessionId;
    private apiUrl;
    private flushInterval;
    private flushTimer?;
    constructor(sessionId: string, apiUrl: string, flushInterval?: number);
    track(type: EventType, data: Record<string, any>): void;
    private startAutoFlush;
    flush(): Promise<void>;
    destroy(): void;
}

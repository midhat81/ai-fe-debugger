"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryStore = void 0;
class MemoryStore {
    constructor() {
        this.sessions = new Map();
        this.eventIdCounter = 1;
    }
    // Create or get session
    getOrCreateSession(sessionId, userAgent = 'unknown') {
        if (!this.sessions.has(sessionId)) {
            const session = {
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
        return this.sessions.get(sessionId);
    }
    // Add events to session
    addEvents(sessionId, events, userAgent) {
        const session = this.getOrCreateSession(sessionId, userAgent);
        let errorCount = 0;
        events.forEach((evt) => {
            const event = {
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
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    // Get all sessions
    getAllSessions() {
        return Array.from(this.sessions.values()).sort((a, b) => b.lastEventAt.getTime() - a.lastEventAt.getTime());
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
exports.memoryStore = new MemoryStore();

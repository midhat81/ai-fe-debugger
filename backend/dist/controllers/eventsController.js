"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSessions = exports.getSession = exports.ingestEvents = void 0;
const memoryStore_1 = require("../storage/memoryStore");
const ingestEvents = async (req, res) => {
    try {
        const { sessionId, events } = req.body;
        // Validation
        if (!sessionId || !events || !Array.isArray(events)) {
            return res.status(400).json({
                error: 'Invalid request. Required: sessionId (string) and events (array)',
            });
        }
        if (events.length === 0) {
            return res.status(400).json({ error: 'Events array cannot be empty' });
        }
        // Validate each event
        for (const event of events) {
            if (!event.type || !event.timestamp || !event.data) {
                return res.status(400).json({
                    error: 'Each event must have: type, timestamp, and data',
                });
            }
        }
        // Get user agent
        const userAgent = req.headers['user-agent'] || 'unknown';
        // Store events
        const count = memoryStore_1.memoryStore.addEvents(sessionId, events, userAgent);
        res.json({
            success: true,
            sessionId,
            eventsReceived: count,
            message: `Successfully stored ${count} events`,
        });
    }
    catch (error) {
        console.error('Error ingesting events:', error);
        res.status(500).json({ error: 'Failed to ingest events' });
    }
};
exports.ingestEvents = ingestEvents;
const getSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = memoryStore_1.memoryStore.getSession(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    }
    catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ error: 'Failed to fetch session' });
    }
};
exports.getSession = getSession;
const getAllSessions = async (req, res) => {
    try {
        const sessions = memoryStore_1.memoryStore.getAllSessions();
        const stats = memoryStore_1.memoryStore.getStats();
        res.json({
            sessions: sessions.map((s) => ({
                id: s.id,
                userAgent: s.userAgent,
                createdAt: s.createdAt,
                lastEventAt: s.lastEventAt,
                eventCount: s.events.length,
                errorCount: s.errorCount,
            })),
            stats,
        });
    }
    catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
};
exports.getAllSessions = getAllSessions;

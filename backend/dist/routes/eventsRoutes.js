"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventsController_1 = require("../controllers/eventsController");
const router = (0, express_1.Router)();
// POST /api/events - Ingest events from SDK
router.post('/events', eventsController_1.ingestEvents);
// GET /api/sessions - Get all sessions
router.get('/sessions', eventsController_1.getAllSessions);
// GET /api/sessions/:sessionId - Get single session with events
router.get('/sessions/:sessionId', eventsController_1.getSession);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const eventsRoutes_1 = __importDefault(require("./routes/eventsRoutes")); // ADD THIS
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
    // Health check
    app.get('/health', (req, res) => {
        res.json({
            status: 'ok',
            timestamp: Date.now(),
            service: 'ai-fe-debugger'
        });
    });
    // API routes - ADD THIS
    app.use('/api', eventsRoutes_1.default);
    // 404 handler
    app.use((req, res) => {
        res.status(404).json({ error: 'Route not found' });
    });
    // Error handler
    app.use((err, req, res, next) => {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    });
    return app;
};
exports.createApp = createApp;

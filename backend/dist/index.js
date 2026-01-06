"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const PORT = process.env.PORT || 4000;
const start = async () => {
    try {
        console.log('🔄 Starting server...');
        console.log('⚠️  Running in MEMORY MODE (no database)');
        const app = (0, app_1.createApp)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
            console.log(`📡 Events API: http://localhost:${PORT}/api/events`);
            console.log(`📋 Sessions API: http://localhost:${PORT}/api/sessions`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
start();

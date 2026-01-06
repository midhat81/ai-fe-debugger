(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AIDebugger = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    class EventTracker {
        constructor(sessionId, apiUrl, flushInterval = 5000) {
            this.events = [];
            this.sessionId = sessionId;
            this.apiUrl = apiUrl;
            this.flushInterval = flushInterval;
            this.startAutoFlush();
        }
        track(type, data) {
            this.events.push({
                type,
                timestamp: Date.now(),
                data,
            });
            console.log(`[AI Debugger] ${type}:`, data);
        }
        startAutoFlush() {
            this.flushTimer = setInterval(() => {
                this.flush();
            }, this.flushInterval);
        }
        flush() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.events.length === 0)
                    return;
                const batch = [...this.events];
                this.events = [];
                try {
                    yield fetch(`${this.apiUrl}/api/events`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sessionId: this.sessionId,
                            events: batch,
                        }),
                    });
                    console.log(`[AI Debugger] Flushed ${batch.length} events`);
                }
                catch (error) {
                    console.error('[AI Debugger] Failed to send events:', error);
                    // Re-add events to queue
                    this.events.unshift(...batch);
                }
            });
        }
        destroy() {
            if (this.flushTimer)
                clearInterval(this.flushTimer);
            this.flush(); // Final flush
        }
    }

    let tracker = null;
    function initDebugger(config) {
        // Generate session ID
        const sessionId = config.sessionId ||
            `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        tracker = new EventTracker(sessionId, config.apiUrl, config.flushInterval);
        // Track clicks
        document.addEventListener('click', (e) => {
            var _a;
            const target = e.target;
            tracker === null || tracker === void 0 ? void 0 : tracker.track('click', {
                tag: target.tagName,
                id: target.id || null,
                class: target.className || null,
                text: ((_a = target.innerText) === null || _a === void 0 ? void 0 : _a.slice(0, 50)) || null,
                x: e.clientX,
                y: e.clientY,
            });
        });
        // Track inputs
        document.addEventListener('input', (e) => {
            const target = e.target;
            // Skip sensitive inputs
            if (target.type === 'password' || target.dataset.private)
                return;
            tracker === null || tracker === void 0 ? void 0 : tracker.track('input', {
                tag: target.tagName,
                id: target.id || null,
                name: target.name || null,
                type: target.type,
                value: target.value.slice(0, 100), // Limit length
            });
        });
        // Track JS errors
        window.addEventListener('error', (e) => {
            var _a;
            tracker === null || tracker === void 0 ? void 0 : tracker.track('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: ((_a = e.error) === null || _a === void 0 ? void 0 : _a.stack) || null,
            });
        });
        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            tracker === null || tracker === void 0 ? void 0 : tracker.track('error', {
                message: `Unhandled Promise: ${e.reason}`,
                promise: true,
                reason: String(e.reason),
            });
        });
        // Track page navigation
        tracker.track('navigation', {
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
        });
        console.log(`[AI Debugger] ✅ Initialized with session: ${sessionId}`);
        return sessionId;
    }
    function destroyDebugger() {
        tracker === null || tracker === void 0 ? void 0 : tracker.destroy();
        tracker = null;
        console.log('[AI Debugger] ❌ Destroyed');
    }

    exports.destroyDebugger = destroyDebugger;
    exports.initDebugger = initDebugger;

}));
//# sourceMappingURL=ai-fe-debugger.js.map

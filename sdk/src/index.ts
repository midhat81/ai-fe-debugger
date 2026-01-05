import { DebuggerConfig } from './types';
import { EventTracker } from './eventTracker';

let tracker: EventTracker | null = null;

export function initDebugger(config: DebuggerConfig): string {
  // Generate session ID
  const sessionId = config.sessionId || 
    `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  
  tracker = new EventTracker(sessionId, config.apiUrl, config.flushInterval);

  // Track clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    tracker?.track('click', {
      tag: target.tagName,
      id: target.id || null,
      class: target.className || null,
      text: target.innerText?.slice(0, 50) || null,
      x: e.clientX,
      y: e.clientY,
    });
  });

  // Track inputs
  document.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    
    // Skip sensitive inputs
    if (target.type === 'password' || target.dataset.private) return;
    
    tracker?.track('input', {
      tag: target.tagName,
      id: target.id || null,
      name: target.name || null,
      type: target.type,
      value: target.value.slice(0, 100), // Limit length
    });
  });

  // Track JS errors
  window.addEventListener('error', (e) => {
    tracker?.track('error', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      stack: e.error?.stack || null,
    });
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    tracker?.track('error', {
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

export function destroyDebugger() {
  tracker?.destroy();
  tracker = null;
  console.log('[AI Debugger] ❌ Destroyed');
}

// Export for TypeScript users
export * from './types';
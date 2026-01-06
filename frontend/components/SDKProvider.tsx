'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    AIDebugger: {
      initDebugger: (config: {
        apiUrl: string;
        userId?: string;
        flushInterval?: number;
      }) => string;
      destroyDebugger: () => void;
    };
  }
}

export default function SDKProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load SDK script
    const script = document.createElement('script');
    script.src = '/ai-fe-debugger.js';
    script.async = true;
    
    script.onload = () => {
      if (window.AIDebugger) {
        const sessionId = window.AIDebugger.initDebugger({
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
          userId: 'demo-user',
          flushInterval: 3000, // Send events every 3 seconds
        });
        
        console.log('🎯 AI Debugger SDK Loaded! Session:', sessionId);
      }
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (window.AIDebugger) {
        window.AIDebugger.destroyDebugger();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <>{children}</>;
}
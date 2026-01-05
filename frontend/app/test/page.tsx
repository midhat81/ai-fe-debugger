'use client';

import { useState } from 'react';

export default function TestPage() {
  const [response, setResponse] = useState<any>(null);
  const [sessions, setSessions] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sendTestEvents = async () => {
    setLoading(true);
    try {
      const sessionId = 'test-session-' + Date.now();
      const res = await fetch('http://localhost:4000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          events: [
            {
              type: 'click',
              timestamp: Date.now(),
              data: { element: 'button', text: 'Test Button', x: 100, y: 200 },
            },
            {
              type: 'input',
              timestamp: Date.now() + 1000,
              data: { field: 'email', value: 'test@example.com' },
            },
            {
              type: 'error',
              timestamp: Date.now() + 2000,
              data: { 
                message: 'Failed to fetch data', 
                stack: 'Error: Network request failed\n  at fetch (index.js:10)',
                url: '/api/data'
              },
            },
            {
              type: 'navigation',
              timestamp: Date.now() + 3000,
              data: { from: '/', to: '/dashboard', method: 'pushState' },
            },
          ],
        }),
      });
      const data = await res.json();
      setResponse(data);
      console.log('✅ Events sent:', data);
    } catch (error) {
      console.error('❌ Error:', error);
      setResponse({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/sessions');
      const data = await res.json();
      setSessions(data);
      console.log('📋 Sessions:', data);
    } catch (error) {
      console.error('❌ Error:', error);
      setSessions({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🧪 API Test Dashboard</h1>
          <p className="text-gray-400">Test your Events API and view sessions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Send Events Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📤</span>
              <div>
                <h2 className="text-xl font-semibold">Send Test Events</h2>
                <p className="text-sm text-gray-400">Create a new session with sample events</p>
              </div>
            </div>
            
            <button
              onClick={sendTestEvents}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? '⏳ Sending...' : '📤 Send Events'}
            </button>

            {response && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={response.success ? 'text-green-400' : 'text-red-400'}>
                    {response.success ? '✅' : '❌'}
                  </span>
                  <span className="text-sm font-semibold">Response:</span>
                </div>
                <pre className="bg-gray-950 p-4 rounded text-xs overflow-auto max-h-64 border border-gray-700">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get Sessions Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📋</span>
              <div>
                <h2 className="text-xl font-semibold">All Sessions</h2>
                <p className="text-sm text-gray-400">View all recorded sessions and stats</p>
              </div>
            </div>
            
            <button
              onClick={fetchSessions}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? '⏳ Loading...' : '📋 Fetch Sessions'}
            </button>

            {sessions && (
              <div className="mt-4">
                {sessions.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-950 p-3 rounded text-center">
                      <div className="text-2xl font-bold text-blue-400">{sessions.stats.totalSessions}</div>
                      <div className="text-xs text-gray-400">Sessions</div>
                    </div>
                    <div className="bg-gray-950 p-3 rounded text-center">
                      <div className="text-2xl font-bold text-green-400">{sessions.stats.totalEvents}</div>
                      <div className="text-xs text-gray-400">Events</div>
                    </div>
                    <div className="bg-gray-950 p-3 rounded text-center">
                      <div className="text-2xl font-bold text-red-400">{sessions.stats.totalErrors}</div>
                      <div className="text-xs text-gray-400">Errors</div>
                    </div>
                  </div>
                )}
                <pre className="bg-gray-950 p-4 rounded text-xs overflow-auto max-h-64 border border-gray-700">
                  {JSON.stringify(sessions, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
          <p className="text-sm flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span>
              <strong>Tip:</strong> Open the browser console (F12) to see detailed logs. Each test creates a unique session ID!
            </span>
          </p>
        </div>

        {/* Backend Status */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Backend: <span className="text-green-400">●</span> http://localhost:4000
        </div>
      </div>
    </div>
  );
}
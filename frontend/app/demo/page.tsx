'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DemoPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setCount(count + 1);
    setMessage(`Button clicked ${count + 1} times! 🎉`);
  };

  const triggerError = () => {
    throw new Error('Demo error triggered by user!');
  };

  const testApiCall = async () => {
    try {
      setMessage('Making API call...');
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      setMessage(`API Success! Title: ${data.title}`);
    } catch (error) {
      setMessage('API call failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/sessions"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">🎮 Live Demo Page</h1>
          <p className="text-gray-400">
            Interact with elements below. All actions are being tracked by the SDK!
          </p>
          <div className="mt-4 bg-green-500/10 border border-green-500 px-4 py-2 rounded-lg inline-block">
            <span className="text-green-400">🟢 SDK Active - Recording Session</span>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-6 bg-blue-500/10 border border-blue-500 rounded-lg p-4">
            <p className="text-blue-400">{message}</p>
          </div>
        )}

        {/* Interactive Elements */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Click Tracking */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🖱️ Click Tracking
            </h2>
            <button
              onClick={handleClick}
              className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              Click Me! ({count})
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Click the button to track click events with coordinates
            </p>
          </div>

          {/* Input Tracking */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              ⌨️ Input Tracking
            </h2>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
            <p className="text-sm text-gray-400 mt-4">
              Type in the input field to track input events
            </p>
          </div>

          {/* API Call Tracking */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📡 API Call Tracking
            </h2>
            <button
              onClick={testApiCall}
              className="w-full bg-green-600 hover:bg-green-700 px-6 py-4 rounded-lg font-semibold transition-all hover:scale-105"
            >
              Make API Call
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Test API call tracking with fetch interceptor
            </p>
          </div>

          {/* Error Tracking */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              ❌ Error Tracking
            </h2>
            <button
              onClick={triggerError}
              className="w-full bg-red-600 hover:bg-red-700 px-6 py-4 rounded-lg font-semibold transition-all hover:scale-105"
            >
              Trigger Error
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Trigger a JavaScript error to test error tracking
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-purple-500/10 border border-purple-500 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">📋 How to Test:</h3>
          <ol className="space-y-2 text-gray-300">
            <li>1. Interact with the elements above (click, type, make API calls)</li>
            <li>2. Open browser console (F12) to see SDK logs</li>
            <li>3. Wait 3 seconds for events to be sent to the backend</li>
            <li>4. Go to the <Link href="/sessions" className="text-blue-400 hover:underline">Sessions Dashboard</Link> to see your session!</li>
            <li>5. Click on your session to see the event timeline</li>
          </ol>
        </div>

        {/* Quick Links */}
        <div className="mt-6 flex gap-4">
          <Link
            href="/sessions"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            📊 View Dashboard
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🔄 Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
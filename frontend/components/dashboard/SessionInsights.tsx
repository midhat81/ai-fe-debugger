'use client';

import { useState } from 'react';

interface SessionInsights {
  overallHealth: string;
  keyIssues: string[];
  recommendations: string[];
}

interface SessionInsightsProps {
  sessionId: string;
  eventCount: number;
  errorCount: number;
}

const healthColors = {
  healthy: 'bg-green-500/10 border-green-500 text-green-400',
  warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
  critical: 'bg-red-500/10 border-red-500 text-red-400',
  unknown: 'bg-gray-500/10 border-gray-500 text-gray-400',
};

const healthIcons = {
  healthy: '✅',
  warning: '⚠️',
  critical: '🚨',
  unknown: '❓',
};

export default function SessionInsights({ 
  sessionId, 
  eventCount, 
  errorCount 
}: SessionInsightsProps) {
  const [insights, setInsights] = useState<SessionInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  const getHealthType = (health: string): keyof typeof healthColors => {
    const lower = health.toLowerCase();
    if (lower.includes('healthy')) return 'healthy';
    if (lower.includes('warning')) return 'warning';
    if (lower.includes('critical')) return 'critical';
    return 'unknown';
  };

  const analyzeSession = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/sessions/${sessionId}/insights`
      );

      if (!response.ok) {
        throw new Error('Failed to get session insights');
      }

      const data = await response.json();
      setInsights(data.insights);
      setAnalyzed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  if (!analyzed) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
            📊 Session Health Analysis
          </h3>
          <p className="text-sm text-gray-400">
            Get AI-powered insights about this session's overall health and user experience
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Total Events</div>
            <div className="text-2xl font-bold text-blue-400">{eventCount}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Error Rate</div>
            <div className="text-2xl font-bold text-red-400">
              {eventCount > 0 ? ((errorCount / eventCount) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>

        <button
          onClick={analyzeSession}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-[1.02] disabled:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Analyzing Session...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              📊 Get Session Insights
            </span>
          )}
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
        <div className="text-center">
          <div className="text-4xl mb-2">❌</div>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={analyzeSession}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  const healthType = getHealthType(insights.overallHealth);

  return (
    <div className="space-y-4">
      {/* Health Status */}
      <div className={`border rounded-lg p-6 ${healthColors[healthType]}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{healthIcons[healthType]}</span>
          <div>
            <h3 className="text-xl font-bold">Session Health</h3>
            <p className="text-sm opacity-90">{insights.overallHealth}</p>
          </div>
        </div>
      </div>

      {/* Key Issues */}
      {insights.keyIssues.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔍</span>
            <h4 className="text-lg font-bold">Key Issues Detected</h4>
          </div>
          <ul className="space-y-2">
            {insights.keyIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span className="text-sm text-gray-300">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {insights.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <h4 className="text-lg font-bold text-blue-400">Recommendations</h4>
          </div>
          <ul className="space-y-3">
            {insights.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1 font-bold">{index + 1}.</span>
                <span className="text-sm text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Re-analyze Button */}
      <button
        onClick={() => {
          setAnalyzed(false);
          setInsights(null);
        }}
        className="w-full bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        🔄 Refresh Insights
      </button>
    </div>
  );
}
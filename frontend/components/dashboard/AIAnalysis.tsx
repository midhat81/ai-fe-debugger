'use client';

import { useState } from 'react';

interface Analysis {
  summary: string;
  rootCause: string;
  impact: string;
  suggestedFix: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ErrorAnalysis {
  eventId: number;
  error: {
    message?: string;
    filename?: string;
    lineno?: number;
  };
  analysis: Analysis;
}

interface AIAnalysisProps {
  sessionId: string;
}

const severityColors = {
  low: 'bg-green-500/10 border-green-500 text-green-400',
  medium: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
  high: 'bg-red-500/10 border-red-500 text-red-400',
  critical: 'bg-purple-500/10 border-purple-500 text-purple-400',
};

const severityIcons = {
  low: '✅',
  medium: '⚠️',
  high: '🔴',
  critical: '🚨',
};

export default function AIAnalysis({ sessionId }: AIAnalysisProps) {
  const [analyses, setAnalyses] = useState<ErrorAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeSession = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/sessions/${sessionId}/analyze`
      );

      if (!response.ok) {
        throw new Error('Failed to analyze session');
      }

      const data = await response.json();
      setAnalyses(data.analyses);
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              🤖 AI-Powered Error Analysis
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Get intelligent insights and fix suggestions using Groq AI
            </p>
          </div>
        </div>

        <button
          onClick={analyzeSession}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-[1.02] disabled:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Analyzing with AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🤖 Analyze Errors with AI
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

  if (analyses.length === 0) {
    return (
      <div className="bg-green-500/10 border border-green-500 rounded-lg p-6 text-center">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">No Errors Found!</h3>
        <p className="text-gray-400">This session has no errors to analyze.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-xl font-bold">AI Analysis Complete</h3>
        </div>
        <p className="text-sm text-gray-400">
          Analyzed {analyses.length} error{analyses.length !== 1 ? 's' : ''} using Groq AI (Llama 3.3 70B)
        </p>
      </div>

      {analyses.map((item, index) => (
        <div
          key={item.eventId}
          className="bg-gray-800 border border-gray-700 rounded-lg p-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">❌</span>
                <h4 className="font-semibold">Error #{index + 1}</h4>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                  Event ID: {item.eventId}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{item.error.message}</p>
              {item.error.filename && (
                <p className="text-xs text-gray-500">
                  {item.error.filename}:{item.error.lineno}
                </p>
              )}
            </div>
            <div
              className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                severityColors[item.analysis.severity]
              }`}
            >
              {severityIcons[item.analysis.severity]} {item.analysis.severity.toUpperCase()}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📋</span>
                <h5 className="font-semibold text-blue-400">Summary</h5>
              </div>
              <p className="text-sm text-gray-300">{item.analysis.summary}</p>
            </div>

            {/* Root Cause */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔍</span>
                <h5 className="font-semibold text-purple-400">Root Cause</h5>
              </div>
              <p className="text-sm text-gray-300">{item.analysis.rootCause}</p>
            </div>

            {/* Impact */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚡</span>
                <h5 className="font-semibold text-red-400">Impact</h5>
              </div>
              <p className="text-sm text-gray-300">{item.analysis.impact}</p>
            </div>

            {/* Suggested Fix */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💡</span>
                <h5 className="font-semibold text-green-400">Suggested Fix</h5>
              </div>
              <p className="text-sm text-gray-300">{item.analysis.suggestedFix}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Re-analyze Button */}
      <button
        onClick={() => {
          setAnalyzed(false);
          setAnalyses([]);
        }}
        className="w-full bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        🔄 Analyze Again
      </button>
    </div>
  );
}
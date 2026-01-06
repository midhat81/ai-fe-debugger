'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSessionStore } from '@/store/useSessionStore';
import EventTimeline from '@/components/dashboard/EventTimeline';
import AIAnalysis from '@/components/dashboard/AIAnalysis';
import SessionInsights from '@/components/dashboard/SessionInsights'; // ADD THIS
import { format } from 'date-fns';

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  
  const { currentSession, loading, error, fetchSession } = useSessionStore();

  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId);
    }
  }, [sessionId, fetchSession]);

  const browser = currentSession?.userAgent.includes('Chrome')
    ? '🌐 Chrome'
    : currentSession?.userAgent.includes('Firefox')
    ? '🦊 Firefox'
    : currentSession?.userAgent.includes('Safari')
    ? '🧭 Safari'
    : '🌐 Browser';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/sessions')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Sessions
            </button>
          </div>
          
          {currentSession && (
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{browser}</span>
                  <h1 className="text-2xl font-bold">Session Details</h1>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>ID: {sessionId.slice(0, 16)}...</span>
                  <span>•</span>
                  <span>Created: {format(new Date(currentSession.createdAt), 'PPpp')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-400">Loading session...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">❌</div>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => router.push('/sessions')}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
            >
              Back to Sessions
            </button>
          </div>
        )}

        {/* Session Content */}
        {!loading && !error && currentSession && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-sm text-gray-400 mb-2">Total Events</div>
                <div className="text-3xl font-bold text-blue-400">
                  {currentSession.events?.length || 0}
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-sm text-gray-400 mb-2">Errors</div>
                <div className="text-3xl font-bold text-red-400">
                  {currentSession.errorCount}
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-sm text-gray-400 mb-2">Last Activity</div>
                <div className="text-xl font-bold text-green-400">
                  {format(new Date(currentSession.lastEventAt), 'HH:mm:ss')}
                </div>
              </div>
            </div>

            {/* Two Column Layout for AI Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Session Insights */}
              <SessionInsights 
                sessionId={sessionId}
                eventCount={currentSession.events?.length || 0}
                errorCount={currentSession.errorCount}
              />

              {/* Right Column: Error Analysis (if errors exist) */}
              {currentSession.errorCount > 0 && (
                <AIAnalysis sessionId={sessionId} />
              )}
            </div>

            {/* Event Timeline - Full Width */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Event Timeline</h2>
                <span className="text-sm text-gray-400">
                  {currentSession.events?.length || 0} events recorded
                </span>
              </div>

              {currentSession.events && currentSession.events.length > 0 ? (
                <EventTimeline events={currentSession.events} />
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-2">📭</div>
                  <p>No events recorded in this session</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
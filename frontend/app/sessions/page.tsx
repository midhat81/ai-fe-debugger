'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import StatsCard from '@/components/dashboard/StatsCard';
import SessionCard from '@/components/dashboard/SessionCard';
import Link from 'next/link';

export default function SessionsPage() {
  const { sessions, stats, loading, error, fetchSessions } = useSessionStore();

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">📊 Sessions Dashboard</h1>
              <p className="text-gray-400">View and analyze all recorded sessions</p>
            </div>
            <Link
              href="/test"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              🧪 Test API
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              icon="📋"
              label="Total Sessions"
              value={stats.totalSessions}
              color="blue"
            />
            <StatsCard
              icon="📊"
              label="Total Events"
              value={stats.totalEvents}
              color="green"
            />
            <StatsCard
              icon="❌"
              label="Total Errors"
              value={stats.totalErrors}
              color="red"
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-400">Loading sessions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">❌</div>
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchSessions}
              className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sessions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold mb-2">No Sessions Yet</h2>
            <p className="text-gray-400 mb-6">
              Start recording sessions by integrating the SDK or use the test page
            </p>
            <Link
              href="/test"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              🧪 Create Test Session
            </Link>
          </div>
        )}

        {/* Sessions Grid */}
        {!loading && sessions.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              All Sessions ({sessions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
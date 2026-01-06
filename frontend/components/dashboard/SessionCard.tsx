import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface SessionCardProps {
  session: {
    id: string;
    userAgent: string;
    createdAt: string;
    lastEventAt: string;
    eventCount: number;
    errorCount: number;
  };
}

export default function SessionCard({ session }: SessionCardProps) {
  const lastActive = formatDistanceToNow(new Date(session.lastEventAt), {
    addSuffix: true,
  });

  const browser = session.userAgent.includes('Chrome')
    ? '🌐 Chrome'
    : session.userAgent.includes('Firefox')
    ? '🦊 Firefox'
    : session.userAgent.includes('Safari')
    ? '🧭 Safari'
    : '🌐 Browser';

  return (
    <Link href={`/sessions/${session.id}`}>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{browser}</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                {session.id.slice(0, 8)}...
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Last active {lastActive}
            </div>
          </div>
          <div className="text-2xl group-hover:scale-110 transition-transform">
            →
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded p-3">
            <div className="text-2xl font-bold text-blue-400">{session.eventCount}</div>
            <div className="text-xs text-gray-400">Events</div>
          </div>
          <div className="bg-gray-900 rounded p-3">
            <div className="text-2xl font-bold text-red-400">{session.errorCount}</div>
            <div className="text-xs text-gray-400">Errors</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
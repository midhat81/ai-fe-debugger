import { format } from 'date-fns';

interface Event {
  id: number;
  type: string;
  timestamp: number;
  data: Record<string, any>;
  createdAt: string;
}

interface EventTimelineProps {
  events: Event[];
}

const eventIcons: Record<string, string> = {
  click: '🖱️',
  input: '⌨️',
  error: '❌',
  navigation: '🧭',
  api_call: '📡',
};

const eventColors: Record<string, string> = {
  click: 'border-blue-500 bg-blue-500/10',
  input: 'border-green-500 bg-green-500/10',
  error: 'border-red-500 bg-red-500/10',
  navigation: 'border-purple-500 bg-purple-500/10',
  api_call: 'border-yellow-500 bg-yellow-500/10',
};

export default function EventTimeline({ events }: EventTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                eventColors[event.type] || 'border-gray-500 bg-gray-500/10'
              }`}
            >
              <span className="text-lg">{eventIcons[event.type] || '📌'}</span>
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-700 my-2" />
            )}
          </div>

          {/* Event Content */}
          <div className="flex-1 pb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold capitalize">{event.type}</span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    #{event.id}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {format(new Date(event.timestamp), 'HH:mm:ss.SSS')}
                </span>
              </div>

              {/* Data */}
              <div className="bg-gray-900 rounded p-3 text-sm">
                <pre className="text-gray-300 overflow-auto">
                  {JSON.stringify(event.data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
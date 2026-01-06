import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block bg-green-500/10 border border-green-500 px-4 py-2 rounded-full mb-6">
            <span className="text-green-400 font-semibold">System Online</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Frontend Debugger
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Record, replay, and debug frontend sessions with AI-powered insights
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/sessions"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📊 View Dashboard
            </Link>
            <Link
              href="/test"
              className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              🧪 Test API
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Session Recording</h3>
            <p className="text-gray-400">
              Track every click, input, and API call with precision
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Timeline Replay</h3>
            <p className="text-gray-400">
              Replay user sessions step-by-step with detailed event data
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-400">
              Get intelligent bug explanations and suggested fixes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
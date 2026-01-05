export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            AI Frontend Debugger
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Record, replay, and debug frontend sessions with AI-powered insights
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 rounded-lg">
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
            <span className="font-semibold">System Online</span>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Session Recording</h3>
              <p className="text-slate-400">Track every click, input, and API call</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Timeline Replay</h3>
              <p className="text-slate-400">Replay user sessions step-by-step</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-slate-400">Get intelligent bug explanations</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
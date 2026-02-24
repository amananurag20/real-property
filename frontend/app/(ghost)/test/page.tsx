export default function GhostTestPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="inline-block animate-bounce p-4 rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl">
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Ghost Route Active</h1>
                <p className="text-slate-400">
                    This is an internal hidden route for diagnostic and testing purposes. It is isolated from the main site layout.
                </p>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-left font-mono text-sm space-y-2">
                    <p className="text-green-400"># System Diagnostics</p>
                    <p>STATUS: OPERATIONAL</p>
                    <p>LATENCY: 14ms</p>
                    <p>UPTIME: 99.9%</p>
                </div>
                <a
                    href="/"
                    className="inline-block text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                    ← Exit Ghost Mode
                </a>
            </div>
        </div>
    );
}

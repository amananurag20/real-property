export default function UnauthorizedPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">401 - Unauthorized</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Sorry, you need to be signed in to access this page.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="/login"
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg"
                    >
                        Login
                    </a>
                    <a
                        href="/"
                        className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}

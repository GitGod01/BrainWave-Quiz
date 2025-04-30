export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-2">
          Brain<span className="text-yellow-400">Wave</span> Quiz
        </h1>
        <p className="text-lg text-white/80">Challenge your mind, expand your knowledge</p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="rounded-full bg-indigo-600 p-3 w-24 h-24 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">Ready to test your knowledge?</h2>
              <p className="text-white/70">
                Challenge yourself with our curated questions across various topics. You have 30 seconds per question!
              </p>
            </div>

            <a href="/quiz" className="w-full">
              <button className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Start Challenge
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

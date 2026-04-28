import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center relative z-10 max-w-lg">
        {/* Large 404 number */}
        <div className="relative mb-8">
          <h1 className="text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[180px] font-black text-primary/5 blur-xl leading-none select-none">
            404
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Page not found
        </h2>
        <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back to your creative workspace.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-lg shadow-primary/25 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        {/* Search suggestion */}
        <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-gray-400">
            <Search className="w-5 h-5 shrink-0" />
            <p className="text-sm text-left">
              Try navigating to <span className="text-primary font-medium">/dashboard</span>, <span className="text-primary font-medium">/templates</span>, or <span className="text-primary font-medium">/analytics</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

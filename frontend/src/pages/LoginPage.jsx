import { Link } from 'react-router-dom';
import { Eye, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="w-full max-w-4xl flex items-center justify-center relative">
      {/* Testimonial floating card (desktop only) */}
      <div className="hidden lg:block absolute -right-32 bottom-0 w-72 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 z-10">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          "The Digital Atelier transformed how we think about our storefront. It's not a tool; it's a creative partner."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
             {/* Avatar placeholder */}
             <div className="w-full h-full bg-slate-300"></div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">Elena Rossi</p>
            <p className="text-[10px] text-gray-500">Founder, Studio Bloom</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden relative z-20 px-8 py-10 md:px-10 md:py-12">
        <div className="flex justify-center items-center mb-8 gap-2">
          {/* Logo icon placeholder */}
          <div className="w-6 h-6 border-2 border-primary rounded-sm transform rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary transform -rotate-45"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Digital Atelier</h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500">Enter your credentials to access your studio.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="name@studio.com" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                defaultValue="name@studio.com"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `input[type="email"] { padding-left: 2.5rem; }`}} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-gray-700">Password</label>
              <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                defaultValue="password123"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <style dangerouslySetInnerHTML={{__html: `input[type="password"] { padding-left: 2.5rem; padding-right: 2.5rem; }`}} />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="remember" className="ml-2 text-xs text-gray-600">Remember this device</label>
          </div>

          <Link to="/dashboard" className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-3 rounded-xl transition-colors">
            Log In →
          </Link>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account? <a href="#" className="text-primary font-medium">Start building for free</a>
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.88 14.12l-1.06 1.06L12 14.38l-2.82 2.8-1.06-1.06 2.8-2.82-2.8-2.82 1.06-1.06L12 11.62l2.82-2.8 1.06 1.06-2.8 2.82 2.8 2.82z"/>
            </svg>
            Apple
          </button>
        </div>
      </div>
      
      {/* Footer links */}
      <div className="absolute bottom-6 w-full text-center flex justify-center gap-6">
        <a href="#" className="text-[10px] text-gray-400 hover:text-gray-600">Privacy Policy</a>
        <a href="#" className="text-[10px] text-gray-400 hover:text-gray-600">Terms of Service</a>
        <a href="#" className="text-[10px] text-gray-400 hover:text-gray-600">Support</a>
      </div>
    </div>
  );
}

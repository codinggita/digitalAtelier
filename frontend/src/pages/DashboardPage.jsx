import Header from '../components/Header';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="Digital Atelier" 
        tabs={['Dashboard', 'Templates', 'Analytics']} 
        activeTab="Dashboard" 
      />
      
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Overview</h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Manage your digital spaces and monitor performance metrics in real-time. Your atelier is ready for refinement.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUpIcon />
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Total Visitors</p>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">42,891</h3>
            
            {/* Simple Bar Chart placeholder */}
            <div className="flex items-end gap-2 h-10 w-full">
              {[30, 40, 20, 50, 80, 100, 60].map((h, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i === 5 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 mb-6">
                <Clock className="w-4 h-4" />
             </div>
             <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Avg. Sessions</p>
             <h3 className="text-4xl font-bold text-gray-900 mb-6">4m 32s</h3>
             <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <CheckCircleIcon />
                Optimum Performance
             </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex flex-col justify-between">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div>
               <Sparkles className="w-6 h-6 mb-4 text-purple-200" />
               <h3 className="text-lg font-bold mb-2">AI Content Assistant</h3>
               <p className="text-sm text-primary-100/80 mb-6">
                 Generate SEO-optimized copy for your landing pages in seconds.
               </p>
             </div>
             <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium py-2.5 rounded-lg transition-colors border border-white/10">
               Launch AI
             </button>
          </div>
        </div>

        {/* Websites Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Your websites</h2>
          <div className="flex gap-2 text-gray-400">
            {/* View toggles */}
            <button className="p-1 hover:text-gray-900"><GridIcon /></button>
            <button className="p-1 hover:text-gray-900"><ListIcon /></button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
           {/* Site Card */}
           <div className="group cursor-pointer">
              <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4 overflow-hidden border border-gray-200 relative">
                 <div className="absolute inset-0 flex flex-col">
                   <div className="h-6 bg-gray-800 flex items-center px-2 gap-1">
                     <div className="w-2 h-2 rounded-full bg-red-400"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                     <div className="w-2 h-2 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 bg-white p-4">
                     <div className="w-1/2 h-4 bg-gray-200 rounded mb-4"></div>
                     <div className="w-full h-2 bg-gray-100 rounded mb-2"></div>
                     <div className="w-3/4 h-2 bg-gray-100 rounded mb-4"></div>
                     <div className="w-full h-16 bg-gray-100 rounded"></div>
                   </div>
                 </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">Lumina Studio</h4>
                  <p className="text-xs text-gray-500">lumina-studio.atelier.io</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-gray-200 text-gray-600 rounded">LIVE</span>
              </div>
           </div>

           {/* Site Card 2 */}
           <div className="group cursor-pointer">
              <div className="bg-gray-200 aspect-[4/3] rounded-xl mb-4 overflow-hidden border border-gray-200 relative">
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-4 text-center border-t-[16px] border-t-gray-800">
                   <h3 className="text-xl font-serif mb-2">Basics & Co.</h3>
                   <div className="w-16 h-1 bg-primary mb-4"></div>
                   <div className="w-full h-12 bg-gray-50 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">Basics & Co.</h4>
                  <p className="text-xs text-gray-500">basics-co.atelier.io</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-gray-200 text-gray-600 rounded">LIVE</span>
              </div>
           </div>

           {/* Launch New */}
           <div className="border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 rounded-xl flex flex-col items-center justify-center aspect-[4/3] cursor-pointer transition-colors mb-12">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl leading-none">+</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Launch Project</h4>
              <p className="text-xs text-gray-500">Start from a blank canvas</p>
           </div>
        </div>

        {/* Masterclass Banner */}
        <div className="bg-gray-900 rounded-2xl p-8 flex overflow-hidden relative">
           <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/50 to-transparent z-10"></div>
           <div className="relative z-20 w-1/2">
             <p className="text-xs font-bold text-primary mb-2 tracking-widest uppercase">New Masterclass</p>
             <h2 className="text-3xl font-bold text-white mb-4 leading-tight">Master the Art of<br/>Conversions</h2>
             <p className="text-gray-400 text-sm mb-6 max-w-sm">
               Learn how to structure your sections to guide users toward your CTA effortlessly. Curated by our top design leads.
             </p>
             <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2.5 px-5 rounded-lg text-sm transition-colors flex items-center gap-2">
               Watch Workshop
               <ArrowUpRight className="w-4 h-4" />
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}

// Simple icons for the dashboard
function TrendingUpIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>; }
function CheckCircleIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>; }
function GridIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>; }
function ListIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>; }

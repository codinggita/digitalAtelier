import { useState, useEffect } from 'react';
import Header from '../components/Header';
import NewProjectModal from '../components/NewProjectModal';
import { useAuth } from '../context/AuthContext';
import dashboardService from '../services/dashboardService';
import { Loader2, Filter, Download, LayoutGrid, List, PlayCircle, MoreHorizontal, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    liveProjects: 0,
    totalViews: '42,891',
    avgSession: '4m 32s'
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [statsRes, activityRes] = await Promise.all([
          dashboardService.getOverviewStats(),
          dashboardService.getRecentActivity()
        ]);
        
        if (statsRes.success) {
          setStats(prev => ({
            ...prev,
            totalProjects: statsRes.data.totalProjects,
            liveProjects: statsRes.data.liveProjects
          }));
        }
        if (activityRes.success) setRecentProjects(activityRes.data);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      <Header 
        title="Digital Atelier" 
        activeTab="Dashboard" 
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Welcome Section / Hero */}
          <section>
            <div className="mb-6">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, Designer</h1>
              <p className="text-gray-500 text-sm">Your creative studio is ready. What will we build today?</p>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Active Draft Hero */}
              <div className="col-span-8 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                <div className="aspect-[2/1] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <span className="bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded mb-3 w-fit">Active Draft</span>
                    <h2 className="text-3xl font-black text-white leading-tight">Urban Loft Furniture Store</h2>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Visits</p>
                      <p className="text-lg font-black text-gray-900">1.2k</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sales</p>
                      <p className="text-lg font-black text-gray-900">$4.5k</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-2">
                    Resume Editing <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sidebar Cards */}
              <div className="col-span-4 space-y-6">
                 {/* AI Assistant Card */}
                 <div className="bg-indigo-50/50 p-6 rounded-[32px] border border-indigo-100 relative overflow-hidden group">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">AI Assistant</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">Let our AI generate copy or select a color palette for your next project based on your brand goals.</p>
                    <button className="text-indigo-600 text-xs font-bold flex items-center gap-2 hover:underline">
                       Try Atelier AI <Sparkles className="w-3 h-3" />
                    </button>
                 </div>

                 {/* Pro Plan Card */}
                 <div className="bg-gray-900 p-6 rounded-[32px] text-white relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h3 className="font-bold text-lg">Pro Plan</h3>
                          <p className="text-xs text-white/50">Custom Domains</p>
                       </div>
                       <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded">ACTIVE</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                       <div className="w-2/3 h-full bg-indigo-500"></div>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] text-white/50">2 of 3 used</span>
                       <button className="text-[10px] font-black bg-white text-gray-900 px-4 py-2 rounded-lg uppercase tracking-wider">Upgrade Plan</button>
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* Portfolio Overview Section */}
          <section className="pt-10 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200/50 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200/50 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">
                   Export Report
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-6">Manage your digital spaces and monitor performance metrics in real-time.</p>

            <div className="grid grid-cols-12 gap-6">
              {/* Chart Card */}
              <div className="col-span-7 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-600 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Total Visitors</span>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900">{stats.totalViews}</h2>
                  </div>
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-md">+12.5%</span>
                </div>
                
                {/* Mock Bar Chart */}
                <div className="flex items-end gap-3 h-24 mt-4">
                   {[40, 25, 35, 70, 50, 45, 60, 30, 40].map((h, i) => (
                     <div key={i} className={`flex-1 rounded-md transition-all ${i === 3 ? 'bg-indigo-600' : 'bg-indigo-100'}`} style={{ height: `${h}%` }}></div>
                   ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="col-span-2 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                   <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin-slow"></div>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg. Sessions</p>
                   <h2 className="text-2xl font-black text-gray-900">{stats.avgSession}</h2>
                   <p className="text-[10px] font-bold text-green-600 mt-1 flex items-center gap-1">
                     <span className="w-1 h-1 rounded-full bg-green-600"></span> Optimum Performance
                   </p>
                </div>
              </div>

              {/* AI Card */}
              <div className="col-span-3 bg-primary p-6 rounded-[24px] text-white relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                <Sparkles className="w-6 h-6 mb-4" />
                <h3 className="font-bold text-lg leading-tight mb-2">AI Content Assistant</h3>
                <p className="text-white/70 text-xs mb-6">Generate SEO-optimized copy for your landing pages in seconds.</p>
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white py-3 rounded-xl text-xs font-bold transition-all">
                   Launch AI
                </button>
              </div>
            </div>
          </section>

          {/* Your Websites Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Your websites</h2>
              <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <button className="p-1.5 bg-white shadow-sm rounded-md text-gray-900"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600"><List className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {recentProjects.map((project) => (
                <div key={project._id} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-gray-100 shadow-sm mb-4">
                    <img src={project.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        project.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <p className="text-xs text-gray-500">{project.domain || `${project.name.toLowerCase().replace(/ /g, '-')}.atelier.io`}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-900"><MoreHorizontal className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}

              {/* Add New Card */}
              <div 
                onClick={() => setIsModalOpen(true)}
                className="aspect-[4/3] rounded-[24px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-light">+</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-900">Launch Project</h3>
                  <p className="text-xs text-gray-400">Start from a blank canvas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Masterclass Banner */}
          <div className="bg-slate-50 rounded-[32px] overflow-hidden flex items-center min-h-[300px] relative">
            <div className="flex-1 p-12 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4 block">New Masterclass</span>
              <h2 className="text-4xl font-black text-gray-900 leading-[1.1] mb-6 max-w-md">
                Master the Art of Conversions
              </h2>
              <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
                Learn how to structure your sections to guide users toward your CTA effortlessly. Curated by our top design leads.
              </p>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-3 hover:bg-gray-800 transition-all">
                Watch Workshop <PlayCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 h-full absolute right-0 top-0 w-1/2 p-8">
               <div className="w-full h-full rounded-[24px] overflow-hidden shadow-2xl rotate-3 transform translate-x-12 translate-y-8">
                  <img src="https://images.unsplash.com/photo-1558655146-dec14300305d?w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
          
        </div>
      </main>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

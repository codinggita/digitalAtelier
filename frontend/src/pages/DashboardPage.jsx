import { useState, useEffect } from 'react';
import Header from '../components/Header';
import NewProjectModal from '../components/NewProjectModal';
import { useAuth } from '../context/AuthContext';
import dashboardService from '../services/dashboardService';
import { 
  Loader2, Filter, Download, LayoutGrid, List, 
  PlayCircle, MoreHorizontal, Sparkles, TrendingUp, 
  Users, Activity, MousePointer2, ChevronRight, Plus
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    liveProjects: 0,
    visitors: '12,482',
    convRate: '3.8%',
    avgSession: '4m 12s'
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
        
        if (statsRes?.success && statsRes?.data) {
          setStats(prev => ({
            ...prev,
            totalProjects: statsRes.data.totalProjects || 0,
            liveProjects: statsRes.data.liveProjects || 0
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
        title="My Online Boutique" 
        activeTab="Dashboard" 
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Welcome Header */}
          <section>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Good morning, {user?.firstName || 'Julian'}.</h1>
            <p className="text-gray-500 text-sm">Your boutique is performing 12% better this week. Ready to craft something new today?</p>
          </section>

          {/* Top Activity Section */}
          <section className="grid grid-cols-12 gap-6">
            {/* Recent Site Activity Card */}
            <div className="col-span-8 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-900">Recent Site Activity</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Traffic</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mb-10">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Visitors</p>
                  <div className="flex items-end gap-2">
                    <h4 className="text-2xl font-black text-gray-900">{stats.visitors}</h4>
                    <span className="text-[10px] font-bold text-green-600 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Conv. Rate</p>
                  <div className="flex items-end gap-2">
                    <h4 className="text-2xl font-black text-gray-900">{stats.convRate}</h4>
                    <span className="text-[10px] font-bold text-green-600 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +0.5%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg. Session</p>
                  <div className="flex items-end gap-2">
                    <h4 className="text-2xl font-black text-gray-900">{stats.avgSession}</h4>
                    <span className="text-[10px] font-bold text-red-500 mb-1 flex items-center"><Activity className="w-3 h-3 mr-0.5" /> -2.1%</span>
                  </div>
                </div>
              </div>

              {/* Mock Chart Visualization */}
              <div className="flex items-end gap-3 h-32 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                   {[1,2,3].map(i => <div key={i} className="w-full border-t border-gray-50"></div>)}
                </div>
                {[30, 45, 35, 75, 40, 55, 90, 65, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-lg transition-all ${i === 6 ? 'bg-indigo-600' : 'bg-indigo-100'}`} 
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* AI Generator Card */}
            <div className="col-span-4 bg-indigo-600 rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-indigo-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black leading-tight mb-3">Generate a new landing page.</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-8">
                  Tell our AI designer what you're selling and get a custom shop layout in seconds.
                </p>
              </div>
              <button className="bg-white text-indigo-600 font-black py-4 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all group">
                Start Building <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Active Drafts Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-gray-900">Active Drafts</h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                View All Projects <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-[24px] overflow-hidden relative mb-4 border border-gray-100 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-900 shadow-sm">Last Edited 2h ago</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-6 h-6 rounded-full bg-orange-500/80 backdrop-blur-sm flex items-center justify-center">
                       <MousePointer2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h4 className="font-black text-gray-900">Autumn Collection 24</h4>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">Draft • 12 Pages • E-commerce</p>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-900"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <div className="flex gap-2 mt-4 px-2">
                  <button className="flex-1 bg-indigo-600 text-white text-[10px] font-black py-2.5 rounded-lg shadow-lg shadow-indigo-100">Edit Site</button>
                  <button className="px-3 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors">
                    <Activity className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-[24px] overflow-hidden relative mb-4 border border-gray-100 shadow-sm bg-gray-900">
                  <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-900 shadow-sm">Last Edited 1d ago</span>
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h4 className="font-black text-gray-900">Studio X Portfolio</h4>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">Draft • 5 Pages • Portfolio</p>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-900"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <div className="flex gap-2 mt-4 px-2">
                  <button className="flex-1 bg-indigo-600 text-white text-[10px] font-black py-2.5 rounded-lg shadow-lg shadow-indigo-100">Edit Site</button>
                  <button className="px-3 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors">
                    <Activity className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Create New Card */}
              <div 
                onClick={() => setIsModalOpen(true)}
                className="aspect-[4/3] rounded-[24px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 hover:border-indigo-300 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <div className="text-center px-8">
                  <h4 className="font-black text-gray-900">Create New Project</h4>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 leading-relaxed">Start from a blank canvas or AI-generated template</p>
                </div>
              </div>
            </div>
          </section>

          {/* Master the Atelier Section */}
          <section>
            <h3 className="font-black text-gray-900 mb-8">Master the Atelier</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-32 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="pr-4">
                  <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-1">Advanced Customization</p>
                  <h4 className="font-black text-gray-900 mb-2">Setting up Global Design Tokens</h4>
                  <p className="text-[10px] text-gray-500 line-clamp-2">Learn how to maintain brand consistency across all pages using our new tokens.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-32 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1551288049-bbbda536339a?w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="pr-4">
                  <p className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-1">Conversion Optimization</p>
                  <h4 className="font-black text-gray-900 mb-2">Integrating Sales Analytics</h4>
                  <p className="text-[10px] text-gray-500 line-clamp-2">A step-by-step guide to connecting your storefront to powerful real-time data.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Branding */}
          <footer className="pt-12 text-center border-t border-gray-100">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digital Atelier v4.2.0 • Proudly crafted for shop owners worldwide.</p>
          </footer>
          
        </div>
      </main>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

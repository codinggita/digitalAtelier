import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewProjectModal from '../components/NewProjectModal';
import { useAuth } from '../context/AuthContext';
import dashboardService from '../services/dashboardService';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProjects: 0,
    liveProjects: 0,
    totalViews: 0,
    totalSales: '$0.00'
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
        
        if (statsRes.success) setStats(statsRes.data);
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
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="Dashboard" 
        tabs={['Overview', 'Performance', 'Activity']} 
        activeTab="Overview" 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-8 overflow-y-auto">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* Welcome Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName || 'Creator'} 👋</h1>
                  <p className="text-gray-500 mt-1">Here is what is happening with your storefront today.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-primary/30 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  New Project
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', value: stats.totalProjects, change: '+2', trend: 'up' },
                  { label: 'Live Sites', value: stats.liveProjects, change: 'Stable', trend: 'neutral' },
                  { label: 'Page Views (30d)', value: stats.totalViews, change: '+14.5%', trend: 'up' },
                  { label: 'Total Revenue', value: stats.totalSales, change: '+5.2%', trend: 'up' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">{stat.label}</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Projects List */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="font-bold text-gray-900">Recent Projects</h2>
                  <button className="text-sm text-primary font-medium hover:underline">View all</button>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentProjects.length > 0 ? (
                    recentProjects.map((project) => (
                      <div key={project._id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
                            <img src={project.thumbnail} className="w-full h-full object-cover" alt="thumbnail" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{project.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Last updated {new Date(project.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${
                            project.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No projects found. Create your first project to get started!
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          )}
        </main>
      </div>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

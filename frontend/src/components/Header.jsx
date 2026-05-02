import { Bell, Search, User, Settings, CreditCard, LogOut, HelpCircle, Eye, Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ title = "Digital Atelier", tabs = ['Dashboard', 'Templates', 'Analytics'], activeTab = "Dashboard" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Determine if we are in a project-specific view (like Dashboard/Site Editor)
  const isProjectView = location.pathname === '/dashboard' || location.pathname === '/design' || location.pathname === '/assets';
  const projectTabs = ['Dashboard', 'Site Editor'];
  const displayTabs = isProjectView ? projectTabs : tabs;
  const displayActiveTab = isProjectView ? (location.pathname === '/dashboard' ? 'Dashboard' : 'Site Editor') : activeTab;

  const handleTabClick = (tab) => {
    if (tab === 'Site Editor') navigate('/design');
    else if (tab === 'Dashboard') navigate('/dashboard');
    else if (tab === 'Templates') navigate('/templates');
    else if (tab === 'Analytics') navigate('/analytics');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitial = user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="flex items-center justify-between px-10 py-5 border-b border-gray-100 bg-white sticky top-0 z-20 h-20">
      <div className="flex items-center gap-12">
        <h1 className="font-black text-gray-900 tracking-tight">{isProjectView ? "My Online Boutique" : title}</h1>
        <nav className="flex gap-8">
          {displayTabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] pb-6 -mb-6 border-b-4 transition-all ${
                displayActiveTab === tab 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-8">
        {/* Search Bar (Only in Dashboard) */}
        {isProjectView && (
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs w-64 focus:ring-2 focus:ring-indigo-600/20 focus:bg-white transition-all"
            />
          </div>
        )}

        <div className="flex items-center gap-6">
           <button className="text-gray-400 hover:text-gray-900 transition-colors relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
           </button>
           
           {!isProjectView && (
             <button className="text-gray-400 hover:text-gray-900 transition-colors">
               <HelpCircle className="w-5 h-5" />
             </button>
           )}
        </div>
        
        {/* Project Context Actions (Preview/Publish) */}
        {!isProjectView && location.pathname === '/templates' && (
          <div className="flex items-center gap-4 pl-8 border-l border-gray-100">
            <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
              Preview
            </button>
            <button 
              onClick={() => navigate('/publish-success/demo')}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Publish
            </button>
          </div>
        )}
        
        {/* Profile Dropdown */}
        <div className="relative border-l border-gray-100 pl-8">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden text-indigo-600 font-black text-xs flex items-center justify-center hover:ring-2 hover:ring-indigo-600/30 transition-all"
          >
            {userInitial}
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-4 w-72 bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden py-3 z-50">
              <div className="px-6 py-4 border-b border-gray-50">
                <p className="text-sm font-black text-gray-900">{user?.firstName} {user?.lastName || 'Designer'}</p>
                <p className="text-[10px] text-gray-500 font-bold">{user?.email}</p>
              </div>
              <div className="py-2">
                <button onClick={() => { navigate('/profile'); setIsProfileOpen(false); }} className="w-full text-left px-6 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                  <User className="w-4 h-4 text-gray-400" /> My Profile
                </button>
                <button onClick={() => { navigate('/settings'); setIsProfileOpen(false); }} className="w-full text-left px-6 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" /> Account Settings
                </button>
                <button onClick={() => { navigate('/store'); setIsProfileOpen(false); }} className="w-full text-left px-6 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                  <CreditCard className="w-4 h-4 text-gray-400" /> Store Management
                </button>
              </div>
              <div className="border-t border-gray-50 pt-2 pb-1">
                <button onClick={handleLogout} className="w-full text-left px-6 py-4 text-xs font-black text-red-500 hover:bg-red-50 flex items-center gap-4 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

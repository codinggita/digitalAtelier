import { Bell, Search, User, Settings, CreditCard, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, tabs, activeTab }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleTabClick = (tab) => {
    const path = tab.toLowerCase().replace(' ', '-');
    navigate(`/${path}`);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <h1 className="font-bold text-gray-900">{title}</h1>
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 w-64"
          />
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Bell className="w-5 h-5" />
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 overflow-hidden text-blue-700 font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-primary/30 transition-all"
          >
            US
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-900">Het Rathod</p>
                <p className="text-xs text-gray-500">Boutique Owner • Pro Plan</p>
              </div>
              <div className="py-2">
                <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-400" /> My Profile
                </button>
                <button onClick={() => navigate('/store')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <Settings className="w-4 h-4 text-gray-400" /> Store Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400" /> Billing & Plan
                </button>
              </div>
              <div className="border-t border-gray-50 py-2">
                <button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-red-400" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

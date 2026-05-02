import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Palette, FolderOpen, Settings, HelpCircle, FileText, BarChart2, Tag } from 'lucide-react';
import { useState } from 'react';
import NewProjectModal from './NewProjectModal';

export default function Sidebar() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Pages', icon: FileText, path: '/pages' },
    { name: 'Design', icon: Palette, path: '/design' },
    { name: 'Assets', icon: FolderOpen, path: '/assets' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <aside className="w-64 bg-slate-50 border-r border-gray-200 flex flex-col h-screen p-6">
        {/* Branding */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-sm text-gray-900 leading-tight">Digital Atelier</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Creative Director</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-white text-indigo-600 shadow-sm border border-gray-100' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 uppercase tracking-widest transition-all"
          >
            <span className="text-lg leading-none">+</span> New Project
          </button>
          
          <button className="flex items-center gap-3 px-4 py-2 text-xs text-gray-400 hover:text-gray-900 font-bold transition-colors">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </button>
        </div>
      </aside>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

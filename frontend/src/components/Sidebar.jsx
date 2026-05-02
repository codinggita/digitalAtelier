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
    { name: 'Store', icon: Tag, path: '/store' },
    { name: 'Marketing', icon: BarChart2, path: '/marketing' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <aside className="w-64 bg-slate-50 border-r border-gray-200 flex flex-col h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-gray-900 leading-tight">Atelier Studio</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Creative Director</p>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 mb-8 shadow-lg shadow-primary/20 transition-all"
          >
            <span className="text-xl leading-none">+</span> Create New
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-white text-primary shadow-sm border border-gray-100' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button className="flex items-center gap-3 text-xs text-gray-500 hover:text-gray-700 font-bold transition-colors">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </button>
        </div>
      </aside>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

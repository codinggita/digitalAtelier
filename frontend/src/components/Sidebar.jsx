import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Palette, FolderOpen, Settings, HelpCircle, FileText, BarChart2, Tag } from 'lucide-react';
import { useState } from 'react';
import NewProjectModal from './NewProjectModal';

export default function Sidebar() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Store', icon: Tag, path: '/store' },
    { name: 'Pages', icon: FileText, path: '/pages' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Design', icon: Palette, path: '/design' },
    { name: 'Assets', icon: FolderOpen, path: '/assets' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <aside className="w-64 bg-slate-50 border-r border-gray-200 flex flex-col h-[calc(100vh-2rem)]">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <div>
              <h2 className="font-bold text-sm text-gray-900">Digital Atelier</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">Creative Director</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white text-primary shadow-sm border border-gray-100' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors"
          >
            <span className="text-lg leading-none">+</span> New Project
          </button>
          <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 font-medium px-2">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </button>
        </div>
      </aside>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

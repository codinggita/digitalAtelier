import { Bell, Search } from 'lucide-react';

export default function Header({ title, tabs, activeTab }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <h1 className="font-bold text-gray-900">{title}</h1>
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button 
              key={tab}
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
        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
           <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
        </div>
      </div>
    </header>
  );
}

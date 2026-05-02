import Header from '../components/Header';
import { Search, Plus, MoreHorizontal, Edit2, Loader2, Link2, Globe, Layout, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { pageService, projectService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function PagesManagementPage() {
  const [pages, setPages] = useState([
    { _id: '1', name: 'Home Page', slug: '/', status: 'PUBLISHED', views: '1.2k' },
    { _id: '2', name: 'Collection List', slug: '/collections', status: 'DRAFT', views: '450' },
    { _id: '3', name: 'Product Details', slug: '/product/:id', status: 'PUBLISHED', views: '890' },
  ]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { error, success } = useNotification();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      <Header 
        title="My Online Boutique" 
        activeTab="Site Editor" 
      />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Project Pages</h1>
              <p className="text-sm text-gray-500 font-medium">Manage the architecture of your digital atelier.</p>
            </div>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-8 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-indigo-100 text-xs uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Add New Page
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            {pages.map((page) => (
              <div key={page._id} className="group cursor-pointer">
                <div className="aspect-[16/10] bg-white rounded-[32px] border border-gray-100 shadow-sm mb-4 relative overflow-hidden flex items-center justify-center p-8">
                  <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Layout className="w-10 h-10 text-gray-200" />
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm uppercase tracking-widest ${
                      page.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${page.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      {page.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="font-black text-gray-900">{page.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">{page.slug}</span>
                      <span className="text-[10px] text-gray-300 font-bold">• {page.views} views</span>
                    </div>
                  </div>
                  <button className="p-1 text-gray-300 hover:text-gray-900"><MoreHorizontal className="w-5 h-5" /></button>
                </div>

                <div className="flex gap-2 mt-4 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="flex-1 bg-indigo-50 text-indigo-600 text-[10px] font-black py-2.5 rounded-xl hover:bg-indigo-100 transition-colors">Configure Page</button>
                   <button className="px-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            ))}

            {/* Add New Page Card */}
            <div 
              className="aspect-[16/10] rounded-[32px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-black text-gray-900 text-sm">Create New Page</h3>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Start from a template</p>
            </div>
          </div>

          {/* Global SEO Banner */}
          <div className="bg-gray-900 rounded-[40px] p-10 flex items-center justify-between text-white relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div>
              <h3 className="text-2xl font-black mb-2">Global SEO Settings</h3>
              <p className="text-sm text-gray-400 max-w-md font-medium">Update metadata for all pages to improve search engine rankings across your entire boutique.</p>
            </div>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl shadow-black/20">
              Configure SEO
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

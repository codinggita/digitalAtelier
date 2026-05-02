import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Search, Plus, Sparkles, Loader2, Layout, Filter } from 'lucide-react';
import { templateService, projectService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Minimalist Muse', category: 'PREMIUM', description: 'An editorial-first canvas optimized for high-end fashion portfolios and...', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' },
    { id: 2, name: 'Digital Noir', category: 'POPULAR', description: 'A high-contrast, dark-mode focused layout designed for SaaS startups...', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80' },
    { id: 3, name: 'Terra Living', category: 'STANDARD', description: 'Earthy tones and organic shapes for wellness brands, eco-friendly shops...', image: 'https://images.unsplash.com/photo-1518005020251-58296d8f8b4d?w=800&q=80' },
    { id: 4, name: 'Vanguard Grid', category: 'PREMIUM', description: 'Bold typography and asymmetrical grids for artists and musicians who...', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80' },
    { id: 5, name: 'Lumina Studio', category: 'POPULAR', description: 'A versatile, multi-purpose layout designed to handle large amounts of...', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { error, success } = useNotification();
  const navigate = useNavigate();

  const handleSelectTemplate = async (template) => {
    try {
      setIsCreating(true);
      const res = await projectService.createProject({
        name: `New Project - ${template ? template.name : 'Blank Canvas'}`,
        description: 'Created from the Templates gallery.',
        elements: template ? template.elements : []
      });
      if (res.success) {
        success('Project created successfully!');
        navigate(`/editor/${res.data._id}`);
      }
    } catch (err) {
      error('Failed to create project.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <Header 
        title="Digital Atelier" 
        activeTab="Templates" 
      />
      
      {/* Loading Overlay */}
      {isCreating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-xl font-black text-gray-900">Setting up your studio...</h2>
        </div>
      )}

      <div className="p-10 max-w-7xl mx-auto w-full overflow-y-auto pb-24">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">Choose your canvas.</h1>
            <p className="text-sm text-gray-500 max-w-xl font-medium">
              Select a baseline for your creative vision. Every template is fully customizable within your studio environment.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs w-72 focus:ring-2 focus:ring-indigo-600/20 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-8 border-b border-gray-100 mb-10">
          {['All Categories', 'E-commerce', 'Portfolio', 'Blog & Editorial', 'Services', 'AI & Tech'].map((cat, i) => (
            <button 
              key={cat}
              className={`pb-4 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${
                i === 0 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 mb-16">
          {templates.map((template) => (
            <div onClick={() => handleSelectTemplate(template)} key={template.id} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-gray-100 shadow-sm relative mb-4 bg-gray-100">
                <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-black text-gray-900">{template.name}</h3>
                  <span className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                    template.category === 'PREMIUM' ? 'bg-indigo-100 text-indigo-700' :
                    template.category === 'POPULAR' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {template.category}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>
            </div>
          ))}

          {/* Start from scratch card */}
          <div onClick={() => handleSelectTemplate(null)} className="aspect-[4/3] rounded-[32px] border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center text-center hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="font-black text-gray-900 mb-2">Start from scratch</h3>
            <p className="text-[10px] text-gray-400 font-bold mb-8 max-w-[200px]">
              Feeling brave? Open the studio with a blank canvas and build your masterpiece from the ground up.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-8 rounded-xl text-[10px] uppercase tracking-widest transition-all">
              Open Studio
            </button>
          </div>
        </div>

        {/* Bottom Banners Row */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5 bg-gray-900 text-white rounded-[40px] p-10 relative overflow-hidden group">
            <h3 className="text-3xl font-black mb-4 leading-tight">Build with AI Intelligence.</h3>
            <p className="text-xs text-gray-400 mb-10 max-w-xs leading-relaxed font-medium">Our creative engine analyzes your industry to suggest the best typography and color palettes automatically.</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?img=${i+30}`} className="w-12 h-12 rounded-full border-4 border-gray-900" alt="avatar" />
                ))}
                <div className="w-12 h-12 rounded-full bg-indigo-600 border-4 border-gray-900 flex items-center justify-center text-[10px] font-black">
                  +2k
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Joined the studio this month</span>
            </div>
          </div>

          <div className="col-span-3 bg-indigo-600 text-white rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-xl shadow-indigo-100">
            <h2 className="text-6xl font-black mb-2">99%</h2>
            <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-4 text-indigo-200">Speed Score</p>
            <p className="text-[10px] text-indigo-100/70 font-bold">Optimized for search engines and mobile performance.</p>
          </div>

          <div className="col-span-4 bg-gray-100 rounded-[40px] p-10 relative overflow-hidden flex flex-col justify-center group">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm text-gray-900">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Pixel Perfect</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] font-medium">Your site looks stunning on any screen size, guaranteed.</p>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white rotate-12">
               <Sparkles className="w-12 h-12 -ml-6 -mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

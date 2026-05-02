import Header from '../components/Header';
import { Search, Plus, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { templateService, projectService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { error, success } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const res = await templateService.getTemplates();
      if (res.success) {
        setTemplates(res.data);
      }
    } catch (err) {
      error('Failed to load templates.');
    } finally {
      setIsLoading(false);
    }
  };

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
        tabs={['Dashboard', 'Templates', 'Analytics']} 
        activeTab="Templates" 
      />
      
      {/* Loading Overlay when Creating */}
      {isCreating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Setting up your studio...</h2>
          <p className="text-sm text-gray-500">Preparing the canvas for your new project.</p>
        </div>
      )}

      <div className="p-8 max-w-7xl mx-auto w-full overflow-y-auto pb-24">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose your canvas.</h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Select a baseline for your creative vision. Every template is fully customizable within your studio environment.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
              Filter
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          {['All Categories', 'E-commerce', 'Portfolio', 'Blog & Editorial', 'Services', 'AI & Tech'].map((cat, i) => (
            <button 
              key={cat}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                i === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 mb-12">
            {templates.map((template) => (
              <div onClick={() => handleSelectTemplate(template)} key={template.id || template.name} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-black/20">Use Template</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900">{template.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      template.category === 'PREMIUM' ? 'bg-purple-100 text-purple-700' :
                      template.category === 'POPULAR' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Start from scratch card */}
            <div onClick={() => handleSelectTemplate(null)} className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[300px] hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Start from scratch</h3>
              <p className="text-xs text-gray-500 mb-6 max-w-[200px]">
                Feeling brave? Open the studio with a blank canvas and build your masterpiece from the ground up.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg text-sm transition-colors">
                Open Studio
              </button>
            </div>
          </div>
        )}

        {/* Bottom Banner Row */}
        <div className="grid grid-cols-12 gap-6 pb-20">
          <div className="col-span-5 bg-gray-900 text-white rounded-[32px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h3 className="text-2xl font-black mb-3 leading-tight">Build with AI Intelligence.</h3>
            <p className="text-sm text-gray-400 mb-8 max-w-xs leading-relaxed">Our creative engine analyzes your industry to suggest the best typography and color palettes automatically.</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?img=${i+20}`} className="w-10 h-10 rounded-full border-2 border-gray-900 shadow-sm" alt="avatar" />
                ))}
                <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-gray-900 flex items-center justify-center text-[10px] font-black shadow-sm">
                  +2k
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Joined the studio this month</span>
            </div>
            <div className="absolute bottom-6 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
               <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>
          </div>

          <div className="col-span-3 bg-indigo-600 text-white rounded-[32px] p-8 flex flex-col items-center justify-center text-center shadow-lg shadow-indigo-200">
            <h2 className="text-6xl font-black mb-1">99%</h2>
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-3 text-indigo-200">Speed Score</p>
            <p className="text-[10px] text-indigo-100/70 font-medium">Optimized for search engines and mobile performance.</p>
          </div>

          <div className="col-span-4 bg-gray-100 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm text-gray-900 group-hover:rotate-12 transition-transform">
               <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Pixel Perfect</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">Your site looks stunning on any screen size, guaranteed.</p>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white rotate-12">
               <Sparkles className="w-10 h-10 -ml-4 -mt-4" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

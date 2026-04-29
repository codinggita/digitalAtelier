import Header from '../components/Header';
import { Search, Plus, MoreVertical, Edit2, Loader2, Link2, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { pageService, projectService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function PagesManagementPage() {
  const [pages, setPages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const { error, success } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [pagesRes, projectsRes] = await Promise.all([
        pageService.getPages(),
        projectService.getProjects()
      ]);
      if (pagesRes.success) setPages(pagesRes.data);
      if (projectsRes.success) setProjects(projectsRes.data);
    } catch (err) {
      console.error(err);
      error('Failed to load pages data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewPage = async () => {
    if (projects.length === 0) {
      error('You need to create a Project first before adding pages.');
      return;
    }
    
    // Default to the first project for this MVP logic
    const targetProject = projects[0]._id;
    
    try {
      setIsCreating(true);
      const newPage = {
        projectId: targetProject,
        name: 'New Custom Page',
        slug: `/page-${Date.now()}`
      };
      
      const res = await pageService.createPage(newPage);
      if (res.success) {
        success('Page created successfully!');
        fetchData(); // reload
      }
    } catch (err) {
      error('Failed to create page.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="My Online Boutique" 
        tabs={['Dashboard', 'Site Editor', 'Pages']} 
        activeTab="Pages" 
      />
      
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Pages</h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Manage the architecture of your digital atelier. Organize content, drafts, and publication status in one curated space.
            </p>
          </div>
          <button 
            onClick={handleCreateNewPage}
            disabled={isCreating}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add New Page
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 mb-12">
            {pages.map((page) => (
              <div key={page._id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all group relative">
                <div className="aspect-[16/10] bg-gray-100 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
                   {/* Dummy thumbnail based on slug */}
                  {page.slug === '/' ? <Globe className="w-12 h-12 text-gray-300" /> : <Link2 className="w-12 h-12 text-gray-300" />}
                  
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm ${
                      page.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${page.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      {page.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900">{page.name}</h3>
                  <div className="flex text-gray-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate(`/editor/${page.project?._id}`)} className="p-1 hover:text-primary"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-gray-900"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex text-[10px] text-gray-500 gap-3 justify-between items-center mt-2">
                  <span className="flex items-center gap-1 font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {page.slug}
                  </span>
                  <span className="flex items-center gap-1">👁️ {page.views || 0} views</span>
                </div>
              </div>
            ))}

            {/* Add New Page Card */}
            <div 
              onClick={handleCreateNewPage}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer min-h-[250px]"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Plus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Add New Page</h3>
              <p className="text-[10px] text-gray-500 max-w-[150px]">
                Start from a template or blank canvas
              </p>
            </div>
          </div>
        )}

        {/* Global SEO Settings Banner */}
        <div className="bg-primary rounded-2xl p-6 flex items-center justify-between text-white shadow-xl shadow-primary/20">
          <div>
            <h3 className="text-lg font-bold mb-1">Global SEO Settings</h3>
            <p className="text-sm text-primary-100">Update metadata for all pages to improve search engine rankings.</p>
          </div>
          <button className="bg-white text-primary px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5">
            Open Settings
          </button>
        </div>

      </div>
    </div>
  );
}

import Header from '../components/Header';
import { Info, Search, Code, Eye, AlertTriangle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function ProjectSettingsPage() {
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    seoTitle: '',
    seoDescription: '',
    headerScripts: '',
    analyticsId: '',
    stripeKey: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const res = await projectService.getProjects();
      if (res.success && res.data.length > 0) {
        const primaryProject = res.data[0];
        setProject(primaryProject);
        setFormData({
          name: primaryProject.name || '',
          domain: primaryProject.domain || '',
          seoTitle: primaryProject.seoTitle || '',
          seoDescription: primaryProject.seoDescription || '',
          headerScripts: primaryProject.headerScripts || '',
          analyticsId: primaryProject.analyticsId || '',
          stripeKey: primaryProject.stripeKey || ''
        });
      }
    } catch (err) {
      error('Failed to load project settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!project) return;
    try {
      setIsSaving(true);
      const res = await projectService.updateProject(project._id, formData);
      if (res.success) {
        success('Project settings saved successfully!');
        setProject(res.data);
      }
    } catch (err) {
      error('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    if (!window.confirm('Are you absolutely sure you want to delete this project? This is irreversible.')) return;
    
    try {
      setIsSaving(true);
      const res = await projectService.deleteProject(project._id);
      if (res.success) {
        success('Project deleted permanently.');
        navigate('/dashboard');
      }
    } catch (err) {
      error('Failed to delete project.');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <Header title="Settings" tabs={['Dashboard']} activeTab="Dashboard" />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <Header title="Settings" tabs={['Dashboard']} activeTab="Dashboard" />
        <div className="flex-1 flex justify-center items-center text-gray-500">
          No project found. Please create one from the dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title={project.name || "Project Settings"} 
        tabs={['Dashboard', 'Site Editor', 'Settings']} 
        activeTab="Settings" 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav */}
        <div className="w-64 border-r border-gray-200 p-6 bg-white hidden md:block">
           <h2 className="text-xl font-bold text-gray-900 mb-8">Project Settings</h2>
           <nav className="space-y-2">
             <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-primary/5 text-primary rounded-lg text-sm font-bold border border-primary/10">
               <Info className="w-4 h-4" />
               General Settings
             </button>
             <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
               <Search className="w-4 h-4" />
               SEO & Social
             </button>
             <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
               <Code className="w-4 h-4" />
               Advanced
             </button>
           </nav>
        </div>

        {/* Main Settings Content */}
        <div className="flex-1 p-8 overflow-y-auto pb-24 max-w-4xl mx-auto w-full">
           <h1 className="text-3xl font-bold text-gray-900 mb-2 md:hidden">Project Settings</h1>
           <p className="text-sm text-gray-500 mb-8 md:hidden">Manage your digital atelier's configuration, presence, and advanced integrations.</p>

           {/* General Settings */}
           <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">General Settings</h3>
                  <p className="text-sm text-gray-500">Basic information about your project.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-2">Project Name</label>
                   <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-700 mb-2">Internal Reference ID</label>
                   <input type="text" className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 cursor-not-allowed" value={project._id} disabled />
                 </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-gray-700 mb-2">Primary Domain</label>
                 <div className="flex gap-4">
                   <input type="text" name="domain" value={formData.domain} onChange={handleInputChange} placeholder="e.g., https://myboutique.com" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20" />
                   <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg text-sm transition-colors whitespace-nowrap">Connect Domain</button>
                 </div>
              </div>
           </div>

           {/* SEO & Social */}
           <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">SEO & Social Branding</h3>
                  <p className="text-sm text-gray-500">Optimize how your site appears in search engines and social feeds.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Global Title Tag</label>
                    <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleInputChange} placeholder="e.g., The Digital Atelier | Bespoke Fashion" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20" />
                    <p className="text-[10px] text-gray-400 mt-1 flex justify-between"><span>Ideal length: 50-60 characters</span><span>{formData.seoTitle.length}/60</span></p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Meta Description</label>
                    <textarea name="seoDescription" value={formData.seoDescription} onChange={handleInputChange} placeholder="Brief description of your site..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 h-24 resize-none"></textarea>
                    <p className="text-[10px] text-gray-400 mt-1 flex justify-between"><span>Ideal length: 150-160 characters</span><span>{formData.seoDescription.length}/160</span></p>
                  </div>
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-700 mb-2">Social Share Preview</label>
                   <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                     <div className="h-32 bg-gray-100 relative">
                        <img src={project.thumbnail} className="w-full h-full object-cover" alt="Share Preview" />
                     </div>
                     <div className="p-4 bg-gray-50">
                       <h4 className="text-xs font-bold text-blue-600 truncate">{formData.domain || 'yoursite.com'}</h4>
                       <h3 className="text-sm font-bold text-gray-900 truncate my-1">{formData.seoTitle || project.name}</h3>
                       <p className="text-xs text-gray-500 line-clamp-2">{formData.seoDescription || project.description}</p>
                     </div>
                   </div>
                   <p className="text-[10px] text-gray-500 mt-2">Recommended 1200x630px for optimal social platform rendering.</p>
                </div>
              </div>
           </div>

           {/* Advanced */}
           <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Advanced Configuration</h3>
                  <p className="text-sm text-gray-500">Scripts, API keys, and system-level integrations.</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-6 border-b border-gray-200 mb-4">
                  <button className="pb-2 text-sm font-bold border-b-2 border-primary text-primary">Header Scripts</button>
                </div>
                <div className="relative">
                  <textarea name="headerScripts" value={formData.headerScripts} onChange={handleInputChange} placeholder="<!-- Insert your tracking codes or custom CSS here -->" className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 h-32 w-full resize-none focus:ring-2 focus:ring-primary/20"></textarea>
                  <span className="absolute top-4 right-4 text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded pointer-events-none">HTML / JS / CSS</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Google Analytics ID</label>
                  <div className="relative">
                    <input type="text" name="analyticsId" value={formData.analyticsId} onChange={handleInputChange} placeholder="G-XXXXXXXXXX" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 pr-10" />
                    <Eye className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Stripe Public Key</label>
                  <div className="relative">
                    <input type="text" name="stripeKey" value={formData.stripeKey} onChange={handleInputChange} placeholder="pk_live_..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 pr-10" />
                    <Eye className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-red-800 flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4" /> Danger Zone
                  </h4>
                  <p className="text-xs text-red-600">Permanently delete this project and all associated assets. This action is irreversible.</p>
                </div>
                <button onClick={handleDelete} disabled={isSaving} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50">
                  Delete Project
                </button>
              </div>

           </div>
        </div>
      </div>
      
      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center px-8 z-20 md:left-0">
        <div className="hidden md:block"></div> {/* Spacer for md */}
        <div className="flex gap-4 items-center ml-auto">
          <button onClick={() => fetchProject()} disabled={isSaving} className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50">Discard Changes</button>
          <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

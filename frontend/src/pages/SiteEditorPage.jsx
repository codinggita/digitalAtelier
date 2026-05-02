import React, { useState, useEffect } from 'react';
import { Save, ChevronLeft, Loader2, Undo2, Redo2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../services/api';
import { EditorProvider, useEditor } from '../context/EditorContext';
import { useNotification } from '../context/NotificationContext';
import EditorSidebar from '../components/builder/EditorSidebar';
import EditorCanvas from '../components/builder/EditorCanvas';
import EditorProperties from '../components/builder/EditorProperties';

// The actual editor interface, which consumes the EditorContext
function EditorInterface({ project, isSaving, handleSave }) {
  const navigate = useNavigate();
  const { loadElements, elements, canUndo, canRedo, undo, redo } = useEditor();

  // Load project elements on mount
  useEffect(() => {
    if (project && project.elements) {
      loadElements(project.elements);
    }
  }, [project, loadElements]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 w-full fixed inset-0 z-50 overflow-hidden">
      
      {/* Left Sidebar (Components) */}
      <EditorSidebar />

      {/* Canvas Area (Center) */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-100/50">
        
        {/* Top Navbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-gray-100 rounded-md mr-2">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="bg-gray-100 px-3 py-1 rounded-md text-xs font-bold text-gray-600">
               {project?.name || 'Untitled Project'}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium ml-2">
               <span className="w-2 h-2 rounded-full bg-green-500"></span> 
               {isSaving ? 'Saving changes...' : 'Ready'}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* History Controls */}
             <div className="flex items-center gap-1 border-r border-gray-200 pr-4 mr-1">
               <button 
                 onClick={undo} 
                 disabled={!canUndo}
                 className={`p-1.5 rounded-md ${canUndo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'}`}
                 title="Undo"
               >
                 <Undo2 className="w-4 h-4" />
               </button>
               <button 
                 onClick={redo} 
                 disabled={!canRedo}
                 className={`p-1.5 rounded-md ${canRedo ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'}`}
                 title="Redo"
               >
                 <Redo2 className="w-4 h-4" />
               </button>
             </div>

             <button className="px-4 py-1.5 text-sm font-bold text-gray-600 hover:text-gray-900">Preview</button>
             <button 
              onClick={() => handleSave(elements)} 
              disabled={isSaving}
              className="px-6 py-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-md shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                Publish
             </button>
          </div>
        </div>
        
        {/* Interactive Canvas */}
        <EditorCanvas />
      </div>

      {/* Right Sidebar (Properties) */}
      <EditorProperties />
    </div>
  );
}

// Wrapper component to provide state and handle async project loading
export default function SiteEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useNotification();
  
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await projectService.getProjectById(id);
        if (response.success) {
          setProject(response.data);
        }
      } catch (err) {
        showError('Failed to load project or you do not have permission.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, showError]);

  const handleSave = async (elementsToSave) => {
    try {
      setIsSaving(true);
      await projectService.updateProject(id, {
        elements: elementsToSave,
        lastPublishedAt: new Date()
      });
      showSuccess('Project published successfully!');
      // Navigate to the publish success page matching Figma design
      setTimeout(() => {
        navigate(`/publish-success/${id}`);
      }, 500);
    } catch (err) {
      showError('Failed to publish project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-medium font-serif italic">Entering your digital atelier...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
        <p className="text-gray-500">The project you are looking for does not exist or you do not have access.</p>
        <button onClick={() => window.history.back()} className="px-6 py-2 bg-primary text-white rounded-lg font-medium mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <EditorProvider>
      <EditorInterface project={project} isSaving={isSaving} handleSave={handleSave} />
    </EditorProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { Type, Image as ImageIcon, Layout, Box, Check, MousePointer2, Move, Save, ChevronLeft, ShoppingBag, LayoutTemplate, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../services/api';

// A simple block-based editor simulation
export default function SiteEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [elements, setElements] = useState([]);
  const [projectName, setProjectName] = useState('Untitled Project');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedElement = elements.find(e => e.id === selectedId);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await projectService.getProjectById(id);
      if (response.success) {
        setElements(response.data.elements || []);
        setProjectName(response.data.name);
      }
    } catch (err) {
      console.error('Failed to load project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await projectService.updateProject(id, {
        elements,
        lastPublishedAt: new Date()
      });
      // Optionally show a success toast here
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Failed to save project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addElement = (type) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      content: type === 'header' ? 'New Heading' : 
               type === 'button' ? 'Click Me' : 
               type === 'image' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop' : 
               type === 'product' ? 'Silk Summer Dress' : 
               type === 'hero' ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop' : 'New text block',
      price: type === 'product' ? '$120.00' : undefined,
      imageUrl: type === 'product' ? 'https://images.unsplash.com/photo-1515347619362-7f938d22384a?q=80&w=400' : undefined,
      color: '#111827',
      bg: type === 'button' ? '#4338ca' : 'transparent',
      align: 'center',
      fontSize: type === 'header' ? 'text-3xl' : 'text-base'
    };
    setElements([...elements, newElement]);
  };

  const updateSelected = (key, value) => {
    setElements(elements.map(e => e.id === selectedId ? { ...e, [key]: value } : e));
  };

  const deleteSelected = () => {
    setElements(elements.filter(e => e.id !== selectedId));
    setSelectedId(null);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-medium font-serif italic">Entering your digital atelier...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 w-full fixed inset-0 z-50 overflow-hidden">
      
      {/* Left Sidebar (Components) */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-1 hover:bg-gray-100 rounded-md">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="font-bold text-sm">Add Elements</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          <button onClick={() => addElement('header')} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
            <Type className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-wide">Heading</span>
          </button>
          <button onClick={() => addElement('paragraph')} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
            <Layout className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-wide">Text</span>
          </button>
          <button onClick={() => addElement('button')} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
            <Box className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-wide">Button</span>
          </button>
          <button onClick={() => addElement('image')} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
            <ImageIcon className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-wide">Image</span>
          </button>
          <button onClick={() => addElement('product')} className="flex flex-col items-center justify-center p-3 bg-indigo-50 border border-indigo-100 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer group col-span-2">
            <ShoppingBag className="w-5 h-5 mb-1 text-indigo-400 group-hover:text-indigo-600" />
            <span className="text-[9px] font-bold uppercase tracking-wide text-indigo-700">Add Product Card</span>
          </button>
          <button onClick={() => addElement('hero')} className="flex flex-col items-center justify-center p-3 bg-purple-50 border border-purple-100 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-colors cursor-pointer group col-span-2">
            <LayoutTemplate className="w-5 h-5 mb-1 text-purple-400 group-hover:text-purple-600" />
            <span className="text-[9px] font-bold uppercase tracking-wide text-purple-700">Add Hero Banner</span>
          </button>
        </div>
        <div className="mt-auto p-4 border-t border-gray-100 bg-gray-50">
           <div className="flex items-center gap-2 text-xs text-gray-500">
             <MousePointer2 className="w-4 h-4" /> Select an element on the canvas to edit its properties.
           </div>
        </div>
      </div>

      {/* Canvas Area (Center) */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-100/50">
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 px-3 py-1 rounded-md text-xs font-bold text-gray-600">
               {projectName}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
               <span className="w-2 h-2 rounded-full bg-green-500"></span> 
               {isSaving ? 'Saving changes...' : 'Ready'}
            </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-1.5 text-sm font-bold text-gray-600 hover:text-gray-900">Preview</button>
             <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="px-6 py-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-md shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
                Publish
             </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-12 flex justify-center pb-32">
          {/* Website Frame */}
          <div className="w-full max-w-4xl bg-white min-h-[800px] shadow-2xl rounded-sm border border-gray-200 flex flex-col py-16 px-8 relative overflow-hidden">
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-4">
                <Box className="w-12 h-12 stroke-1" />
                <p>Drag elements here or click to add from sidebar</p>
              </div>
            )}
            
            {elements.map((el) => (
              <div 
                key={el.id}
                onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                className={`relative group p-2 rounded transition-all ${
                  selectedId === el.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-200 hover:ring-offset-2 cursor-pointer'
                }`}
                style={{ textAlign: el.align || 'center' }}
              >
                {/* Element Render */}
                {el.type === 'hero' && (
                  <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-4">
                    <img src={el.content} className="w-full h-full object-cover" alt="Hero" />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-8">
                      <h2 className="text-white text-4xl font-bold mb-4">Summer Collection</h2>
                      <button className="bg-white text-black px-6 py-2 rounded-full font-bold">Shop Now</button>
                    </div>
                  </div>
                )}
                {el.type === 'product' && (
                  <div className="max-w-xs mx-auto bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img src={el.imageUrl} className="w-full h-full object-cover" alt={el.content} />
                    </div>
                    <div className="p-4 flex flex-col items-center text-center">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{el.content}</h3>
                      <p className="text-gray-500 font-medium text-sm mb-4">{el.price}</p>
                      <button className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )}
                {el.type === 'header' && (
                  <h1 className={`${el.fontSize} font-bold`} style={{ color: el.color }}>{el.content}</h1>
                )}
                {el.type === 'paragraph' && (
                  <p className={`${el.fontSize} max-w-2xl mx-auto`} style={{ color: el.color }}>{el.content}</p>
                )}
                {el.type === 'button' && (
                  <button className="px-8 py-3 rounded-full font-bold shadow-sm transition-transform hover:-translate-y-0.5 mt-4" style={{ backgroundColor: el.bg, color: el.color }}>
                    {el.content}
                  </button>
                )}
                {el.type === 'image' && (
                  <img src={el.content} className="w-full max-w-lg mx-auto rounded-xl shadow-md mt-4" alt="User content" />
                )}

                {/* Selection Overlay tools */}
                {selectedId === el.id && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg flex gap-3 shadow-xl z-20">
                    <button className="hover:text-primary transition-colors flex items-center gap-1"><Move className="w-3 h-3" /> Move</button>
                    <button onClick={(e) => { e.stopPropagation(); deleteSelected(); }} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar (Properties) */}
      <div className="w-80 bg-white border-l border-gray-200 h-full z-10 shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-sm">Properties</h2>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto">
          {selectedElement ? (
            <div className="space-y-6">
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content</label>
                 {(selectedElement.type === 'image' || selectedElement.type === 'hero') ? (
                   <input 
                     type="text" 
                     value={selectedElement.content}
                     onChange={(e) => updateSelected('content', e.target.value)}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                     placeholder="Image URL"
                   />
                 ) : selectedElement.type === 'product' ? (
                   <div className="space-y-3">
                     <input 
                       type="text" 
                       value={selectedElement.content}
                       onChange={(e) => updateSelected('content', e.target.value)}
                       className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                       placeholder="Product Name"
                     />
                     <input 
                       type="text" 
                       value={selectedElement.price}
                       onChange={(e) => updateSelected('price', e.target.value)}
                       className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                       placeholder="Price (e.g. $120.00)"
                     />
                     <input 
                       type="text" 
                       value={selectedElement.imageUrl}
                       onChange={(e) => updateSelected('imageUrl', e.target.value)}
                       className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                       placeholder="Product Image URL"
                     />
                   </div>
                 ) : (
                   <textarea 
                     value={selectedElement.content}
                     onChange={(e) => updateSelected('content', e.target.value)}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary min-h-[100px]"
                   />
                 )}
               </div>

               {(selectedElement.type === 'header' || selectedElement.type === 'paragraph') && (
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Text Color</label>
                   <div className="flex gap-2">
                     <input 
                       type="color" 
                       value={selectedElement.color}
                       onChange={(e) => updateSelected('color', e.target.value)}
                       className="w-8 h-8 rounded cursor-pointer border-none"
                     />
                     <input 
                       type="text" 
                       value={selectedElement.color}
                       onChange={(e) => updateSelected('color', e.target.value)}
                       className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm uppercase"
                     />
                   </div>
                 </div>
               )}

               {selectedElement.type === 'button' && (
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Button Color</label>
                   <div className="flex gap-2 mb-3">
                     <input 
                       type="color" 
                       value={selectedElement.bg}
                       onChange={(e) => updateSelected('bg', e.target.value)}
                       className="w-8 h-8 rounded cursor-pointer border-none"
                     />
                     <input 
                       type="text" 
                       value={selectedElement.bg}
                       onChange={(e) => updateSelected('bg', e.target.value)}
                       className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm uppercase"
                     />
                   </div>
                   
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Text Color</label>
                   <div className="flex gap-2">
                     <input 
                       type="color" 
                       value={selectedElement.color}
                       onChange={(e) => updateSelected('color', e.target.value)}
                       className="w-8 h-8 rounded cursor-pointer border-none"
                     />
                     <input 
                       type="text" 
                       value={selectedElement.color}
                       onChange={(e) => updateSelected('color', e.target.value)}
                       className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm uppercase"
                     />
                   </div>
                 </div>
               )}

               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Alignment</label>
                 <div className="flex bg-gray-100 rounded-lg p-1">
                   {['left', 'center', 'right'].map(align => (
                     <button 
                       key={align}
                       onClick={() => updateSelected('align', align)}
                       className={`flex-1 py-1.5 text-xs font-bold rounded capitalize ${selectedElement.align === align ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
                     >
                       {align}
                     </button>
                   ))}
                 </div>
               </div>
               
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-3">
              <Check className="w-8 h-8" />
              <p className="text-sm">Select an element on the canvas to view its properties.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

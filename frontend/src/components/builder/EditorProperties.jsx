import React from 'react';
import { Check } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';

export default function EditorProperties() {
  const { selectedElement, updateElement } = useEditor();

  return (
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
                   value={selectedElement.content || ''}
                   onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                   className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                   placeholder="Image URL"
                 />
               ) : selectedElement.type === 'product' ? (
                 <div className="space-y-3">
                   <input 
                     type="text" 
                     value={selectedElement.content || ''}
                     onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                     placeholder="Product Name"
                   />
                   <input 
                     type="text" 
                     value={selectedElement.price || ''}
                     onChange={(e) => updateElement(selectedElement.id, { price: e.target.value })}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                     placeholder="Price (e.g. $120.00)"
                   />
                   <input 
                     type="text" 
                     value={selectedElement.imageUrl || ''}
                     onChange={(e) => updateElement(selectedElement.id, { imageUrl: e.target.value })}
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary"
                     placeholder="Product Image URL"
                   />
                 </div>
               ) : (
                 <textarea 
                   value={selectedElement.content || ''}
                   onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
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
                     value={selectedElement.color || '#000000'}
                     onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                     className="w-8 h-8 rounded cursor-pointer border-none"
                   />
                   <input 
                     type="text" 
                     value={selectedElement.color || '#000000'}
                     onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
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
                     value={selectedElement.bg || '#4338ca'}
                     onChange={(e) => updateElement(selectedElement.id, { bg: e.target.value })}
                     className="w-8 h-8 rounded cursor-pointer border-none"
                   />
                   <input 
                     type="text" 
                     value={selectedElement.bg || '#4338ca'}
                     onChange={(e) => updateElement(selectedElement.id, { bg: e.target.value })}
                     className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm uppercase"
                   />
                 </div>
                 
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Text Color</label>
                 <div className="flex gap-2">
                   <input 
                     type="color" 
                     value={selectedElement.color || '#ffffff'}
                     onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                     className="w-8 h-8 rounded cursor-pointer border-none"
                   />
                   <input 
                     type="text" 
                     value={selectedElement.color || '#ffffff'}
                     onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
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
                     onClick={() => updateElement(selectedElement.id, { align })}
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
  );
}

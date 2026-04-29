import React from 'react';
import { Type, Image as ImageIcon, Layout, Box, ShoppingBag, LayoutTemplate, MousePointer2 } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';

export default function EditorSidebar() {
  const { addElement } = useEditor();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-10 shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <h2 className="font-bold text-sm">Add Elements</h2>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <button onClick={() => addElement('header', { content: 'New Heading', fontSize: 'text-3xl', color: '#111827', align: 'center' })} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
          <Type className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-wide">Heading</span>
        </button>
        <button onClick={() => addElement('paragraph', { content: 'New text block', fontSize: 'text-base', color: '#111827', align: 'center' })} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
          <Layout className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-wide">Text</span>
        </button>
        <button onClick={() => addElement('button', { content: 'Click Me', bg: '#4338ca', color: '#ffffff', align: 'center' })} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
          <Box className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-wide">Button</span>
        </button>
        <button onClick={() => addElement('image', { content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop', align: 'center' })} className="flex flex-col items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors cursor-pointer group">
          <ImageIcon className="w-5 h-5 mb-1 text-gray-400 group-hover:text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-wide">Image</span>
        </button>
        <button onClick={() => addElement('product', { content: 'Silk Summer Dress', price: '$120.00', imageUrl: 'https://images.unsplash.com/photo-1515347619362-7f938d22384a?q=80&w=400', align: 'center' })} className="flex flex-col items-center justify-center p-3 bg-indigo-50 border border-indigo-100 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer group col-span-2">
          <ShoppingBag className="w-5 h-5 mb-1 text-indigo-400 group-hover:text-indigo-600" />
          <span className="text-[9px] font-bold uppercase tracking-wide text-indigo-700">Add Product Card</span>
        </button>
        <button onClick={() => addElement('hero', { content: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop', align: 'center' })} className="flex flex-col items-center justify-center p-3 bg-purple-50 border border-purple-100 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-colors cursor-pointer group col-span-2">
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
  );
}

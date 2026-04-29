import React from 'react';
import { Box, Move, Copy } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';

export default function EditorCanvas() {
  const { elements, selectedId, setSelectedId, removeElement, moveElement, duplicateElement } = useEditor();

  return (
    <div className="flex-1 overflow-y-auto p-12 flex justify-center pb-32 bg-gray-100/50 relative">
      {/* Website Frame */}
      <div className="w-full max-w-4xl bg-white min-h-[800px] shadow-2xl rounded-sm border border-gray-200 flex flex-col py-16 px-8 relative overflow-hidden" onClick={() => setSelectedId(null)}>
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
              selectedId === el.id ? 'ring-2 ring-primary ring-offset-2 z-10' : 'hover:ring-2 hover:ring-gray-200 hover:ring-offset-2 cursor-pointer'
            }`}
            style={{ textAlign: el.align || 'center' }}
          >
            {/* Element Render */}
            {el.type === 'hero' && (
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-4">
                <img src={el.content} className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
                  <h2 className="text-white text-4xl font-bold mb-4">Summer Collection</h2>
                  <button className="bg-white text-black px-6 py-2 rounded-full font-bold">Shop Now</button>
                </div>
              </div>
            )}
            {el.type === 'product' && (
              <div className="max-w-xs mx-auto bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden pointer-events-none">
                  <img src={el.imageUrl} className="w-full h-full object-cover" alt={el.content} />
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{el.content}</h3>
                  <p className="text-gray-500 font-medium text-sm mb-4">{el.price}</p>
                  <button className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors pointer-events-none">
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
              <button className="px-8 py-3 rounded-full font-bold shadow-sm transition-transform hover:-translate-y-0.5 mt-4 pointer-events-none" style={{ backgroundColor: el.bg, color: el.color }}>
                {el.content}
              </button>
            )}
            {el.type === 'image' && (
              <img src={el.content} className="w-full max-w-lg mx-auto rounded-xl shadow-md mt-4 pointer-events-none" alt="User content" />
            )}

            {/* Selection Overlay tools */}
            {selectedId === el.id && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg flex gap-3 shadow-xl z-20">
                <button onClick={(e) => { e.stopPropagation(); moveElement(el.id, 'up'); }} className="hover:text-primary transition-colors flex items-center gap-1"><Move className="w-3 h-3 rotate-180" /></button>
                <button onClick={(e) => { e.stopPropagation(); moveElement(el.id, 'down'); }} className="hover:text-primary transition-colors flex items-center gap-1"><Move className="w-3 h-3" /></button>
                <div className="w-px h-3 bg-gray-700 my-auto"></div>
                <button onClick={(e) => { e.stopPropagation(); duplicateElement(el.id); }} className="hover:text-primary transition-colors flex items-center gap-1"><Copy className="w-3 h-3" /></button>
                <div className="w-px h-3 bg-gray-700 my-auto"></div>
                <button onClick={(e) => { e.stopPropagation(); removeElement(el.id); }} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

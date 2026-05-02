import { useState } from 'react';
import Header from '../components/Header';
import { 
  Type, Palette, Square, Layout, 
  Sparkles, CheckCircle, ChevronDown, 
  RotateCcw, Save, Trash2, Sliders, Edit3
} from 'lucide-react';

export default function DesignSettingsPage() {
  const [activeTab, setActiveTab] = useState('Design');

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      <Header title="My Online Boutique" activeTab="Site Editor" />
      
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Global Styling</h1>
            <p className="text-sm text-gray-500 font-medium">Define the visual DNA of your digital storefront.</p>
          </div>

          <div className="grid grid-cols-12 gap-8 mb-10">
            {/* Typography Section */}
            <div className="col-span-7 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                    <Type className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Typography</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Manage your font pairings</p>
                  </div>
                </div>
                <Edit3 className="w-5 h-5 text-indigo-600 cursor-pointer" />
              </div>

              <div className="flex gap-10">
                <div className="flex-1 space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Headings Font</label>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:border-indigo-200 transition-colors">
                      <span className="text-sm font-bold text-gray-900">Inter Display</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Body Font</label>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer group hover:border-indigo-200 transition-colors">
                      <span className="text-sm font-bold text-gray-900">Inter Regular</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-slate-50 rounded-[32px] p-8 border border-gray-100 relative group overflow-hidden">
                   <div className="relative z-10">
                      <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight">The quick brown fox jumps over the lazy dog.</h4>
                      <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-6">Designing a digital experience is more than just placing pixels. It's about creating a conversation between the brand and the user.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[8px] font-black rounded-full uppercase tracking-widest">Display LG</span>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[8px] font-black rounded-full uppercase tracking-widest">Body MD</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Color Palette Section */}
            <div className="col-span-5 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Color Palette</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Brand colors & accents</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                 {[
                   { label: 'Primary', color: '#3525CD', code: '#3525CD' },
                   { label: 'Accent', color: '#571AD9', code: '#571AD9' },
                   { label: 'Secondary', color: '#9097A6', code: '#9097A6' }
                 ].map((item) => (
                   <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-100 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl shadow-lg border border-white/20" style={{ backgroundColor: item.color }}></div>
                        <div>
                           <p className="text-xs font-black text-gray-900">{item.label}</p>
                           <p className="text-[10px] text-gray-400 font-mono uppercase font-bold mt-0.5">{item.code}</p>
                        </div>
                     </div>
                     <Edit3 className="w-4 h-4 text-gray-300 hover:text-indigo-600 cursor-pointer" />
                   </div>
                 ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50 px-2">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contrast Check</span>
                 <div className="flex items-center gap-1.5 text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> AAA Pass
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            {/* Global Rounding Card */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                    <Square className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-gray-900">Global Rounding</h3>
                </div>
                <RotateCcw className="w-4 h-4 text-gray-300 cursor-pointer hover:text-indigo-600" />
              </div>

              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                <span>Sharp (0px)</span>
                <span>Full (99px)</span>
              </div>
              <div className="relative h-2 bg-gray-100 rounded-full mb-10">
                 <div className="absolute top-0 left-0 h-full w-2/3 bg-indigo-600 rounded-full"></div>
                 <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full shadow-lg cursor-pointer"></div>
              </div>

              <div className="flex gap-6">
                 <div className="flex-1 aspect-square rounded-[32px] bg-slate-50 border border-gray-100 flex flex-col items-center justify-center gap-4 group">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Preview</span>
                    <div className="w-20 h-20 rounded-2xl border-4 border-dashed border-indigo-200 bg-indigo-50/50 group-hover:scale-110 transition-transform"></div>
                 </div>
                 <div className="flex-1 aspect-square rounded-[32px] bg-slate-50 border border-gray-100 flex items-center justify-center">
                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-transform">Button Style</button>
                 </div>
              </div>
            </div>

            {/* Container Width Card */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm">
                    <Layout className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-gray-900">Container Width</h3>
                </div>
                <Sliders className="w-4 h-4 text-gray-300 cursor-pointer hover:text-indigo-600" />
              </div>

              <div className="flex gap-4 mb-10">
                {['Narrow', 'Standard', 'Fluid'].map((type, i) => (
                  <button 
                    key={type}
                    className={`flex-1 p-4 rounded-3xl border-2 transition-all group ${
                      i === 0 ? 'bg-indigo-50 border-indigo-600 shadow-lg shadow-indigo-50' : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="aspect-[2/1] bg-gray-100 rounded-xl mb-3 flex items-center justify-center p-3">
                       <div className={`h-full bg-white rounded-md border-2 border-gray-200 ${i === 0 ? 'w-1/2' : i === 1 ? 'w-3/4' : 'w-full'} transition-all`}></div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-900'}`}>{type}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-50">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Max-Width</span>
                    <span className="text-xs font-black text-gray-900">1280px</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gutter Width</span>
                    <span className="text-xs font-black text-gray-900">32px</span>
                 </div>
              </div>
            </div>
          </div>

          {/* AI Theme Banner */}
          <div className="bg-indigo-600 rounded-[48px] p-12 text-white flex items-center justify-between relative overflow-hidden mb-12 shadow-2xl shadow-indigo-100 group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">AI Creative Studio</span>
              </div>
              <h2 className="text-4xl font-black mb-6 leading-tight">Generate a cohesive theme from an image</h2>
              <p className="text-indigo-100/80 text-sm leading-relaxed font-medium">
                Upload a brand moodboard or photo and our AI will extract a professional typography and color palette for your entire project.
              </p>
            </div>
            <button className="bg-white text-indigo-600 px-10 py-5 rounded-[24px] text-xs font-black uppercase tracking-widest shadow-2xl shadow-black/10 hover:scale-105 transition-transform relative z-10">
              Launch Magic Studio
            </button>
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-end gap-8 pt-8 border-t border-gray-100 pb-20">
            <button className="text-xs font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">Discard Changes</button>
            <button className="bg-indigo-600 text-white px-12 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Save Design Tokens
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

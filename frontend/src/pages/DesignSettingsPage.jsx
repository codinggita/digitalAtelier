import { useState } from 'react';
import Header from '../components/Header';
import { 
  Type, Palette, Square, Layout, 
  Sparkles, CheckCircle, ChevronDown, 
  RotateCcw, Save, Trash2
} from 'lucide-react';

export default function DesignSettingsPage() {
  const [activeTab, setActiveTab] = useState('Design');

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      <Header title="My Online Boutique" activeTab="Site Editor" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Global Styling</h1>
            <p className="text-sm text-gray-500">Define the visual DNA of your digital storefront.</p>
          </div>

          <div className="grid grid-cols-12 gap-8 mb-10">
            {/* Typography Section */}
            <div className="col-span-7 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-primary">
                    <Type className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Typography</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manage your font pairings</p>
                  </div>
                </div>
                <Type className="w-5 h-5 text-gray-200" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Headings Font</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold text-gray-900">Inter Display</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Body Font</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold text-gray-900">Inter Regular</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                   <h4 className="text-xl font-bold text-gray-900 mb-2 leading-tight">The quick brown fox jumps over the lazy dog.</h4>
                   <p className="text-[10px] text-gray-500 max-w-[200px] leading-relaxed">Designing a digital experience is more than just placing pixels. It's about creating a conversation between the brand and the user.</p>
                   <div className="flex gap-2 mt-4">
                     <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-[8px] font-bold rounded">DISPLAY LG</span>
                     <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-[8px] font-bold rounded">BODY MD</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Color Palette Section */}
            <div className="col-span-5 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Color Palette</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Brand colors & accents</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 {[
                   { label: 'Primary', color: '#3525CD', code: '#3525CD' },
                   { label: 'Accent', color: '#571AD9', code: '#571AD9' },
                   { label: 'Secondary', color: '#9097A6', code: '#9097A6' }
                 ].map((item) => (
                   <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg shadow-sm" style={{ backgroundColor: item.color }}></div>
                        <div>
                           <p className="text-xs font-bold text-gray-900">{item.label}</p>
                           <p className="text-[10px] text-gray-400 font-mono">{item.code}</p>
                        </div>
                     </div>
                     <button className="p-2 text-gray-400 hover:text-gray-900"><RotateCcw className="w-3 h-3" /></button>
                   </div>
                 ))}
              </div>

              <div className="mt-8 flex items-center justify-between px-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contrast Check</span>
                 <span className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> AAA Pass</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            {/* Global Rounding */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Square className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Global Rounding</h3>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                <span>Sharp (0px)</span>
                <span>Full (99px)</span>
              </div>
              <input type="range" className="w-full accent-primary mb-8" />

              <div className="flex gap-4">
                 <div className="flex-1 aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50"></div>
                 </div>
                 <div className="flex-1 aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <button className="bg-primary text-white px-6 py-2 rounded-xl text-[10px] font-bold shadow-lg shadow-primary/20">Button Style</button>
                 </div>
              </div>
            </div>

            {/* Container Width */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Container Width</h3>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                {['Narrow', 'Standard', 'Fluid'].map((type, i) => (
                  <button 
                    key={type}
                    className={`flex-1 p-3 rounded-xl border transition-all ${
                      i === 0 ? 'bg-indigo-50 border-primary shadow-sm' : 'bg-white border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-[2/1] bg-gray-100 rounded mb-2 flex items-center justify-center p-2">
                       <div className={`h-full bg-white rounded border border-gray-200 ${i === 0 ? 'w-1/2' : i === 1 ? 'w-3/4' : 'w-full'}`}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{type}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Max-Width</span>
                    <span className="text-gray-900 font-bold">1280px</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">Gutter Width</span>
                    <span className="text-gray-900 font-bold">32px</span>
                 </div>
              </div>
            </div>
          </div>

          {/* AI Banner */}
          <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-[32px] p-10 text-white flex items-center justify-between relative overflow-hidden mb-12 shadow-xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 rounded-full bg-white/40"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">AI Creative Studio</span>
              </div>
              <h2 className="text-3xl font-black mb-4 leading-tight">Generate a cohesive theme from an image</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Upload a brand moodboard or photo and our AI will extract a professional typography and color palette for your entire project.
              </p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl text-sm font-bold transition-all relative z-10">
              Launch Magic Studio
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-4 pb-12">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Discard Changes</button>
            <button className="bg-primary text-white px-10 py-4 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
              Save Design Tokens
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

import Header from '../components/Header';
import { CloudUpload, Search, FileVideo, FileText, Image as ImageIcon, X, Download } from 'lucide-react';

export default function AssetsLibraryPage() {
  const assets = [
    { name: 'hero_back...', type: 'IMAGE', uploaded: '2h ago', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
    { name: 'perfume_p...', type: 'VIDEO', uploaded: '1d ago', src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop' },
    { name: 'brand_guide', type: 'DOC', uploaded: '3d ago', src: null },
    { name: 'white_wat...', type: 'IMAGE', uploaded: '1w ago', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
    { name: 'mesh_gra...', type: 'IMAGE', uploaded: '2w ago', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="My Online Boutique" 
        tabs={['Dashboard', 'Site Editor']} 
        activeTab="Site Editor" 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assets Library</h1>
              <p className="text-sm text-gray-500">Manage your visual media and documents.</p>
            </div>
            <div className="flex bg-gray-200 rounded-lg p-1">
              {['All Assets', 'Images', 'Videos', 'Documents'].map((tab, i) => (
                <button key={tab} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${i===0 ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer mb-8">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <CloudUpload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Upload new assets</h3>
            <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or <span className="text-primary font-bold">browse your computer</span></p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JPG, PNG, MP4, PDF (MAX 50MB)</p>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-4 gap-6">
            {assets.map((asset, i) => (
              <div key={i} className={`bg-white rounded-2xl border ${i===0 ? 'border-primary ring-1 ring-primary shadow-md' : 'border-gray-200 hover:shadow-sm'} overflow-hidden cursor-pointer transition-all`}>
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {asset.src ? (
                    <img src={asset.src} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-300" />
                  )}
                  {asset.type === 'VIDEO' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-4 h-4 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-sm truncate pr-2">{asset.name}</h4>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${asset.type==='IMAGE' ? 'bg-blue-100 text-blue-700' : asset.type==='VIDEO' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}`}>{asset.type}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">Uploaded {asset.uploaded}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Asset Details</h3>
            <button className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
          </div>

          <div className="aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden border border-gray-200">
            <img src={assets[0].src} className="w-full h-full object-cover" />
          </div>

          <div className="mb-8">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Properties</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">File Name</span>
                <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">hero_background_dark.png</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">File Size</span>
                <span className="text-xs font-bold text-gray-900">4.2 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Dimensions</span>
                <span className="text-xs font-bold text-gray-900">3840 × 2160 px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Type</span>
                <span className="text-xs font-bold text-gray-900">PNG Image</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Uploaded</span>
                <span className="text-xs font-bold text-gray-900">Oct 24, 2023</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
             <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Alt Text</h4>
             <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
               <p className="text-xs text-gray-700 leading-relaxed">
                 Abstract indigo and violet flowing textures with silk-like waves and deep shadows.
               </p>
             </div>
          </div>

          <div className="mb-8">
             <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Usage</h4>
             <div className="bg-primary/5 text-primary px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
               Used on "Home Page" & 2 others
             </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
             <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
               <Download className="w-4 h-4" /> Download Original
             </button>
             <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors">
               Edit Metadata
             </button>
             <button className="w-full text-red-600 hover:bg-red-50 font-medium py-2.5 rounded-lg transition-colors mt-2">
               Move to Trash
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}

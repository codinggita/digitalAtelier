import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { assetService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { 
  Search, CloudUpload, Image as ImageIcon, 
  Video, FileText, Download, Trash2, 
  MoreVertical, Info, ExternalLink, X, Loader2, Edit3
} from 'lucide-react';

export default function AssetsLibraryPage() {
  const [assets, setAssets] = useState([
    { _id: '1', name: 'hero_back', type: 'IMAGE', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80', size: '4.2 MB', dimensions: '3840 x 2160 px', createdAt: '2023-10-14' },
    { _id: '2', name: 'perfume_v', type: 'VIDEO', src: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400&q=80', size: '12.5 MB', dimensions: '1920 x 1080 px', createdAt: '2023-10-15' },
    { _id: '3', name: 'brand_guid', type: 'DOC', src: '', size: '1.2 MB', dimensions: '-', createdAt: '2023-10-16' },
    { _id: '4', name: 'rating_m', type: 'IMAGE', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', size: '2.1 MB', dimensions: '2000 x 2000 px', createdAt: '2023-10-17' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All Assets');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { error, success } = useNotification();

  useEffect(() => {
    if (assets.length > 0) setSelectedAsset(assets[0]);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      <Header title="My Online Boutique" activeTab="Dashboard" />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Assets Library</h1>
                <p className="text-sm text-gray-500 font-medium">Manage your visual media and documents.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-[18px] p-1.5 shadow-inner">
                  {['All Assets', 'Images', 'Videos', 'Documents'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="relative">
                   <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input 
                     type="text" 
                     placeholder="Search assets..." 
                     className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-[18px] text-xs w-64 focus:ring-2 focus:ring-indigo-600/20 shadow-sm"
                   />
                </div>
              </div>
            </div>

            {/* Upload Area */}
            <div className="border-4 border-dashed border-gray-100 rounded-[48px] p-20 flex flex-col items-center justify-center text-center bg-white/40 mb-12 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group relative overflow-hidden">
              <div className="w-20 h-20 rounded-[28px] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-50">
                <CloudUpload className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Upload new assets</h3>
              <p className="text-sm text-gray-500 font-medium mb-2">Drag and drop files here, or <span className="text-indigo-600 font-black">browse your computer</span></p>
              <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em]">JPG, PNG, MP4, PDF (Max 50MB)</p>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-4 gap-8">
              {assets.map((asset) => (
                <div 
                  key={asset._id} 
                  onClick={() => setSelectedAsset(asset)}
                  className={`group cursor-pointer transition-all ${
                    selectedAsset?._id === asset._id ? 'scale-105' : 'hover:translate-y-[-4px]'
                  }`}
                >
                  <div className={`aspect-square rounded-[32px] overflow-hidden relative mb-4 border-4 transition-all shadow-sm ${
                    selectedAsset?._id === asset._id ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-white'
                  }`}>
                    {asset.src ? (
                      <img src={asset.src} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-200" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="px-2">
                    <div className="flex items-center justify-between mb-1">
                       <h4 className="font-black text-gray-900 text-xs truncate max-w-[100px]">{asset.name}</h4>
                       <span className="text-[8px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-widest shrink-0">
                         {asset.type}
                       </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold">Uploaded 1d ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Details Sidebar */}
        {selectedAsset && (
          <aside className="w-[360px] bg-white border-l border-gray-100 p-8 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-black text-gray-900 uppercase tracking-[0.2em] text-[11px]">Asset Details</h2>
              <button onClick={() => setSelectedAsset(null)} className="text-gray-300 hover:text-gray-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square rounded-[40px] bg-slate-50 border border-gray-50 overflow-hidden mb-10 flex items-center justify-center p-8 relative group">
               {selectedAsset.src ? (
                 <img src={selectedAsset.src} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <FileText className="w-24 h-24 text-gray-100" />
               )}
               <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                 <ExternalLink className="w-4 h-4 text-gray-900" />
               </div>
            </div>

            <div className="space-y-10 flex-1">
              {/* Properties */}
              <div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Properties</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">File Name</span>
                    <span className="font-black text-gray-900 truncate max-w-[160px]">{selectedAsset.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">File Size</span>
                    <span className="font-black text-gray-900">{selectedAsset.size}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Dimensions</span>
                    <span className="font-black text-gray-900">{selectedAsset.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Type</span>
                    <span className="font-black text-gray-900">{selectedAsset.type === 'IMAGE' ? 'PNG Image' : selectedAsset.type === 'VIDEO' ? 'MP4 Video' : 'PDF Document'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Uploaded</span>
                    <span className="font-black text-gray-900">{selectedAsset.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Alt Text */}
              <div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Alt Text</p>
                <div className="bg-slate-50 border-none rounded-2xl p-4 text-[11px] text-gray-600 font-medium leading-relaxed italic border border-gray-100">
                  "Abstract indigo and violet flowing textures with silk-like waves and deep shadows."
                </div>
              </div>

              {/* Usage */}
              <div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Usage</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 w-fit px-4 py-2 rounded-full">
                   <ExternalLink className="w-3 h-3" /> Used on "Home Page" & 2 others
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-10 space-y-4">
              <button className="w-full bg-indigo-600 text-white py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                <Download className="w-4 h-4" /> Download Original
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all">
                Edit Metadata
              </button>
              <button className="w-full text-red-500 py-4 text-xs font-black uppercase tracking-[0.2em] hover:text-red-700 transition-colors">
                Move to Trash
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { assetService } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import { 
  Search, CloudUpload, Image as ImageIcon, 
  Video, FileText, Download, Trash2, 
  MoreVertical, Info, ExternalLink, X, Loader2
} from 'lucide-react';

export default function AssetsLibraryPage() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Assets');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { error, success } = useNotification();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setIsLoading(true);
      const res = await assetService.getAssets();
      if (res.success) {
        setAssets(res.data);
        if (res.data.length > 0) setSelectedAsset(res.data[0]);
      }
    } catch (err) {
      error('Failed to load assets library.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAssets = assets.filter(asset => {
    if (activeTab === 'All Assets') return true;
    if (activeTab === 'Images') return asset.type === 'IMAGE';
    if (activeTab === 'Videos') return asset.type === 'VIDEO';
    if (activeTab === 'Documents') return asset.type === 'DOC';
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      <Header 
        title="My Online Boutique" 
        activeTab="Assets" 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Assets Library</h1>
                <p className="text-sm text-gray-500">Manage your visual media and documents.</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-4 mb-8">
              {['All Assets', 'Images', 'Videos', 'Documents'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === cat ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-200 rounded-[32px] p-12 flex flex-col items-center justify-center text-center bg-white/50 mb-10 hover:bg-white hover:border-primary/30 transition-all cursor-pointer group">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <CloudUpload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Upload new assets</h3>
              <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or <span className="text-primary font-bold">browse your computer</span></p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">JPG, PNG, MP4, PDF (Max 50MB)</p>
            </div>

            {/* Assets Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                  <div 
                    key={asset._id} 
                    onClick={() => setSelectedAsset(asset)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden transition-all ${
                      selectedAsset?._id === asset._id ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      <img src={asset.src || asset.url} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 bg-white rounded-lg shadow-sm text-gray-400 hover:text-gray-900">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3 bg-white border-x border-b border-gray-100 rounded-b-2xl">
                      <div className="flex items-center gap-2 mb-1 overflow-hidden">
                         <span className="truncate text-xs font-bold text-gray-900">{asset.name}</span>
                         <span className={`text-[8px] font-black px-1.5 py-0.5 rounded shrink-0 uppercase ${
                           asset.type==='IMAGE' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'
                         }`}>
                           {asset.type}
                         </span>
                      </div>
                      <p className="text-[10px] text-gray-400">Uploaded 2h ago</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Sidebar */}
        {selectedAsset && (
          <aside className="w-80 bg-white border-l border-gray-100 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-black text-gray-900 uppercase tracking-widest text-xs">Asset Details</h2>
              <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-gray-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden mb-6 flex items-center justify-center p-4">
               <img src={selectedAsset.src || selectedAsset.url} className="max-w-full max-h-full object-contain rounded-lg" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Properties</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">File Name</span>
                    <span className="font-bold text-gray-900 truncate max-w-[140px]">{selectedAsset.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">File Size</span>
                    <span className="font-bold text-gray-900">{selectedAsset.size || '4.2 MB'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Dimensions</span>
                    <span className="font-bold text-gray-900">{selectedAsset.dimensions || '3840 × 2160 px'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Type</span>
                    <span className="font-bold text-gray-900">{selectedAsset.type} File</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Alt Text</p>
                <textarea 
                  placeholder="Describe this asset..."
                  className="w-full p-3 bg-gray-50 border-none rounded-xl text-xs text-gray-600 focus:ring-1 focus:ring-primary/20 h-24 resize-none"
                  defaultValue={selectedAsset.altText || "Abstract indigo and violet flowing textures with silk-like waves and deep shadows."}
                ></textarea>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Usage</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-600">
                   <ExternalLink className="w-3 h-3" /> Used on "Home Page" & 2 others
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button className="w-full bg-primary text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Original
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all">
                  Edit Metadata
                </button>
                <button className="w-full text-red-500 py-2 text-xs font-bold hover:text-red-700 transition-all">
                  Move to Trash
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

import Header from '../components/Header';
import { CloudUpload, FileText, Image as ImageIcon, X, Download, Loader2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { assetService } from '../services/api';
import { useNotification } from '../context/NotificationContext';

export default function AssetsLibraryPage() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeTab, setActiveTab] = useState('All Assets');
  const { success, error } = useNotification();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setIsLoading(true);
      const res = await assetService.getAssets();
      if (res.success) {
        setAssets(res.data);
      }
    } catch (err) {
      error('Failed to load assets library.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateUpload = async () => {
    try {
      setIsUploading(true);
      // Simulate file selection and upload
      const dummyAsset = {
        name: `uploaded_image_${Date.now()}.jpg`,
        type: 'IMAGE',
        src: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?q=80&w=400&auto=format&fit=crop`,
        size: `${(Math.random() * 5).toFixed(1)} MB`,
        dimensions: '1920 x 1080 px',
        altText: 'A beautiful newly uploaded image.'
      };
      
      const res = await assetService.createAsset(dummyAsset);
      if (res.success) {
        success('Asset uploaded successfully!');
        fetchAssets(); // refresh list
      }
    } catch (err) {
      error('Failed to upload asset.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    
    try {
      const res = await assetService.deleteAsset(id);
      if (res.success) {
        success('Asset deleted.');
        if (selectedAsset?._id === id) setSelectedAsset(null);
        fetchAssets();
      }
    } catch (err) {
      error('Failed to delete asset.');
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
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="My Online Boutique" 
        tabs={['Dashboard', 'Site Editor', 'Assets']} 
        activeTab="Assets" 
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
              {['All Assets', 'Images', 'Videos', 'Documents'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div 
            onClick={handleSimulateUpload}
            className={`bg-white border-2 border-dashed ${isUploading ? 'border-primary bg-primary/5' : 'border-gray-200'} rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer mb-8`}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CloudUpload className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{isUploading ? 'Uploading...' : 'Upload new assets'}</h3>
            <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or <span className="text-primary font-bold">browse your computer</span></p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JPG, PNG, MP4, PDF (MAX 50MB)</p>
          </div>

          {/* Assets Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-16 text-gray-500 border border-gray-100 bg-white rounded-2xl shadow-sm">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">No {activeTab.toLowerCase()} found</p>
              <p className="text-sm mt-1">Upload some files to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {filteredAssets.map((asset) => (
                <div 
                  key={asset._id} 
                  onClick={() => setSelectedAsset(asset)}
                  className={`bg-white rounded-2xl border ${selectedAsset?._id === asset._id ? 'border-primary ring-1 ring-primary shadow-md' : 'border-gray-200 hover:shadow-sm'} overflow-hidden cursor-pointer transition-all`}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {asset.src && asset.type !== 'DOC' ? (
                      <img src={asset.src} className="w-full h-full object-cover" alt={asset.name} />
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
                    <p className="text-[10px] text-gray-500">Uploaded {new Date(asset.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Sidebar */}
        {selectedAsset && (
          <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col h-full overflow-y-auto z-10 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Asset Details</h3>
              <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-gray-900"><X className="w-5 h-5" /></button>
            </div>

            <div className="aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden border border-gray-200 flex items-center justify-center">
              {selectedAsset.src && selectedAsset.type !== 'DOC' ? (
                <img src={selectedAsset.src} className="w-full h-full object-cover" alt={selectedAsset.name} />
              ) : (
                <FileText className="w-16 h-16 text-gray-300" />
              )}
            </div>

            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Properties</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">File Name</span>
                  <span className="text-xs font-bold text-gray-900 truncate max-w-[120px]">{selectedAsset.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">File Size</span>
                  <span className="text-xs font-bold text-gray-900">{selectedAsset.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Dimensions</span>
                  <span className="text-xs font-bold text-gray-900">{selectedAsset.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Type</span>
                  <span className="text-xs font-bold text-gray-900">{selectedAsset.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Uploaded</span>
                  <span className="text-xs font-bold text-gray-900">{new Date(selectedAsset.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
               <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Alt Text</h4>
               <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                 <p className="text-xs text-gray-700 leading-relaxed">
                   {selectedAsset.altText || 'No alt text provided.'}
                 </p>
               </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
               <button 
                 onClick={() => window.open(selectedAsset.src, '_blank')}
                 className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
               >
                 <Download className="w-4 h-4" /> Download Original
               </button>
               <button onClick={() => handleDelete(selectedAsset._id)} className="w-full text-red-600 hover:bg-red-50 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2">
                 <Trash2 className="w-4 h-4" /> Move to Trash
               </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

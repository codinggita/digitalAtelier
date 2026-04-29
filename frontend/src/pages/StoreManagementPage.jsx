import Header from '../components/Header';
import { Plus, Search, Tag, DollarSign, Package, MoreVertical, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { useNotification } from '../context/NotificationContext';

export default function StoreManagementPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error } = useNotification();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await productService.getProducts();
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
      error('Failed to load store inventory.');
    } finally {
      setIsLoading(false);
    }
  };

  const avgPrice = products.length > 0 
    ? products.reduce((acc, curr) => acc + curr.price, 0) / products.length 
    : 0;
  
  const outOfStockCount = products.filter(p => p.status === 'Out of Stock').length;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header 
        title="My Online Boutique" 
        tabs={['Dashboard', 'Site Editor', 'Store']} 
        activeTab="Store" 
      />
      
      <div className="p-8 max-w-7xl mx-auto w-full pb-24">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Inventory</h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Manage your products, set pricing, and monitor stock levels across your digital atelier.
            </p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
               <Package className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Products</p>
               <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
             </div>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
               <DollarSign className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Avg. Price</p>
               <h3 className="text-2xl font-bold text-gray-900">${avgPrice.toFixed(2)}</h3>
             </div>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
               <Tag className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Out of Stock</p>
               <h3 className="text-2xl font-bold text-gray-900">{outOfStockCount}</h3>
             </div>
           </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-80 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Filter
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">No products found</p>
              <p className="text-sm mt-1">Add your first product to get started selling.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-xs text-gray-500 uppercase tracking-wider font-bold">
                  <th className="p-4 w-12"></th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Inventory</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="p-4 pl-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                        {product.image ? (
                          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-gray-900">{product.name}</span>
                    </td>
                    <td className="p-4 font-medium text-gray-700">${product.price.toFixed(2)}</td>
                    <td className="p-4 text-gray-600">{product.stock} units</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        product.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
      </div>
    </div>
  );
}

import Header from '../components/Header';
import { Plus, Search, Tag, DollarSign, Package, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function StoreManagementPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Silk Summer Dress', price: 120, stock: 45, status: 'In Stock', image: 'https://images.unsplash.com/photo-1515347619362-7f938d22384a?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Leather Crossbody Bag', price: 85, stock: 12, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Minimalist Gold Watch', price: 210, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
    { id: 4, name: 'Linen Button-Up Shirt', price: 65, stock: 120, status: 'In Stock', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=400&auto=format&fit=crop' },
  ]);

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
               <h3 className="text-2xl font-bold text-gray-900">124</h3>
             </div>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
               <DollarSign className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Avg. Price</p>
               <h3 className="text-2xl font-bold text-gray-900">$85</h3>
             </div>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
               <Tag className="w-6 h-6" />
             </div>
             <div>
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Out of Stock</p>
               <h3 className="text-2xl font-bold text-gray-900">8</h3>
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
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer">
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
        </div>
        
      </div>
    </div>
  );
}

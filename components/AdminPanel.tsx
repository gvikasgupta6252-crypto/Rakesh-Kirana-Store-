
import React, { useState } from 'react';
import { Product, Category } from '../types';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onSwitchToOrders: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts, onSwitchToOrders }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    mrp: 0,
    price: 0,
    stock: 0,
    weight: '',
    category: Category.GROCERY,
    description: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Limit for LocalStorage health
        alert("Image is too large! Please choose a smaller photo (less than 1MB).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProduct = () => {
    if (!formData.name || !formData.price) {
      alert("Please enter Name and Price!");
      return;
    }

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } as Product : p));
      setEditingId(null);
    } else {
      const newProduct: Product = {
        ...formData,
        id: `P-${Date.now()}`,
      } as Product;
      setProducts(prev => [newProduct, ...prev]);
    }

    // Reset Form
    setFormData({
      name: '', mrp: 0, price: 0, stock: 0, weight: '', 
      category: Category.GROCERY, description: '', 
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
    });
  };

  const deleteProduct = (id: string) => {
    if (confirm("Permanently delete this item?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-500 font-medium">Manage your shop inventory</p>
        </div>
        <button 
          onClick={onSwitchToOrders}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          View Orders
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-[32px] border shadow-sm">
        <h3 className="text-xl font-black mb-8 text-green-700">
          {editingId ? 'Edit Product' : 'Add New Item'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Item Name</label>
            <input 
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-green-500 transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Aashirvaad Atta"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Category</label>
            <select 
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-green-500"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
            >
              {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Weight</label>
            <input 
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-green-500"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              placeholder="e.g. 1kg"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">MRP</label>
            <input 
              type="number"
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-green-500"
              value={formData.mrp}
              onChange={(e) => setFormData({...formData, mrp: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-green-600 uppercase mb-2">Sale Price</label>
            <input 
              type="number"
              className="w-full p-4 bg-green-50 border-2 border-transparent rounded-2xl outline-none focus:border-green-500"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Stock</label>
            <input 
              type="number"
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-green-500"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
            />
          </div>
          <div className="flex items-end gap-3">
             <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden border flex-shrink-0">
                <img src={formData.image} className="w-full h-full object-cover" />
             </div>
             <label className="flex-grow cursor-pointer bg-gray-100 p-4 rounded-2xl text-center text-xs font-bold hover:bg-gray-200 transition-colors">
                FOLDER SE IMAGE LO
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
             </label>
          </div>
        </div>
        
        <div className="mt-8 flex gap-4">
          <button onClick={saveProduct} className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-green-700 active:scale-95 transition-all">
            {editingId ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
          </button>
          {editingId && (
            <button 
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', mrp: 0, price: 0, stock: 0, weight: '', category: Category.GROCERY, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400' });
              }}
              className="bg-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-bold"
            >
              CANCEL
            </button>
          )}
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-[32px] border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-xs font-black uppercase text-gray-400">
              <th className="p-6">Product</th>
              <th className="p-6">Price</th>
              <th className="p-6">Stock</th>
              <th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={p.image} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-400 font-bold">{p.weight}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <div className="font-black">₹{p.price}</div>
                   <div className="text-xs text-gray-300 line-through">₹{p.mrp}</div>
                </td>
                <td className="p-6">
                   <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                    {p.stock} units
                   </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(p)} className="p-2 text-blue-600 bg-blue-50 rounded-lg">✎</button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-600 bg-red-50 rounded-lg">✖</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

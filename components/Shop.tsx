
import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [sortBy, setSortBy] = useState<'default' | 'priceLow' | 'priceHigh' | 'discount'>('default');

  const filteredAndSorted = useMemo(() => {
    let result = activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);

    switch (sortBy) {
      case 'priceLow':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result = [...result].sort((a, b) => (b.mrp - b.price) - (a.mrp - a.price));
        break;
      default:
        break;
    }
    return result;
  }, [products, activeCategory, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 space-y-8">
        <div>
          <h4 className="text-lg font-bold mb-4">Categories</h4>
          <div className="space-y-2">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === 'All' ? 'bg-green-600 text-white font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              All Categories
            </button>
            {Object.values(Category).map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === cat ? 'bg-green-600 text-white font-bold' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Sort By</h4>
          <select 
            className="w-full p-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="default">Relevance</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="discount">Biggest Savings</option>
          </select>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{activeCategory} Items</h2>
          <span className="text-gray-500 text-sm">{filteredAndSorted.length} products found</span>
        </div>
        
        {filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSorted.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

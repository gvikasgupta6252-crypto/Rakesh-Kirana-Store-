
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {discount}% OFF
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-gray-900 font-bold px-4 py-1 rounded-full text-xs shadow-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest mb-1">{product.category}</span>
        <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">{product.name}</h4>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">{product.weight}</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-gray-900">₹{product.price}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
            )}
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${
              product.stock > 0 
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm active:scale-95' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Notify Me'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

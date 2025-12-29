
import React from 'react';
import { Product, Category } from '../types';
import { STORE_DESCRIPTION, STORE_HOURS } from '../constants';
import ProductCard from './ProductCard';

interface HomeProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onViewAll: () => void;
}

const Home: React.FC<HomeProps> = ({ products, onAddToCart, onViewAll }) => {
  const popularProducts = products.filter(p => p.isPopular).slice(0, 4);
  const categories = Object.values(Category);

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-600 rounded-3xl overflow-hidden py-16 px-8 text-white shadow-2xl">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 font-bold px-4 py-1 rounded-full text-sm mb-6 shadow-md animate-bounce">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            TODAY'S SPECIAL DISCOUNTS
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Freshness Delivered <br/>To Your Doorstep!</h2>
          <p className="text-green-50 text-xl mb-8 leading-relaxed font-medium">
            {STORE_DESCRIPTION}
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <button 
              onClick={onViewAll}
              className="bg-white text-green-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-xl active:scale-95"
            >
              Start Shopping
            </button>
            <div className="flex flex-col">
              <span className="text-green-200 text-sm font-bold uppercase tracking-widest">Store Hours</span>
              <span className="text-2xl font-black">{STORE_HOURS}</span>
            </div>
          </div>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] h-[120%] w-1/2 opacity-30 hidden lg:block transform rotate-12">
           <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Grocery Basket" className="object-cover h-full w-full rounded-3xl" />
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black text-gray-800">Explore Categories</h3>
          <button onClick={onViewAll} className="text-green-600 font-bold hover:text-green-700 flex items-center gap-1 group">
            Browse All <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat} 
              className="bg-white p-6 rounded-3xl border-2 border-transparent hover:border-green-500 hover:shadow-xl transition-all text-center cursor-pointer group"
              onClick={onViewAll}
            >
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </div>
              <span className="text-base font-bold text-gray-700 group-hover:text-green-600">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-3xl font-black text-gray-800">Daily Essentials</h3>
            <p className="text-gray-500 font-medium">Hand-picked fresh items for your home</p>
          </div>
          <button onClick={onViewAll} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-bold hover:bg-gray-200">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Trust Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { color: 'blue', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Lightning Fast Delivery', desc: 'Get your groceries within hours in Bhiwandi' },
          { color: 'orange', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Quality Guaranteed', desc: 'We only stock the freshest and best brands' },
          { color: 'purple', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Easy Payments', desc: 'Pay via UPI, Cash, or Card on delivery' }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-5 bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className={`p-4 bg-${item.color}-50 text-${item.color}-600 rounded-2xl`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;

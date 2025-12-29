
import React from 'react';
import { STORE_NAME } from '../constants';
import { View } from '../types';

interface HeaderProps {
  cartCount: number;
  onSearch: (q: string) => void;
  onViewChange: (v: View) => void;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onSearch, onViewChange, onCartToggle }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onViewChange('Home')}
          >
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </div>
            <h1 className="text-xl font-bold text-green-700 whitespace-nowrap">{STORE_NAME}</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for groceries, snacks, beverages..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 outline-none transition-all"
                onChange={(e) => onSearch(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-600">
              <button onClick={() => onViewChange('Home')} className="hover:text-green-600">Home</button>
              <button onClick={() => onViewChange('Shop')} className="hover:text-green-600">Shop</button>
            </nav>
            
            <button 
              onClick={onCartToggle}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

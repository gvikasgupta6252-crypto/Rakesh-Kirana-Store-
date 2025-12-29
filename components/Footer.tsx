
import React from 'react';
import { STORE_NAME, STORE_ADDRESS, STORE_HOURS, PHONE_NUMBER } from '../constants';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-green-500 uppercase tracking-tighter">{STORE_NAME}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              We provide the highest quality daily essentials and groceries in Bhiwandi. Your trust is our success.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer border border-[#333]">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-gray-300">Contact Us</h4>
            <ul className="space-y-6 text-gray-500 text-sm font-medium">
              <li className="flex gap-4">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {STORE_ADDRESS}
              </li>
              <li className="flex gap-4">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Everyday: {STORE_HOURS}
              </li>
              <li className="flex gap-4">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Call Support: {PHONE_NUMBER}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-gray-300">Service Area</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li>Bhiwandi Central</li>
              <li>Kediya Road</li>
              <li>NH848 Vicinity</li>
              <li>Local Home Delivery</li>
              <li>Fast Store Pickup</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-[#222]">
            <h4 className="text-lg font-black mb-4 uppercase tracking-widest text-white">Owner Portal</h4>
            <p className="text-gray-500 text-xs mb-6">Access store inventory and order management system.</p>
            <button 
              onClick={onAdminClick}
              className="w-full bg-green-600 text-white p-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg active:scale-95"
            >
              Open Admin Dashboard
            </button>
          </div>
        </div>
        
        <div className="pt-10 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2024 {STORE_NAME}. Developed for Excellence.</p>
          <div className="flex gap-6 items-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/640px-UPI-Logo.png" alt="UPI" className="h-5" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/640px-Visa_2021.svg.png" alt="Visa" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

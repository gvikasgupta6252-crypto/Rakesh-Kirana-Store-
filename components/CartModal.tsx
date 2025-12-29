
import React from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, onClose, onRemove, onUpdateQty, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 40;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{cart.length}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4 hide-scrollbar">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-3 border rounded-2xl hover:border-green-300 transition-colors">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{item.weight}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg bg-gray-50">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="px-2 py-1 text-gray-600 hover:text-green-600 font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="px-2 py-1 text-gray-600 hover:text-green-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-green-700">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-200 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-700">Your cart is empty</h3>
              <p className="text-gray-400 text-sm">Add items from the shop to get started</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charge</span>
                <span className={delivery === 0 ? 'text-green-600 font-bold' : ''}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </span>
              </div>
              {delivery > 0 && (
                <p className="text-[10px] text-orange-600 font-medium bg-orange-50 p-2 rounded-lg">
                  Shop for ₹{500 - subtotal} more for FREE delivery!
                </p>
              )}
              <div className="flex justify-between text-lg font-black pt-2 border-t">
                <span>Grand Total</span>
                <span>₹{subtotal + delivery}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Checkout Order
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;

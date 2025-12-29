
import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onPlaceOrder: (details: OrderDetails) => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onPlaceOrder, onBack }) => {
  const [formData, setFormData] = useState<OrderDetails>({
    customerName: '',
    mobile: '',
    address: '',
    pincode: '',
    deliverySlot: 'Standard (Same Day)'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 40;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.mobile || !formData.address) {
      alert("Please fill all details!");
      return;
    }
    onPlaceOrder(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-green-600 font-bold mb-6 hover:underline">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to Shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                placeholder="Ex: Rakesh Sharma"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
              <input 
                required
                type="tel" 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                placeholder="Ex: 8208448392"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Address</label>
              <textarea 
                required
                rows={3}
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="House No, Area, Landmark..."
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Pincode</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="421308"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Slot</label>
                <select 
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.deliverySlot}
                  onChange={(e) => setFormData({...formData, deliverySlot: e.target.value})}
                >
                  <option>Morning (7am-12pm)</option>
                  <option>Afternoon (12pm-4pm)</option>
                  <option>Evening (4pm-11pm)</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="p-4 bg-green-50 text-green-700 rounded-2xl flex items-start gap-3 mb-6">
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 3.181 2.586 5.767 5.767 5.767 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm0 10.534c-2.628 0-4.767-2.139-4.767-4.767 0-2.628 2.139-4.767 4.767-4.767 2.628 0 4.767 2.139 4.767 4.767 0 2.628-2.139 4.767-4.767 4.767zm0-16.706C5.414 0 0 5.414 0 12.031c0 6.617 5.414 12.031 12.031 12.031 6.617 0 12.031-5.414 12.031-12.031C24.062 5.414 18.648 0 12.031 0zm0 22.062c-5.541 0-10.031-4.49-10.031-10.031 0-5.541 4.49-10.031 10.031-10.031 5.541 0 10.031 4.49 10.031 10.031 0 5.541-4.49 10.031-10.031 10.031z"/></svg>
                <p className="text-sm">Clicking "Confirm & Order" will open your WhatsApp with the full order list ready to send.</p>
              </div>
              <button 
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Confirm & Order on WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto hide-scrollbar pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.weight} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t text-green-700">
                <span>Grand Total</span>
                <span>₹{subtotal + delivery}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-dashed border-green-200">
             <div className="flex items-center gap-3 text-green-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <h4 className="font-bold">Payment Mode</h4>
             </div>
             <p className="text-sm text-gray-500">We currently accept <span className="font-bold text-gray-800">Cash on Delivery</span> and <span className="font-bold text-gray-800">UPI Payments</span> at the time of delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

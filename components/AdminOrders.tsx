
import React from 'react';
import { Order } from '../types';

interface AdminOrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onSwitchToProducts: () => void;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, setOrders, onSwitchToProducts }) => {
  const updateStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    if (confirm("Remove order from history?")) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-gray-800">Order Management</h2>
        <button 
          onClick={onSwitchToProducts}
          className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold shadow hover:bg-green-700"
        >
          Manage Products
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length > 0 ? orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-black text-gray-800">Order {order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="bg-gray-100 p-2 text-sm rounded-lg font-bold outline-none"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value as any)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button 
                   onClick={() => deleteOrder(order.id)}
                   className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t">
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Customer Info</h4>
                <div className="space-y-1">
                  <p className="font-bold text-gray-800">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.mobile}</p>
                  <p className="text-sm text-gray-600">{order.address}, {order.pincode}</p>
                  <p className="text-sm text-blue-600 font-bold mt-2">Slot: {order.deliverySlot}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Order Items</h4>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name} ({item.weight}) x {item.quantity}</span>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-lg font-black pt-2 border-t text-green-700">
                    <span>Total Bill</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <h3 className="text-xl font-bold text-gray-800">No orders yet</h3>
            <p className="text-gray-500">Orders placed by customers will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;


export enum Category {
  GROCERY = 'Grocery',
  DAIRY = 'Dairy',
  BEVERAGES = 'Beverages',
  SNACKS = 'Snacks',
  PERSONAL_CARE = 'Personal Care',
  HOUSEHOLD = 'Household'
}

export interface Product {
  id: string;
  name: string;
  image: string; // Base64 or URL
  mrp: number;
  price: number;
  stock: number;
  weight: string;
  category: Category;
  description: string;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  mobile: string;
  address: string;
  pincode: string;
  deliverySlot: string;
}

export interface Order extends OrderDetails {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'Pending' | 'Delivered' | 'Cancelled';
  date: string;
}

export type View = 'Home' | 'Shop' | 'Cart' | 'Checkout' | 'Admin' | 'AdminOrders';


import { Category, Product } from './types';

export const STORE_NAME = "Rakesh Grocery & General Store";
export const STORE_ADDRESS = "Rakesh kirana store, NH848, kediya Rd, Bhiwandi, Maharashtra 421308";
export const PHONE_NUMBER = "8208448392";
export const WHATSAPP_NUMBER = "918208448392"; // Added 91 for WhatsApp API compatibility
export const STORE_HOURS = "07:00 AM - 11:00 PM";
export const STORE_DESCRIPTION = "🏪 Rakesh Kirana Store – 📍 Sab Kuch Milega Yahan! We provide all kinds of quality groceries, general items, and daily essentials under one roof. 🛒 Wide range of grocery items 🎁 General & household products ✅ Trusted by local customers ✅ Fresh stock and best price. 📍 Visit today for all your home needs — One-stop shop for everything!";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    mrp: 180,
    price: 165,
    stock: 25,
    weight: '1 Litre',
    category: Category.GROCERY,
    description: 'Refined sunflower oil for healthy cooking.',
    isPopular: true
  },
  {
    id: '2',
    name: 'Aashirvaad Shudh Chakki Atta',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    mrp: 540,
    price: 499,
    stock: 50,
    weight: '10kg',
    category: Category.GROCERY,
    description: 'Fresh wheat flour.',
    isPopular: true
  },
  {
    id: '3',
    name: 'Amul Masti Dahi',
    image: 'https://images.unsplash.com/photo-1550583724-1d20ee2bb05e?auto=format&fit=crop&q=80&w=400',
    mrp: 35,
    price: 32,
    stock: 40,
    weight: '400g',
    category: Category.DAIRY,
    description: 'Fresh and creamy curd.',
    isPopular: true
  },
  {
    id: '4',
    name: 'Coca-Cola Soft Drink',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
    mrp: 95,
    price: 85,
    stock: 60,
    weight: '2.25 Litre',
    category: Category.BEVERAGES,
    description: 'Refreshing cold drink.',
    isPopular: false
  }
];

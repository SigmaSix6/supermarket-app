import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cartStore';

export interface OrderHistoryItem {
  id: string;
  date: string; // Stored as ISO string for serialization
  items: CartItem[];
  totalPrice: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: 'card' | 'cash' | 'paypal';
  };
}

export interface HistoryState {
  orders: OrderHistoryItem[];
  addOrder: (order: Omit<OrderHistoryItem, 'id' | 'date'>) => void;
  clearHistory: () => void;
  getOrderCount: () => number;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (order) => {
        const newOrder: OrderHistoryItem = {
          ...order,
          id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },
      
      clearHistory: () => {
        set({ orders: [] });
      },
      
      getOrderCount: () => {
        return get().orders.length;
      },
    }),
    {
      name: 'supermarket-history',
    }
  )
);


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { orderHistory as mockOrders } from '../data/mockData';
import { generateOrderId } from '../utils/helpers';

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: mockOrders,
      activeOrder: null,
      trackingStep: 0,

      // ─── Place a new order ─────────────────────────────────────
      placeOrder: ({ items, address, paymentMethod, summary }) => {
        const orderId = generateOrderId();
        const newOrder = {
          id: orderId,
          date: new Date().toISOString().split('T')[0],
          status: 'confirmed',
          total: summary.total,
          deliveryFee: summary.deliveryFee,
          platformFee: summary.platformFee,
          paymentMethod,
          address,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            volume: item.volume,
          })),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          activeOrder: newOrder,
          trackingStep: 1,
        }));

        return orderId;
      },

      // ─── Update tracking ───────────────────────────────────────
      advanceTracking: () => {
        set((state) => ({
          trackingStep: Math.min(state.trackingStep + 1, 4),
        }));
      },

      setTrackingStep: (step) => set({ trackingStep: step }),

      // ─── Cancel order ──────────────────────────────────────────
      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: 'cancelled' } : o
          ),
          activeOrder:
            state.activeOrder?.id === orderId
              ? { ...state.activeOrder, status: 'cancelled' }
              : state.activeOrder,
        }));
      },

      // ─── Get orders by status ──────────────────────────────────
      getOrdersByStatus: (status) => {
        if (!status || status === 'all') return get().orders;
        return get().orders.filter((o) => o.status === status);
      },

      // ─── Clear active order ────────────────────────────────────
      clearActiveOrder: () => set({ activeOrder: null, trackingStep: 0 }),
    }),
    {
      name: 'sipandsavor-orders',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);

export default useOrderStore;

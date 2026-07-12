import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      couponDiscount: 0,

      // ─── Computed ──────────────────────────────────────────────
      get totalItems() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // ─── Actions ───────────────────────────────────────────────
      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: '', couponDiscount: 0 }),

      applyCoupon: (code) => {
        const validCoupons = {
          WHISKY20: { discount: 20, minOrder: 2000 },
          FIRST50: { discount: 50, minOrder: 500 },
          SAVE10: { discount: 10, minOrder: 1000 },
        };
        const coupon = validCoupons[code.toUpperCase()];
        const total = get().totalPrice;

        if (!coupon) return { success: false, message: 'Invalid coupon code' };
        if (total < coupon.minOrder)
          return {
            success: false,
            message: `Minimum order ₹${coupon.minOrder} required`,
          };

        const discountAmount = Math.round((total * coupon.discount) / 100);
        set({ couponCode: code.toUpperCase(), couponDiscount: discountAmount });
        return { success: true, message: `₹${discountAmount} discount applied!` };
      },

      removeCoupon: () => set({ couponCode: '', couponDiscount: 0 }),

      getOrderSummary: () => {
        const state = get();
        const subtotal = state.totalPrice;
        const deliveryFee = subtotal > 0 ? 40 : 0;
        const platformFee = subtotal > 0 ? 20 : 0;
        const couponDiscount = state.couponDiscount;
        const total = subtotal + deliveryFee + platformFee - couponDiscount;
        return { subtotal, deliveryFee, platformFee, couponDiscount, total };
      },
    }),
    {
      name: 'liquorhub-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUser } from '../data/mockData';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAgeVerified: false,
      loginStep: 'phone', // 'phone' | 'otp' | 'done'
      isLoading: false,

      // ─── Age Verification ──────────────────────────────────────
      verifyAge: () => {
        set({ isAgeVerified: true });
      },

      resetAgeVerification: () => {
        set({ isAgeVerified: false });
      },

      // ─── Auth Flow ─────────────────────────────────────────────
      sendOtp: (phone) => {
        set({ isLoading: true });
        // Simulate OTP send
        setTimeout(() => {
          set({ loginStep: 'otp', isLoading: false });
        }, 1000);
      },

      verifyOtp: (otp) => {
        set({ isLoading: true });
        // Simulate OTP verification — any 4-digit OTP succeeds
        setTimeout(() => {
          if (otp.length === 4) {
            set({
              user: mockUser,
              isAuthenticated: true,
              loginStep: 'done',
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        }, 1500);
      },

      login: () => {
        set({
          user: mockUser,
          isAuthenticated: true,
          loginStep: 'done',
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          loginStep: 'phone',
        });
      },

      resetLoginStep: () => {
        set({ loginStep: 'phone' });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          const id = Date.now();
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, { ...address, id }],
            },
          };
        });
      },

      removeAddress: (id) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.filter((a) => a.id !== id),
            },
          };
        });
      },
    }),
    {
      name: 'liquorhub-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAgeVerified: state.isAgeVerified,
      }),
    }
  )
);

export default useAuthStore;

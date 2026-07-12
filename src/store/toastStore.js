import { create } from 'zustand';

const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: ({ type = 'info', message, duration = 3500 }) => {
    const id = Date.now() + Math.random();
    set((state) => ({
      toasts: [...state.toasts, { id, type, message, isExiting: false }],
    }));

    // Auto-dismiss
    setTimeout(() => get().dismissToast(id), duration);
    return id;
  },

  dismissToast: (id) => {
    // Trigger exit animation first
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, isExiting: true } : t
      ),
    }));
    // Remove after animation completes
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 300);
  },

  // Convenience methods
  success: (message) => get().addToast({ type: 'success', message }),
  error: (message) => get().addToast({ type: 'error', message }),
  info: (message) => get().addToast({ type: 'info', message }),
  warning: (message) => get().addToast({ type: 'warning', message }),
}));

export default useToastStore;

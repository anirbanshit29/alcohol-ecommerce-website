import { create } from 'zustand';
import { notifications as mockNotifications } from '../data/mockData';

const useNotificationStore = create((set, get) => ({
  notifications: mockNotifications,

  get unreadCount() {
    return get().notifications.filter((n) => !n.read).length;
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  addNotification: (notification) => {
    const id = Date.now();
    set((state) => ({
      notifications: [{ ...notification, id, read: false }, ...state.notifications],
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearAll: () => set({ notifications: [] }),
}));

export default useNotificationStore;

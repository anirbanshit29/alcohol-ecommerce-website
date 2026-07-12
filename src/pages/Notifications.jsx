import { Bell, CheckCheck } from 'lucide-react';
import useNotificationStore from '../store/notificationStore';

export default function Notifications() {
  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  if (notifications.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-14 h-14 text-blue-300" />
          </div>
          <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">No notifications</h2>
          <p className="text-dark-500 max-w-sm mx-auto">You're all caught up! We'll notify you about orders, offers, and updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-dark-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-dark-500 text-sm mt-1">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notif, index) => (
          <button
            key={notif.id}
            onClick={() => markAsRead(notif.id)}
            className={`w-full text-left p-4 rounded-xl transition-all animate-fade-in ${
              !notif.read
                ? 'bg-primary-50 border-l-4 border-l-primary shadow-card'
                : 'bg-white border border-dark-200/50 hover:bg-dark-50'
            }`}
            style={{ animationDelay: `${index * 0.04}s` }}
          >
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{notif.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm ${!notif.read ? 'font-bold text-dark-900' : 'font-medium text-dark-700'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-dark-400 flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-sm text-dark-500 mt-1">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

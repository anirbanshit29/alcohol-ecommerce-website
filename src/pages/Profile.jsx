import { Link, useNavigate } from 'react-router-dom';
import {
  User, MapPin, ShieldCheck, CreditCard, Package, Heart,
  Bell, HelpCircle, Settings, LogOut, ChevronRight, CheckCircle,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useNotificationStore from '../store/notificationStore';
import useToastStore from '../store/toastStore';
import { getInitials } from '../utils/helpers';

export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const toast = useToastStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-28 h-28 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-14 h-14 text-primary-300" />
          </div>
          <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">Sign in to your account</h2>
          <p className="text-dark-500 mb-8 max-w-sm mx-auto">View your profile, track orders, and manage your preferences.</p>
          <Link to="/auth/login" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-800 transition-colors shadow-premium">
            Login / Sign Up
          </Link>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: User, label: 'Personal Information', to: null, color: 'text-blue-600 bg-blue-100' },
    { icon: MapPin, label: 'Saved Addresses', to: null, color: 'text-orange-600 bg-orange-100', badge: `${user.addresses?.length || 0}` },
    { icon: ShieldCheck, label: 'Age Verification', to: null, color: 'text-green-600 bg-green-100', verified: user.isAgeVerified },
    { icon: CreditCard, label: 'Payment Methods', to: null, color: 'text-purple-600 bg-purple-100' },
    { divider: true },
    { icon: Package, label: 'Order History', to: '/order-history', color: 'text-indigo-600 bg-indigo-100' },
    { icon: Heart, label: 'Wishlist', to: '/wishlist', color: 'text-red-500 bg-red-100' },
    { icon: Bell, label: 'Notifications', to: '/notifications', color: 'text-amber-600 bg-amber-100', badge: unreadCount > 0 ? String(unreadCount) : null },
    { divider: true },
    { icon: HelpCircle, label: 'Help & Support', to: null, color: 'text-teal-600 bg-teal-100' },
    { icon: Settings, label: 'Settings', to: null, color: 'text-dark-600 bg-dark-100' },
  ];

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-card border border-dark-200/50 p-6 mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-premium">
            {getInitials(user.name)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-dark-900">{user.name}</h1>
            <p className="text-dark-500 text-sm">{user.phone}</p>
            {user.email && <p className="text-dark-400 text-xs mt-0.5">{user.email}</p>}
          </div>
          {user.isAgeVerified && (
            <div className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified (21+)
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-card border border-dark-200/50 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={`div-${index}`} className="h-px bg-dark-100 mx-5" />;
          }

          const content = (
            <div className="flex items-center gap-4 px-5 py-4 hover:bg-dark-50/60 transition-colors cursor-pointer">
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="flex-1 font-medium text-dark-800">{item.label}</span>
              {item.verified && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
              )}
              {item.badge && (
                <span className="text-xs bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.badge}</span>
              )}
              <ChevronRight className="w-4 h-4 text-dark-400" />
            </div>
          );

          return item.to ? (
            <Link key={index} to={item.to}>{content}</Link>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-4 bg-white rounded-2xl shadow-card border border-dark-200/50 overflow-hidden animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="flex items-center gap-4 px-5 py-4 hover:bg-red-50 transition-colors">
          <div className="p-2 rounded-lg bg-red-100 text-red-600">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="flex-1 font-medium text-red-600 text-left">Logout</span>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </div>
      </button>
    </div>
  );
}

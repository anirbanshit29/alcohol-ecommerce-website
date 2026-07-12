import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Tag,
  Bell,
  Menu,
  X,
  Store,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn, getInitials } from '../../utils/helpers';

const navLinks = [
  { to: '/retailer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/retailer/inventory', label: 'Inventory', icon: Package },
  { to: '/retailer/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/retailer/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/retailer/offers', label: 'Offers & Discounts', icon: Tag },
  { to: '/retailer/notifications', label: 'Notifications', icon: Bell },
];

export default function RetailerLayout({ children, title = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const storeName = 'Royal Spirits';
  const ownerName = 'Rajesh Kumar';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Store Branding */}
      <div className="p-6 border-b border-dark-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-premium flex-shrink-0">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-dark text-lg leading-tight truncate">
              {storeName}
            </h2>
            <p className="text-xs text-dark-500 truncate">Jodhpur Park, Kolkata</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-primary text-white shadow-premium'
                  : 'text-dark-600 hover:bg-dark-100 hover:text-dark-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-dark-400 group-hover:text-primary'
                  )}
                />
                <span className="flex-1">{link.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white/70" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-dark-200">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group">
          <LogOut className="w-5 h-5 text-dark-400 group-hover:text-red-500 transition-colors" />
          <span className="text-sm font-medium text-dark-600 group-hover:text-red-600 transition-colors">
            Logout
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-100">
      {/* ─── Desktop Sidebar ──────────────────────────────────── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-dark-200 z-30">
        <SidebarContent />
      </aside>

      {/* ─── Mobile Overlay ───────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Mobile Sidebar Drawer ────────────────────────────── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-dark-100 transition-colors"
        >
          <X className="w-5 h-5 text-dark-500" />
        </button>
        <SidebarContent />
      </aside>

      {/* ─── Main Content Area ────────────────────────────────── */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-dark-200 h-16">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            {/* Left: hamburger + title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-dark-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-dark-700" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-display font-bold text-dark leading-tight">
                  {title}
                </h1>
                <p className="text-xs text-dark-500 hidden sm:block">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Right: notifications + avatar */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="relative p-2.5 rounded-xl hover:bg-dark-100 transition-colors">
                <Bell className="w-5 h-5 text-dark-600" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {/* Store Owner Avatar */}
              <div className="flex items-center gap-3 pl-3 border-l border-dark-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-dark leading-tight">{ownerName}</p>
                  <p className="text-xs text-dark-500">Store Owner</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {getInitials(ownerName)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

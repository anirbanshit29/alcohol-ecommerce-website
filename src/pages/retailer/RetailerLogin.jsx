import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  Store,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import Button from '../../components/common/Button';
import { cn } from '../../utils/helpers';

export default function RetailerLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const features = [
    { icon: TrendingUp, text: 'Track real-time sales & revenue' },
    { icon: ShoppingCart, text: 'Manage orders efficiently' },
    { icon: BarChart3, text: 'Boost sales with analytics' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('retailerToken', 'retailer-dummy-token');
      localStorage.setItem(
        'retailer',
        JSON.stringify({ phone, storeName: 'Royal Spirits' })
      );
      navigate('/retailer/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-dark-50">
      {/* ─── Left: Branding Panel (Desktop only) ─────────────── */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <span className="text-primary font-bold text-xl">LH</span>
            </div>
            <span className="text-white text-2xl font-display font-bold">
              Liquor Hub
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-display font-bold text-white leading-tight mb-4">
            Manage your store,
            <br />
            <span className="text-accent">track orders</span>,
            <br />
            boost sales.
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-md">
            Access your dashboard to view real-time analytics, manage inventory,
            and grow your business with Liquor Hub.
          </p>

          {/* Feature pills */}
          <div className="space-y-4">
            {features.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-white/80 animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <feat.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-base font-medium">{feat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Right: Login Form ────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Store Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-premium">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-dark">
              Store Login
            </h1>
            <p className="text-dark-500 mt-2 text-base">
              Sign in to your retailer dashboard
            </p>
          </div>

          {/* Mobile tagline */}
          <div className="lg:hidden mb-6 p-4 rounded-xl bg-primary-50 border border-primary-100">
            <p className="text-primary text-sm font-medium text-center">
              Manage your store, track orders, boost sales
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-glass p-8">
            <form onSubmit={handleSubmit}>
              {/* Phone Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-dark-700 mb-1.5">
                  Registered Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-dark-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setError('');
                    }}
                    maxLength={10}
                    className="w-full pl-11 pr-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-dark placeholder:text-dark-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-dark-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-dark-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-11 pr-12 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-dark placeholder:text-dark-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-dark-400 hover:text-dark-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm mb-4 animate-fade-in">
                  {error}
                </p>
              )}

              {/* Forgot Password */}
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-dark-400 text-center mt-5">
                By continuing, you agree to Liquor Hub's Retailer Terms of Service
              </p>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center mt-6 text-dark-500 text-sm">
            Not a registered store?{' '}
            <Link
              to="/retailer/register"
              className="text-primary font-medium hover:underline"
            >
              Register your store
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

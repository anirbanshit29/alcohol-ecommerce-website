import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, MessageCircle, Star } from 'lucide-react';
import useOrderStore from '../store/orderStore';

export default function OrderTracking() {
  const navigate = useNavigate();
  const activeOrder = useOrderStore((s) => s.activeOrder);
  const trackingStep = useOrderStore((s) => s.trackingStep);
  const advanceTracking = useOrderStore((s) => s.advanceTracking);

  const [eta, setEta] = useState(25);

  // Auto-advance tracking steps
  useEffect(() => {
    if (trackingStep >= 5) return;
    const timer = setInterval(() => {
      advanceTracking();
    }, 5000);
    return () => clearInterval(timer);
  }, [trackingStep, advanceTracking]);

  // Countdown ETA
  useEffect(() => {
    if (trackingStep >= 5 || eta <= 0) return;
    const timer = setInterval(() => setEta((prev) => Math.max(0, prev - 1)), 60000);
    return () => clearInterval(timer);
  }, [trackingStep, eta]);

  const order = activeOrder || {
    id: 'ORD12345',
    total: 4370,
    address: 'GBC, Jodhpur Park, West Bengal, 731102',
  };

  const steps = [
    { id: 1, label: 'Order Confirmed', description: 'Your order is confirmed', icon: CheckCircle, time: 'Just now' },
    { id: 2, label: 'Preparing', description: 'Store is preparing your order', icon: Package, time: '' },
    { id: 3, label: 'Rider Assigned', description: 'Rider is heading to the store', icon: Truck, time: '' },
    { id: 4, label: 'Out for Delivery', description: 'Your rider is on the way', icon: Truck, time: '' },
    { id: 5, label: 'Delivered', description: 'Order delivered successfully!', icon: CheckCircle, time: '' },
  ];

  const rider = {
    name: 'Rahul Kumar',
    phone: '+91 87654 32109',
    vehicle: 'WB 73 AB 1234',
    rating: 4.8,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Order Header */}
      <div className="bg-white rounded-2xl shadow-card border border-dark-200/50 p-6 mb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-display font-bold text-dark-900">Order #{order.id}</h1>
            <p className="text-dark-500 text-sm mt-1">Estimated Delivery: {eta} mins</p>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Live
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 mb-2">
          <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(Math.min(trackingStep, 5) / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tracking Steps */}
      <div className="bg-white rounded-2xl shadow-card border border-dark-200/50 p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="font-display font-bold text-dark-900 mb-6">Order Status</h2>
        <div className="space-y-1">
          {steps.map((step, index) => {
            const isCompleted = index < trackingStep;
            const isCurrent = index === trackingStep - 1;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isCompleted ? 'bg-primary text-white shadow-premium' : 'bg-dark-100 text-dark-400'
                    } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-14 transition-colors duration-500 ${isCompleted ? 'bg-primary' : 'bg-dark-200'}`} />
                  )}
                </div>
                <div className="pt-2 pb-4">
                  <h3 className={`font-semibold transition-colors ${isCompleted ? 'text-dark-900' : 'text-dark-400'}`}>
                    {step.label}
                  </h3>
                  <p className={`text-sm mt-0.5 ${isCompleted ? 'text-dark-500' : 'text-dark-300'}`}>
                    {step.description}
                  </p>
                  {isCompleted && step.time && (
                    <p className="text-xs text-dark-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {step.time}
                    </p>
                  )}
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 text-xs bg-accent-50 text-accent-800 px-2 py-0.5 rounded-full mt-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> In Progress
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rider Info */}
        {trackingStep >= 3 && trackingStep < 5 && (
          <div className="bg-white rounded-2xl shadow-card border border-dark-200/50 p-6 animate-slide-in-right">
            <h2 className="font-display font-bold text-dark-900 mb-4">Delivery Partner</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-premium">
                {rider.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-dark-900">{rider.name}</p>
                <p className="text-sm text-dark-500">{rider.vehicle}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-dark-600">{rider.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-primary text-primary rounded-xl font-medium text-sm hover:bg-primary-50 transition-colors">
                <Phone className="w-4 h-4" /> Call
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-dark-200 text-dark-700 rounded-xl font-medium text-sm hover:bg-dark-50 transition-colors">
                <MessageCircle className="w-4 h-4" /> Chat
              </button>
            </div>
          </div>
        )}

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl shadow-card border border-dark-200/50 p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-display font-bold text-dark-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Delivery Address
          </h2>
          <p className="text-dark-600 text-sm leading-relaxed">{order.address}</p>
          <div className="mt-4 bg-dark-50 rounded-xl h-32 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full"></div>
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-accent rounded-full"></div>
              <div className="absolute top-1/4 left-1/4 bottom-1/3 right-1/3 border-t-2 border-dashed border-primary" style={{ transform: 'rotate(-20deg)', transformOrigin: 'top left' }}></div>
            </div>
            <div className="text-center z-10">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-dark-500">Map View</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button onClick={() => navigate('/')} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors">
          Continue Shopping
        </button>
        <button onClick={() => navigate('/order-history')} className="flex-1 py-3 border-2 border-dark-200 text-dark-700 rounded-xl font-semibold hover:bg-dark-50 transition-colors">
          Order History
        </button>
      </div>
    </div>
  );
}

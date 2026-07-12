import { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, BarChart3, Clock } from 'lucide-react';
import RetailerLayout from '../../components/layout/RetailerLayout';
import { retailerData } from '../../data/mockData';
import { formatCurrency, formatNumber } from '../../utils/helpers';

export default function Analytics() {
  const [period, setPeriod] = useState('week');
  const { stats, weeklyData, topProducts } = retailerData;

  const maxSales = Math.max(...weeklyData.map((d) => d.sales));

  const metrics = [
    { label: 'Average Order Value', value: formatCurrency(Math.round(stats.totalSales / stats.totalOrders)), icon: DollarSign, color: 'text-blue-600 bg-blue-100' },
    { label: 'Orders per Day', value: Math.round(stats.totalOrders / 7), icon: ShoppingCart, color: 'text-purple-600 bg-purple-100' },
    { label: 'Most Popular', value: 'Whisky', icon: BarChart3, color: 'text-amber-600 bg-amber-100' },
    { label: 'Peak Hours', value: '7-9 PM', icon: Clock, color: 'text-green-600 bg-green-100' },
  ];

  const orderBreakdown = [
    { label: 'Completed', value: 65, color: 'bg-green-500' },
    { label: 'Pending', value: 20, color: 'bg-amber-500' },
    { label: 'Cancelled', value: 15, color: 'bg-red-500' },
  ];

  return (
    <RetailerLayout title="Analytics & Reports">
      {/* Period Selector */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-dark-900">Analytics Overview</h2>
        <div className="flex gap-1 bg-dark-100 p-1 rounded-lg">
          {['week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                period === p ? 'bg-white text-dark-900 shadow-sm' : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              This {p}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-6 mb-6 text-white shadow-premium animate-fade-in">
        <p className="text-primary-200 text-sm font-medium mb-1">Total Revenue</p>
        <div className="flex items-end gap-3">
          <h2 className="text-4xl font-display font-bold">{formatCurrency(stats.totalSales)}</h2>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-sm font-medium mb-1">
            <TrendingUp className="w-4 h-4" /> +{stats.salesTrend}%
          </div>
        </div>
        <p className="text-primary-200 text-sm mt-1">vs last {period}</p>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl p-6 shadow-card border border-dark-200/50 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="font-display font-bold text-dark-900 mb-6">Sales Trend</h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {weeklyData.map((day, i) => {
            const heightPercent = (day.sales / maxSales) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-xs font-medium text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(day.sales)}
                </span>
                <div className="w-full relative flex items-end" style={{ height: '160px' }}>
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-800 hover:to-primary-500 cursor-pointer"
                    style={{ height: `${heightPercent}%`, animationDelay: `${i * 0.1}s` }}
                  />
                </div>
                <span className="text-xs font-semibold text-dark-500">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Order Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-dark-200/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-display font-bold text-dark-900 mb-5">Order Breakdown</h3>
          <div className="flex gap-1 h-6 rounded-full overflow-hidden mb-4">
            {orderBreakdown.map((item) => (
              <div key={item.label} className={`${item.color} transition-all`} style={{ width: `${item.value}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            {orderBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-dark-700">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-dark-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-card border border-dark-200/50 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="font-display font-bold text-dark-900 mb-5">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => {
              const maxQty = Math.max(...topProducts.map((p) => p.quantity));
              const percent = (product.quantity / maxQty) * 100;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary-50 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-dark-800">{product.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-dark-600">{product.quantity} units</span>
                  </div>
                  <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-400 rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className="bg-white rounded-xl p-5 shadow-card border border-dark-200/50 animate-fade-in"
            style={{ animationDelay: `${0.4 + i * 0.05}s` }}
          >
            <div className={`p-2 rounded-lg w-fit ${metric.color} mb-3`}>
              <metric.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-display font-bold text-dark-900">{metric.value}</p>
            <p className="text-xs text-dark-500 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>
    </RetailerLayout>
  );
}

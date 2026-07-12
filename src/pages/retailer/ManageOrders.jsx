import { useState } from 'react';
import { Check, X, Clock, Package, ChevronDown, ChevronUp } from 'lucide-react';
import RetailerLayout from '../../components/layout/RetailerLayout';
import { formatCurrency } from '../../utils/helpers';

const initialOrders = [
  { id: 'ORD12345', customer: 'Anirban S.', phone: '+91 98765 43210', items: [{ name: "Jack Daniel's", qty: 1, price: 2450 }, { name: 'Absolut Vodka', qty: 1, price: 1250 }], total: 4310, time: '12:30 pm', status: 'new', address: 'GBC, Jodhpur Park, Kolkata' },
  { id: 'ORD12344', customer: 'Vikram D.', phone: '+91 87654 32109', items: [{ name: 'Budweiser Beer', qty: 3, price: 660 }], total: 2150, time: '11:55 am', status: 'new', address: 'Salt Lake Sector V, Kolkata' },
  { id: 'ORD12343', customer: 'Priya M.', phone: '+91 76543 21098', items: [{ name: 'Sula Wine Red', qty: 2, price: 800 }], total: 1850, time: '11:15 am', status: 'accepted', address: 'Park Street, Kolkata' },
  { id: 'ORD12342', customer: 'Rahul K.', phone: '+91 65432 10987', items: [{ name: 'Kingfisher Beer', qty: 2, price: 540 }], total: 1140, time: '10:30 am', status: 'completed', address: 'New Town, Kolkata' },
  { id: 'ORD12341', customer: 'Sanjay R.', phone: '+91 54321 09876', items: [{ name: 'Old Monk Rum', qty: 1, price: 480 }], total: 540, time: '9:45 am', status: 'completed', address: 'Howrah, Kolkata' },
];

export default function ManageOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('new');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const tabs = [
    { id: 'new', label: 'New', count: orders.filter((o) => o.status === 'new').length },
    { id: 'accepted', label: 'Accepted', count: orders.filter((o) => o.status === 'accepted').length },
    { id: 'completed', label: 'Completed', count: orders.filter((o) => o.status === 'completed').length },
  ];

  const filteredOrders = orders.filter((o) => o.status === activeTab);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  return (
    <RetailerLayout title="Manage Orders">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-dark-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id ? 'bg-white text-dark-900 shadow-sm' : 'text-dark-600 hover:text-dark-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                activeTab === tab.id ? 'bg-primary text-white' : 'bg-dark-300 text-white'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-card border border-dark-200/50">
          <Package className="w-12 h-12 text-dark-300 mx-auto mb-3" />
          <p className="text-dark-500">No {activeTab} orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-card border border-dark-200/50 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Order Header */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-dark-900">{order.id}</span>
                      <span className="text-xs text-dark-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</span>
                    </div>
                    <p className="text-sm text-dark-600 mt-1">{order.customer}</p>
                  </div>
                  <span className="font-bold text-primary text-lg">{formatCurrency(order.total)}</span>
                </div>

                <p className="text-sm text-dark-500 mb-3">
                  {order.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                  >
                    Details {expandedOrder === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <div className="flex gap-2">
                    {order.status === 'new' && (
                      <>
                        <button
                          onClick={() => updateStatus(order.id, 'accepted')}
                          className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <Check className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => updateStatus(order.id, 'rejected')}
                          className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </>
                    )}
                    {order.status === 'accepted' && (
                      <button
                        onClick={() => updateStatus(order.id, 'completed')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
                      >
                        <Check className="w-4 h-4" /> Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-dark-100 p-5 bg-dark-50/30 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-dark-400 text-xs uppercase tracking-wider mb-1">Customer</p>
                      <p className="font-medium text-dark-800">{order.customer}</p>
                      <p className="text-dark-500">{order.phone}</p>
                    </div>
                    <div>
                      <p className="text-dark-400 text-xs uppercase tracking-wider mb-1">Delivery Address</p>
                      <p className="text-dark-800">{order.address}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-dark-400 text-xs uppercase tracking-wider mb-2">Items</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm py-1">
                        <span className="text-dark-700">{item.name} ×{item.qty}</span>
                        <span className="font-medium text-dark-800">{formatCurrency(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </RetailerLayout>
  );
}

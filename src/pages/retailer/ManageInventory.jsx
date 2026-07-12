import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Package, AlertTriangle } from 'lucide-react';
import RetailerLayout from '../../components/layout/RetailerLayout';
import { products, categories } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

export default function ManageInventory() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [inventoryProducts, setInventoryProducts] = useState(
    products.map((p) => ({ ...p, stock: Math.floor(Math.random() * 50) + 5 }))
  );

  const filtered = inventoryProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count: inventoryProducts.filter((p) => p.category === cat.id).length,
  }));

  const toggleStock = (id) => {
    setInventoryProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  return (
    <RetailerLayout title="Manage Inventory">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-dark-900">Inventory</h2>
          <p className="text-sm text-dark-500">{inventoryProducts.length} products</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-800 transition-colors shadow-premium"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-card border border-dark-200/50 mb-6 animate-fade-in">
          <h3 className="font-semibold text-dark-900 mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Product Name', 'Brand', 'Volume', 'Price (₹)', 'Stock Qty'].map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium text-dark-600 mb-1">{label}</label>
                <input className="w-full px-3 py-2.5 border border-dark-200 rounded-lg focus:outline-none focus:border-primary text-sm" placeholder={label} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-dark-600 mb-1">Category</label>
              <select className="w-full px-3 py-2.5 border border-dark-200 rounded-lg focus:outline-none focus:border-primary text-sm bg-white">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors">Save Product</button>
            <button onClick={() => setShowAddForm(false)} className="px-5 py-2 border border-dark-200 text-dark-600 rounded-lg text-sm font-medium hover:bg-dark-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-dark-100 p-1 rounded-xl w-fit">
        {['products', 'categories'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeTab === tab ? 'bg-white text-dark-900 shadow-sm' : 'text-dark-600 hover:text-dark-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-dark-200 rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Product List */}
          <div className="bg-white rounded-xl shadow-card border border-dark-200/50 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-dark-50 text-xs font-semibold text-dark-500 uppercase tracking-wider">
              <div className="col-span-4">Product</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Stock</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-5 py-4 border-b border-dark-100 last:border-0 hover:bg-dark-50/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-dark-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-dark-900 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-dark-400">{product.brand} • {product.volume}</p>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-dark-600 capitalize">{product.category}</div>
                <div className="col-span-2 font-semibold text-dark-900 text-sm">{formatCurrency(product.price)}</div>
                <div className="col-span-2">
                  <button onClick={() => toggleStock(product.id)}>
                    {product.inStock ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> In Stock ({product.stock})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-red-100 text-red-800 px-2.5 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" /> Out of Stock
                      </span>
                    )}
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button className="p-2 text-dark-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-dark-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryCounts.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl p-5 shadow-card border border-dark-200/50 text-center hover:shadow-card-hover transition-shadow">
              <span className="text-4xl block mb-2">{cat.icon}</span>
              <h3 className="font-semibold text-dark-900">{cat.name}</h3>
              <p className="text-sm text-dark-500 mt-1">{cat.count} products</p>
            </div>
          ))}
        </div>
      )}
    </RetailerLayout>
  );
}

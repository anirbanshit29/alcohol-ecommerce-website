import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import ProductCard from '../components/product/ProductCard';

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-14 h-14 text-red-300" />
          </div>
          <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">Your wishlist is empty</h2>
          <p className="text-dark-500 mb-8 max-w-sm mx-auto">Save products you love and want to buy later. They'll appear here.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-800 transition-colors shadow-premium">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-display font-bold text-dark-900 mb-2">My Wishlist</h1>
      <p className="text-dark-500 mb-8">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((product, index) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

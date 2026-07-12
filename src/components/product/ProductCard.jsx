import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import useToastStore from '../../store/toastStore';
import { formatCurrency, getDiscountPercent, cn } from '../../utils/helpers';
import StarRating from '../common/StarRating';

function ProductCard({ product }) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const toast = useToastStore();

  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? getDiscountPercent(product.originalPrice, product.price)
    : product.discount || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) return;

    addItem(product);
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const added = toggleItem(product);
    if (added) {
      toast.success('Added to wishlist!');
    } else {
      toast.info('Removed from wishlist');
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-in"
      aria-label={`${product.name} — ${formatCurrency(product.price)}`}
    >
      <div className="relative bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
        {/* ── Image area ──────────────────────────────────── */}
        <div className="relative bg-dark-100 overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount badge — top left */}
          {discount > 0 && product.inStock && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-red-500 text-white text-[11px] font-bold shadow-md">
              {discount}% OFF
            </span>
          )}

          {/* Wishlist button — top right */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200',
              wishlisted
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : 'bg-white/90 backdrop-blur-sm text-dark-400 hover:text-red-500 hover:bg-white'
            )}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={wishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-4 py-2 rounded-full bg-dark-900/80 text-white text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ── Body ─────────────────────────────────────────── */}
        <div className="p-4">
          {/* Product name */}
          <h3 className="text-sm font-semibold text-dark-900 line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Brand & volume */}
          <p className="text-xs text-dark-500 mt-1">
            {product.brand}
            {product.volume && (
              <span className="text-dark-400"> · {product.volume}</span>
            )}
          </p>

          {/* Star rating */}
          {product.rating !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-[11px] text-dark-400 font-medium">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price row + Add to cart */}
          <div className="flex items-end justify-between mt-3 pt-3 border-t border-dark-100">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary leading-tight">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-dark-400 line-through mt-0.5">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
                product.inStock
                  ? 'bg-primary text-white hover:bg-primary-800 active:scale-95 shadow-sm hover:shadow-premium'
                  : 'bg-dark-200 text-dark-400 cursor-not-allowed'
              )}
              aria-label={product.inStock ? 'Add to cart' : 'Out of stock'}
            >
              <ShoppingCart size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

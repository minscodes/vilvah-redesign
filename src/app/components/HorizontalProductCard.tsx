import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface HorizontalProductCardProps {
  product: {
    id: number;
    name: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    tag: string;
    isBestseller?: boolean;
    contextBadge?: { label: string; color: string };
  };
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  addToCartText?: string;
}

export function HorizontalProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  addToCartText = 'Add to cart'
}: HorizontalProductCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    onToggleWishlist();
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm flex">
      {/* Image Container - Left Side */}
      <div className="relative flex-shrink-0 bg-[#F5F5F0]" style={{ width: '120px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Concern Tag */}
        <div className="absolute top-2 left-2">
          <span className="inline-block px-2.5 py-1 text-[10px] font-medium bg-[#A4B660] text-white rounded" contentEditable suppressContentEditableWarning>
            {product.tag}
          </span>
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
          style={{
            transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 200ms ease-out'
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? 'fill-[#A4B660] text-[#A4B660]'
                : 'fill-none text-gray-700'
            }`}
          />
        </button>

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <div className="absolute bottom-2 right-2">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#FFC107] text-[#000] text-[9px] font-medium rounded shadow-sm">
              🏆 Bestseller
            </span>
          </div>
        )}
      </div>

      {/* Product Info - Right Side */}
      <div className="flex-1 p-3 flex flex-col">
        {/* Name */}
        <h3 className="text-sm font-medium line-clamp-1" contentEditable suppressContentEditableWarning>
          {product.name}
        </h3>

        {/* Context Badge */}
        {product.contextBadge && (
          <div className="mt-1.5 mb-1">
            <span
              className="inline-block px-2 py-0.5 text-[9px] font-medium text-white rounded-full"
              style={{ backgroundColor: product.contextBadge.color }}
            >
              {product.contextBadge.label}
            </span>
          </div>
        )}

        {/* Subtitle */}
        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1" contentEditable suppressContentEditableWarning>
          {product.subtitle}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-sm font-medium" contentEditable suppressContentEditableWarning>
            ₹{product.price}
          </span>
          <div className="flex items-center gap-0.5">
            <span className="text-[11px] font-medium" contentEditable suppressContentEditableWarning>
              {product.rating}
            </span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] text-muted-foreground" contentEditable suppressContentEditableWarning>
              {product.reviews}k
            </span>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          className="w-full mt-2 py-2 bg-[#A4B660] text-white rounded-lg text-xs font-medium hover:bg-[#93a555] transition-colors"
        >
          <span contentEditable suppressContentEditableWarning>{addToCartText}</span>
        </button>
      </div>
    </div>
  );
}

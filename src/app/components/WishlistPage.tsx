import { ProductCard } from './ProductCard';
import { HorizontalProductCard } from './HorizontalProductCard';
import { WishlistEmpty } from './WishlistEmpty';
import bestsellerImg from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.12_PM-1.jpeg';
import img1 from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM.jpeg';
import img3 from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM__1_.jpeg';
import img2 from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM__2_.jpeg';

interface WishlistPageProps {
  wishlist: Set<number>;
  onToggleWishlist: (productId: number) => void;
  onAddToCart: () => void;
  onStartShopping: () => void;
}

const wishlistProducts = [
  {
    id: 1,
    name: 'Milk Drop Serum',
    subtitle: 'All Skin - Rice Water Ext.',
    price: 640,
    originalPrice: 799,
    rating: 4.3,
    reviews: 2.6,
    image: bestsellerImg,
    tag: 'Pigmentation',
    isBestseller: true,
    contextBadge: { label: '🔻 Price dropped ₹100', color: '#A4B660' },
    variants: [
      { size: '30ml', price: 640 },
      { size: '50ml', price: 980 },
      { size: '100ml', price: 1750 }
    ]
  },
  {
    id: 4,
    name: 'Sunscreen SPF 50 PA+++',
    subtitle: 'All Skin - Ceramides, Niacinamide',
    price: 549,
    originalPrice: 799,
    rating: 4.8,
    reviews: 22.3,
    image: img1,
    tag: 'Tan',
    contextBadge: { label: '🚀 New launch', color: '#2563EB' },
    variants: [
      { size: '50ml', price: 549 },
      { size: '100ml', price: 999 }
    ]
  },
  {
    id: 2,
    name: 'Under Eye Cream',
    subtitle: 'Dry Skin - Goji Berry',
    price: 600,
    originalPrice: 799,
    rating: 4.8,
    reviews: 10.3,
    image: img3,
    tag: 'Dark Circles',
    contextBadge: { label: '⚠️ Only 2 left', color: '#EF4444' },
    variants: [
      { size: '15ml', price: 600 },
      { size: '30ml', price: 1100 }
    ]
  },
  {
    id: 3,
    name: 'Milk Powder Face Wash',
    subtitle: 'Oily Skin - Rice Milk',
    price: 650,
    originalPrice: 899,
    rating: 4.8,
    reviews: 1.1,
    image: img2,
    tag: 'Blackheads',
    contextBadge: { label: '🎁 Combo offer available', color: '#9333EA' },
    variants: [
      { size: '100ml', price: 650 },
      { size: '200ml', price: 1200 }
    ]
  }
];

export function WishlistPage({ wishlist, onToggleWishlist, onAddToCart, onStartShopping }: WishlistPageProps) {
  const wishlistedProducts = wishlistProducts.filter(product => wishlist.has(product.id));

  if (wishlistedProducts.length === 0) {
    return <WishlistEmpty onStartShopping={onStartShopping} />;
  }

  return (
    <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '88px' }}>
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-xl font-semibold" contentEditable suppressContentEditableWarning>My Wishlist</h2>
        <p className="text-sm text-muted-foreground mt-0.5" contentEditable suppressContentEditableWarning>
          {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {/* Product Display */}
      {wishlistedProducts.length === 1 ? (
        <div className="px-4 pt-4">
          <HorizontalProductCard
            product={wishlistedProducts[0]}
            isWishlisted={wishlist.has(wishlistedProducts[0].id)}
            onToggleWishlist={() => onToggleWishlist(wishlistedProducts[0].id)}
            onAddToCart={onAddToCart}
            addToCartText="Move to cart"
          />
        </div>
      ) : (
        <div className="px-3 pt-3">
          <div className="grid grid-cols-2 gap-3">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={() => onToggleWishlist(product.id)}
                onAddToCart={onAddToCart}
                addToCartText="Move to cart"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

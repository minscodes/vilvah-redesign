import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ShoppingBag, Heart, ChevronDown, ChevronRight, Star, Home, User } from 'lucide-react';
import { SkinMatchBottomSheet } from './SkinMatchBottomSheet';

interface ProductDetailPageProps {
  products: Array<{
    id: number;
    name: string;
    subtitle: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    tag: string;
    secondaryTag?: { label: string; color: string };
    isBestseller?: boolean;
    variants?: { size: string; price: number }[];
  }>;
  wishlist: Set<number>;
  onToggleWishlist: (id: number) => void;
  onAddToCart: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function ProductDetailPage({ products, wishlist, onToggleWishlist, onAddToCart, activeTab = 'Home', setActiveTab }: ProductDetailPageProps) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSkinMatch, setShowSkinMatch] = useState(false);

  const handleTabChange = (tab: string) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    navigate('/');
  };

  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Product not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-primary underline">
          Go back home
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.has(product.id);
  const images = [product.image, product.image, product.image]; // Placeholder carousel

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const mockReviews = [
    { name: 'Priya S.', rating: 5, text: 'Amazing product! Reduced my pigmentation in just 2 weeks.' },
    { name: 'Ananya K.', rating: 4, text: 'Great serum, very lightweight and absorbs quickly.' },
    { name: 'Meera R.', rating: 5, text: 'My skin looks brighter and more even-toned now!' }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Nav Bar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="p-0">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-medium absolute left-1/2 -translate-x-1/2">Vilvah</h1>
        <button onClick={() => navigate('/')} className="p-0">
          <ShoppingBag className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '88px' }}>
        {/* Product Image Carousel */}
        <div className="relative aspect-square bg-[#F5F5F0]">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Wishlist Heart */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted
                  ? 'fill-[#A4B660] text-[#A4B660]'
                  : 'fill-none text-gray-700'
              }`}
            />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIndex === index
                    ? 'bg-[#A4B660] w-4'
                    : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info Block */}
        <div className="px-4 pt-5 pb-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-muted-foreground">· 30ml</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({Math.round(product.reviews * 1000)})</span>
            </div>
          </div>
        </div>

        {/* Hero CTA Card */}
        <div className="mx-4 mb-4">
          <button
            onClick={() => setShowSkinMatch(true)}
            className="w-full bg-[#E8EAF6] hover:bg-[#DDE0F4] rounded-2xl p-4 flex items-center justify-between transition-colors"
          >
            <div className="text-left">
              <div className="text-base font-semibold text-foreground">Will this suit me?</div>
              <div className="text-sm text-muted-foreground mt-0.5">60-sec skin match</div>
            </div>
            <ChevronRight className="w-5 h-5 text-foreground flex-shrink-0" />
          </button>
        </div>

        {/* Decision Chips Row */}
        <div className="px-4 pb-5 flex gap-2 flex-wrap">
          <span className="px-3 py-1.5 bg-transparent border-[1.5px] border-[#A4B660] text-[#A4B660] rounded-full text-sm font-medium">
            Oily skin
          </span>
          <span className="px-3 py-1.5 bg-transparent border-[1.5px] border-[#A4B660] text-[#A4B660] rounded-full text-sm font-medium">
            Pigmentation
          </span>
          <span className="px-3 py-1.5 bg-transparent border-[1.5px] border-[#A4B660] text-[#A4B660] rounded-full text-sm font-medium">
            4 wks
          </span>
        </div>

        {/* Add to Cart Button */}
        <div className="px-4 pb-5">
          <button
            onClick={onAddToCart}
            className="w-full py-4 bg-[#A4B660] text-white rounded-xl font-semibold hover:bg-[#93a555] transition-colors shadow-sm"
          >
            Add to Cart
          </button>
        </div>

        {/* Expandable Toggle Sections */}
        <div className="border-t border-border">
          {/* Description */}
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('description')}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">Description</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.has('description') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.has('description') && (
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                Our Milk Drop Serum is a lightweight, fast-absorbing formula enriched with Rice Water Extract
                that helps reduce pigmentation and brighten your skin. Perfect for daily use, this serum works
                to even out skin tone while providing deep hydration. The natural ingredients work synergistically
                to give you visible results in just 4 weeks.
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('ingredients')}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">Ingredients</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.has('ingredients') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.has('ingredients') && (
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                Rice Water Extract, Niacinamide, Hyaluronic Acid, Vitamin C, Glycerin, Aqua,
                Propanediol, Alpha Arbutin, Kojic Acid, Licorice Extract, Sodium Hyaluronate,
                Aloe Vera Extract, Phenoxyethanol, Ethylhexylglycerin.
              </div>
            )}
          </div>

          {/* How to Use */}
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('howtouse')}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">How to Use</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.has('howtouse') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.has('howtouse') && (
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Cleanse your face thoroughly and pat dry</li>
                  <li>Apply 2-3 drops of serum to your fingertips</li>
                  <li>Gently massage onto face and neck in upward circular motions</li>
                  <li>Wait for 2-3 minutes for complete absorption</li>
                  <li>Follow with moisturizer and sunscreen (for day use)</li>
                  <li>Use twice daily for best results</li>
                </ol>
              </div>
            )}
          </div>

          {/* Before / After */}
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('beforeafter')}
              className="w-full px-4 py-4 flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">Before / After</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.has('beforeafter') ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.has('beforeafter') && (
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square bg-[#F5F5F0] rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                    Before
                  </div>
                  <div className="aspect-square bg-[#F5F5F0] rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                    After 4 weeks
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Individual results may vary. Consistency is key for visible improvements.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Preview Card */}
        <div className="mx-4 my-5 bg-[#F5F5F0] rounded-2xl p-4">
          <h3 className="text-base font-semibold mb-3">Reviews ({Math.round(product.reviews * 1000)})</h3>
          <div className="space-y-3">
            {mockReviews.map((review, index) => (
              <div key={index} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-medium">{review.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate(`/reviews/${product.id}`)}
            className="mt-3 text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            See all reviews
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#A4B660]" style={{ height: '72px' }}>
        <div className="flex items-center justify-around h-full px-4">
          <button
            onClick={() => handleTabChange('Home')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Home' ? 'bg-white/20' : ''}`}>
              <Home className={`w-6 h-6 text-white ${activeTab === 'Home' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Home' ? 'font-semibold' : 'font-medium'}`}>Home</span>
          </button>

          <button
            onClick={() => handleTabChange('Shop')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Shop' ? 'bg-white/20' : ''}`}>
              <ShoppingBag className={`w-6 h-6 text-white ${activeTab === 'Shop' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Shop' ? 'font-semibold' : 'font-medium'}`}>Shop</span>
          </button>

          <button
            onClick={() => handleTabChange('Wishlist')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Wishlist' ? 'bg-white/20' : ''}`}>
              <Heart className={`w-6 h-6 text-white ${activeTab === 'Wishlist' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Wishlist' ? 'font-semibold' : 'font-medium'}`}>Wishlist</span>
          </button>

          <button
            onClick={() => handleTabChange('Profile')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Profile' ? 'bg-white/20' : ''}`}>
              <User className={`w-6 h-6 text-white ${activeTab === 'Profile' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Profile' ? 'font-semibold' : 'font-medium'}`}>Profile</span>
          </button>
        </div>
      </div>

      {/* Skin Match Bottom Sheet */}
      {showSkinMatch && (
        <SkinMatchBottomSheet
          onClose={() => setShowSkinMatch(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}

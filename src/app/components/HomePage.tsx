import { useNavigate } from 'react-router';
import { Menu, User, Heart, ChevronRight, X, Search, ShoppingBag, Home, ArrowUpDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { VariantBottomSheet } from './VariantBottomSheet';
import { FilterBottomSheet, FilterState } from './FilterBottomSheet';
import { SortBottomSheet } from './SortBottomSheet';
import { WishlistPage } from './WishlistPage';
import { ShopPage } from './ShopPage';
import { SearchPage } from './SearchPage';
import { ProfilePage } from './ProfilePage';
import { CartPage } from './CartPage';
import { MenuDrawer } from './MenuDrawer';
import { RouterData } from '../routes';
import { useState } from 'react';

export function HomePage({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  activeTab,
  setActiveTab,
  setShowSearch,
  setShowCart,
  cartCount
}: RouterData) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [showSearch, setShowSearchLocal] = useState(false);
  const [showCart, setShowCartLocal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    skinTypes: [],
    concerns: [],
    priceRange: [250, 2000],
    rating: '',
    discount: ''
  });
  const [sortBy, setSortBy] = useState('Popularity');

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const getActiveFilterChips = () => {
    const chips: string[] = [];
    if (activeFilters.skinTypes.length > 0) chips.push(...activeFilters.skinTypes);
    if (activeFilters.concerns.length > 0) chips.push(...activeFilters.concerns);
    if (activeFilters.rating) chips.push(activeFilters.rating);
    if (activeFilters.discount) chips.push(activeFilters.discount);
    if (activeFilters.priceRange[0] !== 250 || activeFilters.priceRange[1] !== 2000) {
      chips.push(`₹${activeFilters.priceRange[0]}-₹${activeFilters.priceRange[1]}`);
    }
    return chips;
  };

  const removeFilterChip = (chip: string) => {
    const newFilters = { ...activeFilters };
    newFilters.skinTypes = newFilters.skinTypes.filter(t => t !== chip);
    newFilters.concerns = newFilters.concerns.filter(c => c !== chip);
    if (newFilters.rating === chip) newFilters.rating = '';
    if (newFilters.discount === chip) newFilters.discount = '';
    if (chip.startsWith('₹')) newFilters.priceRange = [250, 2000];
    setActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      skinTypes: [],
      concerns: [],
      priceRange: [250, 2000],
      rating: '',
      discount: ''
    });
  };

  const activeChips = getActiveFilterChips();

  return (
    <div className="flex flex-col h-screen bg-background w-full mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => setShowMenuDrawer(true)} className="p-0">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-medium absolute left-1/2 -translate-x-1/2" contentEditable suppressContentEditableWarning>Vilvah</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSearchLocal(true)} className="p-0">
            <Search className="w-6 h-6" />
          </button>
          <button onClick={() => setShowCartLocal(true)} className="p-0 relative">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter/Sort/Breadcrumb Bar - Only show on Home tab */}
      {activeTab === 'Home' && (
        <div className="px-4 py-2.5 flex items-center justify-between bg-[#a4b660]">
          <button onClick={() => setShowFilterSheet(true)} className="flex items-center gap-1 text-white text-sm">
            <span contentEditable suppressContentEditableWarning>Filter</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-white text-sm">
            <span contentEditable suppressContentEditableWarning>Face Care</span>
          </div>
          <button onClick={() => setShowSortSheet(true)} className="flex items-center gap-1 text-white text-sm">
            <span contentEditable suppressContentEditableWarning>Sort</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Active Filter Chips - Only show on Home tab */}
      {activeTab === 'Home' && activeChips.length > 0 && (
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap">
            {activeChips.map((chip, index) => (
              <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs">
                <span>{chip}</span>
                <button onClick={() => removeFilterChip(chip)} className="hover:bg-primary/20 rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button onClick={clearAllFilters} className="text-xs text-primary underline ml-1">
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Results Count - Only show on Home tab */}
      {activeTab === 'Home' && (
        <div className="px-4 py-3">
          <p className="text-sm text-muted-foreground">
            {products.length} products {sortBy !== 'Popularity' && `· Sorted by ${sortBy}`}
          </p>
        </div>
      )}

      {/* Page Content */}
      {activeTab === 'Home' && (
        <div className="flex-1 overflow-y-auto px-3 pt-3" style={{ paddingBottom: '88px' }}>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={() => onToggleWishlist(product.id)}
                onAddToCart={() => setSelectedProduct(product)}
                onProductClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Shop' && <ShopPage />}

      {activeTab === 'Wishlist' && (
        <WishlistPage
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          onStartShopping={() => setActiveTab('Home')}
        />
      )}

      {activeTab === 'Profile' && <ProfilePage />}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#A4B660]" style={{ height: '72px' }}>
        <div className="flex items-center justify-around h-full px-4">
          <button
            onClick={() => setActiveTab('Home')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Home' ? 'bg-white/20' : ''}`}>
              <Home className={`w-6 h-6 text-white ${activeTab === 'Home' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Home' ? 'font-semibold' : 'font-medium'}`} contentEditable suppressContentEditableWarning>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('Shop')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Shop' ? 'bg-white/20' : ''}`}>
              <ShoppingBag className={`w-6 h-6 text-white ${activeTab === 'Shop' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Shop' ? 'font-semibold' : 'font-medium'}`} contentEditable suppressContentEditableWarning>Shop</span>
          </button>

          <button
            onClick={() => setActiveTab('Wishlist')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Wishlist' ? 'bg-white/20' : ''}`}>
              <Heart className={`w-6 h-6 text-white ${activeTab === 'Wishlist' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Wishlist' ? 'font-semibold' : 'font-medium'}`} contentEditable suppressContentEditableWarning>Wishlist</span>
          </button>

          <button
            onClick={() => setActiveTab('Profile')}
            className="flex flex-col items-center gap-1.5"
          >
            <div className={`p-2 rounded-full transition-colors ${activeTab === 'Profile' ? 'bg-white/20' : ''}`}>
              <User className={`w-6 h-6 text-white ${activeTab === 'Profile' ? 'fill-white' : ''}`} />
            </div>
            <span className={`text-white text-xs ${activeTab === 'Profile' ? 'font-semibold' : 'font-medium'}`} contentEditable suppressContentEditableWarning>Profile</span>
          </button>
        </div>
      </div>

      {/* Variant Bottom Sheet */}
      {selectedProduct && (
        <VariantBottomSheet
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Filter Bottom Sheet */}
      {showFilterSheet && (
        <FilterBottomSheet
          onClose={() => setShowFilterSheet(false)}
          onApply={setActiveFilters}
          initialFilters={activeFilters}
        />
      )}

      {/* Sort Bottom Sheet */}
      {showSortSheet && (
        <SortBottomSheet
          onClose={() => setShowSortSheet(false)}
          onApply={setSortBy}
          currentSort={sortBy}
        />
      )}

      {/* Search Page */}
      {showSearch && (
        <div className="fixed inset-0 bg-background z-50">
          <SearchPage onClose={() => setShowSearchLocal(false)} />
        </div>
      )}

      {/* Cart Page */}
      {showCart && (
        <div className="fixed inset-0 bg-background z-50">
          <CartPage
            onContinueShopping={() => {
              setShowCartLocal(false);
              setActiveTab('Home');
            }}
            onClose={() => setShowCartLocal(false)}
          />
        </div>
      )}

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={showMenuDrawer}
        onClose={() => setShowMenuDrawer(false)}
      />
    </div>
  );
}

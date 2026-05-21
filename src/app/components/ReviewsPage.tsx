import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Star, ChevronDown, Camera, Edit, Home, ShoppingBag, Heart, User, SlidersHorizontal } from 'lucide-react';
import { ReviewFilterBottomSheet } from './ReviewFilterBottomSheet';

interface ReviewsPageProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function ReviewsPage({ activeTab = 'Home', setActiveTab }: ReviewsPageProps) {
  const navigate = useNavigate();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [totalReviews] = useState(12);

  const handleTabChange = (tab: string) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    navigate('/');
  };

  const handleApplyFilters = (filters: any) => {
    // Count active filters
    let count = 0;
    if (filters.sortBy !== 'Most recent') count++;
    if (filters.skinTypes.length > 0) count++;
    if (filters.concerns.length > 0) count++;
    if (filters.gender) count++;
    if (filters.withPhotos) count++;
    if (filters.verifiedOnly) count++;
    setActiveFilterCount(count);
  };

  const reviews = [
    {
      id: 1,
      name: 'Priya M.',
      rating: 5.0,
      badge: { label: 'Verified', color: '#E8F5E9', textColor: '#2E7D32' },
      tags: ['Oily', 'Pigmentation', '6 weeks'],
      snippet: 'Spots faded after a month of use. Texture is light, no breakouts. Been using morning and night with my regular moisturizer. Highly recommend for oily skin! ',
      hasPhotos: false
    },
    {
      id: 2,
      name: 'Arjun K.',
      rating: 4.0,
      badge: { label: 'Repeat buyer', color: '#FFF3E0', textColor: '#E65100' },
      tags: ['Combo', 'Dullness', '3 months'],
      snippet: 'Third bottle. Subtle glow over time, scent takes getting used to. Not an overnight miracle but consistent results if you stick with it. Worth the price. ',
      hasPhotos: false
    },
    {
      id: 3,
      name: 'Sana R.',
      rating: 4.5,
      badge: { label: 'Influencer', color: '#FCE4EC', textColor: '#C2185B' },
      tags: ['Dry', '5 weeks'],
      snippet: 'Used for 5 weeks alongside my night routine. Skin looks visibly brighter and feels plumper. The rice water extract really works! Check my before/after photos. ',
      hasPhotos: true,
      photoCount: 3,
      photos: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=100&h=100&fit=crop',
        'https://images.unsplash.com/photo-1617897903246-719242758050?w=100&h=100&fit=crop'
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-0">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Reviews</h1>
        </div>
        <button className="p-0">
          <Search className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '140px' }}>
        {/* Review Highlights Card */}
        <div className="mx-4 mt-4 mb-4">
          <div className="bg-[#F5F1E8] rounded-2xl p-4 border border-[#E8DCC8]">
            <h2 className="text-base font-semibold text-[#6B5D4F] mb-2">Review highlights</h2>
            <p className="text-sm text-[#8B7355] leading-relaxed">
              Most oily-skin users saw results in 3-4 weeks. Common concern: strong scent.
            </p>
          </div>
        </div>

        {/* Filter & Sort Row */}
        <div className="px-4 mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowFilterSheet(true)}
            className="px-4 py-2 bg-transparent border-[1.5px] border-[#A4B660] text-[#A4B660] rounded-full text-sm font-medium flex items-center gap-2 relative"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter & Sort
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A4B660] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <span className="text-sm text-muted-foreground">{totalReviews} reviews</span>
        </div>

        {/* Review Cards */}
        <div className="px-4 space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-4 border border-border">
              {/* Top Row: Name + Badge + Rating */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base">{review.name}</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: review.badge.color,
                      color: review.badge.textColor
                    }}
                  >
                    {review.badge.label}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-sm">{review.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Context Tag Row */}
              <div className="flex gap-2 flex-wrap mb-3">
                {review.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-transparent border-[1.5px] border-[#A4B660] text-[#A4B660] rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {review.hasPhotos && (
                  <span className="px-3 py-1 bg-transparent border-[1.5px] border-[#A4B660] text-[#A4B660] rounded-full text-xs font-medium flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Photos ({review.photoCount})
                  </span>
                )}
              </div>

              {/* Review Snippet with inline Read More */}
              <p className="text-sm text-foreground leading-relaxed mb-2">
                {review.snippet}
                <button className="text-sm text-[#A4B660] font-semibold hover:underline inline">
                  Read more
                </button>
              </p>

              {/* Photo Thumbnails */}
              {review.hasPhotos && review.photos && (
                <div className="flex gap-2 mt-3">
                  {review.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-[#F5F5F0] flex-shrink-0"
                    >
                      <img
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Button - Sticky above bottom nav */}
      <div className="fixed left-0 right-0 px-4" style={{ bottom: '84px' }}>
        <button
          onClick={() => setShowWriteReview(true)}
          className="w-full py-3.5 bg-[#A4B660] text-white rounded-xl font-semibold hover:bg-[#93a555] transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Edit className="w-5 h-5" />
          Write a review
        </button>
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

      {/* Filter & Sort Bottom Sheet */}
      {showFilterSheet && (
        <ReviewFilterBottomSheet
          onClose={() => setShowFilterSheet(false)}
          onApply={handleApplyFilters}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface FilterBottomSheetProps {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  skinTypes: string[];
  concerns: string[];
  priceRange: [number, number];
  rating: string;
  discount: string;
}

const SKIN_TYPES = ['All', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];
const CONCERNS = ['Dark Spots', 'Melasma', 'Acne Marks', 'Brightening', 'Sun Damage'];
const RATINGS = ['4.5★+', '4.0★+', '3.5★+'];
const DISCOUNTS = ['10%+', '20%+', '30%+', '50%+'];

export function FilterBottomSheet({ onClose, onApply, initialFilters }: FilterBottomSheetProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [resultsCount, setResultsCount] = useState(24);

  useEffect(() => {
    const count = Math.max(1, Math.floor(Math.random() * 30) + 10);
    setResultsCount(count);
  }, [filters]);

  const toggleSkinType = (type: string) => {
    if (type === 'All') {
      setFilters({ ...filters, skinTypes: filters.skinTypes.includes('All') ? [] : ['All'] });
    } else {
      const newTypes = filters.skinTypes.filter(t => t !== 'All');
      if (newTypes.includes(type)) {
        setFilters({ ...filters, skinTypes: newTypes.filter(t => t !== type) });
      } else {
        setFilters({ ...filters, skinTypes: [...newTypes, type] });
      }
    }
  };

  const toggleConcern = (concern: string) => {
    if (filters.concerns.includes(concern)) {
      setFilters({ ...filters, concerns: filters.concerns.filter(c => c !== concern) });
    } else {
      setFilters({ ...filters, concerns: [...filters.concerns, concern] });
    }
  };

  const clearAll = () => {
    setFilters({
      skinTypes: [],
      concerns: [],
      priceRange: [250, 2000],
      rating: '',
      discount: ''
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 animate-slide-up" style={{ height: '75vh' }}>
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="flex items-center justify-between px-5 pb-4 border-b border-border">
            <h3 className="text-lg font-medium" contentEditable suppressContentEditableWarning>Filters</h3>
            <button onClick={clearAll} className="text-sm text-primary"><span contentEditable suppressContentEditableWarning>Clear all</span></button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Skin Type</h4>
                <div className="flex flex-wrap gap-2">
                  {SKIN_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleSkinType(type)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        filters.skinTypes.includes(type)
                          ? 'bg-primary text-white'
                          : 'border-2 border-border bg-white text-foreground'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Concern</h4>
                <div className="flex flex-wrap gap-2">
                  {CONCERNS.map(concern => (
                    <button
                      key={concern}
                      onClick={() => toggleConcern(concern)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        filters.concerns.includes(concern)
                          ? 'bg-primary text-white'
                          : 'border-2 border-border bg-white text-foreground'
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <div className="flex justify-between mb-2 text-sm text-muted-foreground">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                  <div className="relative h-8">
                    {/* Custom Slider Track */}
                    <div className="absolute top-3 w-full h-2 bg-gray-200 rounded-lg pointer-events-none">
                      {/* Active Track */}
                      <div
                        className="absolute h-2 bg-primary rounded-lg"
                        style={{
                          left: `${((filters.priceRange[0] - 250) / 1750) * 100}%`,
                          width: `${((filters.priceRange[1] - filters.priceRange[0]) / 1750) * 100}%`
                        }}
                      ></div>
                      {/* Min Thumb */}
                      <div
                        className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full -top-1.5 shadow-md"
                        style={{ left: `calc(${((filters.priceRange[0] - 250) / 1750) * 100}% - 10px)` }}
                      ></div>
                      {/* Max Thumb */}
                      <div
                        className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full -top-1.5 shadow-md"
                        style={{ left: `calc(${((filters.priceRange[1] - 250) / 1750) * 100}% - 10px)` }}
                      ></div>
                    </div>
                    {/* Min Range Input */}
                    <input
                      type="range"
                      min="250"
                      max="2000"
                      step="50"
                      value={filters.priceRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin < filters.priceRange[1] - 50) {
                          setFilters({ ...filters, priceRange: [newMin, filters.priceRange[1]] });
                        }
                      }}
                      className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
                      style={{ zIndex: 4 }}
                    />
                    {/* Max Range Input */}
                    <input
                      type="range"
                      min="250"
                      max="2000"
                      step="50"
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax > filters.priceRange[0] + 50) {
                          setFilters({ ...filters, priceRange: [filters.priceRange[0], newMax] });
                        }
                      }}
                      className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
                      style={{ zIndex: 3 }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Rating</h4>
                <div className="space-y-2">
                  {RATINGS.map(rating => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer relative">
                      {/* Custom Radio Button */}
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        filters.rating === rating
                          ? 'border-primary'
                          : 'border-gray-300'
                      }`}>
                        {filters.rating === rating && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span className="text-sm">{rating}</span>
                      {/* Hidden functional input */}
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => setFilters({ ...filters, rating })}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Discount</h4>
                <div className="flex flex-wrap gap-2">
                  {DISCOUNTS.map(discount => (
                    <button
                      key={discount}
                      onClick={() => setFilters({ ...filters, discount: filters.discount === discount ? '' : discount })}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        filters.discount === discount
                          ? 'bg-primary text-white'
                          : 'border-2 border-border bg-white text-foreground'
                      }`}
                    >
                      {discount}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-4 border-t border-border">
            <button
              onClick={handleApply}
              className="w-full py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              <span contentEditable suppressContentEditableWarning>Apply Filters ({resultsCount} results)</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

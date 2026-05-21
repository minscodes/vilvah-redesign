import { ArrowLeft, Search, X, Clock, TrendingUp, Target, Leaf, Users } from 'lucide-react';
import { useState } from 'react';

interface SearchPageProps {
  onClose: () => void;
}

export function SearchPage({ onClose }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'vitamin c serum',
    'milk drop',
    'niacinamide',
    'dark spots'
  ]);

  const trendingSearches = [
    'sunscreen',
    'dark spots',
    'hair fall',
    'moisturiser',
    'vitamin c'
  ];

  const removeRecentSearch = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button onClick={onClose} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, concerns, ingredients..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#A4B660]/30"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '88px' }}>
        {/* RECENT SEARCHES */}
        {recentSearches.length > 0 && (
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider" contentEditable suppressContentEditableWarning>
                Recent
              </h3>
              <button
                onClick={clearAllRecent}
                className="text-xs font-medium text-[#A4B660]"
              >
                <span contentEditable suppressContentEditableWarning>Clear</span>
              </button>
            </div>
            <div className="space-y-1">
              {recentSearches.map((term, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#A4B660]" />
                    <span className="text-sm text-gray-900" contentEditable suppressContentEditableWarning>
                      {term}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecentSearch(index);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRENDING SEARCHES */}
        <div className="px-4 py-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3" contentEditable suppressContentEditableWarning>
            Trending
          </h3>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {trendingSearches.map((term, index) => (
                <button
                  key={index}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-2 border-[#A4B660] text-[#A4B660] rounded-full hover:bg-[#A4B660]/5 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium" contentEditable suppressContentEditableWarning>
                    {term}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BROWSE BY */}
        <div className="px-4 py-4 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3" contentEditable suppressContentEditableWarning>
            Browse by
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <BrowseCard
              icon={<Target className="w-6 h-6 text-[#A4B660]" />}
              label="By Concern"
            />
            <BrowseCard
              icon={<Leaf className="w-6 h-6 text-[#A4B660]" />}
              label="By Ingredient"
            />
            <BrowseCard
              icon={<Users className="w-6 h-6 text-[#A4B660]" />}
              label="By Skin Type"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface BrowseCardProps {
  icon: React.ReactNode;
  label: string;
}

function BrowseCard({ icon, label }: BrowseCardProps) {
  return (
    <button className="flex flex-col items-center justify-center bg-[#A4B660]/10 rounded-xl p-4 hover:bg-[#A4B660]/15 transition-colors border border-[#A4B660]/20 aspect-square">
      <div className="mb-2">
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-900 text-center leading-tight" contentEditable suppressContentEditableWarning>
        {label}
      </span>
    </button>
  );
}

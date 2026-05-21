import { useState } from 'react';
import { X } from 'lucide-react';

interface ReviewFilterBottomSheetProps {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  sortBy: string;
  skinTypes: string[];
  concerns: string[];
  gender: string;
  withPhotos: boolean;
  verifiedOnly: boolean;
}

export function ReviewFilterBottomSheet({ onClose, onApply }: ReviewFilterBottomSheetProps) {
  const [sortBy, setSortBy] = useState('Most recent');
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [withPhotos, setWithPhotos] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const sortOptions = ['Most recent', 'Highest rated', 'Lowest rated', 'Most helpful'];
  const skinTypeOptions = ['Oily', 'Dry', 'Combo', 'Sensitive'];
  const concernOptions = ['Pigmentation', 'Acne', 'Dullness', 'Dryness'];
  const genderOptions = ['Female', 'Male', 'Other'];

  const toggleSkinType = (type: string) => {
    setSkinTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleConcern = (concern: string) => {
    setConcerns(prev =>
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const handleApply = () => {
    onApply({
      sortBy,
      skinTypes,
      concerns,
      gender,
      withPhotos,
      verifiedOnly
    });
    onClose();
  };

  const handleClearAll = () => {
    setSortBy('Most recent');
    setSkinTypes([]);
    setConcerns([]);
    setGender('');
    setWithPhotos(false);
    setVerifiedOnly(false);
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed left-0 right-0 bottom-0 bg-background rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-5 pb-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Filter & Sort</h2>
          </div>

          {/* Sort by */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Sort by</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#F5F5F0] transition-colors"
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    sortBy === option
                      ? 'border-[#A4B660]'
                      : 'border-gray-300'
                  }`}>
                    {sortBy === option && (
                      <div className="w-3 h-3 rounded-full bg-[#A4B660]" />
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter by skin type */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Filter by skin type</h3>
            <div className="flex gap-2 flex-wrap">
              {skinTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleSkinType(type)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    skinTypes.includes(type)
                      ? 'bg-[#A4B660] text-white'
                      : 'bg-[#F5F5F0] text-foreground hover:bg-[#E8E8E0]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by concern */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Filter by concern</h3>
            <div className="flex gap-2 flex-wrap">
              {concernOptions.map((concern) => (
                <button
                  key={concern}
                  onClick={() => toggleConcern(concern)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    concerns.includes(concern)
                      ? 'bg-[#A4B660] text-white'
                      : 'bg-[#F5F5F0] text-foreground hover:bg-[#E8E8E0]'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by gender */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Filter by gender</h3>
            <div className="flex gap-2 flex-wrap">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setGender(gender === option ? '' : option)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    gender === option
                      ? 'bg-[#A4B660] text-white'
                      : 'bg-[#F5F5F0] text-foreground hover:bg-[#E8E8E0]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="mb-6 space-y-3">
            <button
              onClick={() => setWithPhotos(!withPhotos)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg border border-border hover:bg-[#F5F5F0] transition-colors"
            >
              <span className="text-sm font-medium">With photos only</span>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                withPhotos ? 'bg-[#A4B660]' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
                  withPhotos ? 'ml-6' : 'ml-0.5'
                }`} />
              </div>
            </button>

            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg border border-border hover:bg-[#F5F5F0] transition-colors"
            >
              <span className="text-sm font-medium">Verified buyers only</span>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                verifiedOnly ? 'bg-[#A4B660]' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
                  verifiedOnly ? 'ml-6' : 'ml-0.5'
                }`} />
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleApply}
              className="w-full py-4 bg-[#A4B660] text-white rounded-xl font-semibold hover:bg-[#93a555] transition-colors"
            >
              Apply
            </button>
            <div className="text-center">
              <button
                onClick={handleClearAll}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

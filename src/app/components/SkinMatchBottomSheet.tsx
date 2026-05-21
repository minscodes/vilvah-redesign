import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { X, Check, ChevronRight } from 'lucide-react';

interface SkinMatchBottomSheetProps {
  onClose: () => void;
  onAddToCart?: () => void;
}

export function SkinMatchBottomSheet({ onClose, onAddToCart }: SkinMatchBottomSheetProps) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [skinType, setSkinType] = useState('Oily');
  const [concern, setConcern] = useState('Pigmentation');
  const [gender, setGender] = useState('Male');
  const [showResult, setShowResult] = useState(false);

  const skinTypes = ['Oily', 'Dry', 'Combo', 'Sensitive'];
  const concerns = ['Pigmentation', 'Acne', 'Dullness'];
  const genders = ['Female', 'Male', 'Other'];

  const handleCheckMatch = () => {
    setShowResult(true);
  };

  const handleEditAnswers = () => {
    setShowResult(false);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    }
    onClose();
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed left-0 right-0 bottom-0 bg-background rounded-t-3xl z-50 max-h-[70vh] overflow-y-auto">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-5 pb-6">
          {!showResult ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Match this to your skin</h2>
                <p className="text-sm text-muted-foreground mt-1">Takes 60 seconds</p>
              </div>

              {/* Your skin type */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Your skin type</h3>
                <div className="flex gap-2 flex-wrap">
                  {skinTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSkinType(type)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                        skinType === type
                          ? 'bg-[#A4B660] text-white'
                          : 'bg-[#F5F5F0] text-foreground hover:bg-[#E8E8E0]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main concern */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Main concern</h3>
                <div className="flex gap-2 flex-wrap">
                  {concerns.map((item) => (
                    <button
                      key={item}
                      onClick={() => setConcern(item)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                        concern === item
                          ? 'bg-[#A4B660] text-white'
                          : 'bg-[#F5F5F0] text-foreground hover:bg-[#E8E8E0]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Gender</h3>
                <div className="flex gap-2 flex-wrap">
                  {genders.map((item) => (
                    <button
                      key={item}
                      onClick={() => setGender(item)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                        gender === item
                          ? 'bg-[#A4B660] text-white'
                          : 'bg-[#F5F5F0] text-foreground hover:bg-[#E8E8E0]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Check Match Button */}
              <button
                onClick={handleCheckMatch}
                className="w-full py-4 bg-[#A4B660] text-white rounded-xl font-semibold hover:bg-[#93a555] transition-colors"
              >
                Check match
              </button>
            </>
          ) : (
            <>
              {/* Result View */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Your match result</h2>
              </div>

              {/* Large Result Card */}
              <div className="bg-[#E8F5E9] rounded-2xl p-5 border border-[#A5D6A7] mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2E7D32] mb-2">
                      Likely to suit you
                    </h3>
                    <p className="text-sm text-[#558B2F] leading-relaxed">
                      82% of {skinType.toLowerCase()}-skin {gender.toLowerCase()} users with {concern.toLowerCase()} saw results in 4 weeks
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Chips */}
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Your answers:</span>
                <span className="px-3 py-1.5 bg-[#F5F5F0] rounded-full text-xs font-medium text-foreground">
                  {skinType} · {concern} · {gender}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-5">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#A4B660] text-white rounded-xl font-semibold hover:bg-[#93a555] transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/reviews/${productId}`);
                  }}
                  className="w-full py-3 text-[#A4B660] font-medium hover:underline flex items-center justify-center gap-1"
                >
                  See matching reviews
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Edit Answers Link */}
              <div className="text-center">
                <button
                  onClick={handleEditAnswers}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Edit my answers
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

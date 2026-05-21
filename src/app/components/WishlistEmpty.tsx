import { Heart } from 'lucide-react';

interface WishlistEmptyProps {
  onStartShopping: () => void;
}

export function WishlistEmpty({ onStartShopping }: WishlistEmptyProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-6" style={{ paddingBottom: '88px' }}>
      <div className="text-center max-w-xs">
        {/* Large Heart Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[#A4B660]/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-[#A4B660]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-2" contentEditable suppressContentEditableWarning>
          Your wishlist is empty
        </h2>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground mb-6" contentEditable suppressContentEditableWarning>
          Save items you love to come back to later
        </p>

        {/* CTA Button */}
        <button
          onClick={onStartShopping}
          className="px-8 py-3 bg-[#A4B660] text-white rounded-full font-medium hover:bg-[#93a555] transition-colors"
        >
          <span contentEditable suppressContentEditableWarning>Start Shopping</span>
        </button>
      </div>
    </div>
  );
}

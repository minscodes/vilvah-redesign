import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface CartBottomSheetProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export function CartBottomSheet({ subtotal, discount, shipping, total }: CartBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Overlay - only show when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-all duration-300 ${
          isExpanded ? 'bottom-0' : 'bottom-0'
        }`}
        style={{
          height: isExpanded ? '60vh' : 'auto',
        }}
      >
        {/* Drag Handle */}
        <div className="pt-3 pb-2 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-1 bg-gray-300 rounded-full"
          />
        </div>

        <div className="px-4 pb-4">
          {!isExpanded ? (
            // COLLAPSED STATE
            <>
              {/* Total Row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-medium" contentEditable suppressContentEditableWarning>Total</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold" contentEditable suppressContentEditableWarning>₹{total}</span>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-xs text-[#A4B660] font-medium"
                  >
                    <span contentEditable suppressContentEditableWarning>See details ›</span>
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-[#A4B660] text-white rounded-full py-3 px-6 font-medium hover:bg-[#93a555] transition-colors flex items-center justify-between">
                <span contentEditable suppressContentEditableWarning>Proceed to Checkout</span>
                <span className="flex items-center gap-1">
                  <span contentEditable suppressContentEditableWarning>₹{total}</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </>
          ) : (
            // EXPANDED STATE
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(60vh - 60px)' }}>
              {/* Order Summary Heading */}
              <h3 className="text-lg font-bold mb-4" contentEditable suppressContentEditableWarning>
                Order Summary
              </h3>

              {/* Detail Rows */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground" contentEditable suppressContentEditableWarning>Subtotal</span>
                  <span className="font-medium" contentEditable suppressContentEditableWarning>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground" contentEditable suppressContentEditableWarning>Shipping</span>
                  <span className="font-medium text-[#A4B660]" contentEditable suppressContentEditableWarning>FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground" contentEditable suppressContentEditableWarning>Discount</span>
                  <span className="font-medium text-[#A4B660]" contentEditable suppressContentEditableWarning>−₹{discount}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-base font-bold" contentEditable suppressContentEditableWarning>Total</span>
                  <span className="text-xl font-bold" contentEditable suppressContentEditableWarning>₹{total}</span>
                </div>
              </div>

              {/* Apply Coupon Link */}
              <button className="text-sm font-medium text-[#A4B660] flex items-center gap-1 mb-4">
                <span contentEditable suppressContentEditableWarning>Apply coupon</span>
                <span>›</span>
              </button>

              {/* You Saved Banner */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 bg-[#FFE4CC] rounded-full">
                  <span className="text-sm font-semibold text-gray-900" contentEditable suppressContentEditableWarning>
                    ✨ You saved ₹75 ✨
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-[#A4B660] text-white rounded-full py-3 px-6 font-medium hover:bg-[#93a555] transition-colors flex items-center justify-between">
                <span contentEditable suppressContentEditableWarning>Proceed to Checkout</span>
                <span className="flex items-center gap-1">
                  <span contentEditable suppressContentEditableWarning>₹{total}</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

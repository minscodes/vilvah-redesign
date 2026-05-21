import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface VariantBottomSheetProps {
  product: {
    id: number;
    name: string;
    subtitle: string;
    image: string;
    variants?: { size: string; price: number }[];
  };
  onClose: () => void;
  onAddToCart: () => void;
}

export function VariantBottomSheet({ product, onClose, onAddToCart }: VariantBottomSheetProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variants = product.variants || [{ size: 'Standard', price: 0 }];

  const handleAddToCart = () => {
    onAddToCart();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pb-4 border-b border-border">
          <div className="flex gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium" contentEditable suppressContentEditableWarning>{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5" contentEditable suppressContentEditableWarning>{product.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 -mr-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Size Selection */}
        <div className="px-5 py-4">
          <p className="text-sm font-medium mb-3" contentEditable suppressContentEditableWarning>Select Size</p>
          <div className="grid grid-cols-3 gap-2">
            {variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                  selectedVariant === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white'
                }`}
              >
                <div className="text-sm font-medium">{variant.size}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  ₹{variant.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-sm font-medium mb-3" contentEditable suppressContentEditableWarning>Quantity</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="px-5 py-4 border-t border-border">
          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <span contentEditable suppressContentEditableWarning>Add to Cart - ₹{variants[selectedVariant].price * quantity}</span>
          </button>
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

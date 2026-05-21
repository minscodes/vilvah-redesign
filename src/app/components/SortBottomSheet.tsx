import { X } from 'lucide-react';

interface SortBottomSheetProps {
  onClose: () => void;
  onApply: (sortBy: string) => void;
  currentSort: string;
}

const SORT_OPTIONS = [
  'Popularity',
  'Price: Low to High',
  'Price: High to Low',
  'Customer Rating',
  'Newest First',
  'Discount: High to Low',
  'Bestsellers'
];

export function SortBottomSheet({ onClose, onApply, currentSort }: SortBottomSheetProps) {
  const handleSelect = (option: string) => {
    onApply(option);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 animate-slide-up" style={{ height: '40vh' }}>
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="flex items-center justify-between px-5 pb-4 border-b border-border">
            <h3 className="text-lg font-medium" contentEditable suppressContentEditableWarning>Sort By</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => handleSelect('Popularity')} className="text-sm text-primary"><span contentEditable suppressContentEditableWarning>Clear all</span></button>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-2">
            <div className="space-y-1">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="w-full flex items-center gap-3 py-3.5 px-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                  {/* Custom Radio Button */}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    currentSort === option
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}>
                    {currentSort === option && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </button>
              ))}
            </div>
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

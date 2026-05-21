import { ArrowRight } from 'lucide-react';

export function PromoCard() {
  return (
    <div className="col-span-2 my-3 bg-gradient-to-r from-[#B8C77D] to-[#A4B660] rounded-xl p-4 text-[#2C3E1F] w-full">
      <div className="flex items-center justify-center gap-3">
        <div className="text-center flex-1">
          <p className="text-[11px] mb-1 opacity-80">
            Use code VIIVAH30 and get FLAT 30% OFF
          </p>
          <p className="text-xs font-medium">
            Min. cart value ₹699. Max discount ₹299
          </p>
        </div>
        <ArrowRight className="w-5 h-5 flex-shrink-0" />
      </div>
    </div>
  );
}

import { Droplet, Sun, Shield, Sparkles, Wind, Heart, Scissors, AlertCircle, TrendingDown, Sunset, Smile, Footprints } from 'lucide-react';

export function ShopPage() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '88px' }}>
      {/* Page Header */}
      <div className="px-5 pt-4 pb-3">
        <h2 className="text-2xl font-bold mb-1" contentEditable suppressContentEditableWarning>
          Shop by Concern
        </h2>
        <p className="text-sm text-muted-foreground" contentEditable suppressContentEditableWarning>
          Find the right products for your needs
        </p>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* FACE SECTION */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
            Face
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ConcernTile
              icon={<Droplet className="w-8 h-8 text-[#A4B660]" />}
              label="Hyperpigmentation"
            />
            <ConcernTile
              icon={<Sun className="w-8 h-8 text-[#A4B660]" />}
              label="Dark Spots"
            />
            <ConcernTile
              icon={<Sunset className="w-8 h-8 text-[#A4B660]" />}
              label="Sun Damage"
            />
            <ConcernTile
              icon={<Shield className="w-8 h-8 text-[#A4B660]" />}
              label="Repair Barrier"
            />
            <ConcernTile
              icon={<Sparkles className="w-8 h-8 text-[#A4B660]" />}
              label="Exfoliation"
            />
            <ConcernTile
              icon={<Heart className="w-8 h-8 text-[#A4B660]" />}
              label="Moisturise"
            />
          </div>
        </div>

        {/* HAIR SECTION */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
            Hair
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ConcernTile
              icon={<Wind className="w-8 h-8 text-[#A4B660]" />}
              label="Frizzy Hair"
            />
            <ConcernTile
              icon={<AlertCircle className="w-8 h-8 text-[#A4B660]" />}
              label="Anti Dandruff"
            />
            <ConcernTile
              icon={<TrendingDown className="w-8 h-8 text-[#A4B660]" />}
              label="Hair Fall"
            />
          </div>
        </div>

        {/* BODY SECTION */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
            Body
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ConcernTile
              icon={<Sun className="w-8 h-8 text-[#A4B660]" />}
              label="Remove Tan"
            />
            <ConcernTile
              icon={<Smile className="w-8 h-8 text-[#A4B660]" />}
              label="Chapped Lips"
            />
            <ConcernTile
              icon={<Footprints className="w-8 h-8 text-[#A4B660]" />}
              label="Cracked Foot"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConcernTileProps {
  icon: React.ReactNode;
  label: string;
}

function ConcernTile({ icon, label }: ConcernTileProps) {
  return (
    <button className="flex flex-col items-center justify-center bg-[#A4B660]/10 rounded-xl p-4 hover:bg-[#A4B660]/15 transition-colors border border-[#A4B660]/20 shadow-sm aspect-square">
      <div className="mb-2">
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-900 text-center leading-tight" contentEditable suppressContentEditableWarning>
        {label}
      </span>
    </button>
  );
}

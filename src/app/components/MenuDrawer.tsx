import { X, ChevronRight, Award, Milk, Gift, Sparkles, User as UserIcon, Leaf, Info, BookOpen, Mail } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 bottom-0 bg-white z-50 shadow-2xl"
        style={{ width: '332px' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Menu Content */}
        <div className="pt-16 pb-8">
          {/* SECTION 1 - DISCOVER */}
          <div className="px-5 mb-6">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3" contentEditable suppressContentEditableWarning>
              Discover
            </h3>
            <div className="space-y-2">
              <MenuItem
                icon={<Award className="w-6 h-6 text-[#A4B660]" />}
                label="Best Sellers"
              />
              <MenuItem
                icon={<Milk className="w-6 h-6 text-[#A4B660]" />}
                label="Milk Range"
                badge="Featured"
              />
              <MenuItem
                icon={<Gift className="w-6 h-6 text-[#A4B660]" />}
                label="Combo Offers"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* SECTION 2 - SHOP BY */}
          <div className="px-5 mb-6">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3" contentEditable suppressContentEditableWarning>
              Shop By
            </h3>
            <div className="space-y-2">
              <MenuItem
                icon={<Sparkles className="w-6 h-6 text-[#A4B660]" />}
                label="Face"
              />
              <MenuItem
                icon={<UserIcon className="w-6 h-6 text-[#A4B660]" />}
                label="Hair"
              />
              <MenuItem
                icon={<Leaf className="w-6 h-6 text-[#A4B660]" />}
                label="Body"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* SECTION 3 - MORE */}
          <div className="px-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3" contentEditable suppressContentEditableWarning>
              More
            </h3>
            <div className="space-y-2">
              <MenuItem
                icon={<Info className="w-6 h-6 text-[#A4B660]" />}
                label="About Us"
              />
              <MenuItem
                icon={<BookOpen className="w-6 h-6 text-[#A4B660]" />}
                label="Blog"
              />
              <MenuItem
                icon={<Mail className="w-6 h-6 text-[#A4B660]" />}
                label="Contact Us"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

function MenuItem({ icon, label, badge }: MenuItemProps) {
  return (
    <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 rounded-lg transition-colors group">
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-base font-medium text-gray-900" contentEditable suppressContentEditableWarning>
          {label}
        </span>
        {badge && (
          <span className="px-2 py-0.5 bg-[#A4B660]/10 text-[#A4B660] text-xs font-medium rounded" contentEditable suppressContentEditableWarning>
            {badge}
          </span>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
    </button>
  );
}

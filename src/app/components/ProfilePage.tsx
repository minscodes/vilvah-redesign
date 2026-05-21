import { useState } from 'react';
import { ChevronRight, Package, Sparkles, MapPin, CreditCard, RefreshCw, Star, Heart, Bell, Settings, HelpCircle, Mail, Gift } from 'lucide-react';
import { ProfileNotLoggedIn } from './ProfileNotLoggedIn';

export function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleCreateAccount = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <ProfileNotLoggedIn onSignIn={handleSignIn} onCreateAccount={handleCreateAccount} />;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background" style={{ paddingBottom: '88px' }}>
      {/* User Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="bg-[#A4B660]/10 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-[#A4B660]/30 flex items-center justify-center">
              <span className="text-xl font-semibold text-[#A4B660]" contentEditable suppressContentEditableWarning>D</span>
            </div>
            {/* User Info */}
            <div>
              <h2 className="text-lg font-bold mb-0.5" contentEditable suppressContentEditableWarning>
                Hi, Shiyaa 👋
              </h2>
              <p className="text-xs text-muted-foreground" contentEditable suppressContentEditableWarning>
                shiyaa@email.com
              </p>
            </div>
          </div>
          {/* Edit Link */}
          <button className="flex items-center gap-0.5 text-sm font-medium text-[#A4B660]">
            <span contentEditable suppressContentEditableWarning>Edit</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rewards Card */}
      <div className="px-4 pb-4">
        <button className="w-full bg-[#A4B660]/10 rounded-2xl p-4 flex items-center justify-between border border-[#A4B660]/20 hover:bg-[#A4B660]/15 transition-colors">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-[#A4B660]" />
            <div className="text-left">
              <span className="text-sm font-medium text-gray-900" contentEditable suppressContentEditableWarning>Vilvah Rewards</span>
              <div className="text-sm font-bold text-[#A4B660]" contentEditable suppressContentEditableWarning>₹280 Coins</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* MY ACCOUNT Section */}
      <div className="px-4 pt-2 pb-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
          My Account
        </h3>
        <div className="space-y-1">
          <MenuItem icon={<Package className="w-6 h-6 text-[#A4B660]" />} label="Track My Order" />
          <MenuItem icon={<Sparkles className="w-6 h-6 text-[#A4B660]" />} label="Skin Profile" badge="NEW" />
          <MenuItem icon={<MapPin className="w-6 h-6 text-[#A4B660]" />} label="Saved Addresses" />
          <MenuItem icon={<CreditCard className="w-6 h-6 text-[#A4B660]" />} label="Payment Methods" />
          <MenuItem icon={<RefreshCw className="w-6 h-6 text-[#A4B660]" />} label="Subscriptions" />
        </div>
      </div>

      {/* ACTIVITY Section */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
          Activity
        </h3>
        <div className="space-y-1">
          <MenuItem icon={<Package className="w-6 h-6 text-[#A4B660]" />} label="My Orders" />
          <MenuItem icon={<Star className="w-6 h-6 text-[#A4B660]" />} label="My Reviews" />
          <MenuItem icon={<Heart className="w-6 h-6 text-[#A4B660]" />} label="My Wishlist" />
        </div>
      </div>

      {/* PREFERENCES Section */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
          Preferences
        </h3>
        <div className="space-y-1">
          <MenuItem icon={<Bell className="w-6 h-6 text-[#A4B660]" />} label="Notifications" />
          <MenuItem icon={<Settings className="w-6 h-6 text-[#A4B660]" />} label="Settings" />
        </div>
      </div>

      {/* SUPPORT Section */}
      <div className="px-4 pb-6">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1" contentEditable suppressContentEditableWarning>
          Support
        </h3>
        <div className="space-y-1">
          <MenuItem icon={<HelpCircle className="w-6 h-6 text-[#A4B660]" />} label="Help & FAQs" />
          <MenuItem icon={<Mail className="w-6 h-6 text-[#A4B660]" />} label="Contact Us" />
        </div>
      </div>

      {/* Destructive Actions */}
      <div className="px-4 pb-4 pt-2">
        <button onClick={handleLogOut} className="w-full px-8 py-3 bg-[#A4B660] text-white rounded-full font-medium hover:bg-[#93a555] transition-colors text-center">
          <span contentEditable suppressContentEditableWarning>Log Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6 text-center">
        <p className="text-xs text-muted-foreground" contentEditable suppressContentEditableWarning>
          App version 1.0.2
        </p>
      </div>
    </div>
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
        <span className="text-sm font-medium text-gray-900" contentEditable suppressContentEditableWarning>
          {label}
        </span>
        {badge && (
          <span className="px-2 py-0.5 bg-[#A4B660] text-white text-xs font-medium rounded" contentEditable suppressContentEditableWarning>
            {badge}
          </span>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
    </button>
  );
}

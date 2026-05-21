import { User } from 'lucide-react';

interface ProfileNotLoggedInProps {
  onSignIn: () => void;
  onCreateAccount: () => void;
}

export function ProfileNotLoggedIn({ onSignIn, onCreateAccount }: ProfileNotLoggedInProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-6" style={{ paddingBottom: '88px' }}>
      <div className="text-center max-w-xs">
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-[#A4B660]/10 flex items-center justify-center">
            <User className="w-14 h-14 text-[#A4B660]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold mb-2" contentEditable suppressContentEditableWarning>
          Sign in to your account
        </h2>

        {/* Subtext */}
        <p className="text-sm text-muted-foreground mb-7" contentEditable suppressContentEditableWarning>
          Access your orders, wishlist, rewards & more
        </p>

        {/* Sign In Button */}
        <button
          onClick={onSignIn}
          className="w-full max-w-[220px] px-8 py-3 bg-[#A4B660] text-white rounded-full font-medium hover:bg-[#93a555] transition-colors mb-3"
        >
          <span contentEditable suppressContentEditableWarning>Sign In</span>
        </button>

        {/* Create Account Button */}
        <button
          onClick={onCreateAccount}
          className="w-full max-w-[220px] px-8 py-3 bg-transparent border-2 border-[#A4B660] text-[#A4B660] rounded-full font-medium hover:bg-[#A4B660]/5 transition-colors"
        >
          <span contentEditable suppressContentEditableWarning>Create Account</span>
        </button>
      </div>
    </div>
  );
}

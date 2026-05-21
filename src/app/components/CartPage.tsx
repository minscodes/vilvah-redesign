import { ShoppingBag, Heart, Trash2, Plus, ArrowRight, ArrowLeft, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import bestsellerImg from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.12_PM-1.jpeg';
import img1 from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM.jpeg';
import img3 from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM__1_.jpeg';
import img2 from '../../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM__2_.jpeg';
import { CartBottomSheet } from './CartBottomSheet';

interface CartPageProps {
  onContinueShopping: () => void;
  onClose?: () => void;
}

export function CartPage({ onContinueShopping, onClose }: CartPageProps) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Milk Drop Serum',
      subtitle: '30ml · All Skin',
      price: 640,
      image: bestsellerImg,
      tag: 'Pigmentation',
      quantity: 1
    }
  ]);

  const recommendedProducts = [
    { id: 5, name: 'Vitamin C Serum', price: 720, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop' },
    { id: 6, name: 'Niacinamide Toner', price: 580, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
    { id: 7, name: 'Hyaluronic Moisturizer', price: 750, image: img3 },
    { id: 8, name: 'Tea Tree Face Mist', price: 480, image: img1 }
  ];

  const updateQuantity = (itemId: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 50;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const freeShippingThreshold = 899;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={onClose} className="p-0">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base font-medium absolute left-1/2 -translate-x-1/2" contentEditable suppressContentEditableWarning>Vilvah</h1>
          <div className="flex items-center gap-4">
            <button className="p-0">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-0 relative">
              <ShoppingBag className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-2xl font-bold" contentEditable suppressContentEditableWarning>
            My Cart
          </h2>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-xs">
            {/* Shopping Bag Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-full bg-[#A4B660]/10 flex items-center justify-center">
                <ShoppingBag className="w-14 h-14 text-[#A4B660]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold mb-2" contentEditable suppressContentEditableWarning>
              Your cart is empty
            </h2>

            {/* Subtext */}
            <p className="text-sm text-muted-foreground mb-7" contentEditable suppressContentEditableWarning>
              Start shopping and fill your cart with products you love
            </p>

            {/* CTA Button */}
            <button
              onClick={onContinueShopping}
              className="w-full max-w-[220px] px-8 py-3 bg-[#A4B660] text-white rounded-full font-medium hover:bg-[#93a555] transition-colors"
            >
              <span contentEditable suppressContentEditableWarning>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cart with Items State
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={onClose} className="p-0">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-medium absolute left-1/2 -translate-x-1/2" contentEditable suppressContentEditableWarning>Vilvah</h1>
        <div className="flex items-center gap-4">
          <button className="p-0">
            <Search className="w-6 h-6" />
          </button>
          <button className="p-0 relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-2xl font-bold" contentEditable suppressContentEditableWarning>
          My Cart ({cartItems.length})
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '120px' }}>
        {/* Free Shipping Progress */}
        <div className="px-4 pt-4 pb-3">
          <div className="bg-[#A4B660]/10 rounded-2xl p-4 border border-[#A4B660]/20">
            <p className="text-sm font-medium mb-3" contentEditable suppressContentEditableWarning>
              {amountToFreeShipping > 0
                ? `You're ₹${amountToFreeShipping} away from FREE SHIPPING 🚚`
                : 'You got FREE SHIPPING! 🚚'}
            </p>
            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-gray-200 rounded-full mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-[#A4B660] rounded-full transition-all"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
            {/* Milestones */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span contentEditable suppressContentEditableWarning>₹899 Free shipping 🚚</span>
              <span contentEditable suppressContentEditableWarning>₹2499 Unlock ₹100 off 🎁</span>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="px-4 pb-3">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
              <div className="flex gap-3 mb-3">
                {/* Product Image */}
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-[#F5F5F0] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <span className="inline-block px-2 py-0.5 text-[9px] font-medium bg-[#A4B660] text-white rounded mb-1" contentEditable suppressContentEditableWarning>
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-bold mb-0.5" contentEditable suppressContentEditableWarning>
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1" contentEditable suppressContentEditableWarning>
                    {item.subtitle}
                  </p>
                  <p className="text-sm font-bold" contentEditable suppressContentEditableWarning>
                    ₹{item.price}
                  </p>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button className="p-1">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-[#A4B660]" />
                </button>

                <div className="flex items-center gap-3">
                  <button onClick={() => removeItem(item.id)} className="p-1">
                    <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </button>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full"
                    >
                      <span className="text-lg font-medium">−</span>
                    </button>
                    <span className="text-sm font-medium w-6 text-center" contentEditable suppressContentEditableWarning>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full"
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Your Routine */}
        <div className="px-4 pb-3">
          <h3 className="text-base font-bold mb-2" contentEditable suppressContentEditableWarning>
            Complete Your Routine
          </h3>
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {recommendedProducts.map(product => (
                <div key={product.id} className="flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100" style={{ width: '105px' }}>
                  <div className="relative bg-[#F5F5F0]" style={{ width: '105px', height: '85px' }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2 py-1.5">
                    <h4 className="text-xs font-medium truncate leading-tight mb-1" contentEditable suppressContentEditableWarning>
                      {product.name}
                    </h4>
                    <p className="text-[11px] font-semibold mb-1" contentEditable suppressContentEditableWarning>
                      ₹{product.price}
                    </p>
                    <button className="w-full py-1 bg-[#A4B660] text-white rounded-md text-[10px] font-medium hover:bg-[#93a555] transition-colors flex items-center justify-center gap-0.5">
                      <Plus className="w-2.5 h-2.5" />
                      <span contentEditable suppressContentEditableWarning>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Sheet */}
      <CartBottomSheet
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
      />
    </div>
  );
}

import { useState, useMemo, useCallback } from 'react';
import { RouterProvider } from 'react-router';
import { createAppRouter } from './routes';
import { toast, Toaster } from 'sonner';
import img1 from '../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM.jpeg';
import img2 from '../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM__2_.jpeg';
import img3 from '../imports/WhatsApp_Image_2026-05-17_at_12.09.11_PM__1_.jpeg';
import img4 from '../imports/WhatsApp_Image_2026-05-17_at_12.09.12_PM.jpeg';
import bestsellerImg from '../imports/WhatsApp_Image_2026-05-17_at_12.09.12_PM-1.jpeg';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  secondaryTag?: { label: string; color: string };
  isBestseller?: boolean;
  variants?: { size: string; price: number }[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Milk Drop Serum',
    subtitle: 'All Skin - Rice Water Ext.',
    price: 640,
    originalPrice: 799,
    rating: 4.3,
    reviews: 2.6,
    image: bestsellerImg,
    tag: 'Pigmentation',
    isBestseller: true,
    variants: [
      { size: '30ml', price: 640 },
      { size: '50ml', price: 980 },
      { size: '100ml', price: 1750 }
    ]
  },
  {
    id: 2,
    name: 'Under Eye Cream',
    subtitle: 'Dry Skin - Goji Berry',
    price: 600,
    originalPrice: 799,
    rating: 4.8,
    reviews: 10.3,
    image: img3,
    tag: 'Dark Circles',
    variants: [
      { size: '15ml', price: 600 },
      { size: '30ml', price: 1100 }
    ]
  },
  {
    id: 3,
    name: 'Milk Powder Face Wash',
    subtitle: 'Oily Skin - Rice Milk',
    price: 650,
    originalPrice: 899,
    rating: 4.8,
    reviews: 1.1,
    image: img2,
    tag: 'Blackheads',
    variants: [
      { size: '100ml', price: 650 },
      { size: '200ml', price: 1200 }
    ]
  },
  {
    id: 4,
    name: 'Sunscreen SPF 50 PA+++',
    subtitle: 'All Skin - Ceramides, Niacinamide',
    price: 549,
    originalPrice: 799,
    rating: 4.8,
    reviews: 22.3,
    image: img1,
    tag: 'Tan',
    variants: [
      { size: '50ml', price: 549 },
      { size: '100ml', price: 999 }
    ]
  },
  {
    id: 5,
    name: 'Vitamin C Serum',
    subtitle: 'Combination - Kakadu Plum',
    price: 720,
    originalPrice: 899,
    rating: 4.7,
    reviews: 15.6,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
    tag: 'Brightening',
    variants: [
      { size: '30ml', price: 720 },
      { size: '50ml', price: 1250 }
    ]
  },
  {
    id: 6,
    name: 'Niacinamide Toner',
    subtitle: 'Sensitive - Witch Hazel',
    price: 580,
    originalPrice: 749,
    rating: 4.6,
    reviews: 18.9,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    tag: 'Pore Minimizing',
    variants: [
      { size: '100ml', price: 580 },
      { size: '200ml', price: 1050 }
    ]
  }
];

export default function App() {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState('Home');
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount] = useState(2);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      const isRemoving = newSet.has(productId);

      if (isRemoving) {
        newSet.delete(productId);
        // Show removed toast with undo
        toast('Removed from wishlist 💔', {
          action: {
            label: 'Undo',
            onClick: () => {
              setWishlist(current => {
                const updated = new Set(current);
                updated.add(productId);
                return updated;
              });
            }
          },
          duration: 3000
        });
      } else {
        newSet.add(productId);
        // Show added toast
        toast('Added to wishlist ❤️', {
          action: {
            label: 'View',
            onClick: () => setActiveTab('Wishlist')
          },
          duration: 2000
        });
      }
      return newSet;
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    toast('Added to cart 🛒', {
      action: {
        label: 'Go to cart',
        onClick: () => setActiveTab('Shop')
      },
      duration: 2000
    });
  }, []);

  const router = useMemo(
    () =>
      createAppRouter({
        products,
        wishlist,
        onToggleWishlist: toggleWishlist,
        onAddToCart: handleAddToCart,
        onProductSelect: () => {},
        setActiveTab,
        setShowSearch,
        setShowCart,
        activeTab,
        cartCount
      }),
    [wishlist, activeTab, cartCount, toggleWishlist, handleAddToCart]
  );

  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ style: { marginBottom: '80px' } }} />
      <RouterProvider router={router} />
    </>
  );
}

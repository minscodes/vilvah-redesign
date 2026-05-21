import { createBrowserRouter } from 'react-router';
import { HomePage } from './components/HomePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ReviewsPage } from './components/ReviewsPage';

export interface RouterData {
  products: Array<{
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
  }>;
  wishlist: Set<number>;
  onToggleWishlist: (id: number) => void;
  onAddToCart: () => void;
  onProductSelect: (id: number) => void;
  setActiveTab: (tab: string) => void;
  setShowSearch: (show: boolean) => void;
  setShowCart: (show: boolean) => void;
  activeTab: string;
  cartCount: number;
}

export function createAppRouter(data: RouterData) {
  return createBrowserRouter([
    {
      path: '/',
      element: <HomePage {...data} />,
    },
    {
      path: '/product/:productId',
      element: <ProductDetailPage {...data} />,
    },
    {
      path: '/reviews/:productId',
      element: <ReviewsPage {...data} />,
    },
  ]);
}

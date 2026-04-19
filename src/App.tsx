import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './screens/Home';
import Product from './screens/Product';
import Marketplace from './screens/Marketplace';
import ProductPage from './screens/ProductPage';
import CartPage from './screens/CartPage';
import CheckoutPage from './screens/CheckoutPage';

export type ScreenType = 'home' | 'product' | 'marketplace' | 'cart' | 'checkout';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentScreen = location.pathname === '/' ? 'home' : 
                        location.pathname === '/marketplace' ? 'marketplace' : 
                        location.pathname === '/cart' ? 'cart' : 
                        location.pathname === '/checkout' ? 'checkout' : 'product';

  return (
    <>
      <ScrollToTop />
      <Layout 
        currentScreen={currentScreen} 
        onNavigate={(screen) => navigate(screen === 'home' ? '/' : `/${screen}`)}
      >
        <Routes>
          <Route path="/" element={<Home onNavigate={() => navigate('/marketplace')} />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:fishName" element={<ProductPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </>
  );
}

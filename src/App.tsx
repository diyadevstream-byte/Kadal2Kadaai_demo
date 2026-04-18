import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './screens/Home';
import Product from './screens/Product'; // Old product detail (might keep for quick view)
import Marketplace from './screens/Marketplace';
import ProductPage from './screens/ProductPage';

export type ScreenType = 'home' | 'product' | 'marketplace';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentScreen = location.pathname === '/' ? 'home' : 
                        location.pathname === '/marketplace' ? 'marketplace' : 'product';

  return (
    <Layout 
      currentScreen={currentScreen} 
      onNavigate={(screen) => navigate(screen === 'home' ? '/' : `/${screen}`)}
    >
      <Routes>
        <Route path="/" element={<Home onNavigate={() => navigate('/marketplace')} />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:fishName" element={<ProductPage />} />
        {/* Fallback */}
        <Route path="/product" element={<Product />} />
      </Routes>
    </Layout>
  );
}

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import CartToast from './components/CartToast';
import Home from './pages/Home';
import Story from './pages/Story';
import Restaurants from './pages/Restaurants';
import Restaurant from './pages/Restaurant';
import Order from './pages/Order';
import Specials from './pages/Specials';
import GiftCards from './pages/GiftCards';
import Jobs from './pages/Jobs';
import Contact from './pages/Contact';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <Layout>
      <ScrollToTop />
      <CartToast />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:slug" element={<Restaurant />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:slug" element={<Order />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

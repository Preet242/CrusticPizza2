import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DeliveryModal from './components/DeliveryModal';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LocationPage from './pages/LocationPage';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal  = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header onOrderClick={openModal} />
      <main>
        <Routes>
          <Route path="/"         element={<HomePage    onOrderClick={openModal} />} />
          <Route path="/menu"     element={<MenuPage    onOrderClick={openModal} />} />
          <Route path="/location" element={<LocationPage />} />
          {/* Fallback */}
          <Route path="*"         element={<HomePage    onOrderClick={openModal} />} />
        </Routes>
      </main>
      <Footer onOrderClick={openModal} />
      <DeliveryModal open={modalOpen} onClose={closeModal} />
    </BrowserRouter>
  );
}

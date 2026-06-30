import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Handles both 'id' and '_id' configurations safely
      const productId = product.id || product._id;
      const existingItem = prevCart.find(item => (item.id || item._id) === productId);
      
      if (existingItem) {
        return prevCart.map(item =>
          (item.id || item._id) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      }>
        <Routes>
          {/* CRITICAL FIX: We must pass cart and setCart as properties to the Layout component */}
          <Route path="/" element={<Layout cart={cart} setCart={setCart} cartCount={cartCount} />}>
            <Route index element={<CatalogPage />} />
            <Route path="product/:id" element={<ProductDetailsPage addToCart={addToCart} />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
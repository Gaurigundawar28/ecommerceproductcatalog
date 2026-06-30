import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ cart, setCart, cartCount }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Passing all cart states explicitly down to the Navbar */}
      <Navbar cart={cart} setCart={setCart} cartCount={cartCount} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SwiftStore. Built with performance optimization.
      </footer>
    </div>
  );
}
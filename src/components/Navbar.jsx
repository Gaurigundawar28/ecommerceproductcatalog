import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';

export default function Navbar({ cart = [], setCart, cartCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false);

  // Safely calculate total price handling various price naming formats
  const totalPrice = cart.reduce((total, item) => {
    const price = item.price || item.itemPrice || 0;
    return total + (price * item.quantity);
  }, 0);

  const updateQuantity = (id, change) => {
    setCart(prevCart => 
      prevCart.map(item => {
        const itemId = item.id || item._id;
        if (itemId === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => (item.id || item._id) !== id));
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
              <ShoppingBag className="h-6 w-6" />
              <span>SwiftStore</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-indigo-600" />
                  Your Shopping Cart ({cartCount})
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-base font-medium">Your cart is completely empty</p>
                    <p className="text-xs mt-1">Add items from the collection to get started.</p>
                  </div>
                ) : (
                  cart.map((item) => {
                    // Safe key extractions matching any mock data model
                    const itemId = item.id || item._id;
                    const itemTitle = item.title || item.name || "Store Item";
                    const itemImage = item.image || item.imageUrl || item.img || "";
                    const itemPrice = item.price || item.itemPrice || 0;

                    return (
                      <div key={itemId} className="flex gap-4 pb-6 border-b border-gray-100 items-start">
                        <img 
                          src={itemImage} 
                          alt={itemTitle} 
                          className="w-16 h-16 object-cover bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 truncate">{itemTitle}</h4>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{item.category || "General"}</p>
                          <p className="text-sm font-bold text-gray-900 mt-2">${(itemPrice * item.quantity).toFixed(2)}</p>
                          
                          {/* Controls */}
                          <div className="flex items-center gap-2 mt-3 bg-gray-50 border border-gray-200 rounded-lg w-max p-0.5">
                            <button 
                              onClick={() => updateQuantity(itemId, -1)}
                              className="p-1 text-gray-500 hover:bg-white rounded-md transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-semibold px-2 text-gray-800">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(itemId, 1)}
                              className="p-1 text-gray-500 hover:bg-white rounded-md transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeItem(itemId)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                    <span>Subtotal Balance</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Shipping fees and local sales taxes computed at payment checkout window.</p>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all text-center">
                    Proceed to Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
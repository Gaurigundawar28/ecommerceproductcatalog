import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export default function ProductDetailsPage({ addToCart }) {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset button text after 2 seconds
  };

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-2xl border border-gray-200">
        <div className="rounded-xl overflow-hidden bg-gray-50">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full max-h-[450px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-1 mb-6 text-amber-500 text-sm">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-gray-800 text-base">{product.rating}</span>
              <span className="text-gray-400 font-normal ml-1">(Verified Rating)</span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6">
            <button 
              onClick={handleAddToCart}
              className={`w-full font-semibold py-3 px-6 rounded-xl transition-all shadow-sm mb-4 ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow'
              }`}
            >
              {added ? '✓ Added to Cart!' : 'Add to Shopping Cart'}
            </button>
            
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>2 Year Warranty Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
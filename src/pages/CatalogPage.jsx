import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Our Collection
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Discover hand-crafted, high-performance essentials calibrated for modern environments.
        </p>
      </header>

      <ProductFilters 
        categories={CATEGORIES} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
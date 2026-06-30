import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.title}
          loading="lazy" 
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded text-gray-700 uppercase tracking-wider">
          {product.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 mb-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-3 text-amber-500 text-sm">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium text-gray-700">{product.rating}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <Link 
            to={`/product/${product.id}`}
            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
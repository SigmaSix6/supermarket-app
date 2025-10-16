'use client';

import { useState } from 'react';
import { products, categories } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { Product } from '../store/cartStore';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Supermarket</h1>
        <p className="text-gray-600 dark:text-gray-300">Fresh groceries delivered to your door</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="text-4xl mb-4 text-center">{product.image}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  product.inStock
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

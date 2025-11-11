'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { useHistoryStore } from '../store/historyStore';
import Checkout from './Checkout';
import History from './History';

export default function ShoppingCart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const {
    items,
    isOpen,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCartStore();
  const { getOrderCount } = useHistoryStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const orderCount = getOrderCount();

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleCart();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, toggleCart]);

  if (!isOpen) {
    return (
      <>
        <button
          onClick={() => setShowHistory(true)}
          className="fixed bottom-6 right-24 bg-green-500 dark:bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors z-50"
          title="Order History"
        >
          <div className="relative">
            <span className="text-2xl">📦</span>
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {orderCount}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors z-50"
        >
          <div className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </button>
        {showHistory && <History onClose={() => setShowHistory(false)} />}
      </>
    );
  }

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm z-50 flex justify-end"
      onClick={toggleCart}
    >
      <div 
        className="w-full max-w-md h-full shadow-xl flex flex-col"
        style={{ backgroundColor: 'var(--background)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Shopping Cart ({totalItems} items)
            </h2>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Add some items to get started!</p>
              <button
                onClick={toggleCart}
                className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-3xl">{item.product.image}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">RP {item.product.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      RP {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold text-foreground">
              <span>Total:</span>
              <span>RP {totalPrice.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}
      {showHistory && <History onClose={() => setShowHistory(false)} />}
    </div>
  );
}

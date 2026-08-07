'use client';

import { useState } from 'react';
import { useHistoryStore } from '../store/historyStore';

interface HistoryProps {
  onClose: () => void;
}

export default function History({ onClose }: Readonly<HistoryProps>) {
  const { orders, clearHistory } = useHistoryStore();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <button
      type="button"
      className="fixed inset-0 backdrop-blur-md bg-black/30 dark:bg-black/50 z-50 flex items-center justify-center p-4 border-0 cursor-default"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      aria-label="Close order history"
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl" 
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Order History</h2>
            <div className="flex items-center gap-4">
              {orders.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all order history?')) {
                      clearHistory();
                    }
                  }}
                  className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Clear History
                </button>
              )}
              <button
                onClick={() => onClose()}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your checkout history will appear here once you place an order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    className="w-full p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left border-0 bg-transparent"
                    onClick={() => toggleOrder(order.id)}
                    aria-expanded={expandedOrderId === order.id}
                    aria-label={`Toggle order ${order.id.split('-')[1]} details`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            Order #{order.id.split('-')[1]}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(order.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{order.items.length} item{order.items.length === 1 ? '' : 's'}</span>
                          <span>•</span>
                          <span className="font-medium text-foreground">
                            RP {order.totalPrice.toFixed(2)}
                          </span>
                          <span>•</span>
                          <span className="capitalize">{order.customerInfo.paymentMethod}</span>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xl">
                        {expandedOrderId === order.id ? '▼' : '▶'}
                      </span>
                    </div>
                  </button>

                  {expandedOrderId === order.id && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                      <div className="space-y-4">
                        {/* Order Items */}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Items:</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div
                                key={item.product.id}
                                className="flex items-center justify-between text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{item.product.image}</span>
                                  <span className="text-foreground">
                                    {item.product.name} × {item.quantity}
                                  </span>
                                </div>
                                <span className="text-foreground font-medium">
                                  RP {(item.product.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer Information */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2">Customer Information:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Name: </span>
                              <span className="text-foreground">
                                {order.customerInfo.firstName} {order.customerInfo.lastName}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Email: </span>
                              <span className="text-foreground">{order.customerInfo.email}</span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Phone: </span>
                              <span className="text-foreground">{order.customerInfo.phone}</span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Payment: </span>
                              <span className="text-foreground capitalize">
                                {order.customerInfo.paymentMethod}
                              </span>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-gray-600 dark:text-gray-400">Address: </span>
                              <span className="text-foreground">
                                {order.customerInfo.address}, {order.customerInfo.city} {order.customerInfo.zipCode}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <div className="flex justify-between items-center text-lg font-semibold text-foreground">
                            <span>Total:</span>
                            <span>RP {order.totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}


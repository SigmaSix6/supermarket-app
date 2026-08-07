'use client';

import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useHistoryStore } from '../store/historyStore';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'cash' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: Readonly<CheckoutProps>) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useHistoryStore();
  const totalPrice = getTotalPrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save order to history
    addOrder({
      items: [...items],
      totalPrice,
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        paymentMethod: formData.paymentMethod,
      },
    });
    
    // Clear cart and close checkout
    clearCart();
    onClose();
    setIsProcessing(false);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      paymentMethod: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    
    alert('Order placed successfully! Thank you for your purchase.');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 backdrop-blur-md bg-black/30 dark:bg-black/50"
        aria-label="Close dialog"
      />
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative z-10" style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 id="checkout-title" className="text-2xl font-bold text-foreground">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close checkout"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium  mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium  mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium  mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium  mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium  mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium  mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium  mb-1">
                      ZIP Code
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium  mb-2">
                    Select Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash on Delivery</option>
                  </select>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium  mb-1">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground placeholder-gray-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium  mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="expiryDate"
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium  mb-1">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-foreground placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <span className="text-sm">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      RP {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center text-lg font-semibold text-foreground">
                    <span>Total:</span>
                    <span>RP {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-lg font-medium border hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from 'lucide-react';

interface OrderConfirmationProps {
  onBackToHome: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onBackToHome }) => {
  const orderNumber = `AP${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Order Number</h3>
                <p className="text-blue-600 font-mono text-lg">{orderNumber}</p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                <p className="text-gray-700">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">What happens next?</h2>
            
            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping</h3>
                <p className="text-sm text-gray-600">You'll receive tracking information via email</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Delivery</h3>
                <p className="text-sm text-gray-600">Expected delivery by {estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              📧 A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={onBackToHome}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200">
              Track Your Order
            </button>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@autopartspro.com" className="text-blue-600 hover:text-blue-800">
                support@autopartspro.com
              </a>{' '}
              or call{' '}
              <a href="tel:1-800-AUTO-PARTS" className="text-blue-600 hover:text-blue-800">
                1-800-AUTO-PARTS
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
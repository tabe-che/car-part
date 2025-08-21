import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Star, ArrowRight, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  model: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'cart' | 'checkout' | 'confirmation'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const products = [
    {
      id: 1,
      name: "Premium Brake Pads",
      price: "$89.99",
      originalPrice: "$119.99",
      image: "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "High Performance Air Filter",
      price: "$34.99",
      originalPrice: "$49.99",
      image: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: "LED Headlight Bulbs",
      price: "$129.99",
      originalPrice: "$179.99",
      image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 203
    },
    {
      id: 4,
      name: "Engine Oil Filter",
      price: "$19.99",
      originalPrice: "$29.99",
      image: "https://images.pexels.com/photos/13065691/pexels-photo-13065691.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 5,
      name: "Carbon Fiber Spoiler",
      price: "$299.99",
      originalPrice: "$399.99",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 67
    },
    {
      id: 6,
      name: "Alloy Wheel Set",
      price: "$899.99",
      originalPrice: "$1199.99",
      image: "https://images.pexels.com/photos/3802074/pexels-photo-3802074.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 92
    }
  ];

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newItem: CartItem = {
        id: productId,
        name: product.name,
        price: parseFloat(product.price.replace('$', '')),
        image: product.image,
        quantity: 1,
        model: 'Honda Civic 2018-2023' // Default model for demo
      };
      
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === productId);
        if (existingItem) {
          return prev.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, newItem];
      });
      
      setCartCount(prev => prev + 1);
    }
  };

  const handleProductClick = (productId: number) => {
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleAddToCartFromProduct = (quantity: number) => {
    const newItem: CartItem = {
      id: 1,
      name: "Premium Ceramic Brake Pads Set",
      price: 89.99,
      image: "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: quantity,
      model: 'Honda Civic 2018-2023' // This would come from the product details form
    };
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === 1);
      if (existingItem) {
        return prev.map(item =>
          item.id === 1
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
    
    setCartCount(prev => prev + quantity);
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleCheckout = (items: CartItem[], total: number) => {
    setCheckoutTotal(total);
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCartCount(0);
    setCurrentView('confirmation');
  };

  if (currentView === 'product') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AP</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">AutoParts Pro</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <button onClick={handleBackToHome} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</button>
                  <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Shop</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Contact</a>
                </div>
              </div>

              {/* Cart and Mobile Menu */}
              <div className="flex items-center space-x-4">
                <button onClick={handleCartClick} className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <button onClick={handleBackToHome} className="text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Home</button>
                  <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Shop</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">About</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Contact</a>
                </div>
              </div>
            )}
          </div>
        </nav>

        <ProductDetails 
          onBack={handleBackToHome} 
          onAddToCart={handleAddToCartFromProduct}
        />
      </div>
    );
  }

  if (currentView === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AP</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">AutoParts Pro</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Cart 
          onBack={handleBackToHome}
          onCheckout={handleCheckout}
          cartItems={cartItems}
          onUpdateCart={setCartItems}
        />
      </div>
    );
  }

  if (currentView === 'checkout') {
    return (
      <Checkout
        onBack={() => setCurrentView('cart')}
        onOrderComplete={handleOrderComplete}
        cartItems={cartItems}
        total={checkoutTotal}
      />
    );
  }

  if (currentView === 'confirmation') {
    return (
      <OrderConfirmation
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AP</span>
                </div>
                <span className="text-xl font-bold text-gray-900">AutoParts Pro</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Shop</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Contact</a>
              </div>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button onClick={handleCartClick} className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Shop</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Auto Parts
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                For Every Drive
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover high-quality automotive parts and accessories. From brake pads to performance upgrades, we've got everything to keep your vehicle running at its best.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center space-x-2">
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular auto parts and accessories, trusted by thousands of customers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Sale
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleProductClick(product.id)}
                    className="w-full mt-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AP</span>
                </div>
                <span className="text-xl font-bold">AutoParts Pro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner for premium automotive parts and accessories. Quality guaranteed, customer satisfaction first.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shop All</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">New Arrivals</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Best Sellers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sale</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Brake Parts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Engine Parts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Lighting</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Wheels & Tires</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Performance</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">1-800-AUTO-PARTS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-400">support@autopartspro.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <span className="text-gray-400">123 Auto Street<br />Motor City, MC 12345</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 AutoParts Pro. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Shipping Info</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
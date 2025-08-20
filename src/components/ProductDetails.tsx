import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

interface ProductDetailsProps {
  onBack: () => void;
  onAddToCart: (quantity: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ onBack, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: 1,
    name: "Premium Ceramic Brake Pads Set",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 15,
    description: "High-performance ceramic brake pads designed for superior stopping power and reduced brake dust. These premium pads offer excellent heat dissipation and longer lifespan compared to standard brake pads. Perfect for both daily driving and performance applications.",
    features: [
      "Low noise and vibration",
      "Reduced brake dust",
      "Superior heat dissipation",
      "Extended pad life",
      "OEM quality materials",
      "Easy installation"
    ],
    specifications: {
      "Material": "Ceramic composite",
      "Warranty": "2 years / 50,000 miles",
      "Installation": "Professional recommended",
      "Weight": "2.5 lbs per set"
    },
    images: [
      "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  };

  const carModels = [
    "Select your vehicle",
    "Honda Civic 2018-2023",
    "Toyota Camry 2019-2023",
    "Ford F-150 2020-2023",
    "Chevrolet Silverado 2019-2023",
    "BMW 3 Series 2018-2023",
    "Mercedes C-Class 2019-2023",
    "Audi A4 2018-2023",
    "Nissan Altima 2019-2023"
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Brake Rotors Set",
      price: "$159.99",
      originalPrice: "$199.99",
      image: "https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7
    },
    {
      id: 3,
      name: "Brake Fluid DOT 4",
      price: "$24.99",
      originalPrice: "$34.99",
      image: "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6
    },
    {
      id: 4,
      name: "Brake Caliper Tool Kit",
      price: "$79.99",
      originalPrice: "$99.99",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8
    },
    {
      id: 5,
      name: "Performance Brake Lines",
      price: "$129.99",
      originalPrice: "$159.99",
      image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5
    }
  ];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (selectedModel && selectedModel !== "Select your vehicle") {
      onAddToCart(quantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vehicle Compatibility */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Vehicle Compatibility
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {carModels.map((model, index) => (
                  <option key={index} value={model} disabled={index === 0}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-900">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockCount}
                      className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-300 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stockCount} available
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedModel || selectedModel === "Select your vehicle" || !product.inStock}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Orders over $75</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">2 Year Warranty</p>
                <p className="text-xs text-gray-600">Quality guaranteed</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Sale
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(relatedProduct.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">({relatedProduct.rating})</span>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-blue-600">{relatedProduct.price}</span>
                    <span className="text-xs text-gray-500 line-through">{relatedProduct.originalPrice}</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useState } from 'react';
import { Upload, X, Plus, Save, ArrowLeft } from 'lucide-react';
import type { Product } from './AdminDashboard';

interface EditProductProps {
  product: Product;
  onUpdateProduct: (product: Product) => void;
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onUpdateProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    originalPrice: product.originalPrice?.toString() || '',
    category: product.category,
    stockCount: product.stockCount.toString(),
    inStock: product.inStock
  });

  const [carModels, setCarModels] = useState<string[]>(product.carModels.length > 0 ? product.carModels : ['']);
  const [images, setImages] = useState<string[]>(product.images);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Brake Parts',
    'Engine Parts',
    'Lighting',
    'Wheels & Tires',
    'Performance',
    'Suspension',
    'Electrical',
    'Body Parts',
    'Interior',
    'Maintenance'
  ];

  const sampleImages = [
    'https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3802074/pexels-photo-3802074.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCarModelChange = (index: number, value: string) => {
    const newCarModels = [...carModels];
    newCarModels[index] = value;
    setCarModels(newCarModels);
  };

  const addCarModel = () => {
    setCarModels([...carModels, '']);
  };

  const removeCarModel = (index: number) => {
    if (carModels.length > 1) {
      setCarModels(carModels.filter((_, i) => i !== index));
    }
  };

  const addSampleImage = (imageUrl: string) => {
    if (!images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stockCount || parseInt(formData.stockCount) < 0) newErrors.stockCount = 'Valid stock count is required';
    if (carModels.filter(model => model.trim()).length === 0) newErrors.carModels = 'At least one car model is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      carModels: carModels.filter(model => model.trim()),
      images: images,
      inStock: formData.inStock,
      stockCount: parseInt(formData.stockCount)
    };

    onUpdateProduct(updatedProduct);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-1">Update product information and settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (Optional)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Count *
              </label>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleInputChange}
                min="0"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.stockCount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stockCount && <p className="text-red-500 text-sm mt-1">{errors.stockCount}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Product is in stock</span>
            </label>
          </div>
        </div>

        {/* Car Model Compatibility */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Car Model Compatibility</h2>
          
          <div className="space-y-4">
            {carModels.map((model, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={model}
                  onChange={(e) => handleCarModelChange(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Honda Civic 2018-2023"
                />
                {carModels.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCarModel(index)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addCarModel}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Model</span>
            </button>
            
            {errors.carModels && <p className="text-red-500 text-sm">{errors.carModels}</p>}
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Product Images</h2>
          
          {/* Sample Images */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add more images:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {sampleImages.map((imageUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addSampleImage(imageUrl)}
                  disabled={images.includes(imageUrl)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden transition-all duration-200 ${
                    images.includes(imageUrl) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:ring-2 hover:ring-blue-500'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`Sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    {!images.includes(imageUrl) && (
                      <Plus className="h-6 w-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Images */}
          {images.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current images:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((imageUrl, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
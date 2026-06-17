import React from 'react';

const ProductCard = ({ product, onAddToCart, showActions = true }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center h-64 flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-6xl mb-4">🎁</div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-500 mb-4 text-sm">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {product.stock} in stock
          </span>
        </div>
        {showActions && (
          <button 
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              product.stock > 0 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';

const ProductCard = ({ product, onAddToCart, onSelectProduct, showActions = true }) => {
  const rating = product.rating || 4.8;
  const category = product.category || 'General';

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col group hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative bg-slate-50 p-6 text-center h-52 flex items-center justify-center overflow-hidden">
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {category}
        </span>

        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {product.icon || '🎁'}
          </div>
        )}

        <span className={`absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-md ${
          product.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }`}>
          {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1 text-amber-400 text-xs">
          <span>★</span>
          <span className="font-semibold text-slate-700">{rating}</span>
          <span className="text-slate-400 font-normal">(24+ reviews)</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-500 mb-4 text-xs line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-xs text-slate-400 block">Price</span>
            <span className="text-lg font-extrabold text-indigo-600">${Number(product.price).toFixed(2)}</span>
          </div>

          {showActions && (
            <button 
              onClick={handleAddToCartClick}
              disabled={product.stock === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                product.stock > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-md active:scale-95' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>🛒</span>
              {product.stock > 0 ? 'Add' : 'Sold Out'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

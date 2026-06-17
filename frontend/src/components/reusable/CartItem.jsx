import React from 'react';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="text-4xl">🎁</div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{item.product.name}</h3>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-indigo-600">
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>
        <button 
          onClick={() => onRemove(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

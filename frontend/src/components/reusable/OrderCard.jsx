import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-green-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl">✅</div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{order.product.name}</h3>
        </div>
      </div>
      <div className="space-y-2 text-gray-600">
        <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
        <p><span className="font-semibold text-green-600">Total:</span> <span className="text-xl font-bold text-green-600">${order.totalPrice.toFixed(2)}</span></p>
        <p className="text-sm text-gray-500">
          {new Date(order.orderDate).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;

import React from 'react';

const AdminOrderRow = ({ order }) => {
  return (
    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-gray-800 font-semibold">@{order.user.username}</td>
      <td className="px-6 py-4 text-gray-600">{order.product.name}</td>
      <td className="px-6 py-4 text-gray-700">{order.quantity}</td>
      <td className="px-6 py-4 text-green-600 font-bold">${order.totalPrice.toFixed(2)}</td>
      <td className="px-6 py-4 text-gray-500 text-sm">
        {new Date(order.orderDate).toLocaleString()}
      </td>
    </tr>
  );
};

export default AdminOrderRow;

import React from 'react';

const AdminProductRow = ({ product, onDelete }) => {
  return (
    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-16 w-16 object-contain rounded-lg"
          />
        ) : (
          <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">🎁</div>
        )}
      </td>
      <td className="px-6 py-4 text-gray-800 font-semibold">{product.name}</td>
      <td className="px-6 py-4 text-gray-600">{product.description}</td>
      <td className="px-6 py-4 text-indigo-600 font-bold">${product.price}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4">
        <button 
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminProductRow;

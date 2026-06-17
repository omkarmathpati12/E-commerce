import { useState, useEffect } from 'react';
import api from '../services/api';
import AdminProductRow from './reusable/AdminProductRow';
import AdminOrderRow from './reusable/AdminOrderRow';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        loadProducts();
        loadOrders();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadOrders = async () => {
        try {
            const res = await api.get('/orders/all');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', { name, description, price, stock, imageUrl });
            setName('');
            setDescription('');
            setPrice(0);
            setStock(0);
            setImageUrl('');
            loadProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            loadProducts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Product</h2>
                <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input 
                            type="text" 
                            placeholder="Product Name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <input 
                            type="text" 
                            placeholder="Description"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input 
                            type="text" 
                            placeholder="https://example.com/image.jpg"
                            value={imageUrl} 
                            onChange={(e) => setImageUrl(e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            value={price} 
                            onChange={(e) => setPrice(Number(e.target.value))} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                        <input 
                            type="number" 
                            placeholder="0"
                            value={stock} 
                            onChange={(e) => setStock(Number(e.target.value))} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            required 
                        />
                    </div>
                    <div className="flex items-end">
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            + Add Product
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 overflow-x-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Products</h2>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Image</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Description</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Stock</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map(product => (
                            <AdminProductRow 
                                key={product.id} 
                                product={product} 
                                onDelete={deleteProduct}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 overflow-x-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">All Orders</h2>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">User</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Product</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Quantity</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 border-b">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map(order => (
                            <AdminOrderRow key={order.id} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;

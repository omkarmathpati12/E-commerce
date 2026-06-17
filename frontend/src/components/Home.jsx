import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProductCard from './reusable/ProductCard';
import CartItem from './reusable/CartItem';
import OrderCard from './reusable/OrderCard';

function Home() {
  const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState('products');

    useEffect(() => {
        loadProducts();
        loadCart();
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

    const loadCart = async () => {
        try {
            const res = await api.get('/cart');
            setCart(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadOrders = async () => {
        try {
            const res = await api.get('/orders');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addToCart = async (product) => {
        try {
            await api.post(`/cart?productId=${product.id}&quantity=1`);
            loadCart();
        } catch (err) {
            console.error(err);
        }
    };

    const removeFromCart = async (cartId) => {
        try {
            await api.delete(`/cart/${cartId}`);
            loadCart();
        } catch (err) {
            console.error(err);
        }
    };

    const placeOrder = async () => {
        try {
            await api.post('/orders');
            loadCart();
            loadOrders();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="flex gap-4 mb-8 flex-wrap">
                <button 
                    onClick={() => setView('products')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        view === 'products' 
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                >
                    📦 Products
                </button>
                <button 
                    onClick={() => setView('cart')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                        view === 'cart' 
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                >
                    🛒 Cart {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
                <button 
                    onClick={() => setView('orders')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        view === 'orders' 
                            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                >
                    📋 Orders
                </button>
            </div>

            {view === 'products' && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>
            )}

            {view === 'cart' && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h2>
                    {cart.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4 mb-8">
                            {cart.map(item => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    )}
                    {cart.length > 0 && (
                        <button 
                            onClick={placeOrder}
                            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            Place Order 🎉
                        </button>
                    )}
                </div>
            )}

            {view === 'orders' && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <p className="text-gray-500 text-lg">You haven't placed any orders yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;

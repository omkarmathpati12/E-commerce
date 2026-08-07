import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProductCard from './reusable/ProductCard';
import CartItem from './reusable/CartItem';
import OrderCard from './reusable/OrderCard';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    if (user) {
      loadCart();
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Error fetching products from backend:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data || []);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/cart?productId=${product.id}&quantity=1`);
      loadCart();
      if (selectedProduct) {
        setSelectedProduct(null);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);
      loadCart();
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const placeOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post('/orders');
      loadCart();
      loadOrders();
      setView('orders');
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 translate-y-12 w-72 h-72 bg-blue-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span>✨ Welcome to ShopVerse</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Discover Quality Products & Great Deals
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            Browse through our wide selection of products. Sign in to add items to your cart and place orders instantly.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => { setView('explore'); }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Browse Products 🛍️
            </button>
            {!user && (
              <button 
                onClick={() => navigate('/login')}
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all hover:border-slate-600"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '🚚', title: 'Express Delivery', desc: 'Fast delivery on all orders' },
          { icon: '🛡️', title: '100% Secure Payment', desc: 'Encrypted checkout process' },
          { icon: '⭐', title: 'Verified Quality', desc: 'Authentic items guaranteed' },
          { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free return policy' }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="text-3xl bg-indigo-50 p-3 rounded-xl">{feat.icon}</div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{feat.title}</h3>
              <p className="text-xs text-slate-500">{feat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setView('explore')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                view === 'explore' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              📦 Products Catalog
            </button>
            {user && (
              <>
                <button 
                  onClick={() => setView('cart')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all relative ${
                    view === 'cart' 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  🛒 My Cart {cart.length > 0 && (
                    <span className="ml-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setView('orders')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    view === 'orders' 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  📋 My Orders {orders.length > 0 && (
                    <span className="ml-1 text-slate-400 text-xs">({orders.length})</span>
                  )}
                </button>
              </>
            )}
          </div>

          {view === 'explore' && (
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {view === 'explore' && (
        <section className="space-y-6">
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="bg-white h-72 rounded-2xl border border-slate-100 animate-pulse p-4 flex flex-col justify-between">
                  <div className="bg-slate-100 h-40 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="bg-slate-100 h-4 rounded w-3/4"></div>
                    <div className="bg-slate-100 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="text-5xl">📦</div>
              <h3 className="text-lg font-bold text-slate-800">No products available</h3>
              <p className="text-slate-500 text-xs">There are no products listed at the moment. Please check back later or log in as Admin to add products.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  onSelectProduct={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {view === 'cart' && user && (
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🛒</span> Shopping Cart ({cart.length} items)
          </h2>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="text-6xl">🛍️</div>
              <h3 className="text-lg font-bold text-slate-800">Your shopping cart is empty</h3>
              <p className="text-slate-500 text-sm">Explore our products catalog to find items!</p>
              <button 
                onClick={() => setView('explore')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {cart.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">
                      ${cart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ${cart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0).toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={placeOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Checkout Now</span>
                  <span>🚀</span>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {view === 'orders' && user && (
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>📋</span> My Orders History
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="text-6xl">📦</div>
              <h3 className="text-lg font-bold text-slate-800">No orders placed yet</h3>
              <p className="text-slate-500 text-sm">Once you place an order, track its status right here.</p>
              <button 
                onClick={() => setView('explore')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Product Detail Modal Card */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative transform transition-all animate-scaleUp">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-600 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            <div className="bg-slate-50 p-8 text-center h-64 flex items-center justify-center relative">
              {selectedProduct.category && (
                <span className="absolute top-4 left-4 bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {selectedProduct.category}
                </span>
              )}
              {selectedProduct.imageUrl ? (
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-7xl">
                  {selectedProduct.icon || '🎁'}
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <span>★</span>
                  <span className="font-bold text-slate-800">{selectedProduct.rating || 4.8}</span>
                  <span className="text-slate-400 text-xs">(Verified Rating)</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                  selectedProduct.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {selectedProduct.stock > 0 ? `${selectedProduct.stock} Available` : 'Out of Stock'}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Price</span>
                  <span className="text-2xl font-black text-indigo-600">${Number(selectedProduct.price).toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => addToCart(selectedProduct)}
                  disabled={selectedProduct.stock === 0}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 ${
                    selectedProduct.stock > 0 
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>🛒</span>
                  {selectedProduct.stock > 0 ? (user ? 'Add to Cart' : 'Sign In to Buy') : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

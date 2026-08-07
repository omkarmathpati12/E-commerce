import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-800">
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">🛍️</span>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  ShopVerse
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
                {user && user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
                    <span>👑</span> Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-300 text-xs">Hi, <strong className="text-white">{user.username}</strong></span>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-xs font-semibold shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    to="/login" 
                    className="text-slate-300 hover:text-white px-3 py-2 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-indigo-500/25"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛍️</span>
                <span className="font-bold text-lg text-white">ShopVerse</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your premier destination for high-quality electronics, modern gadgets, and everyday essentials. Delivered straight to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/" className="hover:text-white transition-colors">Home Store</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Customer Account</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Customer Care</h4>
              <ul className="space-y-2 text-xs">
                <li className="hover:text-white cursor-pointer">Shipping & Delivery</li>
                <li className="hover:text-white cursor-pointer">Returns & Exchanges</li>
                <li className="hover:text-white cursor-pointer">Order Tracking</li>
                <li className="hover:text-white cursor-pointer">FAQ & Help Center</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Stay Updated</h4>
              <p className="text-xs text-slate-400 mb-3">Subscribe to get special offers & product news.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs rounded-lg px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-2 rounded-lg font-semibold transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} ShopVerse E-Commerce Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

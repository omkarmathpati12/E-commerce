import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-white font-bold text-xl">🛍️ E-commerce</h1>
              {user && (
                <div className="flex items-center gap-4">
                  {user.role === 'USER' && (
                    <Link to="/" className="text-white hover:text-indigo-200 transition-colors font-medium">
                      Home
                    </Link>
                  )}
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="text-white hover:text-indigo-200 transition-colors font-medium">
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-white font-medium">Hello, {user.username}!</span>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="text-white hover:text-indigo-200 transition-colors font-medium">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

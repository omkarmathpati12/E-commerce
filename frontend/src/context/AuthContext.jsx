import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuth, clearAuth, loadAuth } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = loadAuth();
    if (auth) {
      checkAuth();
    }
  }, []);

  const login = async (username, password) => {
    // First call login endpoint to verify credentials
    const res = await api.post('/auth/login', { username, password });
    // Then set Basic Auth for future requests
    setAuth(username, password);
    setUser(res.data);
  };

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/current');
      setUser(res.data);
    } catch (err) {
      console.error('Auth check failed:', err.response || err.message);
      logout();
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

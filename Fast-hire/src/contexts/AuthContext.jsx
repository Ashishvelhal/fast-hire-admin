import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userRole = sessionStorage.getItem('role');
    
    if (token && userRole === 'SUPERADMIN') {
      setUser({ role: userRole });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Your login logic here
      sessionStorage.setItem('authToken', 'dummy-token');
      sessionStorage.setItem('role', 'SUPERADMIN');
      setUser({ role: 'SUPERADMIN' });
      navigate('/super-admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('role');
    setUser(null);
    navigate('/super-admin/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

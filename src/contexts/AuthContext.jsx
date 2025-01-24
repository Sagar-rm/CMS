import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
 //     await refreshToken();
      setLoading(false);
    };

    initAuth();
  }, []);

  // const refreshToken = async () => {
  //   try {
  //     const response = await api.post('/auth/refresh-token');
  //     console.log('Refresh token response:', response.data);
  //     if (response.data && response.data.data) {
  //       setUser(response.data.data.user);
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error.response ? error.response.data : error.message);
  //     clearAuthData();
  //   }
  // };

  const login = async (loginData) => {
    try {
      // Determine endpoint based on presence of registerNumber or kgId
      const endpoint = loginData.registerNumber
        ? '/student/login'
        : loginData.kgId
        ? '/admin/login'
        : null;

      if (!endpoint) {
        throw new Error('Invalid login data: Must contain either registerNumber or kgId');
      }

      const response = await api.post(endpoint, loginData);
      console.log('Login response:', response.data);

      if (response.data && response.data.data) {
        setUser(response.data.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response.data.data.user;
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      clearAuthData();
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message);
    }
  };

  const clearAuthData = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
//            await refreshToken();
            return api(originalRequest);
          } catch (refreshError) {
            clearAuthData();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


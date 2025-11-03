import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromToken = async () => {
    // ALTERADO: Tenta buscar o token primeiro no localStorage, depois no sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get(`/users/me?_t=${new Date().getTime()}`);
          setUser(response.data);
        } else {
          // Limpa ambos os storages se o token estiver expirado
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Erro ao carregar usuário a partir do token:", error);
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  // ALTERADO: A função de login agora aceita o parâmetro 'rememberMe'
  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      // Decide onde armazenar o token com base na escolha do usuário
      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const userProfileResponse = await api.get(`/users/me?_t=${new Date().getTime()}`);
      setUser(userProfileResponse.data);

      return userProfileResponse.data;

    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    // ALTERADO: Limpa o token de ambos os storages para garantir um logout completo
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, loadUserFromToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
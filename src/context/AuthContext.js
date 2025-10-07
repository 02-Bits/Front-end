import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para carregar dados do usuário a partir do token
  const loadUserFromToken = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          // Define o token no header para a próxima requisição
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Busca os dados completos do usuário
          const response = await api.get(`/users/me?_t=${new Date().getTime()}`);
          // CORREÇÃO: Armazena o objeto de usuário completo, não apenas o token decodificado
          setUser(response.data);
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Erro ao carregar usuário a partir do token:", error);
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      // Define o token no header para as requisições seguintes
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // ===== ALTERAÇÃO PRINCIPAL AQUI =====
      // Após o login, busca os dados completos do usuário para ter a imageurl
      const userProfileResponse = await api.get(`/users/me?_t=${new Date().getTime()}`);
      setUser(userProfileResponse.data); // Armazena o perfil completo no estado

      return userProfileResponse.data; // Retorna o perfil completo

    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization']; // Limpa o header da api
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
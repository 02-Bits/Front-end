// components/ModalRegisterUser.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalRegisterUser = ({ onClose, switchToVet, openLogin }) => {
  const { login } = useAuth();

  // Estados para todos os campos do formulário
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    rg: '',
    imageurl: 'https://i.pravatar.cc/150'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepara os dados para o backend
      const userData = {
        ...formData,
        role: 'USER' // Define o papel como usuário comum
      };

      // 1. Tenta registrar o novo usuário
      await api.post('/users/register', userData);

      // 2. Se o registro for bem-sucedido, tenta fazer o login
      await login(formData.email, formData.password);

      onClose();
      window.location.href = '/'; // Redireciona para a home logado

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao cadastrar. Verifique os dados.';
      setError(errorMessage);
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        
        <div className="button-group">
          <button className="button active">Cliente</button>
          <button className="button" onClick={switchToVet}>Veterinário</button>
        </div>
        
        <div className="logo-modal">
          <img src={logo} alt="Pet Vita Logo" />
        </div>
        
        <form className="form" onSubmit={handleRegister}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="username">Nome Completo</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Digite o seu nome completo" 
              required 
              value={formData.username}
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="seu.email@exemplo.com" 
              required 
              value={formData.email}
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Mínimo 6 caracteres" 
              required 
              minLength="6"
              value={formData.password}
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Digite a senha novamente" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="phone">Telefone</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="11987654321 (apenas números)" 
              required 
              pattern="[0-9]{11}"
              title="Digite 11 números (DDD + número)"
              value={formData.phone}
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="address">Endereço Completo</label>
            <input 
              type="text" 
              id="address" 
              placeholder="Rua, número, bairro, cidade - Estado" 
              required 
              value={formData.address}
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="rg">RG (somente números)</label>
            <input 
              type="text" 
              id="rg" 
              placeholder="123456789" 
              required 
              pattern="[0-9]{7,12}"
              title="Digite apenas números do RG"
              value={formData.rg}
              onChange={handleChange} 
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Cadastrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </button>
        </form>
        
        <div className="links">
          <button type="button" className="link-button" onClick={onClose}>
            Voltar
          </button>
          <button type="button" className="link-button" onClick={openLogin}>
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegisterUser;
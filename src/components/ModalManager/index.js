// components/ModalManager.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ModalUser from '../ModalUser';
import ModalVet from '../ModalVet';
import ModalRegisterUser from '../ModalRegisterUser';
import ModalRegisterVet from '../ModalRegisterVet';

const ModalManager = ({ initialModal, onClose }) => {
  const [currentModal, setCurrentModal] = useState(initialModal);
  const { login } = useAuth();
  const navigate = useNavigate();

  const switchToVet = () => setCurrentModal('vet');
  const switchToUser = () => setCurrentModal('user');
  const switchToRegisterUser = () => setCurrentModal('register-user');
  const switchToRegisterVet = () => setCurrentModal('register-vet');

  // ===== FUNÇÃO CHAMADA APÓS LOGIN BEM-SUCEDIDO =====
  const handleLoginSuccess = async (email, password) => {
    try {
      const userData = await login(email, password);
      
      onClose(); // Fecha o modal

      // Redireciona baseado no papel do usuário
      switch(userData.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'VETERINARY':
          navigate('/vet/dashboard');
          break;
        case 'USER':
          navigate('/consultas');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error; // Propaga o erro para o modal tratar
    }
  };

  // ===== FUNÇÃO CHAMADA APÓS CADASTRO BEM-SUCEDIDO =====
  const handleRegisterSuccess = async (email, password, role) => {
    try {
      // Após cadastro, faz login automaticamente
      const userData = await login(email, password);
      
      onClose(); // Fecha o modal

      // Redireciona para completar perfil baseado no papel
      switch(userData.role) {
        case 'VETERINARY':
          navigate('/vet/perfil');
          break;
        case 'USER':
          navigate('/perfil');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Erro ao fazer login após cadastro:', error);
      // Se falhar o login automático, abre o modal de login correspondente
      if (role === 'VETERINARY') {
        switchToVet();
      } else {
        switchToUser();
      }
    }
  };

  const renderModal = () => {
    switch (currentModal) {
      case 'user':
        return (
          <ModalUser 
            onClose={onClose}
            switchToVet={switchToVet}
            switchToRegisterUser={switchToRegisterUser}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'vet':
        return (
          <ModalVet 
            onClose={onClose}
            switchToUser={switchToUser}
            switchToRegisterVet={switchToRegisterVet}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'register-user':
        return (
          <ModalRegisterUser 
            onClose={onClose}
            switchToVet={switchToRegisterVet} // CORRIGIDO: Agora vai para register-vet
            openLogin={switchToUser}
            onRegisterSuccess={(email, password) => handleRegisterSuccess(email, password, 'USER')}
          />
        );
      case 'register-vet':
        return (
          <ModalRegisterVet 
            onClose={onClose}
            switchToUser={switchToRegisterUser} // CORRIGIDO: Agora vai para register-user
            openLogin={switchToVet}
            onRegisterSuccess={(email, password) => handleRegisterSuccess(email, password, 'VETERINARY')}
          />
        );
      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      {renderModal()}
    </div>,
    document.body
  );
};

export default ModalManager;
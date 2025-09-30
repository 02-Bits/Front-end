// components/Header_sem_cadastro.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import ModalManager from '../../components/ModalManager';
import './css/styles.css';

const HeaderSemCadastro = () => {
  const [activeModal, setActiveModal] = useState(null);
  const location = useLocation(); // Hook para pegar a rota atual

  const openUserModal = () => setActiveModal('user');
  const openRegisterUserModal = () => setActiveModal('register-user');
  const closeModal = () => setActiveModal(null);

  // Função para verificar se o link está ativo
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Pet Vita Logo" /></Link>
        </div>
        
        <nav className="nav nav-center">
          <Link 
            to="/" 
            className={`nav_link ${isActiveLink('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/app" 
            className={`nav_link ${isActiveLink('/app') ? 'active' : ''}`}
          >
            App
          </Link>
          <Link 
            to="/sobre-nos" 
            className={`nav_link ${isActiveLink('/sobre-nos') ? 'active' : ''}`}
          >
            Saiba Mais
          </Link>
        </nav>

        <div className="auth">
          <button className="button" onClick={openUserModal}>Login</button>
          <button className="button" onClick={openRegisterUserModal}>Cadastre-se</button>
        </div>
      </header>

      {/* Modal Manager - Controla todos os modais */}
      {activeModal && (
        <ModalManager 
          initialModal={activeModal}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default HeaderSemCadastro;
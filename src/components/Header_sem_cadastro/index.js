import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import ModalVet from '../../components/ModalVet';
import ModalUser from '../../components/ModalUser';
import ModalRegisterUser from '../../components/ModalRegisterUser';
import ModalRegisterVet from '../../components/ModalRegisterVet';
import ForgotPasswordModal from '../../components/ForgotPasswordModal'; // 1. Importar o novo modal
import './css/styles.css';

const Header_sem_cadastro = () => {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);
  const openLoginUser = () => setActiveModal('loginUser');
  const openRegisterUser = () => setActiveModal('registerUser');
  const openLoginVet = () => setActiveModal('loginVet');
  const openRegisterVet = () => setActiveModal('registerVet');
  const openForgotPassword = () => setActiveModal('forgotPassword'); // 2. Criar a função para abrir o modal

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Pet Vita Logo" /></Link>
        </div>
        <nav className="nav nav-center">
          <Link to="/" className="nav_link">Home</Link>
          <Link to="/app" className="nav_link">App</Link>
          <Link to="/sobre-nos" className="nav_link">Saiba Mais</Link>
        </nav>
        <div className="auth">
          <button className="button" onClick={openLoginUser}>Login</button>
          <button className="button" onClick={openRegisterUser}>Cadastre-se</button>
        </div>
      </header>

      {activeModal === 'loginUser' && ReactDOM.createPortal(
        <ModalUser 
            onClose={closeModal} 
            onSwitchToRegister={openRegisterUser}
            switchToVet={openLoginVet}
            onSwitchToForgotPassword={openForgotPassword} // 3. Passar a nova função como prop
        />, document.body
      )}
      {activeModal === 'registerUser' && ReactDOM.createPortal(
        <ModalRegisterUser 
            onClose={closeModal} 
            onSwitchToLogin={openLoginUser}
            switchToVet={openRegisterVet}
        />, document.body
      )}
      {activeModal === 'loginVet' && ReactDOM.createPortal(
        <ModalVet 
            onClose={closeModal} 
            onSwitchToRegister={openRegisterVet}
            switchToUser={openLoginUser}
        />, document.body
      )}
      {activeModal === 'registerVet' && ReactDOM.createPortal(
        <ModalRegisterVet 
            onClose={closeModal} 
            onSwitchToLogin={openLoginVet}
            switchToUser={openRegisterUser}
        />, document.body
      )}
      {/* 4. Adicionar a renderização do novo modal */}
      {activeModal === 'forgotPassword' && ReactDOM.createPortal(
        <ForgotPasswordModal
            onClose={closeModal}
            onSwitchToLogin={openLoginUser}
        />, document.body
      )}
    </>
  );
};

export default Header_sem_cadastro;
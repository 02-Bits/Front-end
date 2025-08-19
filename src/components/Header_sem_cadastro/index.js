import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import ModalVet from '../../components/ModalVet';
import ModalUser from '../../components/ModalUser';
import ModalRegisterUser from '../../components/ModalRegisterUser';
import ModalRegisterVet from '../../components/ModalRegisterVet';
import './css/styles.css';

const Header = () => {
  const [activeModal, setActiveModal] = useState(null); // null, 'user', 'vet'
  const [activeRegisterModal, setActiveRegisterModal] = useState(null); // null, 'user', 'vet'

  // Fecha todos os modais
  const closeAllModals = () => {
    setActiveModal(null);
    setActiveRegisterModal(null);
  };

  // Login - Usuário
  const openUserModal = () => {
    setActiveModal('user');
    setActiveRegisterModal(null);
  };

  // Login - Veterinário
  const openVetModal = () => {
    setActiveModal('vet');
    setActiveRegisterModal(null);
  };

  // Cadastro - Usuário
  const openRegisterUserModal = () => {
    setActiveRegisterModal('user');
    setActiveModal(null);
  };

  // Cadastro - Veterinário
  const openRegisterVetModal = () => {
    setActiveRegisterModal('vet');
    setActiveModal(null);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Pet Vita Logo" />
        </div>
        
        <nav className="nav">
          <Link to="/" className="nav_link active">Home</Link>
          <Link to="/consultas" className="nav_link">Consultas</Link>
          <Link to="/pets" className="nav_link">Pets</Link>
          <Link to="/app" className="nav_link">App</Link>
          <Link to="/sobre-nos" className="nav_link">Saiba Mais</Link>
        </nav>

        <div className="auth">
          <button className="button" onClick={openUserModal}>Login</button>
          <button className="button" onClick={openRegisterUserModal}>Cadastre-se</button>
        </div>
      </header>

      {/* Modais renderizados usando Portal */}
      {activeModal === 'user' && ReactDOM.createPortal(
        <ModalUser 
          onClose={closeAllModals}
          switchToVet={openVetModal}
        />,
        document.body
      )}

      {activeModal === 'vet' && ReactDOM.createPortal(
        <ModalVet 
          onClose={closeAllModals}
          switchToUser={openUserModal}
        />,
        document.body
      )}

      {activeRegisterModal === 'user' && ReactDOM.createPortal(
        <div className="modal active" onClick={closeAllModals}>
          <ModalRegisterUser 
            onClose={closeAllModals}
            switchToVet={openRegisterVetModal}
          />
        </div>,
        document.body
      )}

      {activeRegisterModal === 'vet' && ReactDOM.createPortal(
        <div className="modal active" onClick={closeAllModals}>
          <ModalRegisterVet 
            onClose={closeAllModals}
            switchToUser={openRegisterUserModal}
          />
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
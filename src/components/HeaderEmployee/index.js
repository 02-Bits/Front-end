import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import './css/styles.css';

const HeaderEmployee = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/employee/dashboard"><img src={logo} alt="Pet Vita Logo" /></NavLink>
      </div>
      <nav className="nav nav-center">
        <NavLink to="/employee/dashboard" className="nav_link">Painel</NavLink>
        <NavLink to="/employee/servicos" className="nav_link">Serviços</NavLink> {/* CORRIGIDO */}
        <NavLink to="/employee/agenda" className="nav_link">Agenda</NavLink>
        <NavLink to="/employee/chat" className="nav_link">Chat</NavLink>
      </nav>
      <div className="icons-container">
        <div className="profile-icon-container">
          <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
            <img 
              src={user?.imageurl || profileIcon} 
              alt="Perfil" 
              onError={(e) => { e.target.onerror = null; e.target.src = profileIcon; }}
            />
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/employee/perfil" className="dropdown-item">Meu Perfil</NavLink>
              <button onClick={handleLogout} className="dropdown-item" style={{border: 'none', width: '100%', textAlign: 'left', background: 'none', cursor: 'pointer'}}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderEmployee;
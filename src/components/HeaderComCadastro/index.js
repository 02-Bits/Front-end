import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import calendarIcon from '../../assets/images/Header/Calendario.png';
import { BsChatDots } from 'react-icons/bs';
import './css/styles.css';

const HeaderComCadastro = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // O logout já redireciona para '/' no AuthContext
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="Pet Vita Logo" />
        </NavLink>
      </div>
      
      <nav className="nav nav-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/consultas" 
          className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}
        >
          Consultas
        </NavLink>
        <NavLink 
          to="/pets" 
          className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}
        >
          Pets
        </NavLink>
        <NavLink 
          to="/conversations" 
          className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}
        >
          Chat
        </NavLink>
      </nav>
      
      <div className="icons-container">
        <NavLink 
          to="/agendar-consulta" 
          className="calendar-icon" 
          title="Agendar Consulta"
        >
          <img src={calendarIcon} alt="Calendário" />
        </NavLink>
        
        <NavLink 
          to="/conversations" 
          className="header-icon" 
          title="Chat"
        >
          <BsChatDots size={26} />
        </NavLink>
        
        <div className="profile-icon-container">
          <div 
            className="profile-icon" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={profileIcon} alt="Perfil" />
          </div>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink 
                to="/perfil" 
                className="dropdown-item"
                onClick={() => setShowDropdown(false)}
              >
                Meu Perfil
              </NavLink>
              <button 
                onClick={handleLogout} 
                className="dropdown-item" 
                style={{
                  border: 'none', 
                  width: '100%', 
                  textAlign: 'left', 
                  background: 'none', 
                  cursor: 'pointer'
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComCadastro;
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png'; // Ícone padrão como fallback
import calendarIcon from '../../assets/images/Header/Calendario.png';
import { BsChatDots } from 'react-icons/bs';
import './css/styles.css';

const HeaderComCadastro = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  // ===== ALTERAÇÃO 1: Obter o usuário completo do contexto =====
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/"><img src={logo} alt="Pet Vita Logo" /></NavLink>
      </div>
      <nav className="nav nav-center">
        <NavLink to="/" className="nav_link">Home</NavLink>
        <NavLink to="/consultas" className="nav_link">Consultas</NavLink>
        <NavLink to="/pets" className="nav_link">Pets</NavLink>
        <NavLink to="/conversations" className="nav_link">Chat</NavLink>
      </nav>
      <div className="icons-container">
        <NavLink to="/agendar-consulta" className="calendar-icon" title="Agendar Consulta"><img src={calendarIcon} alt="Calendário" /></NavLink>
        <NavLink to="/conversations" className="header-icon" title="Chat"><BsChatDots size={26} /></NavLink>
        <div className="profile-icon-container">
          <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
            {/* ===== ALTERAÇÃO 2: Usar a imagem do usuário ou o ícone padrão ===== */}
            <img 
              src={user?.imageurl || profileIcon} 
              alt="Perfil" 
              onError={(e) => { e.target.onerror = null; e.target.src = profileIcon; }} // Fallback se a URL da imagem quebrar
            />
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/perfil" className="dropdown-item">Meu Perfil</NavLink>
              <button onClick={handleLogout} className="dropdown-item" style={{border: 'none', width: '100%', textAlign: 'left', background: 'none', cursor: 'pointer'}}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComCadastro;
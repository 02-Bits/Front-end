import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png';
import './css/styles.css';

const HeaderComCadastro = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Pet Vita Logo" />
      </div>
      
      <nav className="nav">
        <Link to="/" className="nav_link active">Home</Link>
        <Link to="/consultas" className="nav_link">Consultas</Link>
        <Link to="/pets" className="seu-link-pets">Pets</Link>
        <Link to="/app" className="nav_link">App</Link>
        <Link to="/solucoes" className="nav_link">Saiba Mais</Link>
      </nav>

      <div className="profile-container">
        <div 
          className="profile-icon" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={profileIcon} alt="Perfil" />
        </div>
        {showDropdown && (
          <div className="dropdown-menu">
            <Link to="/perfil" className="dropdown-item">Meu Perfil</Link>
            <Link to="/configuracoes" className="dropdown-item">Configurações</Link>
            <Link to="/logout" className="dropdown-item">Sair</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComCadastro;
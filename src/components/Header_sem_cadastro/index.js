import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import './css/styles.css';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Cliente');

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    // Fecha o modal de cadastro se estiver aberto
    if (showCadastroModal) setShowCadastroModal(false);
  };

  const toggleCadastroModal = () => {
    setShowCadastroModal(!showCadastroModal);
    // Fecha o modal de login se estiver aberto
    if (showLoginModal) setShowLoginModal(false);
  };

  const handleTabChange = (tab) => setActiveTab(tab);

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

      <div className="auth">
        <button className="button" onClick={toggleLoginModal}>Login</button>
        <button className="button" onClick={toggleCadastroModal}>Cadastre-se</button>
      </div>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="modal active" onClick={toggleLoginModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={toggleLoginModal}>&times;</span>
            <div className="button-group">
              <button 
                className={`button ${activeTab === 'Cliente' ? 'active' : ''}`}
                onClick={() => handleTabChange('Cliente')}
              >
                Cliente
              </button>
              <button 
                className={`button ${activeTab === 'Veterinário' ? 'active' : ''}`}
                onClick={() => handleTabChange('Veterinário')}
              >
                Veterinário
              </button>
            </div>
            <form className="form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Digite o seu email" required />
              </div>
              <div className="input-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" placeholder="Digite a sua senha" required />
              </div>
              <div className="options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Lembrar minha senha</label>
                </div>
                <div className="forgot-password">
                  <a href="#">Esqueci a Senha</a>
                </div>
              </div>
              <button type="submit" className="button login-button">Entrar</button>
            </form>
            <div className="links">
              <button type="button" className="link-button" onClick={toggleLoginModal}>Voltar</button>
              <button type="button" className="link-button" onClick={() => {
                toggleLoginModal();
                toggleCadastroModal();
              }}>Cadastrar-se</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro */}
      {showCadastroModal && (
        <div className="modal active" onClick={toggleCadastroModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={toggleCadastroModal}>&times;</span>
            <div className="logo-modal">
              <img src={logo} alt="Pet Vita Logo" />
            </div>
            <form className="form">
              <div className="input-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Digite o seu nome" required />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Digite o seu email" required />
              </div>
              <div className="input-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" placeholder="Digite a sua senha" required />
              </div>
              <div className="input-group">
                <label htmlFor="confirmar-senha">Confirmar Senha</label>
                <input type="password" id="confirmar-senha" placeholder="Confirmar Senha" required />
              </div>
              <button type="submit" className="button login-button">Cadastrar</button>
            </form>
            <div className="links">
              <button type="button" className="link-button" onClick={() => {
                toggleCadastroModal();
                toggleLoginModal();
              }}>Já tenho conta</button>
              <button type="button" className="link-button" onClick={toggleCadastroModal}>Voltar</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalVet = ({ onClose, switchToUser, switchToRegisterVet, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [crmv, setCrmv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onLoginSuccess(email, password);
      // O redirecionamento é feito no ModalManager após login bem-sucedido
    } catch (err) {
      setError('CRMV, e-mail ou senha inválidos. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="button-group">
          <button className="button" onClick={switchToUser}>Cliente</button>
          <button className="button active">Veterinário</button>
        </div>
        <div className="logo-modal">
          <img src={logo} alt="Pet Vita Logo" />
        </div>
        
        <form className="form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="CRMV">CRMV</label>
            <input 
              type="text" 
              id="CRMV" 
              placeholder="Digite o seu CRMV" 
              required 
              value={crmv}
              onChange={(e) => setCrmv(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email-vet">Email</label>
            <input 
              type="email" 
              id="email-vet" 
              placeholder="Digite o seu email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="senha-vet">Senha</label>
            <input 
              type="password" 
              id="senha-vet" 
              placeholder="Digite a sua senha" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="options">
            <div className="remember-me">
              <input type="checkbox" id="remember-vet" />
              <label htmlFor="remember-vet">Lembrar minha senha</label>
            </div>
            <div className="forgot-password">
              <a href="#">Esqueci a Senha</a>
            </div>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="links">
          <button type="button" className="link-button" onClick={onClose}>Voltar</button>
          <button type="button" className="link-button" onClick={switchToRegisterVet}>
            Cadastrar-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVet;
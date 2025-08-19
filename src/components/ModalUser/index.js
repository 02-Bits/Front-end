import React from 'react';
import './css/styles.css';
import ModalVet from '../ModalVet';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalUser = ({ onClose, switchToVet }) => {
  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="button-group">
          <button className="button active">Cliente</button>
          <button className="button" onClick={switchToVet}>Veterinário</button>
        </div>
        <div className="logo-modal">
          <img src={logo} alt="Pet Vita Logo" />
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
          <button type="button" className="link-button" onClick={onClose}>Voltar</button>
          <button type="button" className="link-button" onClick={() => {
            onClose();
            // Aqui você pode chamar a função para abrir o modal de cadastro se necessário
          }}>Cadastrar-se</button>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
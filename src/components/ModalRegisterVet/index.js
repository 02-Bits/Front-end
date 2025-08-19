import React from 'react';
import './css/styles.css';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';

const ModalRegisterVet = ({ onClose, switchToUser }) => {
  return (
    <div className="modal-register active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="button-group">
          <button className="button" onClick={switchToUser}>Cliente</button>
          <button className="button active">Veterinário</button>
        </div>
        <div className="logo-modal">
          <img src={logo} alt="Pet Vita Logo" />
        </div>
        <form className="form">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" placeholder="Digite o seu nome" required />
          </div>
          <div className="input-group">
            <label htmlFor="CRMV">CRMV</label>
            <input type="text" id="CRMV" placeholder="Digite o seu CRMV" required />
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
          <button type="button" className="link-button" onClick={onClose}>Voltar</button>
          <button type="button" className="link-button" onClick={() => {
            onClose();
            // Aqui você pode chamar a função para abrir o modal de login se necessário
          }}>Já tenho conta</button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegisterVet;
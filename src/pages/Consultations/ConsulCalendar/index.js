import React from 'react';
import { Link } from 'react-router-dom';
import perfil_pet from '../../../assets/images/Pets/Perfil_pet.png';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';

const ConsulAccepted = () => {
  return (
    <div className="pet-profile-page">
      <Header />

       <Link to="/add-pet" className="add-pet-button">
                Marcar consulta
              </Link>
              
      <div className="pet-profile-container">
        <div className="status-section">
          <div className="status-buttons">
            <button className="status-button Pendentes-button">Pendentes</button>
            <button className="status-button Concluidas-button active">Concluídas</button>
            <button className="status-button Calendario-button">Calendário</button>
          </div>
        </div>
        <div className="pet-card">
          <div className="pet-photo-container">
            <img src={perfil_pet} alt="Foto do Rex" className="pet-photo" />
          </div>
          <div className="pet-info">
            <div className="pet-details">
              <h3 className="pet-name">Rex</h3>
              <span className="pet-gender">Macho</span>
            </div>
          </div>
          <Link to="/pets-details" className="details-button">
            Detalhes
            <span className="arrow">›</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsulAccepted;
import React from 'react';
import { Link } from 'react-router-dom';
import perfil_pet from '../../../../assets/images/Pets/Perfil_pet.png';
import Header from '../../../../components/HeaderComCadastro';
import Footer from '../../../../components/Footer';
import './css/styles.css';

const ConsulCompleted = () => {
  // Dados mockados da consulta (substitua pelos seus dados reais)
  const consulta = {
    id: 1,
    pet: 'Rex',
    petImage: perfil_pet,
    service: 'Consulta Clínica Geral',
    doctor: 'Dr. Carlos Silva',
    doctorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    doctorSpecialty: 'Clínico Geral',
    date: '2023-11-15T10:30',
    status: 'Concluída',
    observations: 'O pet está apresentando sintomas de alergia',
    locationName: 'Pet+ - Cotia',
    locationAddress: 'Av. José Odorizzi, 1555 - Cotia/SP'
  };

  return (
    <div className="pet-profile-page">
      <Header />

      <Link to="/agendar-consulta" className="add-pet-button">
        Marcar consulta
      </Link>
            
      <div className="pet-profile-container">
        <div className="status-section">
          <div className="status-buttons">
            <Link to="/consultas" className="status-button pendentes-button">Pendentes</Link>
            <button className="status-button aceitas-button active">Concluídas</button>
            <Link to="/consultas/calendario" className="status-button calendario-button">Calendário</Link>
          </div>
        </div>
        <div className="pet-card">
          <div className="pet-photo-container">
            <img src={consulta.petImage} alt={`Foto do ${consulta.pet}`} className="pet-photo" />
          </div>
          <div className="pet-info">
            <div className="pet-details">
              <h3 className="pet-name">{consulta.pet}</h3>
              <span className="pet-gender">Consulta concluída</span>
            </div>
          </div>
          <Link 
            to="/detalhes-consulta-concluida" 
            state={{ consulta }} 
            className="details-button"
          >
            Detalhes
            <span className="arrow">›</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsulCompleted;
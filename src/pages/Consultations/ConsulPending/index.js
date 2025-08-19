import React from 'react';
import { Link } from 'react-router-dom';
import perfil_pet from '../../../assets/images/Pets/Perfil_pet.png';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';

const ConsulPending = () => {
  // Dados mockados da consulta - normalmente viriam de uma API ou estado global
  const consultaSelecionada = {
    id: 1,
    pet: 'Rex',
    petImage: perfil_pet, // Usando a mesma imagem que já está sendo importada
    service: 'Consulta Clínica Geral',
    doctor: 'Dr. Carlos Silva - Clínico Geral',
    date: '2024-08-15T10:30',
    status: 'Pendente',
    observations: 'O pet está apresentando sintomas de alergia'
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
            <button className="status-button pendentes-button active">Pendentes</button>
            <Link to="/consultas/concluidas" className="status-button aceitas-button">Concluídas</Link>
            <button className="status-button calendario-button">Calendário</button>
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
          <Link 
            to="/detalhes-consulta" 
            state={{ consulta: consultaSelecionada }}
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

export default ConsulPending;
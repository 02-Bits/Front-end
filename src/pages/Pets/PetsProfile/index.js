import React from 'react';
import { Link } from 'react-router-dom';
import perfil_pet from '../../../assets/images/Pets/Perfil_pet.png'; 
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';

const PetProfile = () => {
  return (
    <div className="pet-profile-page">
      <Header />
      
      <div className="welcome-section">
        <h1 className="welcome-title">Bem vindo ao espaço para os seus Pets</h1>
      </div>
      
      <div className="pet-profile-container">
        <div className="pet-card">
          <div className="pet-photo-container">
            <img 
              src={perfil_pet} 
              alt="Foto do Rex" 
              className="pet-photo"
            />
          </div>
          
          <div className="pet-info">
            <div className="pet-details">
              <h3 className="pet-name">Rex</h3>
              <span className="pet-gender">Macho</span>
            </div>
          </div>
          
          <Link to="/pets-details" className="details-button">
            Detalhes <span className="arrow">›</span>
          </Link>
        </div>
        
        <Link to="/add-pet" className="add-pet-button">
          + Adicionar um Pet
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default PetProfile;
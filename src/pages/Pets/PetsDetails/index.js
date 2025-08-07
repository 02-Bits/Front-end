import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';
import petImage from '../../../assets/images/Pets/Perfil_pet.png'; // Substitua pelo caminho correto da imagem do pet

const PetsDetails = () => {
  const handleRemovePet = () => {
    if (window.confirm('Tem certeza que deseja remover este pet?')) {
      alert('Pet removido com sucesso!');
      window.location.href = '/pets';
    }
  };

  return (
    <div className="pets-details-page">
      <Header />
      
      <div className="welcome-section">
        <h1 className="welcome-title">Detalhes do Pet</h1>
      </div>
      
      <div className="pet-details-wrapper">
        <div className="pet-details-container">
          <div className="avatar-display">
            <img 
              src={petImage} 
              alt="Foto do Rex" 
              className="pet-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
              }}
            />
          </div>

          <div className="details-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nome</label>
                <div className="detail-value">Rex</div>
              </div>
              <div className="form-group">
                <label>Idade</label>
                <div className="detail-value">15</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gênero</label>
                <div className="detail-value">Macho</div>
              </div>
              <div className="form-group">
                <label>Espécie</label>
                <div className="detail-value">Felino</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Raça</label>
                <div className="detail-value">Gato Holandês</div>
              </div>
              <div className="form-group">
                <label>Porte</label>
                <div className="detail-value">Pequeno</div>
              </div>
            </div>

            <div className="details-actions">
              <Link to="/pets" className="back-button">
                Voltar
              </Link>
              <Link to="/edit-pet" className="edit-button">
                Editar
              </Link>
              <button className="remove-button" onClick={handleRemovePet}>
                Remover Pet
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PetsDetails;
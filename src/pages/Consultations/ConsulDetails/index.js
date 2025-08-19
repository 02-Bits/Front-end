import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';

const ConsulDetails = () => {
  const location = useLocation();
  const consulta = location.state?.consulta || {
    id: 1,
    pet: 'Rex',
    petImage: 'https://example.com/rex.jpg',
    service: 'Consulta Clínica Geral',
    doctor: 'Dr. Carlos Silva - Clínico Geral',
    date: '2023-11-15T10:30',
    status: 'Pendente',
    observations: 'O pet está apresentando sintomas de alergia',
    locationName: 'Pet+ - Cotia',
    locationAddress: 'Av. José Odorizzi, 1555 - Cotia/SP'
  };

  const handleCancel = () => {
    console.log('Consulta cancelada:', consulta.id);
    alert('Consulta cancelada com sucesso!');
  };

  return (
    <div className="pets-details-page">
      <Header />
      
      <div className="welcome-section">
        <h1 className="welcome-title">Detalhes da Consulta</h1>
        <p className="consul-status">{consulta.status}</p>
      </div>
      
      <div className="pet-details-wrapper">
        <div className="pet-details-container">
          <div className="avatar-display">
            <img 
              src={consulta.petImage} 
              alt={consulta.pet} 
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
                <label>Pet</label>
                <div className="detail-value">{consulta.pet}</div>
              </div>
              <div className="form-group">
                <label>Serviço</label>
                <div className="detail-value">{consulta.service}</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Médico</label>
                <div className="detail-value">{consulta.doctor}</div>
              </div>
              <div className="form-group">
                <label>Data e Hora</label>
                <div className="detail-value">
                  {new Date(consulta.date).toLocaleString('pt-BR')}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Endereço</label>
                <div className="detail-value">{consulta.locationAddress}</div>
              </div>
              {consulta.observations && (
              <div className="form-group">
                <label>Observações</label>
                <div className="detail-value">{consulta.observations}</div>
              </div>
            )}
            </div>

            <div className="details-actions">
              <Link to="/consultas" className="back-button">Voltar</Link>
              <button 
                className="remove-button" 
                onClick={handleCancel}
                style={{ backgroundColor: '#FF6B6B' }}
              >
                Cancelar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsulDetails;
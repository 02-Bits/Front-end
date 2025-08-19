import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ConsulCompleteDetails = () => {
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const consulta = location.state?.consulta || {
    id: 1,
    pet: 'Rex',
    petImage: 'https://example.com/rex.jpg',
    service: 'Consulta Clínica Geral',
    doctor: 'Felipe A.',
    doctorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    doctorSpecialty: 'Clínico Geral',
    date: '2023-11-15T10:30',
    status: 'Concluída',
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

             <div className="doctor-section">
              <h3 className="rating-title">Avalie o Doutor</h3>
              <div className="doctor-rating-container">
                <div className="doctor-info">
                  <img 
                    src={consulta.doctorImage} 
                    alt={consulta.doctor} 
                    className="doctor-avatar"
                  />
                  <div className="doctor-details">
                    <h4>{consulta.doctor}</h4>
                    <p>{consulta.doctorSpecialty}</p>
                  </div>
                </div>
                
                <div className="rating-controls">
                  <div className="stars">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className="star-button"
                          onClick={() => setRating(ratingValue)}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(0)}
                        >
                          {ratingValue <= (hover || rating) ? (
                            <FaStar className="star filled" />
                          ) : (
                            <FaRegStar className="star" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <button className="submit-rating">
                    Enviar Avaliação
                  </button>
                </div>
              </div>
            </div>

            <div className="details-actions">
              <Link to="/consultas" className="back-button">Voltar</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsulCompleteDetails;
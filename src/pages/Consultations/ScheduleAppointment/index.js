import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';

const ScheduleAppointment = () => {
  // Dados simulados
  const [pets] = useState([
    { id: 1, name: 'Rex', image: 'https://example.com/rex.jpg' },
    { id: 2, name: 'Luna', image: 'https://example.com/luna.jpg' },
    { id: 3, name: 'Thor', image: 'https://example.com/thor.jpg' }
  ]);

  const [services] = useState([
    'Consulta Clínica Geral',
    'Exame de Sangue',
    'Radiografia',
    'Ultrassom',
    'Vacinação',
    'Cirurgia'
  ]);

  const [locations] = useState([
    { id: 1, name: 'Pet+ - Cotia', address: 'Av. José Odorizzi, 1555 - Cotia/SP' },
    { id: 2, name: 'CuidePet - Raposo', address: 'Rua do Rosário, 100 - Raposo/SP' },
    { id: 3, name: 'VetCenter - Jandira', address: 'Av. Presidente Vargas, 500 - Jandira/SP' }
  ]);

  // Médicos por local e serviço
  const doctorsByLocationAndService = {
    // Pet+ - Cotia
    1: {
      'Consulta Clínica Geral': ['Dr. Carlos Silva - Clínico Geral', 'Dra. Ana Paula - Clínica Geral'],
      'Exame de Sangue': ['Dr. Marcos Ribeiro - Patologista'],
      'Radiografia': ['Dr. Eduardo Lima - Radiologista'],
      'Ultrassom': ['Dra. Fernanda Costa - Ultrassonografista'],
      'Vacinação': ['Dr. Carlos Silva - Clínico Geral'],
      'Cirurgia': ['Dr. Roberto Alves - Cirurgião']
    },
    // CuidePet - Raposo
    2: {
      'Consulta Clínica Geral': ['Dra. Juliana Costa - Dermatologista', 'Dr. Rafael Souza - Clínico Geral'],
      'Exame de Sangue': ['Dra. Patricia Mendes - Patologista'],
      'Radiografia': ['Dr. Gustavo Henrique - Radiologista'],
      'Ultrassom': ['Dra. Camila Oliveira - Ultrassonografista'],
      'Vacinação': ['Dra. Juliana Costa - Dermatologista'],
      'Cirurgia': ['Dr. Luiz Fernando - Cirurgião']
    },
    // VetCenter - Jandira
    3: {
      'Consulta Clínica Geral': ['Dr. Marcelo Dias - Clínico Geral', 'Dra. Vanessa Lima - Clínica Geral'],
      'Exame de Sangue': ['Dra. Carolina Santos - Patologista'],
      'Radiografia': ['Dr. Felipe Martins - Radiologista'],
      'Ultrassom': ['Dra. Beatriz Almeida - Ultrassonografista'],
      'Vacinação': ['Dr. Marcelo Dias - Clínico Geral'],
      'Cirurgia': ['Dr. André Luiz - Cirurgião']
    }
  };

  const [formData, setFormData] = useState({
    pet: '',
    service: '',
    location: '',
    doctor: '',
    date: '',
    petImage: null
  });

  const [availableDoctors, setAvailableDoctors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'pet') {
      const selectedPet = pets.find(pet => pet.name === value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        petImage: selectedPet ? selectedPet.image : null
      }));
    } else if (name === 'location') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        doctor: '' // Limpa o médico selecionado ao mudar o local
      }));
      setAvailableDoctors([]);
    } else if (name === 'service') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        doctor: '' // Limpa o médico selecionado ao mudar o serviço
      }));
      
      // Atualiza médicos disponíveis se já tiver local selecionado
      if (formData.location) {
        const doctors = doctorsByLocationAndService[formData.location][value] || [];
        setAvailableDoctors(doctors);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    handleChange(e); // Atualiza o estado normalmente
    
    // Se já tiver serviço selecionado, carrega os médicos
    if (formData.service) {
      const doctors = doctorsByLocationAndService[locationId][formData.service] || [];
      setAvailableDoctors(doctors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedLocation = locations.find(loc => loc.id === parseInt(formData.location));
    const consulta = {
      ...formData,
      locationName: selectedLocation?.name || '',
      locationAddress: selectedLocation?.address || ''
    };
    console.log('Dados da consulta:', consulta);
    alert('Consulta marcada com sucesso!');
  };

  return (
    <div className="schedule-page">
      <Header />
      
      <div className="welcome-section">
        <h1 className="welcome-title">Agende uma consulta para seu pet</h1>
      </div>
      
      <div className="schedule-wrapper">
        <div className="schedule-container">
          {/* Seção da foto do pet */}
          <div className="pet-photo-section">
            {formData.petImage ? (
              <img src={formData.petImage} alt={formData.pet} className="pet-selected-image" />
            ) : (
              <div className="pet-placeholder">
                <span>Selecione um pet para exibir a foto</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="pet">Selecione seu Pet</label>
                <select
                  id="pet"
                  name="pet"
                  value={formData.pet}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um pet</option>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.name}>{pet.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="service">Serviço</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Local</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  required
                >
                  <option value="">Selecione um local</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="doctor">Médico</label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                  disabled={!formData.service || !formData.location}
                >
                  <option value="">{!formData.service ? 'Selecione um serviço primeiro' : !formData.location ? 'Selecione um local primeiro' : 'Selecione um médico'}</option>
                  {availableDoctors.map((doctor, index) => (
                    <option key={index} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Data e Hora</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Agendar Consulta
              </button>
              <Link to="/consultas" className="cancel-button">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScheduleAppointment;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComCadastro from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import '../css/styles.css';

const Calendario = () => {
  const [consultas, setConsultas] = useState([]);
  const [dataAtual] = useState(new Date());

  useEffect(() => {
    const fetchConsultas = async () => {
        try {
            const response = await api.get('/consultas/my-consultations');
            setConsultas(response.data);
        } catch (err) {
            console.error("Falha ao buscar consultas.", err);
        }
    };
    fetchConsultas();
  }, []);

  const renderizarDias = () => {
    // ... (lógica completa para renderizar os dias do calendário, que já funciona)
    const dias = [];
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const offsetPrimeiroDia = (primeiroDiaDoMes === 0) ? 6 : primeiroDiaDoMes - 1;

    for (let i = 0; i < offsetPrimeiroDia; i++) { dias.push(<div key={`vazio-${i}`} className="dia-celula vazio"></div>); }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      // Filtra as consultas do dia atual
      const consultasDoDia = consultas.filter(c => new Date(c.consultationdate).getDate() + 1 === dia && new Date(c.consultationdate).getMonth() === mes);
      dias.push(
        <div key={dia} className="dia-celula">
          <span className="numero-dia">{dia}</span>
          {consultasDoDia.length > 0 && (
            <div className="marcadores-container">
              {consultasDoDia.map((consulta) => (
                <div key={consulta.id} className="marcador-consulta" title={`${consulta.petName} às ${consulta.consultationtime}`}></div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return dias;
  };

  return (
    <div className="pet-profile-page">
      <HeaderComCadastro />
      <main className="main-content-consultation">
        <h1>Calendário de Consultas</h1>
        <div className="pet-profile-container">
          <div className="status-section">
            <div className="status-buttons">
              <Link to="/consultas" className="status-button">Lista de Consultas</Link>
              <button className="status-button active">Calendário</button>
            </div>
          </div>
          <div className="calendario-container">
            <div className="calendario-grid">{renderizarDias()}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calendario;
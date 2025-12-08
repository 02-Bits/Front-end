import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import '../css/styles.css'; // Caminho de CSS unificado e corrigido

// --- DADOS MOCKADOS ATUALIZADOS ---
const petsEnum = [
  { id: 1, name: 'Rex' },
  { id: 2, name: 'Luna' },
  { id: 3, name: 'Thor' },
];

const doutoresEnum = [
  'Dr. Carlos Silva',
  'Dra. Ana Paula',
  'Dra. Juliana Costa',
  'Dr. Roberto Alves',
];

const consultasDoMes = [
  { dia: 1, doutor: 'Dr. Carlos Silva', pet: 'Rex' },
  { dia: 8, doutor: 'Dra. Juliana Costa', pet: 'Luna' },
  { dia: 17, doutor: 'Dr. Roberto Alves', pet: 'Thor' },
  { dia: 1, doutor: 'Dra. Ana Paula', pet: 'Rex' },
  { dia: 24, doutor: 'Dr. Carlos Silva', pet: 'Luna' },
];
// ------------------------------------

const CalendarioConsultas = () => {
  const [dataAtual] = useState(new Date());
  const [petFiltro, setPetFiltro] = useState('');
  const [doutorFiltro, setDoutorFiltro] = useState('');

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const offsetPrimeiroDia = (primeiroDiaDoMes === 0) ? 6 : primeiroDiaDoMes - 1;

  const renderizarDias = () => {
    const dias = [];
    for (let i = 0; i < offsetPrimeiroDia; i++) {
      dias.push(<div key={`vazio-${i}`} className="dia-celula vazio"></div>);
    }
    
    let consultasFiltradas = consultasDoMes;
    if (petFiltro) {
        consultasFiltradas = consultasFiltradas.filter(c => c.pet === petFiltro);
    }
    if (doutorFiltro) {
        consultasFiltradas = consultasFiltradas.filter(c => c.doutor === doutorFiltro);
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const consultasDoDia = consultasFiltradas.filter(c => c.dia === dia);
      dias.push(
        <div key={dia} className="dia-celula">
          <span className="numero-dia">{dia}</span>
          {consultasDoDia.length > 0 && (
            <div className="marcadores-container">
              {consultasDoDia.map((consulta, index) => (
                <div key={index} className="marcador-consulta" title={`${consulta.pet} com ${consulta.doutor}`}></div>
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
      <Header />
      <Link to="/agendar-consulta" className="add-pet-button">
        Marcar consulta
      </Link>
            
      <div className="pet-profile-container">
        <div className="status-section">
          <div className="status-buttons">
            <Link to="/consultas" className="status-button pendentes-button">Pendentes</Link>
            <Link to="/consultas/concluidas" className="status-button aceitas-button">Concluídas</Link>
            <Link to="/consultas/calendario" className="status-button calendario-button active">Calendário</Link>
          </div>
        </div>
        
        <div className="calendario-container">
            <div className="filtros-container">
                <div className="filtro-item">
                    <select value={petFiltro} onChange={(e) => setPetFiltro(e.target.value)}>
                        <option value="">* Todos os Pets</option>
                        {petsEnum.map(pet => <option key={pet.id} value={pet.name}>{pet.name}</option>)}
                    </select>
                </div>
                <div className="filtro-item">
                    <select value={doutorFiltro} onChange={(e) => setDoutorFiltro(e.target.value)}>
                        <option value="">* Todos os Doutores</option>
                        {doutoresEnum.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </div>

            <div className="calendario-grid">
                <div className="dia-semana">Seg</div>
                <div className="dia-semana">Ter</div>
                <div className="dia-semana">Qua</div>
                <div className="dia-semana">Qui</div>
                <div className="dia-semana">Sex</div>
                <div className="dia-semana">Sáb</div>
                <div className="dia-semana">Dom</div>
                {renderizarDias()}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarioConsultas;
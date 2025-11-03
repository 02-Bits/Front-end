import React, { useState, useEffect } from 'react';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import VetConsultasNav from '../components/VetConsultasNav';
import '../css/styles.css';
import { toast } from 'react-toastify';

const VetSchedule = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchConsultas = async () => {
            setLoading(true);
            try {
                const response = await api.get('/consultas/vet/my-consultations');
                setConsultas(response.data);
            } catch (err) {
                toast.error("Falha ao buscar agendamentos para o calendário.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultas();
    }, []);

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const offset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        const days = [];
        for (let i = 0; i < offset; i++) {
            days.push(<div key={`empty-${i}`} className="dia-celula vazio"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const consultationsOfTheDay = consultas.filter(c => {
                // Ajuste para comparar datas ignorando fuso horário de forma segura
                const consultDate = new Date(c.consultationdate);
                return consultDate.getUTCDate() === day && consultDate.getUTCMonth() === month && consultDate.getUTCFullYear() === year;
            });

            days.push(
                <div key={day} className="dia-celula">
                    <span className="numero-dia">{day}</span>
                    {consultationsOfTheDay.length > 0 && (
                        <div className="marcadores-container">
                            {consultationsOfTheDay.map((consulta) => (
                                <div key={consulta.id} className="marcador-consulta" title={`${consulta.petName} às ${consulta.consultationtime}`}></div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="pet-profile-page">
            <main className="vet-content-full">
                <div className="pet-profile-container">
                    <div className="calendario-container">
                        <div className="vet-page-header" style={{border: 'none', textAlign: 'center'}}>
                            <h1>Minha Agenda de Atendimentos</h1>
                            <h2 className="month-title">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
                        </div>
                        <div className="calendario-grid">
                            <div className="dia-semana">Seg</div>
                            <div className="dia-semana">Ter</div>
                            <div className="dia-semana">Qua</div>
                            <div className="dia-semana">Qui</div>
                            <div className="dia-semana">Sex</div>
                            <div className="dia-semana">Sáb</div>
                            <div className="dia-semana">Dom</div>
                            {loading ? <p className="loading-message">Carregando calendário...</p> : renderCalendar()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VetSchedule;
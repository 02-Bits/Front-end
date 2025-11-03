import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import './css/styles.css';
import '../css/styles.css';

const EmployeeAgenda = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchSchedules = async () => {
            setLoading(true);
            try {
                const response = await api.get('/api/employee/my-schedules');
                setSchedules(response.data);
            } catch (err) {
                toast.error("Falha ao buscar seus agendamentos.");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedules();
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
            const schedulesOfTheDay = schedules.filter(s => {
                const scheduleDate = new Date(s.scheduleDate);
                return scheduleDate.getUTCDate() === day && scheduleDate.getUTCMonth() === month && scheduleDate.getUTCFullYear() === year;
            });

            days.push(
                <div key={day} className="dia-celula">
                    <span className="numero-dia">{day}</span>
                    {schedulesOfTheDay.length > 0 && (
                        <div className="marcadores-container">
                            {schedulesOfTheDay.map((schedule) => (
                                <div key={schedule.id} className="marcador-consulta" title={`${schedule.petName} - ${schedule.serviceName}`}></div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="employee-page">
            <main className="employee-content">
                <div className="employee-header">
                    <h1>Minha Agenda de Serviços</h1>
                </div>
                <div className="employee-container">
                    <div className="calendario-container">
                        <h2 className="month-title">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
                        <div className="calendario-grid">
                            <div className="dia-semana">Seg</div><div className="dia-semana">Ter</div><div className="dia-semana">Qua</div><div className="dia-semana">Qui</div><div className="dia-semana">Sex</div><div className="dia-semana">Sáb</div><div className="dia-semana">Dom</div>
                            {loading ? <p className="loading-message">Carregando...</p> : renderCalendar()}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EmployeeAgenda;
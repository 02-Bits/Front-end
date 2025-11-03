import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import '../css/styles.css';
import '../../Vet/css/styles.css'; // Reutiliza estilo dos cards e botões

const EmployeeServicos = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [allSchedules, setAllSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const activeTab = searchParams.get('tab') || 'pedidos';

    const fetchSchedules = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/employee/my-schedules');
            setAllSchedules(response.data);
        } catch (error) {
            toast.error("Não foi possível carregar seus serviços agendados.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);

    const handleAccept = async (e, scheduleId) => {
        e.stopPropagation();
        if (window.confirm("Confirmar o agendamento deste serviço?")) {
            try {
                await api.post(`/api/employee/schedules/${scheduleId}/accept`);
                toast.success("Serviço agendado com sucesso!");
                fetchSchedules();
            } catch (error) {
                toast.error("Erro ao aceitar o serviço.");
            }
        }
    };

    const handleReject = async (e, scheduleId) => {
        e.stopPropagation();
        if (window.confirm("Tem certeza que deseja recusar este serviço?")) {
            try {
                await api.post(`/api/employee/schedules/${scheduleId}/reject`);
                toast.warn("Serviço recusado.");
                fetchSchedules();
            } catch (error) {
                toast.error("Erro ao recusar o serviço.");
            }
        }
    };

    const handleCardClick = (scheduleId) => {
        navigate(`/employee/servicos/${scheduleId}`);
    };

    const dataMap = {
        pedidos: allSchedules.filter(s => s.status === 'PENDENTE'),
        agendados: allSchedules.filter(s => s.status === 'AGENDADO'),
        historico: allSchedules.filter(s => ['FINALIZADO', 'CANCELADO', 'RECUSADO'].includes(s.status)),
    };
    const dataToRender = dataMap[activeTab] || [];

    return (
        <div className="employee-page">
            <main className="employee-content">
                <div className="employee-header">
                    <h1>Gerenciamento de Serviços</h1>
                    <p>Gerencie os pedidos e o histórico dos serviços de estética.</p>
                </div>
                <div className="employee-container">
                    <div className="status-section">
                        <div className="status-buttons">
                            <button onClick={() => setSearchParams({tab: 'pedidos'})} className={`status-button ${activeTab === 'pedidos' ? 'active' : ''}`}>Novos Pedidos</button>
                            <button onClick={() => setSearchParams({tab: 'agendados'})} className={`status-button ${activeTab === 'agendados' ? 'active' : ''}`}>Agendados</button>
                            <button onClick={() => setSearchParams({tab: 'historico'})} className={`status-button ${activeTab === 'historico' ? 'active' : ''}`}>Histórico</button>
                        </div>
                    </div>

                    {loading ? <p className="loading-message">Carregando...</p> : (
                        <div className="consultas-grid">
                            {dataToRender.length > 0 ? dataToRender.map(item => (
                                <div key={item.id} className="request-card clickable" onClick={() => handleCardClick(item.id)}>
                                    <div className="request-card-header">
                                        <div className="card-avatar-placeholder">{item.petName.charAt(0)}</div>
                                        <div>
                                            <strong className="pet-name">{item.petName}</strong>
                                            <span className="owner-name">Tutor: {item.clientName}</span>
                                        </div>
                                    </div>
                                    <div className="request-card-body">
                                        <p><strong>Serviço:</strong> {item.serviceName}</p>
                                        <p><strong>Data:</strong> {new Date(item.scheduleDate + 'T' + item.scheduleTime).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}</p>
                                    </div>
                                    
                                    {activeTab === 'pedidos' ? (
                                        <div className="request-card-actions">
                                            <button className="decline-button" onClick={(e) => handleReject(e, item.id)}>Recusar</button>
                                            <button className="accept-button" onClick={(e) => handleAccept(e, item.id)}>Aceitar</button>
                                        </div>
                                    ) : (
                                        <div className="request-card-actions single">
                                            <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                                        </div>
                                    )}
                                </div>
                            )) : <div className="no-data-message">Nenhum serviço nesta categoria.</div>}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EmployeeServicos;
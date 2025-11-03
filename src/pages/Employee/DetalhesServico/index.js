import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import '../../Vet/css/styles.css'; // Reutiliza estilos de detalhes

const EmployeeDetalhesServico = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(null);
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScheduleDetails = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/employee/schedules/${scheduleId}`);
                setSchedule(response.data);
                setReport(response.data.employeeReport || '');
            } catch (err) {
                toast.error('Não foi possível carregar os detalhes do serviço.');
                navigate('/employee/servicos');
            } finally {
                setLoading(false);
            }
        };
        fetchScheduleDetails();
    }, [scheduleId, navigate]);

    const handleSaveReport = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/employee/schedules/${scheduleId}/report`, report, {
                headers: { 'Content-Type': 'text/plain' }
            });
            toast.success('Relatório salvo com sucesso!');
        } catch (err) {
            toast.error('Erro ao salvar o relatório.');
        }
    };
    
    const handleFinalize = async () => {
        if (window.confirm('Tem certeza que deseja finalizar este serviço?')) {
            try {
                await api.post(`/api/employee/schedules/${scheduleId}/finalize`);
                toast.success('Serviço finalizado com sucesso!');
                navigate('/employee/servicos?tab=historico');
            } catch (err) {
                toast.error('Erro ao finalizar o serviço.');
            }
        }
    };

    if (loading) return <p className="loading-message">Carregando detalhes...</p>;
    if (!schedule) return null;

    return (
        <div className="pets-details-page">
            <main className="vet-content-full">
                <div className="pet-details-wrapper">
                    <div className="pet-details-container">
                        <div className="avatar-display">
                            <div className="card-avatar-placeholder">{schedule.petName?.charAt(0)}</div>
                        </div>
                        <form onSubmit={handleSaveReport} className="details-form">
                            <div className="form-row">
                                <div className="form-group"><label>Pet</label><div className="detail-value">{schedule.petName}</div></div>
                                <div className="form-group"><label>Tutor</label><div className="detail-value">{schedule.clientName}</div></div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label>Serviço</label><div className="detail-value">{schedule.serviceName}</div></div>
                                <div className="form-group"><label>Data</label><div className="detail-value">{new Date(schedule.scheduleDate + 'T' + schedule.scheduleTime).toLocaleString('pt-BR')}</div></div>
                            </div>
                            <div className="form-group full-width">
                                <label>Observações do Cliente</label>
                                <div className="detail-value long-text">{schedule.observations || 'Nenhuma.'}</div>
                            </div>
                            <div className="form-group full-width">
                                <label>Relatório do Serviço (Suas observações)</label>
                                <textarea 
                                    className="report-textarea" 
                                    placeholder="Descreva como foi o serviço, comportamento do pet, etc..." 
                                    value={report} 
                                    onChange={(e) => setReport(e.target.value)}
                                    disabled={schedule.status !== 'AGENDADO'}
                                ></textarea>
                            </div>
                            <div className="details-actions">
                                <Link to="/employee/servicos" className="back-button">Voltar</Link>
                                {schedule.status === 'AGENDADO' && (
                                    <>
                                        <button type="submit" className="save-button">Salvar Relatório</button>
                                        <button type="button" className="decline-button" onClick={handleFinalize}>Finalizar Serviço</button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EmployeeDetalhesServico;
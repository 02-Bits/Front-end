import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import '../css/styles.css';

const DetalhesConsulta = () => {
    const { consultaId } = useParams();
    const navigate = useNavigate();

    const [consulta, setConsulta] = useState(null);
    const [report, setReport] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchConsultaDetails = async () => {
            if (!consultaId) return;
            setLoading(true);
            try {
                const response = await api.get(`/consultas/${consultaId}`);
                setConsulta(response.data);
                setReport(response.data.doctorReport || '');
            } catch (err) {
                setError('Não foi possível carregar os detalhes da consulta.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultaDetails();
    }, [consultaId]);

    const handleSaveReport = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/consultas/${consultaId}/report`, report, {
                headers: { 'Content-Type': 'text/plain' }
            });
            alert('Relatório salvo com sucesso!');
            navigate('/vet/consultas?tab=historico');
        } catch (err) {
            alert('Erro ao salvar o relatório.');
            console.error(err);
        }
    };
    
    const handleFinalizeConsultation = async () => {
        if (window.confirm('Tem certeza que deseja finalizar esta consulta? Esta ação não pode ser desfeita.')) {
            try {
                await api.post(`/consultas/${consultaId}/finalize`);
                alert('Consulta finalizada com sucesso!');
                navigate('/vet/consultas?tab=historico');
            } catch (err) {
                alert('Erro ao finalizar a consulta.');
                console.error(err);
            }
        }
    };

    if (loading) return <div style={{paddingTop: '150px', textAlign: 'center'}}>Carregando...</div>;
    if (error) return <div style={{paddingTop: '150px', textAlign: 'center'}}>{error}</div>;
    if (!consulta) return null;

    return (
        <div className="pets-details-page">
            <HeaderVet />
            <div className="welcome-section">
                <h1 className="welcome-title">Detalhes da Consulta</h1>
            </div>
            <div className="pet-details-wrapper">
                <div className="pet-details-container">
                    <div className="avatar-display">
                        <div className="card-avatar-placeholder">{consulta.petName?.charAt(0)}</div>
                    </div>
                    <form onSubmit={handleSaveReport} className="details-form">
                        <div className="form-row">
                            <div className="form-group"><label>Paciente (Pet)</label><div className="detail-value">{consulta.petName}</div></div>
                            {/* CORREÇÃO: Exibindo o nome do tutor vindo da API */}
                            <div className="form-group"><label>Tutor</label><div className="detail-value">{consulta.userName}</div></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group"><label>Serviço</label><div className="detail-value">{consulta.speciality}</div></div>
                            <div className="form-group"><label>Data</label><div className="detail-value">{new Date(consulta.consultationdate + 'T' + consulta.consultationtime).toLocaleString('pt-BR')}</div></div>
                        </div>
                        <div className="form-group full-width">
                            <label>Motivo da Consulta (informado pelo tutor)</label>
                            <div className="detail-value long-text">{consulta.reason}</div>
                        </div>
                        <div className="form-group full-width">
                            <label>Anotações / Relatório Médico</label>
                            <textarea 
                                className="report-textarea" 
                                placeholder="Digite as observações, diagnóstico e tratamento..." 
                                value={report} 
                                onChange={(e) => setReport(e.target.value)}
                                // Permite editar relatório apenas se a consulta estiver agendada
                                disabled={consulta.status !== 'AGENDADA'}
                            ></textarea>
                        </div>
                        <div className="details-actions">
                            <Link to="/vet/consultas" className="back-button">Voltar</Link>
                            {/* Mostra os botões apenas para consultas agendadas */}
                            {consulta.status === 'AGENDADA' && (
                                <>
                                    <button type="button" className="decline-button" onClick={handleFinalizeConsultation}>Finalizar Consulta</button>
                                    <button type="submit" className="save-button">Salvar Relatório</button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetalhesConsulta;
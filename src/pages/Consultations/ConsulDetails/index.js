import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import HeaderComCadastro from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import './css/styles.css';
import { toast } from 'react-toastify';

const ConsulDetails = () => {
    const { consultaId } = useParams();
    const navigate = useNavigate();
    const [consulta, setConsulta] = useState(null);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsulta = async () => {
            if (!consultaId) return;
            try {
                const response = await api.get(`/consultas/${consultaId}`);
                setConsulta(response.data);
                setEditData(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da consulta", error);
                toast.error("Não foi possível carregar os detalhes da consulta.");
            } finally {
                setLoading(false);
            }
        };
        fetchConsulta();
    }, [consultaId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({...prev, [name]: value}));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/consultas/${consultaId}`, editData);
            setConsulta(response.data);
            setIsEditing(false);
            toast.success('Consulta atualizada com sucesso!');
        } catch (error) {
            toast.error('Erro ao atualizar a consulta.');
            console.error(error);
        }
    };

    const handleCancelConsultation = async () => {
        if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
            try {
                await api.post(`/consultas/${consultaId}/cancel`);
                toast.success('Consulta cancelada com sucesso.');
                navigate('/consultas');
            } catch (error) {
                toast.error('Não foi possível cancelar a consulta.');
                console.error(error);
            }
        }
    };

    if (loading) return <div className="loading-container" style={{paddingTop: '150px', textAlign: 'center'}}>A carregar detalhes...</div>;
    if (!consulta) return <div className="loading-container" style={{paddingTop: '150px', textAlign: 'center'}}>Consulta não encontrada.</div>;

    return (
        <div className="pets-details-page">
            <HeaderComCadastro />
            <div className="welcome-section">
                <h1 className="welcome-title">Detalhes da Consulta</h1>
            </div>
            <div className="pet-details-wrapper">
                <div className="pet-details-container">
                    <form onSubmit={handleUpdate}>
                        <div className="form-row">
                            <div className="form-group"><label>Pet</label><div className="detail-value">{consulta.petName}</div></div>
                            <div className="form-group"><label>Veterinário</label><div className="detail-value">{consulta.veterinaryName}</div></div>
                        </div>
                        
                        <div className="form-row">
                             <div className="form-group">
                                <label>Serviço Contratado</label>
                                <div className="detail-value">{consulta.serviceName}</div>
                            </div>
                             <div className="form-group">
                                <label>Preço</label>
                                <div className="detail-value">R$ {consulta.servicePrice ? Number(consulta.servicePrice).toFixed(2) : 'N/A'}</div>
                            </div>
                        </div>

                        <div className="form-row">
                             <div className="form-group">
                                <label>Data</label>
                                {isEditing ? <input type="date" name="consultationdate" value={editData.consultationdate} onChange={handleInputChange} className="info-field editable"/> : <div className="detail-value">{new Date(consulta.consultationdate + 'T00:00:00').toLocaleDateString('pt-BR')}</div>}
                            </div>
                            <div className="form-group">
                                <label>Hora</label>
                                {isEditing ? <input type="time" name="consultationtime" value={editData.consultationtime} onChange={handleInputChange} className="info-field editable"/> : <div className="detail-value">{consulta.consultationtime}</div>}
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <label>Motivo</label>
                             {isEditing ? <textarea name="reason" value={editData.reason} onChange={handleInputChange} className="info-field editable" rows="3"></textarea> : <div className="detail-value long-text">{consulta.reason}</div>}
                        </div>
                         <div className="details-actions">
                            <Link to="/consultas" className="back-button">Voltar</Link>
                            {isEditing ? (
                                <>
                                    <button type="button" className="cancel-edit-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                                    <button type="submit" className="save-button">Salvar</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Editar Consulta</button>
                                    <button type="button" className="decline-button" onClick={handleCancelConsultation}>Cancelar Consulta</button>
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

export default ConsulDetails;
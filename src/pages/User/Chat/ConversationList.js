import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComCadastro from '../../../components/HeaderComCadastro';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import './css/styles.css'; // Reutilizaremos o CSS do chat

const ConversationList = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const response = await api.get('/consultas/my-consultations');
                // Mostra apenas consultas que estão em andamento ou finalizadas
                const activeConsultas = response.data.filter(c => 
                    ['AGENDADA', 'FINALIZADA'].includes(c.status)
                );
                setConsultas(activeConsultas);
            } catch (err) {
                setError('Não foi possível carregar suas conversas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchConsultas();
    }, []);

    return (
        <div className="chat-page">
            <HeaderComCadastro />
            <main className="conversation-list-container">
                <div className="sidebar-header">
                    <h1>Minhas Conversas</h1>
                </div>
                <div className="contact-list">
                    {loading && <p style={{textAlign: 'center', padding: '20px'}}>Carregando...</p>}
                    {error && <p className="error-message" style={{margin: '20px'}}>{error}</p>}
                    {!loading && !error && (
                        consultas.length > 0 ? consultas.map(conv => (
                            <Link to={`/chat/${conv.id}`} key={conv.id} className="contact-item-link">
                                <div className="contact-item">
                                    <div className="card-avatar-placeholder">{conv.veterinaryName?.charAt(0)}</div>
                                    <div className="contact-info">
                                        <span className="contact-name">{conv.veterinaryName}</span>
                                        <span className="contact-last-message">Conversa sobre: {conv.petName}</span>
                                    </div>
                                </div>
                            </Link>
                        )) : <p style={{textAlign: 'center', padding: '20px'}}>Nenhuma conversa ativa encontrada.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConversationList;
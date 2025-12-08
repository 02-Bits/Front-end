import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderComCadastro from '../../components/Header_com_cadastro';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './css/ConversationList.css'; 

const ConversationList = () => {
    const { user, loading: authLoading } = useAuth(); 
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (authLoading || !user) return; 

        const fetchConsultas = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await api.get('/consultas/my-consultations');
                
                const activeConsultas = response.data.filter(c => 
                   ['PENDENTE', 'AGENDADA', 'FINALIZADA'].includes(c.status)
                );
                setConsultas(activeConsultas);
            } catch (err) {
                setError('Não foi possível carregar suas conversas.');
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, [user, authLoading]);

    // Função para formatar a data
    const formatDate = (date, time) => {
        if (!date || !time) return '';
        const dateTime = new Date(`${date}T${time}`);
        return dateTime.toLocaleString('pt-BR', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="conversation-page">
            <HeaderComCadastro />
            <main className="list-container">
                <div className="list-header">
                    <h1>Minhas Conversas</h1>
                </div>
                <div className="conversation-list">
                    {loading || authLoading ? <p style={{textAlign: 'center', padding: '20px'}}>Carregando...</p> : 
                     error ? <p className="error-message" style={{margin: '20px'}}>{error}</p> :
                     consultas.length > 0 ? consultas.map(conv => (
                        <Link to={`/chat/${conv.id}`} key={conv.id} className="conversation-item-link">
                            <div className="conversation-item">
                                <div className="avatar-placeholder">{conv.veterinaryName?.charAt(0)}</div>
                                <div className="conversation-info">
                                    <span className="conversation-name">{conv.veterinaryName}</span>
                                    <span className="conversation-subtitle">Conversa sobre o pet: {conv.petName}</span>
                                    {/* ===== NOVOS DETALHES ADICIONADOS AQUI ===== */}
                                    <span className="conversation-details">
                                        {formatDate(conv.consultationdate, conv.consultationtime)} - {conv.speciality}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )) : <p style={{textAlign: 'center', padding: '20px'}}>Nenhuma conversa encontrada.</p>
                    }
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConversationList;
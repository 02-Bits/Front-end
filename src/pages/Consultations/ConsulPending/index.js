import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HeaderComCadastro from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import '../css/styles.css';

const ConsulPending = () => {
    const [allConsultas, setAllConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') || 'pendentes';
    const [activeTab, setActiveTab] = useState(initialTab);
    
    const [dataAtual] = useState(new Date());

    useEffect(() => {
        const currentTab = searchParams.get('tab') || 'pendentes';
        setActiveTab(currentTab);
    }, [searchParams]);

    useEffect(() => {
        if (!user) { setLoading(false); return; };
        
        const fetchConsultas = async () => {
            setLoading(true);
            try {
                const response = await api.get('/consultas/my-consultations');
                setAllConsultas(response.data);
            } catch (err) {
                setError('Falha ao buscar as suas consultas.');
            } finally {
                setLoading(false);
            }
        };
        fetchConsultas();
    }, [user]);

    const renderContent = () => {
        if (loading) return <p style={{textAlign: 'center', padding: '20px'}}>A carregar...</p>;
        if (error) return <p className="error-message">{error}</p>;

        if (activeTab === 'calendario') {
            const renderizarDias = () => {
                const dias = [];
                const ano = dataAtual.getFullYear();
                const mes = dataAtual.getMonth();
                const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
                const diasNoMes = new Date(ano, mes + 1, 0).getDate();
                const offsetPrimeiroDia = (primeiroDiaDoMes === 0) ? 6 : primeiroDiaDoMes - 1;

                for (let i = 0; i < offsetPrimeiroDia; i++) { dias.push(<div key={`vazio-${i}`} className="dia-celula vazio"></div>); }

                for (let dia = 1; dia <= diasNoMes; dia++) {
                    const consultasDoDia = allConsultas.filter(c => new Date(c.consultationdate).getUTCDate() === dia && new Date(c.consultationdate).getUTCMonth() === mes);
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
                <div className="calendario-container">
                    <div className="calendario-grid">{renderizarDias()}</div>
                </div>
            );
        }
        
        const dataMap = {
            pendentes: allConsultas.filter(c => c.status === 'PENDENTE'),
            agendadas: allConsultas.filter(c => c.status === 'AGENDADA'),
            historico: allConsultas.filter(c => ['FINALIZADA', 'CANCELADA', 'RECUSADA'].includes(c.status)),
        };

        const dataToRender = dataMap[activeTab] || [];

        if (dataToRender.length === 0) return <p style={{textAlign: 'center', padding: '20px'}}>Nenhuma consulta encontrada nesta aba.</p>;
        
        return dataToRender.map(c => (
            <Link 
                to={c.status === 'FINALIZADA' ? `/detalhes-consulta-concluida/${c.id}` : `/detalhes-consulta/${c.id}`} 
                key={c.id} 
                className="pet-card-link"
            >
                <div className="pet-card">
                    <div className="pet-info">
                        <h3 className="pet-name">{c.petName}</h3>
                        <span className="card-subtitle">{c.serviceName}</span>
                        <span className="card-subtitle-small">
                            Com {c.veterinaryName} - R$ {c.servicePrice ? Number(c.servicePrice).toFixed(2) : '0.00'}
                        </span>
                        <span className="card-subtitle-small">
                            {new Date(c.consultationdate + 'T' + c.consultationtime).toLocaleString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span>
                </div>
            </Link>
        ));
    };

    return (
        <div className="pet-profile-page">
            <HeaderComCadastro />
            <main className="main-content-consultation">
                <h1>Minhas Consultas</h1>
                <div className="pet-profile-container">
                    <div className="status-section">
                        <div className="status-buttons">
                            <button className={`status-button ${activeTab === 'pendentes' ? 'active' : ''}`} onClick={() => setSearchParams({tab: 'pendentes'})}>Pendentes</button>
                            <button className={`status-button ${activeTab === 'agendadas' ? 'active' : ''}`} onClick={() => setSearchParams({tab: 'agendadas'})}>Agendadas</button>
                            <button className={`status-button ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => setSearchParams({tab: 'historico'})}>Histórico</button>
                            <button className={`status-button ${activeTab === 'calendario' ? 'active' : ''}`} onClick={() => setSearchParams({tab: 'calendario'})}>Calendário</button>
                        </div>
                    </div>
                    <div className="consultas-list-container">{renderContent()}</div>
                    <div className="add-consulta-container">
                        <Link to="/agendar-consulta" className="action-button-primary">Agendar Novo Serviço</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ConsulPending;
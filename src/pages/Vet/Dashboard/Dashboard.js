import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api'; // NOVO: Import da API

// Imagens para os cards
import mainImage from '../../../assets/images/Vet/image 56.png';
import cardImage1 from '../../../assets/images/Vet/Group 105.png';
import cardImage2 from '../../../assets/images/Vet/Group 106.png';

import '../css/styles.css';

const Dashboard = () => {
    // NOVO: Estados para nome e contagem de pendentes
    const [vetName, setVetName] = useState("Veterinário(a)");
    const [pendingCount, setPendingCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // NOVO: Busca dados do usuário para pegar o nome
                const userResponse = await api.get('/users/me');
                setVetName(userResponse.data.username);

                // NOVO: Busca consultas para contar os pedidos pendentes
                const consultasResponse = await api.get('/consultas/my-consultations');
                const pendingConsultas = consultasResponse.data.filter(c => c.status === 'PENDENTE');
                setPendingCount(pendingConsultas.length);

            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="vet-dashboard-page">
            <HeaderVet />
            <main className="dashboard-content">
                <section className="welcome-section">
                    <div className="welcome-text">
                        <h1>Seja bem vindo(a) Dr(a). {vetName}!</h1>
                        <Link to="/vet/consultas" className="visualizar-button">
                            VISUALIZAR CONSULTAS
                        </Link>
                    </div>
                </section>

                <section className="cards-container">
                    <Link to="/vet/consultas?tab=pedidos" className="main-card">
                        <img src={mainImage} alt="Novos pedidos de agendamento" className="card-image" />
                        <div className="card-footer">
                            <span>NOVOS PEDIDOS DE AGENDAMENTO</span>
                            {/* NOVO: Exibe a contagem real de pendentes */}
                            {!loading && pendingCount > 0 && (
                                <span className="notification-badge-card">{pendingCount}</span>
                            )}
                        </div>
                    </Link>

                    <div className="bottom-cards">
                        <Link to="/vet/consultas?tab=calendario" className="small-card">
                            <img src={cardImage1} alt="Horários de consultas" className="card-image"/>
                            <div className="card-footer">
                                <span>HORÁRIOS DE CONSULTAS</span>
                            </div>
                        </Link>
                        <Link to="/vet/consultas?tab=agendadas" className="small-card">
                            <img src={cardImage2} alt="Compromissos agendados" className="card-image"/>
                            <div className="card-footer">
                                <span>COMPROMISSOS AGENDADOS</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
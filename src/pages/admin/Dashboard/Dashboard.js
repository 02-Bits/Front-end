import React, { useState } from 'react'; // 1. Importar useState
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api'; // 2. Importar a API

// Imagens para os cards
import mainImage from '../../../assets/images/Vet/image 56.png';
import cardImage1 from '../../../assets/images/Vet/Group 105.png';
import cardImage2 from '../../../assets/images/Vet/Group 106.png';

import './css/Dashboard.css';

const AdminDashboard = () => {
    // 3. Adicionar estado para feedback visual no botão
    const [isTesting, setIsTesting] = useState(false);

    // 4. Criar a função que chama o endpoint de teste
    const handleTestEmail = async () => {
        setIsTesting(true);
        try {
            const response = await api.get('/admin/test-email');
            alert('Comando de teste enviado com sucesso! Verifique o console do seu back-end para ver as mensagens de log.');
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            alert('Falha ao acionar o teste. Verifique o console do navegador e do back-end para mais detalhes sobre o erro (pode ser 403 Forbidden se não estiver logado como Admin).');
            console.error('Erro ao testar envio de email:', error);
        } finally {
            setIsTesting(false);
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="dashboard-content">
                <section className="welcome-section">
                    <div className="welcome-text">
                        <h1>Seja bem vindo, Administrador!</h1>
                        <p>Gerencie a plataforma e todos os usuários a partir deste painel.</p>
                        
                        {/* 5. ADICIONAR O BOTÃO DE TESTE AQUI */}
                        <button 
                            className="test-email-button" 
                            onClick={handleTestEmail} 
                            disabled={isTesting}
                        >
                            {isTesting ? 'Testando...' : 'Testar Envio de E-mail Automático'}
                        </button>
                    </div>
                </section>

                <section className="cards-container">
                    <Link to="/admin/veterinarios" className="main-card">
                        <img src={mainImage} alt="Gerenciar Veterinários" className="card-image" />
                        <div className="card-footer">
                            <span>GERENCIAR VETERINÁRIOS</span>
                        </div>
                    </Link>

                    <div className="bottom-cards">
                        <Link to="/admin/pacientes" className="small-card">
                            <img src={cardImage1} alt="Gerenciar Pacientes" className="card-image"/>
                            <div className="card-footer">
                                <span>GERENCIAR PACIENTES</span>
                            </div>
                        </Link>
                        <Link to="/admin/relatorios" className="small-card">
                            <img src={cardImage2} alt="Visualizar Relatórios" className="card-image"/>
                            <div className="card-footer">
                                <span>VISUALIZAR RELATÓRIOS</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
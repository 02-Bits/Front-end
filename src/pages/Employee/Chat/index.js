import React from 'react';
import Footer from '../../../components/Footer';
import AdminChat from '../../admin/Chat/Chat'; // Lógica do chat é reutilizada, mas não o layout
import '../css/styles.css';

const EmployeeChat = () => {
    return (
        <div className="employee-page employee-chat-page">
            <main className="employee-content">
                <div className="employee-header">
                    <h1>Chat da Clínica</h1>
                    <p>Visualize e participe das conversas entre clientes e veterinários.</p>
                </div>
                {/* O container de chat agora tem seu próprio estilo para ocupar o espaço corretamente */}
                <div className="employee-chat-container">
                    {/* O componente AdminChat é renderizado aqui dentro, funcionando como o "motor" do chat */}
                    <AdminChat />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EmployeeChat;
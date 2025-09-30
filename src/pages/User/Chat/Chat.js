import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importar useParams
import HeaderComCadastro from '../../../components/HeaderComCadastro';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { IoSend } from 'react-icons/io5';
import './css/styles.css';

const Chat = () => {
    const { consultationId } = useParams(); // Pega o ID da consulta da URL

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Simulação de com quem você está falando (em um app real, viria da API)
    const [chatPartner, setChatPartner] = useState({ name: 'Carregando...', avatar: '' });

    useEffect(() => {
        if (!consultationId) return;

        const fetchMessages = async () => {
            setLoading(true);
            setError('');
            try {
                // Busca o histórico de mensagens da API
                const response = await api.get(`/chat/${consultationId}`);
                setMessages(response.data);

                // Lógica de exemplo para definir o nome no header do chat
                // Em um app real, você buscaria os detalhes da consulta
                // para saber o nome do veterinário/paciente.
                // const consultaResponse = await api.get(`/consultas/${consultationId}`);
                // setChatPartner({ name: consultaResponse.data.veterinaryName, avatar: '...' });

            } catch (err) {
                setError('Não foi possível carregar as mensagens. Você tem permissão para ver este chat?');
                console.error("Erro ao buscar chat:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [consultationId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const originalMessage = newMessage;
        setNewMessage(''); // Limpa o input imediatamente para melhor UX

        try {
            // Envia a nova mensagem para a API
            // O backend espera um texto puro, então enviamos diretamente
            const response = await api.post(`/chat/${consultationId}`, originalMessage, {
                headers: { 'Content-Type': 'text/plain' }
            });
            // Adiciona a mensagem retornada (com ID e timestamp) à lista
            setMessages(prevMessages => [...prevMessages, response.data]);
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            setNewMessage(originalMessage); // Restaura a mensagem no input se der erro
            alert("Não foi possível enviar a mensagem.");
        }
    };

    return (
        <div className="chat-page">
            <HeaderComCadastro />
            <div className="chat-container">
                {/* A sidebar precisaria ser conectada para listar as consultas com chat ativo */}
                <div className="chat-sidebar">
                    <div className="sidebar-header"><h3>Conversas</h3></div>
                    <div className="contact-list">
                        <div className="contact-item active">
                            <div className="contact-info">
                                <span className="contact-name">Consulta #{consultationId}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat-main">
                    <div className="chat-header">
                        {/* <img src={chatPartner.avatar} alt={chatPartner.name} className="contact-avatar" /> */}
                        <span className="contact-name">{chatPartner.name}</span>
                    </div>
                    <div className="message-area">
                        {loading && <p>Carregando histórico...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && messages.map(msg => (
                            // A API não informa quem enviou em relação a 'me' ou 'other'
                            // Precisaríamos do ID do usuário logado para comparar com msg.sender.id
                            <div key={msg.id} className={'message received'}>
                                {msg.content}
                            </div>
                        ))}
                    </div>
                    <form className="message-input-area" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            placeholder="Digite sua mensagem..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit"><IoSend size={22} /></button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Chat;
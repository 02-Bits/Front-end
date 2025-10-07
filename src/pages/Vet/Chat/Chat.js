import React, { useState, useEffect, useRef } from 'react';
import HeaderVet from '../../../components/HeaderVet/HeaderVet';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { IoSend } from 'react-icons/io5';
import { firestore } from '../../../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import '../css/styles.css'; 

const VetChat = () => {
    const { user, loading: authLoading } = useAuth();
    const messagesEndRef = useRef(null);

    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);

    // Estados para notificações
    const [allNotifications, setAllNotifications] = useState([]);
    const [unreadConversations, setUnreadConversations] = useState(new Set());

    useEffect(() => {
        if (authLoading || !user) return;

        const fetchData = async () => {
            setLoadingConversations(true);
            try {
                const [convResponse, notifResponse] = await Promise.all([
                    api.get('/consultas/vet/my-consultations'),
                    api.get('/notifications')
                ]);

                const activeConversations = convResponse.data.filter(c => ['AGENDADA', 'FINALIZADA'].includes(c.status));
                setConversations(activeConversations);
                
                const unreadNotifs = notifResponse.data.filter(n => !n.read && n.consultationId);
                setAllNotifications(unreadNotifs);
                const unreadIds = new Set(unreadNotifs.map(n => n.consultationId));
                setUnreadConversations(unreadIds);

            } catch (error) {
                console.error("Erro ao buscar dados do chat:", error);
            } finally {
                setLoadingConversations(false);
            }
        };
        fetchData();
    }, [user, authLoading]);

    useEffect(() => {
        if (!activeConversation) return;
        setLoadingMessages(true);
        const q = query(
            collection(firestore, `consultas/${activeConversation.id}/mensagens`),
            orderBy("timestamp", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
            setLoadingMessages(false);
        });
        return () => unsubscribe();
    }, [activeConversation]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleConversationClick = (conv) => {
        setActiveConversation(conv);

        if (unreadConversations.has(conv.id)) {
            const notificationsToClear = allNotifications.filter(n => n.consultationId === conv.id);
            notificationsToClear.forEach(n => api.post(`/notifications/${n.id}/read`));

            setUnreadConversations(prev => {
                const newSet = new Set(prev);
                newSet.delete(conv.id);
                return newSet;
            });
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !activeConversation) return;
        const originalMessage = newMessage;
        setNewMessage('');
        try {
            await api.post(`/chat/${activeConversation.id}`, originalMessage, {
                headers: { 'Content-Type': 'text/plain' }
            });
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
            setNewMessage(originalMessage);
            alert("Não foi possível enviar a mensagem.");
        }
    };

    return (
        <div className="chat-page">
            <HeaderVet />
            <div className="chat-container">
                <div className="chat-sidebar">
                    <div className="sidebar-header"><h3>Conversas</h3></div>
                    <div className="contact-list">
                        {loadingConversations ? <p>Carregando...</p> : conversations.map(conv => (
                            <div 
                                key={conv.id} 
                                className={`contact-item ${activeConversation?.id === conv.id ? 'active' : ''}`}
                                onClick={() => handleConversationClick(conv)}
                            >
                                <div className="card-avatar-placeholder">{conv.userName?.charAt(0)}</div>
                                <div className="contact-info">
                                    <span className="contact-name">{conv.userName} (Tutor de {conv.petName})</span>
                                    <span className="contact-last-message">Consulta de {conv.speciality}</span>
                                </div>
                                {unreadConversations.has(conv.id) && <span className="unread-badge">!</span>}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="chat-main">
                    {activeConversation ? (
                        <>
                            <div className="chat-header">
                                <span className="contact-name">{activeConversation.userName} (Tutor de {activeConversation.petName})</span>
                            </div>
                            <div className="message-area">
                                {loadingMessages ? <p>Carregando mensagens...</p> : messages.map(msg => (
                                    <div key={msg.id} className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}>
                                        {msg.content}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
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
                        </>
                    ) : (
                        <div className="no-chat-selected">Selecione uma conversa para começar</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default VetChat;
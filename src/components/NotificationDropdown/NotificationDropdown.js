import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './css/NotificationDropdown.css';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get('/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error("Erro ao buscar notificações", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id) => {
        // Otimista: remove da UI primeiro
        setNotifications(prev => prev.filter(n => n.id !== id));
        try {
            await api.post(`/notifications/${id}/read`);
        } catch (error) {
            console.error("Falha ao marcar notificação como lida", error);
        }
    };

    return (
        <div className="notification-dropdown">
            <div className="dropdown-header">Notificações</div>
            <ul className="notification-list">
                {loading ? (
                    <li className="notification-item">Carregando...</li>
                ) : notifications.length === 0 ? (
                    <li className="notification-item">Nenhuma nova notificação.</li>
                ) : (
                    notifications.filter(n => !n.read).map(notification => (
                        <li key={notification.id} className="notification-item" onClick={() => handleMarkAsRead(notification.id)}>
                            <span className="notification-text">{notification.message}</span>
                            <span className="notification-time">
                                {new Date(notification.createdAt).toLocaleString('pt-BR')}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default NotificationDropdown;
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import logo from '../../assets/images/Header/LogoPet_vita(Atualizado).png';
import profileIcon from '../../assets/images/Header/perfilIcon.png'; // Ícone padrão como fallback
import './css/Header.css';
import { BsBellFill, BsChatDots } from 'react-icons/bs';

const HeaderAdmin = () => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    // ===== ALTERAÇÃO 1: Obter o usuário completo do contexto =====
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get('/notifications');
                const unreadCount = response.data.filter(n => !n.read).length;
                setNotificationCount(unreadCount);
            } catch (error) {
                console.error("Erro ao buscar contagem de notificações", error);
            }
        };
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/admin/dashboard"><img src={logo} alt="Pet Vita Logo" /></NavLink>
            </div>
            
            <nav className="nav nav-center">
                <NavLink to="/admin/dashboard" className="nav_link">Home</NavLink>
                <NavLink to="/admin/pacientes" className="nav_link">Pacientes</NavLink>
                <NavLink to="/admin/veterinarios" className="nav_link">Veterinários</NavLink>
                <NavLink to="/admin/consultas" className="nav_link">Consultas</NavLink>
                <NavLink to="/admin/relatorios" className="nav_link">Relatórios</NavLink>
            </nav>

            <div className="icons-container">
                <NavLink to="/admin/chat" className="header-icon" title="Chat"><BsChatDots size={26} /></NavLink>
                
                <div className="notification-icon-wrapper" ref={notificationRef}>
                    <div className="header-icon notification-icon" onClick={() => setShowNotifications(prev => !prev)} title="Notificações">
                        <BsBellFill size={26} />
                        {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
                    </div>
                    {showNotifications && <NotificationDropdown />}
                </div>
                
                <div className="profile-icon-container" ref={profileRef}>
                    <div className="profile-icon" onClick={() => setShowProfileDropdown(prev => !prev)}>
                        {/* ===== ALTERAÇÃO 2: Usar a imagem do usuário ou o ícone padrão ===== */}
                        <img 
                          src={user?.imageurl || profileIcon} 
                          alt="Perfil"
                          onError={(e) => { e.target.onerror = null; e.target.src = profileIcon; }} // Fallback se a URL da imagem quebrar
                        />
                    </div>
                    {showProfileDropdown && (
                        <div className="dropdown-menu">
                            <NavLink to="/admin/perfil" className="dropdown-item">Meu Perfil</NavLink>
                            <button onClick={handleLogout} className="dropdown-item" style={{border: 'none', width: '100%', textAlign: 'left', background: 'none', cursor: 'pointer'}}>Sair</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
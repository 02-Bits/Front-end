import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../Vet/css/styles.css'; // Reutilizando estilos de navegação

const AdminNav = () => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className="status-section">
            <div className="status-buttons">
                <Link to="/admin/dashboard" className={`status-button ${pathname.endsWith('/dashboard') ? 'active' : ''}`}>Painel</Link>
                <Link to="/admin/consultas" className={`status-button ${pathname.endsWith('/consultas') ? 'active' : ''}`}>Consultas</Link>
                <Link to="/admin/veterinarios" className={`status-button ${pathname.endsWith('/veterinarios') ? 'active' : ''}`}>Veterinários</Link>
                <Link to="/admin/funcionarios" className={`status-button ${pathname.endsWith('/funcionarios') ? 'active' : ''}`}>Funcionários</Link>
                <Link to="/admin/pacientes" className={`status-button ${pathname.endsWith('/pacientes') ? 'active' : ''}`}>Pacientes</Link>
                <Link to="/admin/services" className={`status-button ${pathname.endsWith('/services') ? 'active' : ''}`}>Serviços</Link>
                <Link to="/admin/relatorios" className={`status-button ${pathname.endsWith('/relatorios') ? 'active' : ''}`}>Relatórios</Link>
            </div>
        </div>
    );
};

export default AdminNav;
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/styles.css';

const EmployeeNav = () => {
    return (
        <aside className="employee-nav-aside">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/employee/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee/consultas">Consultas</NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee/agenda">Agenda</NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee/chat">Chat</NavLink>
                    </li>
                    <li>
                        <NavLink to="/employee/perfil">Meu Perfil</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default EmployeeNav;
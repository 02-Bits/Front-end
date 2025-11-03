import React from 'react';
import AdminRelatorios from '../../admin/Relatorios/Relatorios'; // Reutiliza o componente de Relatórios do Admin
import HeaderEmployee from '../../../components/HeaderEmployee';

const EmployeeRelatorios = () => {
    return (
        // O funcionário pode ter acesso aos mesmos relatórios operacionais que o admin.
        <>
            <HeaderEmployee />
            <AdminRelatorios />
        </>
    );
};

export default EmployeeRelatorios;
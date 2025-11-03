import React, { useState, useEffect, useCallback } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddEmployeeModal from './AddEmployeeModal';
import './css/styles.css';
import { toast } from 'react-toastify';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const PAGE_SIZE = 9;

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {
                name: searchTerm,
                page: currentPage,
                size: PAGE_SIZE,
                sort: 'username,asc'
            };

            const response = await api.get('/admin/users', { params });
            const employeeUsers = response.data.content.filter(user => user.role === 'EMPLOYEE');
            
            setEmployees(employeeUsers);
            setTotalPages(response.data.totalPages);

        } catch (err) {
            setError('Falha ao buscar funcionários.');
            toast.error('Falha ao buscar funcionários.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, currentPage]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchTerm]);

    const handleEmployeeAdded = () => {
        setIsModalOpen(false);
        fetchEmployees();
    };

    const handleEditClick = (employee) => {
        setEditingId(employee.id);
        setEditFormData({ ...employee });
    };

    const handleCancelClick = () => setEditingId(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async (id) => {
        try {
            const updateDTO = {
                username: editFormData.username,
                email: editFormData.email,
                phone: editFormData.phone
            };
            await api.put(`/admin/users/${id}`, updateDTO);
            setEditingId(null);
            fetchEmployees();
            toast.success('Funcionário atualizado com sucesso!');
        } catch (err) {
            toast.error('Erro ao salvar funcionário.');
            console.error(err);
        }
    };

    const handleDelete = async (employee) => {
        if (window.confirm(`Tem certeza que deseja excluir ${employee.username}?`)) {
            try {
                await api.delete(`/admin/users/${employee.id}`);
                fetchEmployees();
                toast.success('Funcionário excluído com sucesso!');
            } catch (err) {
                toast.error('Erro ao excluir funcionário.');
                console.error(err);
            }
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Funcionários</h1>
                    <button className="add-new-button" onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Adicionar Novo
                    </button>
                </div>
                <div className="admin-filters">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nome do funcionário..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading && <p>Carregando...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <>
                        {employees.length === 0 ? (
                            <div className="no-data-message">Nenhum funcionário encontrado. Tente adicionar um novo.</div>
                        ) : (
                            <div className="admin-card-grid">
                                {employees.map(p => (
                                    <div key={p.id} className="admin-card">
                                        {editingId === p.id ? (
                                            <>
                                                {/* --- FORMULÁRIO DE EDIÇÃO CORRIGIDO --- */}
                                                <div className="card-header-admin">
                                                    <span className="card-title">Editando: {editFormData.username}</span>
                                                </div>
                                                <div className="card-body-admin">
                                                    <div className="form-group-card">
                                                        <label>Nome do Funcionário</label>
                                                        <input type="text" name="username" value={editFormData.username} onChange={handleFormChange} className="card-input" />
                                                    </div>
                                                    <div className="form-group-card">
                                                        <label>Email</label>
                                                        <input type="email" name="email" value={editFormData.email} onChange={handleFormChange} className="card-input" />
                                                    </div>
                                                    <div className="form-group-card">
                                                        <label>Telefone</label>
                                                        <input type="text" name="phone" value={editFormData.phone} onChange={handleFormChange} className="card-input"/>
                                                    </div>
                                                </div>
                                                <div className="card-actions-admin">
                                                    <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                                    <button className="action-button-card save" onClick={() => handleSaveClick(p.id)}><FaSave /> Salvar</button>
                                                </div>
                                                {/* ------------------------------------- */}
                                            </>
                                        ) : (
                                            <>
                                                <div className="card-header-admin">
                                                    <img src={p.imageurl} alt={p.username} className="card-avatar" onError={(e) => { e.target.onerror = null; e.target.src='https://i.imgur.com/2qgrCI2.png' }}/>
                                                    <span className="card-title">{p.username}</span>
                                                </div>
                                                <div className="card-body-admin">
                                                    <p><strong>Email:</strong> {p.email}</p>
                                                    <p><strong>Telefone:</strong> {p.phone}</p>
                                                </div>
                                                <div className="card-actions-admin">
                                                    <button className="action-button-card delete" onClick={() => handleDelete(p)}><FaTrash /> Excluir</button>
                                                    <button className="action-button-card edit" onClick={() => handleEditClick(p)}><FaEdit /> Editar</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="pagination-controls">
                                <button
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    disabled={currentPage === 0}
                                >
                                    <FaChevronLeft /> Anterior
                                </button>
                                <span>
                                    Página {currentPage + 1} de {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    disabled={currentPage + 1 >= totalPages}
                                >
                                    Próxima <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {isModalOpen && <AddEmployeeModal onClose={() => setIsModalOpen(false)} onEmployeeAdded={handleEmployeeAdded} />}

            <Footer />
        </div>
    );
};

export default EmployeeList;
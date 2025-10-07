import React, { useState, useEffect, useCallback } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import AddPatientModal from './AddPatientModal'; // Importar o modal
import './css/PacientesList.css';

const PacientesList = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal
    
    const fetchPacientes = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = { name: searchTerm };
            
            const response = await api.get('/admin/users', { params });
            const clientUsers = response.data.filter(user => user.role === 'USER');
            setPacientes(clientUsers);

        } catch (err) {
            setError('Falha ao buscar pacientes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchPacientes();
    }, [fetchPacientes]);

    // Callback para atualizar a lista após adição
    const handlePatientAdded = () => {
        setIsModalOpen(false);
        fetchPacientes();
    };

    const handleEditClick = (paciente) => {
        setEditingId(paciente.id);
        setEditFormData({ ...paciente });
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
                // Adicione outros campos do UserUpdateRequestDTO se necessário
            };
            await api.put(`/admin/users/${id}`, updateDTO);
            setEditingId(null);
            fetchPacientes();
            alert('Paciente atualizado com sucesso!');
        } catch (err) {
            alert('Erro ao salvar paciente.');
            console.error(err);
        }
    };

    const handleDelete = async (paciente) => {
        if (window.confirm(`Tem certeza que deseja excluir ${paciente.username}?`)) {
            try {
                await api.delete(`/admin/users/${paciente.id}`);
                fetchPacientes();
                alert('Paciente excluído com sucesso!');
            } catch (err) {
                alert('Erro ao excluir paciente.');
                console.error(err);
            }
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Pacientes</h1>
                    <button className="add-new-button" onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Adicionar Novo
                    </button>
                </div>
                <div className="admin-filters">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nome do tutor..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                {loading && <p>Carregando...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className="admin-card-grid">
                        {pacientes.map(p => (
                            <div key={p.id} className="admin-card">
                                {editingId === p.id ? (
                                    <>
                                        <div className="card-body-admin">
                                            <div className="form-group-card"><label>Nome do Tutor</label><input type="text" name="username" value={editFormData.username} onChange={handleFormChange} className="card-input" /></div>
                                            <div className="form-group-card"><label>Email</label><input type="email" name="email" value={editFormData.email} onChange={handleFormChange} className="card-input" /></div>
                                            <div className="form-group-card"><label>Telefone</label><input type="text" name="phone" value={editFormData.phone} onChange={handleFormChange} className="card-input"/></div>
                                        </div>
                                        <div className="card-actions-admin">
                                            <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                            <button className="action-button-card save" onClick={() => handleSaveClick(p.id)}><FaSave /> Salvar</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="card-header-admin">
                                            <div className="card-avatar-placeholder">{p.username.charAt(0)}</div>
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
            </main>
            
            {isModalOpen && <AddPatientModal onClose={() => setIsModalOpen(false)} onPatientAdded={handlePatientAdded} />}
            
            <Footer />
        </div>
    );
};

export default PacientesList;
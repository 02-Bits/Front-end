import React, { useState, useEffect, useCallback } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api'; 
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import AddVetModal from './AddVetModal.js'; // Importar o modal
import './css/VetList.css';

const specialityOptions = [
    "CLINICO_GERAL", "ANESTESIOLOGIA", "CARDIOLOGIA", "DERMATOLOGIA", "ENDOCRINOLOGIA",
    "GASTROENTEROLOGIA", "NEUROLOGIA", "NUTRICAO", "OFTALMOLOGIA", "ONCOLOGIA",
    "ORTOPEDIA", "REPRODUCAO_ANIMAL", "PATOLOGIA", "CIRURGIA_GERAL", "CIRURGIA_ORTOPEDICA",
    "ODONTOLOGIA", "ZOOTECNIA", "EXOTICOS", "ACUPUNTURA", "FISIOTERAPIA", "IMAGINOLOGIA"
];

const VetList = () => {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

    const fetchVets = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const params = {};
            if (searchTerm) params.name = searchTerm;
            if (specialtyFilter) params.speciality = specialtyFilter;

            const response = await api.get('/admin/veterinarians', { params });
            setVets(response.data);
            
        } catch (err) {
            setError('Falha ao buscar veterinários.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, specialtyFilter]);

    useEffect(() => {
        fetchVets();
    }, [fetchVets]);

    // Função para ser chamada quando um vet é adicionado com sucesso
    const handleVetAdded = () => {
        setIsModalOpen(false);
        fetchVets(); // Atualiza a lista
    };

    const handleEditClick = (vet) => {
        setEditingId(vet.id);
        setEditFormData({ 
            name: vet.name,
            email: vet.email,
            crmv: vet.crmv,
            specialityenum: vet.specialityenum,
            phone: vet.phone,
            imageurl: vet.imageurl,
            rg: vet.rg || ''
        });
    };

    const handleCancelClick = () => setEditingId(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSaveClick = async (id) => {
        try {
            await api.put(`/admin/veterinarians/${id}`, editFormData);
            setEditingId(null);
            fetchVets();
            alert('Veterinário atualizado com sucesso!');
        } catch (err) {
            alert('Erro ao salvar. Verifique os dados e tente novamente.');
            console.error(err.response?.data || err);
        }
    };
    
    const handleDelete = async (vet) => {
        if (window.confirm(`Tem certeza que deseja excluir ${vet.name}?`)) {
            try {
                await api.delete(`/admin/veterinarians/${vet.id}`);
                fetchVets();
                alert(`${vet.name} excluído com sucesso!`);
            } catch (err) {
                alert('Erro ao excluir. Verifique se o veterinário não possui consultas ativas.');
                console.error(err);
            }
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Veterinários</h1>
                    <button className="add-new-button" onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Adicionar Novo
                    </button>
                </div>

                <div className="admin-filters">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input type="text" placeholder="Buscar por nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
                        <option value="">Todas as Especialidades</option>
                        {specialityOptions.map(spec => (
                            <option key={spec} value={spec}>
                                {spec.replace(/_/g, " ").charAt(0) + spec.replace(/_/g, " ").slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {loading && <p>Carregando veterinários...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className="admin-card-grid">
                        {vets.map(vet => (
                            <div key={vet.id} className="admin-card">
                                {editingId === vet.id ? (
                                    <>
                                        <div className="card-body-admin">
                                            <div className="form-group-card"><label>Nome</label><input type="text" name="name" value={editFormData.name} onChange={handleFormChange} className="card-input" /></div>
                                            <div className="form-group-card"><label>CRMV</label><input type="text" name="crmv" value={editFormData.crmv} onChange={handleFormChange} className="card-input" /></div>
                                            <div className="form-group-card"><label>Especialidade</label>
                                                <select name="specialityenum" value={editFormData.specialityenum} onChange={handleFormChange} className="card-input">
                                                    {specialityOptions.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group-card"><label>Email</label><input type="email" name="email" value={editFormData.email} onChange={handleFormChange} className="card-input" /></div>
                                        </div>
                                        <div className="card-actions-admin">
                                            <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                            <button className="action-button-card save" onClick={() => handleSaveClick(vet.id)}><FaSave /> Salvar</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="card-header-admin">
                                            <img src={vet.imageurl} alt={vet.name} className="card-avatar" onError={(e) => { e.target.onerror = null; e.target.src='https://i.pravatar.cc/150' }}/>
                                            <span className="card-title">{vet.name}</span>
                                        </div>
                                        <div className="card-body-admin">
                                            <p><strong>CRMV:</strong> {vet.crmv}</p>
                                            <p><strong>Especialidade:</strong> {vet.specialityenum.replace(/_/g, " ")}</p>
                                            <p><strong>Email:</strong> {vet.email}</p>
                                        </div>
                                        <div className="card-actions-admin">
                                            <button className="action-button-card delete" onClick={() => handleDelete(vet)}><FaTrash /> Excluir</button>
                                            <button className="action-button-card edit" onClick={() => handleEditClick(vet)}><FaEdit /> Editar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            
            {isModalOpen && <AddVetModal onClose={() => setIsModalOpen(false)} onVetAdded={handleVetAdded} />}
            
            <Footer />
        </div>
    );
};

export default VetList;
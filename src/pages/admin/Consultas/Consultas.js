import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import './css/Consultas.css';

// NOVO: Array com as descrições das especialidades para o filtro
const specialityLabels = [ "Clínico Geral", "Anestesiologia", "Cardiologia", "Dermatologia", "Endocrinologia",
    "CLINICO_GERAL", "ANESTESIOLOGIA", "CARDIOLOGIA", "DERMATOLOGIA", "ENDOCRINOLOGIA",
    "GASTROENTEROLOGIA", "NEUROLOGIA", "NUTRICAO", "OFTALMOLOGIA", "ONCOLOGIA",
    "ORTOPEDIA", "REPRODUCAO_ANIMAL", "PATOLOGIA", "CIRURGIA_GERAL", "CIRURGIA_ORTOPEDICA",
    "ODONTOLOGIA", "ZOOTECNIA", "EXOTICOS", "ACUPUNTURA", "FISIOTERAPIA", "IMAGINOLOGIA"
];

const Consultas = () => {
    const [consultas, setConsultas] = useState([]);
    const [filteredConsultas, setFilteredConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const [userFilter, setUserFilter] = useState('');
    const [vetFilter, setVetFilter] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const fetchConsultas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/consultations');
            setConsultas(response.data);
            setFilteredConsultas(response.data);
        } catch (err) {
            setError('Falha ao buscar consultas.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchConsultas();
    }, []);

    useEffect(() => {
        let result = consultas.filter(c =>
            (c.userName?.toLowerCase() || c.petName?.toLowerCase() || '').includes(userFilter.toLowerCase()) &&
            (c.veterinaryName?.toLowerCase() || '').includes(vetFilter.toLowerCase()) && // ALTERAÇÃO: Lógica de filtro para o select
            (specialtyFilter ? c.speciality === specialtyFilter : true) &&
            (dateFilter ? c.consultationdate === dateFilter : true)
        );
        setFilteredConsultas(result);
    }, [userFilter, vetFilter, specialtyFilter, dateFilter, consultas]);
    
    const handleEditClick = (consulta) => {
        setEditingId(consulta.id);
        setEditFormData({
            consultationdate: consulta.consultationdate,
            consultationtime: consulta.consultationtime.substring(0, 5),
            reason: consulta.reason,
            observations: consulta.observations,
        });
    };

    const handleCancelClick = () => setEditingId(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async (id) => {
        try {
            await api.put(`/admin/consultations/${id}`, editFormData);
            setEditingId(null);
            alert('Consulta atualizada com sucesso!');
            fetchConsultas();
        } catch (err) {
            alert('Erro ao salvar a consulta.');
            console.error("Erro ao salvar:", err.response?.data || err);
        }
    };

    const handleDelete = (id) => alert(`Lógica para deletar consulta ${id} a ser implementada.`);

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header"><h1>Gerenciar Consultas</h1></div>
                <div className="admin-filters">
                    <input type="text" placeholder="Filtrar por paciente/pet..." value={userFilter} onChange={e => setUserFilter(e.target.value)} />
                    <input type="text" placeholder="Filtrar por veterinário..." value={vetFilter} onChange={e => setVetFilter(e.target.value)} />
                    {/* ALTERAÇÃO: Input de texto substituído por um select */}
                    <select value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}>
                        <option value="">Todas as Especialidades</option>
                        {specialityLabels.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
                </div>
                
                {loading && <p>Carregando...</p>}
                {error && <p className="error-message">{error}</p>}
                
                {!loading && !error && (
                    <div className="admin-card-grid">
                        {filteredConsultas.map(c => (
                            <div key={c.id} className="admin-card">
                                {editingId === c.id ? (
                                    <>
                                        <div className="card-header-admin" style={{justifyContent: 'center'}}>
                                            <span className="card-title">Editando Consulta #{c.id}</span>
                                        </div>
                                        <div className="card-body-admin">
                                            <div className="form-group-card"><label>Data</label><input type="date" name="consultationdate" value={editFormData.consultationdate} onChange={handleFormChange} className="card-input" /></div>
                                            <div className="form-group-card"><label>Hora</label><input type="time" name="consultationtime" value={editFormData.consultationtime} onChange={handleFormChange} className="card-input" /></div>
                                            <div className="form-group-card"><label>Motivo</label><textarea name="reason" value={editFormData.reason} onChange={handleFormChange} className="card-input" rows="3"></textarea></div>
                                        </div>
                                        <div className="card-actions-admin">
                                            <button className="action-button-card cancel" onClick={handleCancelClick}><FaTimes /> Cancelar</button>
                                            <button className="action-button-card save" onClick={() => handleSaveClick(c.id)}><FaSave /> Salvar</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="card-header-admin" style={{justifyContent: 'center'}}>
                                            <span className="card-title">Consulta #{c.id}</span>
                                        </div>
                                        <div className="card-body-admin">
                                            <p><strong>Pet:</strong> {c.petName || 'N/A'}</p>
                                            <p><strong>Veterinário:</strong> {c.veterinaryName}</p>
                                            <p><strong>Data:</strong> {new Date(c.consultationdate + 'T00:00:00').toLocaleDateString('pt-BR')} às {c.consultationtime}</p>
                                            <p><strong>Status:</strong> <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span></p>
                                        </div>
                                        <div className="card-actions-admin">
                                            <button className="action-button-card delete" onClick={() => handleDelete(c.id)}><FaTrash /> Excluir</button>
                                            <button className="action-button-card edit" onClick={() => handleEditClick(c)}><FaEdit /> Editar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Consultas;
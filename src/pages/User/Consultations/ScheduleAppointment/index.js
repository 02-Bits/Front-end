import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderComCadastro from '../../../../components/HeaderComCadastro';
import Footer from '../../../../components/Footer';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../services/api';
import '../css/styles.css';

const specialityOptions = ["CLINICO_GERAL", "ANESTESIOLOGIA", "CARDIOLOGIA", "DERMATOLOGIA", "ENDOCRINOLOGIA", "GASTROENTEROLOGIA", "NEUROLOGIA", "NUTRICAO", "OFTALMOLOGIA", "ONCOLOGIA", "ORTOPEDIA", "REPRODUCAO_ANIMAL", "PATOLOGIA", "CIRURGIA_GERAL", "CIRURGIA_ORTOPEDICA", "ODONTOLOGIA", "ZOOTECNIA", "EXOTICOS", "ACUPUNTURA", "FISIOTERAPIA", "IMAGINOLOGIA"];

const ScheduleAppointment = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [allVets, setAllVets] = useState([]);
    const [filteredVets, setFilteredVets] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    
    const [formData, setFormData] = useState({
        petId: '',
        veterinarioId: '',
        specialityEnum: '',
        consultationdate: '',
        consultationtime: '',
        reason: '',
        observations: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                try {
                    setError('');
                    const [petsResponse, vetsResponse] = await Promise.all([
                        api.get('/pets/my-pets'),
                        api.get('/veterinary')
                    ]);
                    setPets(petsResponse.data || []);
                    setAllVets(vetsResponse.data || []);
                } catch (error) {
                    console.error("Erro ao buscar dados para agendamento:", error);
                    setError("Não foi possível carregar os dados necessários para o agendamento.");
                } finally {
                    setLoading(false);
                }
            } else if (!authLoading) {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, authLoading]);

    const fetchAvailableTimes = useCallback(async () => {
        if (formData.veterinarioId && formData.consultationdate) {
            setLoading(true);
            try {
                const response = await api.get(`/veterinary/${formData.veterinarioId}/available-slots`, {
                    params: { date: formData.consultationdate }
                });
                setAvailableTimes(response.data || []);
            } catch (error) {
                console.error("Erro ao buscar horários", error);
                setAvailableTimes([]);
            } finally {
                setLoading(false);
            }
        }
    }, [formData.veterinarioId, formData.consultationdate]);

    useEffect(() => {
        fetchAvailableTimes();
    }, [fetchAvailableTimes]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        if (name === 'specialityEnum') {
            const vetsWithSpecialty = allVets.filter(vet => vet.specialityenum === value);
            setFilteredVets(vetsWithSpecialty);
            updatedFormData.veterinarioId = '';
            setAvailableTimes([]);
        }
        
        if (name === 'veterinarioId' || name === 'consultationdate') {
            updatedFormData.consultationtime = ''; // Reseta a hora ao mudar o vet ou a data
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const requestData = {
                petId: parseInt(formData.petId),
                veterinarioId: parseInt(formData.veterinarioId),
                usuarioId: user.id,
                specialityEnum: formData.specialityEnum,
                consultationdate: formData.consultationdate,
                consultationtime: formData.consultationtime,
                reason: formData.reason,
                observations: formData.observations || 'Nenhuma observação.',
                status: 'PENDENTE'
            };
            
            await api.post('/consultas', requestData);
            alert('Solicitação de consulta enviada com sucesso!');
            navigate('/consultas');
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Erro ao agendar consulta. Verifique os dados.";
            alert(errorMsg);
            console.error(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };
    
    if (authLoading) {
        return <p style={{paddingTop: '150px', textAlign: 'center'}}>Verificando autenticação...</p>;
    }

    return (
        <div className="add-pet-page">
            <HeaderComCadastro />
            <div className="welcome-section">
                <h1 className="welcome-title">Agende uma consulta para seu pet</h1>
            </div>
            <div className="add-pet-wrapper">
                <div className="add-pet-container">
                    <form onSubmit={handleSubmit} className="pet-form">
                        {error && <p className="error-message">{error}</p>}
                        {loading && <p>Carregando dados...</p>}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="petId">Selecione seu Pet</label>
                                <select id="petId" name="petId" value={formData.petId} onChange={handleChange} required>
                                    <option value="">Selecione um pet</option>
                                    {pets.map(pet => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="specialityEnum">Especialidade Desejada</label>
                                <select id="specialityEnum" name="specialityEnum" value={formData.specialityEnum} onChange={handleChange} required>
                                    <option value="">Selecione um serviço</option>
                                    {specialityOptions.map(spec => <option key={spec} value={spec}>{spec.replace(/_/g, ' ')}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="veterinarioId">Veterinário</label>
                                <select id="veterinarioId" name="veterinarioId" value={formData.veterinarioId} onChange={handleChange} required disabled={!formData.specialityEnum}>
                                    <option value="">{formData.specialityEnum ? 'Selecione um veterinário' : 'Selecione uma especialidade primeiro'}</option>
                                    {filteredVets.map(vet => <option key={vet.id} value={vet.id}>{vet.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="consultationdate">Data</label>
                                <input type="date" id="consultationdate" name="consultationdate" value={formData.consultationdate} onChange={handleChange} required min={today} disabled={!formData.veterinarioId} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="consultationtime">Hora</label>
                                <select id="consultationtime" name="consultationtime" value={formData.consultationtime} onChange={handleChange} required disabled={!formData.veterinarioId || !formData.consultationdate}>
                                    <option value="">Selecione um horário</option>
                                    {availableTimes.length > 0 ? (
                                        availableTimes.map(time => <option key={time} value={time}>{time}</option>)
                                    ) : (
                                        <option disabled>Nenhum horário disponível</option>
                                    )}
                                </select>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="reason">Motivo da Consulta (mín. 5 caracteres)</label>
                            <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows="3" required></textarea>
                        </div>
                         <div className="form-group">
                            <label htmlFor="observations">Observações Adicionais</label>
                            <textarea id="observations" name="observations" value={formData.observations} onChange={handleChange} rows="3"></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submit-button" disabled={loading}>Enviar Solicitação</button>
                            <Link to="/consultas" className="cancel-button">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ScheduleAppointment;
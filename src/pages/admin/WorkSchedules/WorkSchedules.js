import React, { useState, useEffect, useCallback } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import './WorkSchedules.css';

// --- CORREÇÃO DO LOOP INFINITO ---
// Definindo a constante FORA do componente, ela não será recriada a cada renderização.
const dayOfWeekNames = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"];

const WorkSchedules = () => {
    const [vets, setVets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(''); // Formato: "type-id"
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                // --- CORREÇÃO DA LISTA DE PROFISSIONAIS ---
                // Busca dos endpoints corretos e separados
                const [vetsRes, employeesRes] = await Promise.all([
                    api.get('/admin/veterinarians'), // Busca apenas veterinários
                    api.get('/api/employee/all')      // Busca apenas funcionários
                ]);

                // Ajuste para pegar o ID do veterinário
                const mappedVets = vetsRes.data.map(v => ({
                    id: v.id, 
                    name: v.name
                }));

                setVets(mappedVets || []);
                setEmployees(employeesRes.data || []);

            } catch (error) {
                toast.error("Erro ao carregar lista de profissionais.");
                console.error("Erro ao buscar profissionais:", error);
            }
        };
        fetchProfessionals();
    }, []); // Roda apenas uma vez

    // --- CORREÇÃO DO LOOP INFINITO ---
    // A dependência 'dayOfWeekNames' foi removida
    const fetchSchedules = useCallback(async () => {
        if (!selectedProfessional) {
            setSchedules([]);
            return;
        }
        
        const [type, id] = selectedProfessional.split('-');
        if (!type || !id) return;

        setLoading(true);
        try {
            // --- CORREÇÃO DA URL DA API ---
            // A URL agora corresponde ao novo controller: /admin/schedules/...
            const response = await api.get(`/admin/schedules/${type}/${id}`);
            
            const sortedSchedules = response.data.sort((a, b) => 
                dayOfWeekNames.indexOf(a.dayOfWeek) - dayOfWeekNames.indexOf(b.dayOfWeek)
            );
            setSchedules(sortedSchedules);
        } catch (error) {
            toast.error("Erro ao carregar horários do profissional.");
            console.error(error);
            setSchedules([]);
        } finally {
            setLoading(false);
        }
    }, [selectedProfessional]); // Agora só depende de 'selectedProfessional'

    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]); // Este hook agora é seguro
    
    const handleScheduleChange = (id, field, value) => {
        setSchedules(currentSchedules =>
            currentSchedules.map(schedule =>
                schedule.id === id ? { ...schedule, [field]: value } : schedule
            )
        );
    };

    const handleSave = async () => {
        if (!selectedProfessional) return;
        const [type, id] = selectedProfessional.split('-');

        setIsSaving(true);
        try {
            // --- CORREÇÃO DA URL DA API ---
            await api.put(`/admin/schedules/${type}/${id}`, schedules);
            toast.success("Horários atualizados com sucesso!");
        } catch (error) {
            toast.error("Falha ao salvar horários.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header">
                    <h1>Gerenciar Horários de Trabalho</h1>
                </div>
                <div className="admin-filters">
                    <select value={selectedProfessional} onChange={(e) => setSelectedProfessional(e.target.value)}>
                        <option value="">Selecione um Profissional</option>
                        <optgroup label="Veterinários">
                            {vets.map(v => (
                                <option key={`veterinary-${v.id}`} value={`veterinary-${v.id}`}>{v.name}</option>
                            ))}
                        </optgroup>
                        <optgroup label="Funcionários">
                            {employees.map(e => (
                                <option key={`employee-${e.id}`} value={`employee-${e.id}`}>{e.username}</option>
                            ))}
                        </optgroup>
                    </select>
                </div>
                
                {loading && <p>Carregando horários...</p>}

                {!loading && selectedProfessional && schedules.length > 0 && (
                    <div className="schedule-container">
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th>Dia da Semana</th>
                                    <th>Trabalha?</th>
                                    <th>Início</th>
                                    <th>Fim</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map(schedule => (
                                    <tr key={schedule.id}>
                                        <td>{schedule.dayOfWeek.replace(/_/g, ' ')}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={schedule.isWorking}
                                                onChange={(e) => handleScheduleChange(schedule.id, 'isWorking', e.target.checked)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="time"
                                                value={schedule.startTime}
                                                disabled={!schedule.isWorking}
                                                onChange={(e) => handleScheduleChange(schedule.id, 'startTime', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="time"
                                                value={schedule.endTime}
                                                disabled={!schedule.isWorking}
                                                onChange={(e) => handleScheduleChange(schedule.id, 'endTime', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="schedule-actions">
                            <button className="btn-save" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default WorkSchedules;
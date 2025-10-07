import React, { useState, useEffect } from 'react';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { FaChartBar, FaUserPlus, FaFileMedicalAlt, FaDownload } from 'react-icons/fa';
import './css/Relatorios.css';

const specialityOptions = [
    "CLINICO_GERAL", "ANESTESIOLOGIA", "CARDIOLOGIA", "DERMATOLOGIA", "ENDOCRINOLOGIA",
    "GASTROENTEROLOGIA", "NEUROLOGIA", "NUTRICAO", "OFTALMOLOGIA", "ONCOLOGIA",
    "ORTOPEDIA", "REPRODUCAO_ANIMAL", "PATOLOGIA", "CIRURGIA_GERAL", "CIRURGIA_ORTOPEDICA",
    "ODONTOLOGIA", "ZOOTECNIA", "EXOTICOS", "ACUPUNTURA", "FISIOTERAPIA", "IMAGINOLOGIA"
];

const AdminRelatorios = () => {
    // Estados para os filtros
    const [reportType, setReportType] = useState('monthly');
    const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 7)); // Padrão: mês atual
    const [otherFilters, setOtherFilters] = useState({
        veterinaryId: '',
        speciality: ''
    });

    const [vets, setVets] = useState([]);
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    useEffect(() => {
        const fetchVets = async () => {
            try {
                const response = await api.get('/admin/veterinarians');
                setVets(response.data);
            } catch (error) {
                console.error("Erro ao buscar veterinários", error);
            }
        };
        fetchVets();
    }, []);

    const getStartEndDates = () => {
        let startDate, endDate;
        const currentYear = new Date().getFullYear();

        if (reportType === 'daily') {
            startDate = endDate = dateValue;
        } else if (reportType === 'monthly') {
            const [year, month] = dateValue.split('-');
            startDate = `${year}-${month}-01`;
            const lastDay = new Date(year, month, 0).getDate();
            endDate = `${year}-${month}-${lastDay}`;
        } else if (reportType === 'yearly') {
            const year = dateValue || currentYear;
            startDate = `${year}-01-01`;
            endDate = `${year}-12-31`;
        }
        return { startDate, endDate };
    };

    const fetchReport = async () => {
        setLoading(true);
        setReportData(null); // Limpa dados antigos antes de buscar novos
        const { startDate, endDate } = getStartEndDates();
        if (!startDate || !endDate) {
            setLoading(false);
            return;
        }

        try {
            const params = {
                startDate,
                endDate,
                veterinaryId: otherFilters.veterinaryId || null,
                speciality: otherFilters.speciality || null,
            };
            const response = await api.get('/admin/reports/summary', { params });
            setReportData(response.data);
        } catch (error) {
            console.error("Erro ao buscar relatório", error);
            setReportData(null);
        } finally {
            setLoading(false);
        }
    };
    
    const handleGeneratePdf = async () => {
        setPdfLoading(true);
        const { startDate, endDate } = getStartEndDates();
        if (!startDate || !endDate) {
            setPdfLoading(false);
            return;
        }

        try {
            const params = {
                startDate,
                endDate,
                veterinarioId: otherFilters.veterinaryId || null,
                speciality: otherFilters.speciality || null,
            };
            const response = await api.get('/reports/consultations-pdf', { 
                params,
                responseType: 'blob'
            });
            
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', `relatorio_petvita_${startDate}_a_${endDate}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

        } catch (error) {
            alert('Não foi possível gerar o relatório em PDF.');
            console.error("Erro ao gerar PDF:", error);
        } finally {
            setPdfLoading(false);
        }
    };

    const handleOtherFilterChange = (e) => {
        const { name, value } = e.target;
        setOtherFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReportTypeChange = (e) => {
        const type = e.target.value;
        setReportType(type);
        if (type === 'daily') setDateValue(new Date().toISOString().slice(0, 10));
        if (type === 'monthly') setDateValue(new Date().toISOString().slice(0, 7));
        if (type === 'yearly') setDateValue(new Date().getFullYear());
    };
    
    const renderDateFilter = () => {
        switch (reportType) {
            case 'daily':
                return <input type="date" value={dateValue} onChange={(e) => setDateValue(e.target.value)} />;
            case 'monthly':
                return <input type="month" value={dateValue} onChange={(e) => setDateValue(e.target.value)} />;
            case 'yearly':
                return <input type="number" placeholder="Ano" value={dateValue} onChange={(e) => setDateValue(e.target.value)} min="2020" max="2099" step="1"/>;
            default:
                return null;
        }
    };

    return (
        <div className="admin-page">
            <HeaderAdmin />
            <main className="admin-content">
                <div className="admin-page-header"><h1>Relatórios da Plataforma</h1></div>
                
                <div className="admin-filters report-filters">
                    <div className="filter-group">
                        <label>Tipo de Relatório</label>
                        <select value={reportType} onChange={handleReportTypeChange}>
                            <option value="monthly">Mensal</option>
                            <option value="yearly">Anual</option>
                            <option value="daily">Diário</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Período</label>
                        {renderDateFilter()}
                    </div>
                    <div className="filter-group">
                        <label>Veterinário</label>
                        <select name="veterinaryId" value={otherFilters.veterinaryId} onChange={handleOtherFilterChange}>
                            <option value="">Todos</option>
                            {vets.map(vet => <option key={vet.id} value={vet.id}>{vet.name}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Especialidade</label>
                        <select name="speciality" value={otherFilters.speciality} onChange={handleOtherFilterChange}>
                            <option value="">Todas</option>
                            {specialityOptions.map(spec => <option key={spec} value={spec}>{spec.replace(/_/g, " ")}</option>)}
                        </select>
                    </div>
                    <button className="action-button" onClick={fetchReport} disabled={loading}>
                        {loading ? 'Buscando...' : 'Buscar Relatório'}
                    </button>
                </div>
                
                {loading ? <p>Carregando dados...</p> : reportData ? (
                    <>
                        <div className="stats-cards-grid">
                            <div className="stat-card">
                                <div className="stat-icon consultations"><FaFileMedicalAlt /></div>
                                <div className="stat-info">
                                    <span className="stat-number">{reportData.totalConsultations}</span>
                                    <span className="stat-label">Consultas no Período</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon new-patients"><FaUserPlus /></div>
                                <div className="stat-info">
                                    <span className="stat-number">{reportData.consultationsByStatus?.AGENDADA || 0}</span>
                                    <span className="stat-label">Agendadas</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon performance"><FaChartBar /></div>
                                <div className="stat-info">
                                    <span className="stat-number">{reportData.consultationsByStatus?.FINALIZADA || 0}</span>
                                    <span className="stat-label">Finalizadas</span>
                                </div>
                            </div>
                        </div>

                        <div className="report-section">
                            <h3>Consultas por Especialidade</h3>
                            {reportData.consultationsBySpeciality && Object.keys(reportData.consultationsBySpeciality).length > 0 ? (
                                <ul className="patient-list">
                                    {Object.entries(reportData.consultationsBySpeciality).map(([key, value]) => (
                                        <li key={key}>{key}: <strong>{value}</strong></li>
                                    ))}
                                </ul>
                            ) : <p>Nenhum dado de especialidade para exibir no período selecionado.</p>}
                        </div>

                        <div className="report-actions">
                            <button className="action-button pdf" onClick={handleGeneratePdf} disabled={pdfLoading}>
                                {pdfLoading ? 'Gerando...' : <><FaDownload /> Gerar PDF do Relatório</>}
                            </button>
                        </div>
                    </>
                ) : <p>Nenhum relatório para exibir. Use os filtros e clique em "Buscar Relatório".</p>}
            </main>
            <Footer />
        </div>
    );
};

export default AdminRelatorios;
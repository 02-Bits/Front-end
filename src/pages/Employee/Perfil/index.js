import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import ProfileScreen from '../Perfil'; 
import ScheduleDisplay from '../../../components/ScheduleDisplay/ScheduleDisplay';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import '../css/styles.css';

const EmployeePerfil = () => {
    const { user } = useAuth();
    const [schedules, setSchedules] = useState([]);
    const [loadingSchedules, setLoadingSchedules] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchSchedules = async () => {
                setLoadingSchedules(true);
                try {
                    const response = await api.get('/api/schedules/employee/my-schedule');
                    setSchedules(response.data);
                } catch (error) {
                    toast.error("Não foi possível carregar seus horários de trabalho.");
                    console.error("Erro ao carregar horários do funcionário", error);
                } finally {
                    setLoadingSchedules(false);
                }
            };
            fetchSchedules();
        }
    }, [user]);

    return (
        <div className="employee-page">
            <main className="employee-content" style={{paddingTop: '40px', paddingBottom: '40px'}}>
                {/* O ProfileScreen cuida dos dados gerais do usuário */}
                <ProfileScreen />

                {/* Container adicional para exibir os horários de trabalho */}
                <div className="profile-container" style={{marginTop: '40px'}}>
                     <ScheduleDisplay schedules={schedules} loading={loadingSchedules} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default EmployeePerfil;
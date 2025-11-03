import React from 'react';
import './css/ScheduleDisplay.css';

const ScheduleDisplay = ({ schedules, loading }) => {
    const dayOfWeekNames = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO", "DOMINGO"];

    if (loading) {
        return <p>Carregando horários...</p>;
    }
    
    if (!schedules || schedules.length === 0) {
        return <p>Não foi possível carregar os horários.</p>;
    }

    // Garante a ordem correta dos dias
    const sortedSchedules = [...schedules].sort((a, b) => dayOfWeekNames.indexOf(a.dayOfWeek) - dayOfWeekNames.indexOf(b.dayOfWeek));

    return (
        <div className="schedule-display-container">
            <h3>Meus Horários de Trabalho</h3>
            <table className="schedule-display-table">
                <thead>
                    <tr>
                        <th>Dia da Semana</th>
                        <th>Status</th>
                        <th>Horário</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSchedules.map(schedule => (
                        <tr key={schedule.id} className={!schedule.isWorking ? 'off-day' : ''}>
                            <td>{schedule.dayOfWeek.replace(/_/g, ' ')}</td>
                            <td>
                                <span className={`status-pill ${schedule.isWorking ? 'working' : 'off'}`}>
                                    {schedule.isWorking ? 'Trabalha' : 'Folga'}
                                </span>
                            </td>
                            <td>
                                {schedule.isWorking ? `${schedule.startTime} - ${schedule.endTime}` : '---'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleDisplay;
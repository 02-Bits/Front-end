import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            await api.post(`/auth/reset-password?token=${token}`, { password });
            setMessage('Senha redefinida com sucesso! Você será redirecionado para o login.');
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            setMessage('Token inválido ou expirado. Por favor, solicite um novo link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Crie sua Nova Senha</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="password">Nova Senha</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
                        <input type="password" id="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {message && <p className="feedback-message">{message}</p>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
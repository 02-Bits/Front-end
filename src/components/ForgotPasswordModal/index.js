import React, { useState } from 'react';
import api from '../../services/api';
import '../ModalUser/css/styles.css'; // Reutilizando o CSS do modal de usuário

const ForgotPasswordModal = ({ onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('Se o seu e-mail estiver cadastrado, você receberá um link para redefinir sua senha em breve.');
        } catch (err) {
            setError('Não foi possível processar a solicitação. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal active">
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>Redefinir Senha</h2>
                <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
                    Digite seu e-mail para receber o link de redefinição.
                </p>
                <form onSubmit={handleSubmit} className="form">
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-group">
                        <label htmlFor="email-forgot">Email</label>
                        <input type="email" id="email-forgot" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar Link'}
                    </button>
                </form>
                <div className="links">
                    <button type="button" className="link-button" onClick={onSwitchToLogin}>Voltar para o Login</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
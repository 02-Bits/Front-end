import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeaderComCadastro from '../../../../components/HeaderComCadastro'; // <-- LINHA QUE ESTAVA FALTANDO
import Footer from '../../../../components/Footer';
import api from '../../../../services/api';
import { useAuth } from '../../../../context/AuthContext';
import { FaStar, FaRegStar } from 'react-icons/fa';
import '../css/styles.css'; // Verifique o caminho para o seu CSS
import profileIcon from '../../../../assets/images/Perfil/perfilIcon.png';

const ConsulCompleteDetails = () => {
    const { consultaId } = useParams();
    const [consulta, setConsulta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Estados para a avaliação
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchConsulta = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/consultas/${consultaId}`);
                setConsulta(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes da consulta", error);
                setError("Não foi possível carregar os detalhes da consulta.");
            } finally {
                setLoading(false);
            }
        };
        fetchConsulta();
    }, [consultaId]);

    const handleSubmitRating = async () => {
        if (rating === 0) {
            alert('Por favor, selecione de 1 a 5 estrelas.');
            return;
        }
        
        try {
            // O DTO da sua API precisa do ID do veterinário
            // Supondo que a API de consulta retorne o `veterinaryId`
            const veterinaryId = consulta?.veterinaryId; 
            if (!veterinaryId) {
                throw new Error("ID do veterinário não encontrado na consulta.");
            }

            await api.post(`/veterinary/${veterinaryId}/rate`, { rating, comment });
            alert('Avaliação enviada com sucesso!');
        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);
            alert('Falha ao enviar avaliação.');
        }
    };

    if (loading) return (
        <>
            <HeaderComCadastro />
            <p style={{paddingTop: '150px', textAlign: 'center'}}>Carregando detalhes...</p>
            <Footer />
        </>
    );

    if (error) return (
        <>
            <HeaderComCadastro />
            <p className="error-message" style={{margin: '150px auto'}}>{error}</p>
            <Footer />
        </>
    );

    return (
        <div className="pets-details-page">
            <HeaderComCadastro />
            <div className="welcome-section">
                <h1 className="welcome-title">Detalhes da Consulta</h1>
                <p className="consul-status">{consulta?.status}</p>
            </div>
            <div className="pet-details-wrapper">
                <div className="pet-details-container">
                    {/* ... JSX dos detalhes da consulta ... */}
                    <div className="doctor-section">
                        <h3 className="rating-title">Avalie o Doutor</h3>
                        <div className="doctor-rating-container">
                            <div className="doctor-info">
                                {/* Supondo que a API retorne a imagem do doutor */}
                                <img src={consulta?.doctorImageUrl || profileIcon} alt={consulta?.veterinaryName} className="doctor-avatar"/>
                                <div className="doctor-details">
                                    <h4>{consulta?.veterinaryName}</h4>
                                    <p>{consulta?.speciality}</p>
                                </div>
                            </div>
                            <div className="rating-controls">
                                <div className="stars">
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <button
                                        type="button" key={index} className="star-button"
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                        >
                                        {ratingValue <= (hover || rating) ? <FaStar className="star filled" /> : <FaRegStar className="star" />}
                                        </button>
                                    );
                                })}
                                </div>
                                <button className="submit-rating" onClick={handleSubmitRating}>
                                    Enviar Avaliação
                                </button>
                            </div>
                        </div>
                    </div>
                     <div className="details-actions">
                        <Link to="/consultas" className="back-button">Voltar</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ConsulCompleteDetails;
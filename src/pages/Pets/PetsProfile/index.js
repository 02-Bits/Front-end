import React, { useState, useEffect } from 'react';
// ===== CORREÇÕES NOS IMPORTS ABAIXO =====
import { Link } from 'react-router-dom'; // Corrigido: Importando o 'Link' que é usado no código
import HeaderComCadastro from '../../../components/Header_com_cadastro'; // Corrigido: Importando com o nome correto
// ======================================
import Footer from '../../../components/Footer';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import './css/styles.css'; // Verifique se este é o caminho correto para o seu CSS

const PetsProfile = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setError('Você precisa estar logado para ver seus pets.');
      setLoading(false);
      return;
    }
    
    const fetchUserPets = async () => {
      setLoading(true);
      setError('');
      try {
        // ===== ALTERAÇÃO PRINCIPAL AQUI =====
        // Agora chamamos o novo endpoint seguro e eficiente
        const response = await api.get('/pets/my-pets');
        setPets(response.data || []);
        // Não é mais necessário filtrar no front-end!
        // =====================================

      } catch (error) {
        console.error("Erro ao buscar pets:", error);
        setError('Não foi possível carregar seus pets.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, [user]);

  return (
    <div className="pet-profile-page">
      <HeaderComCadastro />
      <div className="welcome-section">
        <h1 className="welcome-title">Bem vindo ao espaço para os seus Pets</h1>
      </div>
      <div className="pet-profile-container">
        {loading && <p style={{textAlign: 'center'}}>Carregando seus pets...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <>
            {pets.length > 0 ? (
              pets.map(pet => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-photo-container">
                    <img src={pet.imageurl} alt={`Foto de ${pet.name}`} className="pet-photo" onError={(e) => { e.target.onerror = null; e.target.src='https://i.imgur.com/2qgrCI2.png' }} />
                  </div>
                  <div className="pet-info">
                    <h3 className="pet-name">{pet.name}</h3>
                    <span className="pet-gender">{pet.gender}</span>
                  </div>
                  <Link to={`/pets-details/${pet.id}`} state={{ petData: pet }} className="details-button">
                    Detalhes <span className="arrow">›</span>
                  </Link>
                </div>
              ))
            ) : (
              <p style={{textAlign: 'center'}}>Você ainda não cadastrou nenhum pet.</p>
            )}
            <Link to="/add-pet" className="action-button-primary">
              + Adicionar um Pet
            </Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PetsProfile;
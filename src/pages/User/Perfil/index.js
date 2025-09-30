import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

// ===== IMPORT FALTANDO ADICIONADO AQUI =====
import HeaderSemCadastro from '../../../components/HeaderSemCadastro';
import HeaderComCadastro from '../../../components/HeaderComCadastro';
import Footer from '../../../components/Footer';

// Imagens
import profileIcon from '../../../assets/images/Perfil/perfilIcon.png';
import editIcon from '../../../assets/images/Perfil/switchImage.png';

// CSS
import './css/styles.css';

const ProfileScreen = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await api.get('/users/me');
          setUserData(response.data);
          setEditData(response.data);
        } catch (err) {
          setError('Não foi possível carregar os dados do perfil.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
      setError('Usuário não autenticado.');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const updateDTO = {
        username: editData.username,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
        rg: editData.rg,
        // Adicione outros campos que seu DTO de update espera
      };
      const response = await api.put(`/admin/users/${user.id}`, updateDTO);
      setUserData(response.data);
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao salvar as alterações.');
    }
  };

  const renderProfileContent = () => {
    if (loading) return <p className="loading-message">Carregando perfil...</p>;
    if (error || !userData) return <p className="error-message">{error}</p>;

    return (
      <div className="profile-container">
        <div className="profile-header"><h1>Meu Perfil</h1></div>
        <form className="profile-content" onSubmit={handleSaveChanges}>
          <div className="profile-picture-section">
            <div className="profile-picture-container">
                <img src={userData.imageurl || profileIcon} alt="Foto de perfil" className="profile-picture" />
                {isEditing && (
                <div className="profile-picture-edit">
                    <label htmlFor="profile-image-input"><img src={editIcon} alt="Editar" className="edit-icon" /></label>
                    <input id="profile-image-input" type="file" accept="image/*" style={{ display: 'none' }} />
                </div>
                )}
            </div>
          </div>
          <div className="profile-info-section">
            <div className="profile-row">
              <div className="profile-field">
                <label>Nome</label>
                {isEditing ? <input type="text" name="username" value={editData.username || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{userData.username}</div>}
              </div>
              <div className="profile-field">
                <label>Email</label>
                {isEditing ? <input type="email" name="email" value={editData.email || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{userData.email}</div>}
              </div>
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label>Endereço</label>
                {isEditing ? <input type="text" name="address" value={editData.address || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{userData.address || 'Não informado'}</div>}
              </div>
              <div className="profile-field">
                <label>Telefone</label>
                {isEditing ? <input type="tel" name="phone" value={editData.phone || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{userData.phone}</div>}
              </div>
            </div>
            <div className="profile-row">
                <div className="profile-field">
                    <label>RG</label>
                    {isEditing ? <input type="text" name="rg" value={editData.rg || ''} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{userData.rg || 'Não informado'}</div>}
                </div>
                <div className="profile-field">
                    <label>Cargo</label>
                    <div className="info-field">{userData.role}</div>
                </div>
            </div>
            <div className="profile-actions">
                {isEditing ? (
                <>
                    <button type="submit" className="save-button">Salvar Alterações</button>
                    <button type="button" className="cancel-button" onClick={() => { setIsEditing(false); setEditData(userData); }}>Cancelar</button>
                </>
                ) : (
                <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Editar Perfil</button>
                )}
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {user ? <HeaderComCadastro /> : <HeaderSemCadastro />}
      <main className="page-content">
        {renderProfileContent()}
      </main>
      <Footer />
    </div>
  );
};

export default ProfileScreen;
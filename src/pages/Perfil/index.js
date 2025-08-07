import React, { useState } from 'react';
import HeaderComCadastro from '../../components/Header_com_cadastro';
import Footer from '../../components/Footer';
import './css/styles.css';
import profileIcon from '../../assets/images/Perfil/perfilIcon.png'; // Importe uma imagem padrão
import editIcon from '../../assets/images/Perfil/switchImage.png'; // Ícone de edição

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Gustavo Gutenberg',
    birthDate: '1990-01-01',
    email: 'AdolfPitoco@alemanha.com',
    phone: '(11) 98555-4422',
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, profileImage: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return `${age} anos`;
  };

  return (
    <div className="app">
      <HeaderComCadastro />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1>Meu Perfil</h1>
        </div>
        
        <div className="profile-content">
          {/* Seção da foto de perfil */}
          <div className="profile-picture-section">
            <div className="profile-picture-container">
              <img 
                src={userData.profileImage || profileIcon} 
                alt="Foto de perfil" 
                className="profile-picture"
              />
              {isEditing && (
                <div className="profile-picture-edit">
                  <label htmlFor="profile-image-input">
                    <img src={editIcon} alt="Editar" className="edit-icon" />
                  </label>
                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Seção das informações */}
          <div className="profile-info-section">
            <div className="profile-row">
              <div className="profile-field">
                <label>Nome</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="info-field"
                  />
                ) : (
                  <div className="info-field">{userData.name}</div>
                )}
              </div>
              <div className="profile-field">
                <label>Idade</label>
                <div className="info-field">{calculateAge(userData.birthDate)}</div>
              </div>
            </div>
            
            <div className="profile-row">
              <div className="profile-field">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="info-field"
                  />
                ) : (
                  <div className="info-field">{userData.email}</div>
                )}
              </div>
              <div className="profile-field">
                <label>Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="info-field"
                  />
                ) : (
                  <div className="info-field">{userData.phone}</div>
                )}
              </div>
            </div>
            
            <div className="profile-row">
              <div className="profile-field">
                <label>Data de Nascimento</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthDate"
                    value={userData.birthDate}
                    onChange={handleInputChange}
                    className="info-field"
                  />
                ) : (
                  <div className="info-field">
                    {new Date(userData.birthDate).toLocaleDateString('pt-BR')}
                  </div>
                )}
              </div>
              <div className="profile-field">
                <label>Senha</label>
                <div className="password-field">*********</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button 
                className="save-button"
                onClick={() => setIsEditing(false)}
              >
                Salvar Alterações
              </button>
              <button 
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </button>
              <button className="logout-button">Sair</button>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileScreen;
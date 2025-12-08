import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import HeaderComCadastro from '../../components/Header_com_cadastro';
import Footer from '../../components/Footer';
import ImageCropper from '../../components/ImageCropper/ImageCropper';
import profileIcon from '../../assets/images/Perfil/perfilIcon.png';
import { FaPencilAlt } from 'react-icons/fa';
import './css/styles.css';

const ProfileScreen = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(profileIcon);
    const [hasChanges, setHasChanges] = useState(false);

    const fetchUserData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // CORREÇÃO APLICADA AQUI
            const response = await api.get(`/users/me?_t=${new Date().getTime()}`);
            setUserData(response.data);
            setEditData(response.data);
            setImagePreview(response.data.imageurl || profileIcon);
        } catch (err) {
            setError('Não foi possível carregar os dados do perfil.');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => { setImageToCrop(reader.result); };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCropComplete = (croppedFile) => {
        setImageFile(croppedFile);
        setImagePreview(URL.createObjectURL(croppedFile));
        setImageToCrop(null);
        setHasChanges(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
        setHasChanges(true);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const updateDTO = { username: editData.username, email: editData.email, phone: editData.phone, address: editData.address };
            await api.put(`/users/me`, updateDTO);

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);
                await api.post(`/upload/user/${user.id}`, uploadFormData);
            }

            alert('Perfil atualizado com sucesso!');
            setIsEditing(false);
            setHasChanges(false);
            setImageFile(null);
            await fetchUserData(); 
        } catch (err) {
            alert('Erro ao salvar as alterações.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData(userData);
        setImagePreview(userData.imageurl || profileIcon);
        setHasChanges(false);
    };

    const renderProfileContent = () => {
        if (loading) return <p className="loading-message">Carregando perfil...</p>;
        if (error || !userData) return <p className="error-message">{error || 'Usuário não autenticado.'}</p>;

        return (
            <div className="profile-container">
                <div className="profile-header"><h1>Meu Perfil</h1></div>
                <form className="profile-content" onSubmit={handleSaveChanges}>
                    <div className="profile-picture-section">
                        <div className="profile-picture-container">
                            <img src={imagePreview} alt="Foto de perfil" className="profile-picture" onError={(e) => { e.target.onerror = null; e.target.src=profileIcon }}/>
                            {isEditing && (
                            <div className="profile-picture-edit">
                                <label htmlFor="profile-image-input"><FaPencilAlt className="edit-icon" /></label>
                                <input id="profile-image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
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
                        <div className="profile-actions">
                            {isEditing ? (
                                <>
                                    <button type="submit" className="save-button" disabled={!hasChanges || isSaving}>
                                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                                    </button>
                                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
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
            <HeaderComCadastro />
            {imageToCrop && (
                <ImageCropper
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onClose={() => setImageToCrop(null)}
                />
            )}
            <main className="page-content">{renderProfileContent()}</main>
            <Footer />
        </div>
    );
};

export default ProfileScreen;
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import HeaderComCadastro from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import ImageCropper from '../../../components/ImageCropper/ImageCropper';
import './css/styles.css';
import { FaPencilAlt } from 'react-icons/fa';
import profileIcon from '../../../assets/images/Perfil/perfilIcon.png';

const speciesOptions = [ "CACHORRO", "GATO", "PASSARO", "PEIXE", "ROEDOR", "REPTIL", "COELHO", "OUTROS" ];
const porteOptions = ["PEQUENO", "MEDIO", "GRANDE"];
const genderOptions = ["Macho", "Femea"];
const breedOptions = { /* ... (código das raças como antes) ... */ };
const getBreedKeyForSpecies = (species) => { /* ... (código da função como antes) ... */ };

const PetsDetails = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [petData, setPetData] = useState(null);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    
    const [imageToCrop, setImageToCrop] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    const fetchPetDetails = async () => {
        if (!petId) return;
        setLoading(true);
        try {
            const response = await api.get(`/pets/${petId}`);
            setPetData(response.data);
            setEditData(response.data);
            setImagePreview(response.data.imageurl || profileIcon);
        } catch (err) {
            setError('Não foi possível carregar os dados do pet.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPetDetails();
    }, [petId]);

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
        let updatedData = { ...editData, [name]: value };
        if (name === 'speciespet') {
            const keysToReset = ['dogBreed', 'catBreed', 'birdBreed', 'fishBreed', 'rodentBreed', 'reptileBreed', 'rabbitBreed'];
            keysToReset.forEach(key => updatedData[key] = null);
            updatedData.personalizedBreed = '';
        }
        setEditData(updatedData);
        setHasChanges(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const dataToSend = { ...editData, age: parseInt(editData.age), usuarioId: user.id };
            await api.put(`/pets/${petId}`, dataToSend);

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);
                await api.post(`/upload/pet/${petId}`, uploadFormData);
            }
            setIsEditing(false);
            setHasChanges(false);
            setImageFile(null);
            alert('Dados do pet atualizados com sucesso!');
            await fetchPetDetails();
        } catch (err) {
            alert('Erro ao salvar as alterações.');
            console.error(err.response?.data || err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (window.confirm(`Tem certeza que deseja remover ${petData.name}?`)) {
            try {
                await api.delete(`/pets/${petId}`);
                alert('Pet removido com sucesso!');
                navigate('/pets');
            } catch (err) {
                alert('Erro ao remover o pet.');
            }
        }
    };
    
    const handleCancelClick = (event) => {
        event.preventDefault();
        setIsEditing(false);
        setEditData(petData);
        setImagePreview(petData.imageurl || profileIcon);
        setHasChanges(false);
    };

    const renderBreedSelector = () => {
        // ... (código da função como antes)
    };

    if (loading) return <div className="loading-container">Carregando...</div>;
    if (error) return <div className="error-message" style={{margin: '150px auto'}}>{error}</div>;
    if (!petData) return null;

    return (
        <div className="profile-page">
            <HeaderComCadastro />
            {imageToCrop && (
                <ImageCropper
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                    onClose={() => setImageToCrop(null)}
                />
            )}
            <main className="page-content">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>{isEditing ? `Editando ${petData.name}` : `Detalhes de ${petData.name}`}</h1>
                    </div>
                    <form className="profile-content-column" onSubmit={handleUpdate}>
                        <div className="profile-picture-section">
                            <div className="profile-picture-container">
                                <img src={imagePreview} alt={`Foto de ${petData.name}`} className="profile-picture" onError={(e) => { e.target.onerror = null; e.target.src=profileIcon }}/>
                                {isEditing && (
                                <div className="profile-picture-edit">
                                    <label htmlFor="pet-image-input"><FaPencilAlt className="edit-icon" /></label>
                                    <input id="pet-image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="profile-info-section">
                            <div className="profile-row">
                                <div className="profile-field">
                                    <label>Nome do Pet</label>
                                    {isEditing ? <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{petData.name}</div>}
                                </div>
                                <div className="profile-field">
                                    <label>Idade (anos)</label>
                                    {isEditing ? <input type="number" name="age" value={editData.age} onChange={handleInputChange} className="info-field editable" /> : <div className="info-field">{petData.age}</div>}
                                </div>
                            </div>
                            <div className="profile-row">
                                <div className="profile-field">
                                    <label>Espécie</label>
                                    {isEditing ? (
                                        <select name="speciespet" value={editData.speciespet} onChange={handleInputChange} className="info-field editable">
                                            {speciesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    ) : <div className="info-field">{petData.speciespet}</div>}
                                </div>
                                {isEditing ? renderBreedSelector() : (
                                    <div className="profile-field">
                                        <label>Raça</label>
                                        <div className="info-field">
                                            {(petData.personalizedBreed || petData.dogBreed || petData.catBreed || petData.birdBreed || petData.fishBreed || petData.rodentBreed || petData.reptileBreed || petData.rabbitBreed || 'Não especificada').replace(/_/g, ' ')}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="profile-row">
                                <div className="profile-field">
                                    <label>Porte</label>
                                    {isEditing ? (
                                        <select name="porte" value={editData.porte} onChange={handleInputChange} className="info-field editable">
                                            {porteOptions.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    ) : <div className="info-field">{petData.porte}</div>}
                                </div>
                                <div className="profile-field">
                                    <label>Gênero</label>
                                    {isEditing ? (
                                        <select name="gender" value={editData.gender} onChange={handleInputChange} className="info-field editable">
                                            {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    ) : <div className="info-field">{petData.gender}</div>}
                                </div>
                            </div>
                            <div className="profile-actions">
                                <Link to="/pets" className="back-button">Voltar</Link>
                                {isEditing ? (
                                    <>
                                        <button type="button" className="cancel-button" onClick={handleCancelClick}>Cancelar</button>
                                        <button type="submit" className="save-button" disabled={!hasChanges || isSaving}>{isSaving ? 'Salvando...' : 'Salvar'}</button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="decline-button" onClick={handleDelete}>Remover Pet</button>
                                        <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Editar</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PetsDetails;
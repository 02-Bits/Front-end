import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../services/api';
import HeaderComCadastro from '../../../../components/HeaderComCadastro';
import Footer from '../../../../components/Footer';
import './css/styles.css';

// Enums e Constantes
const speciesOptions = [ "CACHORRO", "GATO", "PASSARO", "PEIXE", "ROEDOR", "REPTIL", "COELHO", "OUTROS" ];
const porteOptions = ["PEQUENO", "MEDIO", "GRANDE"];
const genderOptions = ["Macho", "Femea"];
const breedOptions = {
    CACHORRO: ["LABRADOR_RETRIEVER", "GOLDEN_RETRIEVER", "BULLDOG_FRANCES", "PASTOR_ALEMAO", "POODLE", "BEAGLE", "ROTTWEILER", "DACHSHUND", "SHIH_TZU", "OUTRO"],
    GATO: ["PERSA", "SIAMES", "MAINE_COON", "RAGDOLL", "BENGAL", "SPHYNX", "BRITISH_SHORTHAIR", "SCOTTISH_FOLD", "OUTRO"],
    // ...
};

// Função ajudante para obter a chave de raça correta
const getBreedKeyForSpecies = (species) => {
    switch (species) {
        case 'CACHORRO': return 'dogBreed';
        case 'GATO': return 'catBreed';
        case 'PASSARO': return 'birdBreed';
        case 'PEIXE': return 'fishBreed';
        case 'ROEDOR': return 'rodentBreed';
        case 'REPTIL': return 'reptileBreed';
        case 'COELHO': return 'rabbitBreed';
        default: return null;
    }
};

const PetsDetails = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [petData, setPetData] = useState(null);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPetDetails = async () => {
            if (!petId) return;
            setLoading(true);
            try {
                const response = await api.get(`/pets/${petId}`);
                setPetData(response.data);
                setEditData(response.data);
            } catch (err) {
                setError('Não foi possível carregar os dados do pet.');
            } finally {
                setLoading(false);
            }
        };
        fetchPetDetails();
    }, [petId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...editData, [name]: value };
        if (name === 'speciespet') {
            updatedData.dogBreed = null;
            updatedData.catBreed = null;
            updatedData.birdBreed = null;
            updatedData.fishBreed = null;
            updatedData.rodentBreed = null;
            updatedData.reptileBreed = null;
            updatedData.rabbitBreed = null;
            updatedData.personalizedBreed = null;
        }
        setEditData(updatedData);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { name, age, imageurl, speciespet, porte, gender, personalizedBreed } = editData;
            const breedKey = getBreedKeyForSpecies(speciespet);
            const selectedBreed = breedKey ? editData[breedKey] : null;

            const dataToSend = {
                name, age: parseInt(age), imageurl, speciespet, porte, gender, usuarioId: user.id,
                dogBreed: null, catBreed: null, birdBreed: null, fishBreed: null, 
                rodentBreed: null, reptileBreed: null, rabbitBreed: null,
                personalizedBreed: null,
            };

            if (selectedBreed === 'OUTRO') {
                dataToSend.personalizedBreed = personalizedBreed;
            } else if (breedKey && selectedBreed) {
                dataToSend[breedKey] = selectedBreed;
            }

            const response = await api.put(`/pets/${petId}`, dataToSend);
            setPetData(response.data);
            setIsEditing(false);
            alert('Dados do pet atualizados com sucesso!');
        } catch (err) {
            alert('Erro ao salvar as alterações.');
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
    
    const handleEditClick = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const handleCancelClick = (event) => {
        event.preventDefault();
        setIsEditing(false);
        setEditData(petData);
    };

    const renderBreedSelector = () => {
        const selectedSpecies = editData.speciespet;
        const breedKey = getBreedKeyForSpecies(selectedSpecies);
        
        if (!selectedSpecies || !breedOptions[selectedSpecies] || selectedSpecies === 'OUTROS') {
            return (
                <div className="profile-field">
                    <label>Raça</label>
                    <input type="text" name="personalizedBreed" value={editData.personalizedBreed || ''} onChange={handleInputChange} className="info-field editable" />
                </div>
            );
        }
        
        return (
            <div className="profile-field">
                <label>Raça</label>
                <select name={breedKey} value={editData[breedKey] || ''} onChange={handleInputChange} className="info-field editable">
                    <option value="">Selecione a raça</option>
                    {breedOptions[selectedSpecies].map(breed => (
                        <option key={breed} value={breed}>{breed.replace(/_/g, ' ').charAt(0) + breed.replace(/_/g, ' ').slice(1).toLowerCase()}</option>
                    ))}
                </select>
            </div>
        );
    };

    if (loading) return <div className="loading-container">Carregando...</div>;
    if (error) return <div className="error-message" style={{margin: '150px auto'}}>{error}</div>;
    if (!petData) return null;

    return (
        <div className="profile-page">
            <HeaderComCadastro />
            <main className="page-content">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>{isEditing ? `Editando ${petData.name}` : `Detalhes de ${petData.name}`}</h1>
                    </div>
                    <form className="profile-content-column" onSubmit={handleUpdate}>
                        <div className="profile-picture-section">
                            <div className="profile-picture-container">
                                <img src={petData.imageurl} alt={`Foto de ${petData.name}`} className="profile-picture" onError={(e) => { e.target.onerror = null; e.target.src='https://i.imgur.com/2qgrCI2.png' }}/>
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
                                            {(
                                                petData.personalizedBreed || 
                                                petData.dogBreed || 
                                                petData.catBreed || 
                                                petData.birdBreed || 
                                                petData.fishBreed || 
                                                petData.rodentBreed || 
                                                petData.reptileBreed || 
                                                petData.rabbitBreed || 
                                                'Não especificada'
                                            ).replace(/_/g, ' ')}
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
                                {isEditing ? (
                                    <>
                                        <button type="button" className="cancel-button" style={{backgroundColor: '#FF0000'}} onClick={handleCancelClick}>Cancelar</button>
                                        <button type="submit" className="save-button">Salvar</button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="edit-button" onClick={handleEditClick}>Editar</button>
                                        <button type="button" className="decline-button" onClick={handleDelete} style={{width: '150px'}}>Remover Pet</button>
                                        <Link to="/pets" className="back-button">Voltar</Link>
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
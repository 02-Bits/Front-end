import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    PASSARO: ["CALOPSITA", "CANARIO", "PERIQUITO_AUSTRALIANO", "AGAPORNIS", "RINGNECK", "CACATUA", "ARARA", "PAPAGAIO_VERDADEIRO", "OUTRO"],
    PEIXE: ["BETA", "GUPPY", "GOLDFISH_COMETA", "MOLLY", "PLATY", "TETRA_NEON", "CORYDORA", "PEIXE_PALHACO", "OUTRO"],
    ROEDOR: ["HAMSTER_SIRIO", "HAMSTER_ANAO_RUSSO", "RATO_TWISTER", "PORQUINHO_DA_INDIA_INGLES", "PORQUINHO_DA_INDIA_PERUANO", "CHINCHILA", "GERBIL", "ESQUILO_DA_MONGOLIA", "OUTRO"],
    REPTIL: ["DRAGAO_BARBUDO", "CORN_SNAKE", "TARTARUGA_TIGRE_DAGUA", "LEOPARDO_GECKO", "IGUANA_VERDE", "PITON_REAL", "JIBOIA", "CAMALEAO", "OUTRO"],
    COELHO: ["ANAO_HOLANDES", "MINI_LOP", "NOVA_ZELANDIA_BRANCO", "LIONHEAD", "FLEMISH_GIANT", "HOLLAND_LOP", "REX", "ANGORA_INGLES", "OUTRO"],
};

// Função ajudante para obter a chave de raça correta (dogBreed, catBreed, etc.)
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

const AddPet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', age: '', imageurl: 'https://i.imgur.com/2qgrCI2.png',
    speciespet: '', porte: '', gender: '',
    dogBreed: null, catBreed: null, birdBreed: null, fishBreed: null, 
    rodentBreed: null, reptileBreed: null, rabbitBreed: null,
    personalizedBreed: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://i.imgur.com/2qgrCI2.png');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para fazer upload da imagem
  const uploadImage = async (file) => {
    // IMPORTANTE: Configure estas variáveis com suas credenciais do Cloudinary
    const cloudName = 'seu_cloud_name'; // Substitua pelo seu cloud name
    const uploadPreset = 'seu_upload_preset'; // Substitua pelo seu upload preset
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      // Se o upload falhar, use a imagem padrão
      return 'https://i.imgur.com/2qgrCI2.png';
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido (JPG, PNG, GIF).');
        return;
      }
      
      // Validar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB.');
        return;
      }
      
      setImageFile(file);
      setError('');
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    if (name === 'speciespet') {
        // Resetar todas as raças quando a espécie muda
        updatedData.dogBreed = null;
        updatedData.catBreed = null;
        updatedData.birdBreed = null;
        updatedData.fishBreed = null;
        updatedData.rodentBreed = null;
        updatedData.reptileBreed = null;
        updatedData.rabbitBreed = null;
        updatedData.personalizedBreed = null;
    }
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) { 
      setError("Você precisa estar logado para cadastrar um pet."); 
      return; 
    }
    
    setLoading(true);
    setError('');

    try {
        let imageUrl = formData.imageurl; // Usa a imagem padrão inicialmente

        // Se houver uma nova imagem, faz o upload
        if (imageFile) {
          imageUrl = await uploadImage(imageFile);
        }

        const { name, age, speciespet, porte, gender, personalizedBreed } = formData;
        const breedKey = getBreedKeyForSpecies(speciespet);
        const selectedBreed = breedKey ? formData[breedKey] : null;

        const dataToSend = {
            name, 
            age: parseInt(age), 
            imageurl: imageUrl, 
            speciespet, 
            porte, 
            gender, 
            usuarioId: user.id,
            dogBreed: null, 
            catBreed: null, 
            birdBreed: null, 
            fishBreed: null, 
            rodentBreed: null, 
            reptileBreed: null, 
            rabbitBreed: null,
            personalizedBreed: null
        };

        // Configurar a raça correta
        if (selectedBreed === 'OUTRO') {
            dataToSend.personalizedBreed = personalizedBreed;
        } else if (breedKey && selectedBreed) {
            dataToSend[breedKey] = selectedBreed;
        }
        
        console.log("DADOS FINAIS ENVIADOS PARA A API:", dataToSend);
        
        await api.post('/pets', dataToSend);
        alert('Pet cadastrado com sucesso!');
        navigate('/pets');
    } catch (error) {
        console.error("Erro ao cadastrar pet:", error.response?.data || error);
        const errorMsg = error.response?.data?.message || error.message || "Falha ao cadastrar o pet. Verifique os dados e tente novamente.";
        setError(errorMsg);
    } finally {
        setLoading(false);
    }
  };

  const renderBreedSelector = () => {
    const selectedSpecies = formData.speciespet;
    if (!selectedSpecies || !breedOptions[selectedSpecies] || selectedSpecies === 'OUTROS') {
      return (
        <div className="form-group">
            <label htmlFor="personalizedBreed">Raça</label>
            <input 
              type="text" 
              id="personalizedBreed" 
              name="personalizedBreed" 
              placeholder="Especifique a raça" 
              required 
              onChange={handleChange} 
              value={formData.personalizedBreed || ''}
            />
        </div>
      );
    }

    const breedKey = getBreedKeyForSpecies(selectedSpecies);
    const currentBreedValue = formData[breedKey];

    return (
        <>
            <div className="form-group">
                <label htmlFor={breedKey}>Raça</label>
                <select 
                  id={breedKey} 
                  name={breedKey} 
                  required 
                  onChange={handleChange} 
                  value={currentBreedValue || ''}
                >
                    <option value="">Selecione a raça</option>
                    {breedOptions[selectedSpecies].map(breed => (
                        <option key={breed} value={breed}>
                            {breed.replace(/_/g, ' ').charAt(0) + breed.replace(/_/g, ' ').slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
            {currentBreedValue === 'OUTRO' && (
                <div className="form-group">
                    <label htmlFor="personalizedBreed">Especifique a Raça</label>
                    <input 
                      type="text" 
                      id="personalizedBreed" 
                      name="personalizedBreed" 
                      placeholder="Digite o nome da raça" 
                      required 
                      onChange={handleChange}
                      value={formData.personalizedBreed || ''}
                    />
                </div>
            )}
        </>
    );
  };

  return (
    <div className="add-pet-page">
      <HeaderComCadastro />
      <div className="welcome-section">
        <h1 className="welcome-title">Cadastre seu novo amigo</h1>
      </div>
      <div className="add-pet-wrapper">
        <div className="add-pet-container">
          <form onSubmit={handleSubmit} className="pet-form">
            {error && <p className="error-message">{error}</p>}
            
            {/* Upload Circular - Bolinha que abre os arquivos */}
            <div className="avatar-upload">
              <label htmlFor="avatar-input" className="avatar-label">
                <input
                  type="file"
                  id="avatar-input"
                  className="avatar-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview === 'https://i.imgur.com/2qgrCI2.png' ? (
                  <div className="avatar-placeholder">
                    <div className="placeholder-icon">📷</div>
                    <span>Adicionar Foto</span>
                    <div className="avatar-hint">Clique para escolher</div>
                  </div>
                ) : (
                  <img src={imagePreview} alt="Preview do pet" className="avatar-preview" />
                )}
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  onChange={handleChange} 
                  value={formData.name}
                  placeholder="Digite o nome do pet"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Idade (anos)</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  required 
                  onChange={handleChange} 
                  min="0" 
                  max="50"
                  value={formData.age}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="speciespet">Espécie</label>
                <select 
                  id="speciespet" 
                  name="speciespet" 
                  required 
                  onChange={handleChange} 
                  value={formData.speciespet}
                >
                  <option value="">Selecione a espécie</option>
                  {speciesOptions.map(specie => (
                    <option key={specie} value={specie}>
                      {specie.charAt(0) + specie.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              {renderBreedSelector()}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="porte">Porte</label>
                <select 
                  id="porte" 
                  name="porte" 
                  required 
                  onChange={handleChange} 
                  value={formData.porte}
                >
                    <option value="">Selecione o porte</option>
                    {porteOptions.map(p => (
                      <option key={p} value={p}>
                        {p.charAt(0) + p.slice(1).toLowerCase()}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gênero</label>
                <select 
                  id="gender" 
                  name="gender" 
                  required 
                  onChange={handleChange} 
                  value={formData.gender}
                >
                    <option value="">Selecione o gênero</option>
                    {genderOptions.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar Pet'
                )}
              </button>
              <Link to="/pets" className="cancel-button">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddPet;
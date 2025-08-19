import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header_com_cadastro';
import Footer from '../../../components/Footer';
import './css/styles.css';

const AddPet = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    especie: '',
    raca: '',
    genero: '',
    porte: '',
    detalhes: '' // Campo adicionado
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do pet:', formData);
    console.log('Imagem:', image);
    alert('Pet cadastrado com sucesso!');
  };

  return (
    <div className="add-pet-page">
      <Header />
      
      <div className="welcome-section">
        <h1 className="welcome-title">Cadastre seu pet para que possamos cuidar dele</h1>
      </div>
      
      <div className="add-pet-wrapper">
        <div className="add-pet-container">
          <div className="avatar-upload">
            <label htmlFor="imageUpload" className="avatar-label">
              {preview ? (
                <img src={preview} alt="Preview do Pet" className="avatar-preview" />
              ) : (
                <div className="avatar-placeholder">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="Upload"
                    className="placeholder-icon"
                  />
                </div>
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="avatar-input"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="pet-form">
            <div className="form-top-spacing">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="idade">Idade</label>
                  <input
                    type="text"
                    id="idade"
                    name="idade"
                    value={formData.idade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="especie">Espécie</label>
                  <input
                    type="text"
                    id="especie"
                    name="especie"
                    value={formData.especie}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="raca">Raça</label>
                  <input
                    type="text"
                    id="raca"
                    name="raca"
                    value={formData.raca}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="genero">Gênero</label>
                  <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="porte">Porte</label>
                  <select
                    id="porte"
                    name="porte"
                    value={formData.porte}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>

              {/* Novo campo de detalhes */}
              <div className="form-group">
                <label htmlFor="detalhes">Detalhes adicionais</label>
                <textarea
                  id="detalhes"
                  name="detalhes"
                  value={formData.detalhes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ex: Tem medo de trovão, toma remédio, etc."
                ></textarea>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Cadastrar Pet
              </button>
              <Link to="/pets" className="cancel-button">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddPet;

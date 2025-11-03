import React, { useState } from 'react';
import api from '../../../services/api';
import './css/styles.css';
import defaultProfileIcon from '../../../assets/images/Header/perfilIcon.png';
import { toast } from 'react-toastify';

const AddEmployeeModal = ({ onClose, onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', phone: '',
        address: '', rg: '', imageurl: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(defaultProfileIcon);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Adiciona a role 'EMPLOYEE' ao payload da requisição
            const payload = { ...formData, role: 'EMPLOYEE' };
            
            // Assumindo um endpoint /admin/users para criação, que é mais seguro
            const response = await api.post('/admin/users', payload); 
            const newUser = response.data;

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);
                await api.post(`/upload/user/${newUser.id}`, uploadFormData);
            }

            toast.success('Funcionário cadastrado com sucesso!');
            onEmployeeAdded();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Erro ao cadastrar funcionário.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Novo Funcionário</h2>
                <form onSubmit={handleSubmit}>
                    <div className="avatar-upload">
                        <label htmlFor="avatar-input-add-employee" className="avatar-label">
                            <img src={imagePreview} alt="Preview" className="avatar-preview" />
                        </label>
                        <input id="avatar-input-add-employee" type="file" accept="image/*" onChange={handleImageChange} className="avatar-input" />
                    </div>
                    <div className="form-group-modal"><label>Nome</label><input type="text" name="username" required onChange={handleChange} /></div>
                    <div className="form-group-modal"><label>Email</label><input type="email" name="email" required onChange={handleChange} /></div>
                    <div className="form-group-modal"><label>Senha Provisória</label><input type="password" name="password" required onChange={handleChange} /></div>
                    <div className="form-group-modal"><label>Telefone</label><input type="tel" name="phone" required onChange={handleChange} /></div>
                    <div className="form-group-modal"><label>Endereço</label><input type="text" name="address" required onChange={handleChange} /></div>
                    <div className="form-group-modal"><label>RG</label><input type="text" name="rg" required onChange={handleChange} /></div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-save" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;

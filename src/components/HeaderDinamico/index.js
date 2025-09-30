// components/Header.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header_sem_cadastro from './Header_sem_cadastro';
import HeaderComCadastro from './HeaderComCadastro';
import HeaderVeterinario from './HeaderVeterinario'; // Se você tiver
import HeaderAdmin from './HeaderAdmin'; // Se você tiver

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  // Se não estiver autenticado, mostra header sem cadastro
  if (!isAuthenticated) {
    return <Header_sem_cadastro />;
  }

  // Se estiver autenticado, mostra header baseado no papel (role)
  switch (user.role) {
    case 'ADMIN':
      return <HeaderAdmin />; // Você precisará criar este componente
    case 'VETERINARY':
      return <HeaderVeterinario />; // Você precisará criar este componente
    case 'USER':
      return <HeaderComCadastro />;
    default:
      return <HeaderComCadastro />;
  }
};

export default Header;
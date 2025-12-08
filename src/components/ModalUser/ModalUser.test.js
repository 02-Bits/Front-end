import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalUser from './index';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock do contexto de autenticação e da navegação
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    login: jest.fn().mockResolvedValue({ username: 'Test User', role: 'USER' }),
  }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock do toast para evitar erros nos testes
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));


describe('ModalUser Component', () => {
  const mockOnClose = jest.fn();

  // Renderiza o componente dentro dos providers necessários
  const renderComponent = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ModalUser onClose={mockOnClose} />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('should render all fields and buttons correctly', () => {
    renderComponent();

    // Verifica se os elementos principais estão na tela
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar-se/i })).toBeInTheDocument();
  });

  it('should allow user to type in email and password fields', () => {
    renderComponent();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should call login function and close modal on successful login', async () => {
    renderComponent();
    const { login } = useAuth();
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    // Aguarda a resolução da função de login
    await screen.findByRole('button', { name: /entrar/i });
    
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Navega para a home em caso de USER
  });
});
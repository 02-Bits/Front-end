// App.js
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/index.js';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

// Importa TODOS os headers aqui
import HeaderSemCadastro from './components/HeaderSemCadastro/index.js';
import HeaderComCadastro from './components/HeaderComCadastro/index.js';
import HeaderVet from './components/HeaderVet/HeaderVet.js';
import HeaderAdmin from './components/HeaderAdmin/HeaderAdmin.js';

// Componente para controlar qual Header mostrar baseado no authentication e role
function HeaderController() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Se não estiver autenticado, mostra HeaderSemCadastro
  if (!isAuthenticated) {
    return <HeaderSemCadastro />;
  }

  // Se estiver autenticado, mostra o header baseado no role
  switch (user?.role) {
    case 'VETERINARY':
      return <HeaderVet />;
    case 'ADMIN':
      return <HeaderAdmin />;
    case 'USER':
    default:
      return <HeaderComCadastro />;
  }
}

// Componente principal da aplicação
function AppContent() {
  return (
    <div className="App">
      {/* ScrollToTop - controla o scroll automaticamente */}
      <ScrollToTop />
      
      {/* Header dinâmico baseado no authentication/role */}
      <HeaderController />
      
      {/* Conteúdo principal das rotas */}
      <main className="main-content">
        <AppRoutes />
      </main>
      
    </div>
  );
}

// Componente App principal
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
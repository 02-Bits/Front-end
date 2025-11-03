import { Route, Routes } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

// Imports das páginas Públicas e do Cliente
import Home from "../pages/Home";
import ProfileScreen from "../pages/User/Perfil";
import Pets from "../pages/User/Pets/PetsProfile";
import AddPet from "../pages/User/Pets/AddPets";
import ConversationList from '../pages/User/Chat/ConversationList';
import PetsDetails from "../pages/User/Pets/PetsDetails";
import ConsulPending from "../pages/User/Consultations/ConsulPending";
import ScheduleAppointment from "../pages/User/Consultations/ScheduleAppointment";
import ResetPasswordPage from '../pages/ResetPassword';
import Chat from "../pages/User/Chat/Chat";

// Imports do Vet
import VetDashboard from '../pages/Vet/Dashboard/Dashboard';
import VetConsultas from '../pages/Vet/Consultas/Consultas';
import VetRelatorios from '../pages/Vet/Relatorios/Relatorios';
import VetDetalhesConsulta from '../pages/Vet/DetalhesConsulta/DetalhesConsulta';
import VetPerfil from '../pages/Vet/Perfil/Perfil';
import VetChat from '../pages/Vet/Chat/Chat';
import WorkSchedule from "../pages/Vet/WorkSchedule";

// Imports do Admin
import VetList from '../pages/admin/VetList/VetList';
import AdminDashboard from "../pages/admin/Dashboard/Dashboard";
import PacientesList from '../pages/admin/PacientesList/PacientesList';
import AdminConsultas from '../pages/admin/Consultas/Consultas';
import AdminRelatorios from '../pages/admin/Relatorios/Relatorios';
import AdminPerfil from '../pages/admin/Perfil/Perfil';
import AdminChat from '../pages/admin/Chat/Chat';
import ClinicServices from "../pages/admin/ClinicServices";
import EmployeeList from "../pages/admin/EmployeeList";
import WorkSchedules from "../pages/admin/WorkSchedules/WorkSchedules";

// --- NOVO/MODIFICADO ---
import EmployeeDashboard from "../pages/Employee/Dashboard"; // Import do dashboard do funcionário

// Imports que podem estar faltando
import ModalRegisterUser from "../components/ModalRegisterUser";
import ModalRegisterVet from "../components/ModalRegisterVet";
import AbaoutUs from "../pages/AboutUs";
import App from "../pages/App";


import EmployeeServicos from "../pages/Employee/Servicos"; // CORRIGIDO
import EmployeeAgenda from "../pages/Employee/Agenda";
import EmployeeChat from "../pages/Employee/Chat";
import EmployeePerfil from "../pages/Employee/Perfil";
import EmployeeDetalhesServico from "../pages/Employee/DetalhesServico";

export default function AppRoutes() {
  return (
    <Routes>
      {/* === Rotas Públicas === */}
      <Route path="/" element={<Home />} />
      <Route path="/register-user" element={<ModalRegisterUser />} />
      <Route path="/register-vet" element={<ModalRegisterVet />} />
      <Route path="/sobre-nos" element={<AbaoutUs />} />
      <Route path="/app" element={<App />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      
      {/* === Rotas do Cliente (USER) === */}
      <Route path="/perfil" element={<PrivateRoute requiredRole="USER"><ProfileScreen /></PrivateRoute>} />
      <Route path="/pets" element={<PrivateRoute requiredRole="USER"><Pets /></PrivateRoute>} />
      <Route path="/add-pet" element={<PrivateRoute requiredRole="USER"><AddPet /></PrivateRoute>} />
      <Route path="/pets-details/:petId" element={<PrivateRoute requiredRole="USER"><PetsDetails /></PrivateRoute>} />
      <Route path="/consultas" element={<PrivateRoute requiredRole="USER"><ConsulPending /></PrivateRoute>} />
      <Route path="/agendar-consulta" element={<PrivateRoute requiredRole="USER"><ScheduleAppointment /></PrivateRoute>} />
      <Route path="/conversations" element={<PrivateRoute requiredRole="USER"><ConversationList /></PrivateRoute>} />
      <Route path="/chat/:consultationId" element={<PrivateRoute requiredRole="USER"><Chat /></PrivateRoute>} />

      {/* === Rotas do Veterinário (VETERINARY) === */}
      <Route path="/vet/dashboard" element={<PrivateRoute requiredRole="VETERINARY"><VetDashboard /></PrivateRoute>} />
      <Route path="/vet/consultas" element={<PrivateRoute requiredRole="VETERINARY"><VetConsultas /></PrivateRoute>} />
      <Route path="/vet/relatorios" element={<PrivateRoute requiredRole="VETERINARY"><VetRelatorios /></PrivateRoute>} />
      <Route path="/vet/consultas/:consultaId" element={<PrivateRoute requiredRole="VETERINARY"><VetDetalhesConsulta /></PrivateRoute>} />
      <Route path="/vet/chat" element={<PrivateRoute requiredRole="VETERINARY"><VetChat /></PrivateRoute>} />
      <Route path="/vet/perfil" element={<PrivateRoute requiredRole="VETERINARY"><VetPerfil /></PrivateRoute>} />
      <Route path="/vet/schedule" element={<PrivateRoute requiredRole="VETERINARY"><WorkSchedule /></PrivateRoute>} />

      {/* === Rotas do Administrador (ADMIN) === */}
      <Route path="/admin/dashboard" element={<PrivateRoute requiredRole="ADMIN"><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/veterinarios" element={<PrivateRoute requiredRole="ADMIN"><VetList /></PrivateRoute>} />
      <Route path="/admin/pacientes" element={<PrivateRoute requiredRole="ADMIN"><PacientesList /></PrivateRoute>} />
      <Route path="/admin/funcionarios" element={<PrivateRoute requiredRole="ADMIN"><EmployeeList /></PrivateRoute>} />
      <Route path="/admin/consultas" element={<PrivateRoute requiredRole="ADMIN"><AdminConsultas /></PrivateRoute>} />
      <Route path="/admin/relatorios" element={<PrivateRoute requiredRole="ADMIN"><AdminRelatorios /></PrivateRoute>} />
      <Route path="/admin/perfil" element={<PrivateRoute requiredRole="ADMIN"><AdminPerfil /></PrivateRoute>} />
      <Route path="/admin/chat" element={<PrivateRoute requiredRole="ADMIN"><AdminChat /></PrivateRoute>} />
      <Route path="/admin/services" element={<PrivateRoute requiredRole="ADMIN"><ClinicServices /></PrivateRoute>} />
      <Route path="/admin/schedules" element={<PrivateRoute requiredRole="ADMIN"><WorkSchedules /></PrivateRoute>} /> {/* <-- NOVA ROTA */}


      {/* === Rota do Funcionário (EMPLOYEE) - CORRIGIDA E COMPLETA === */}
      <Route path="/employee/dashboard" element={<PrivateRoute requiredRole="EMPLOYEE"><EmployeeDashboard /></PrivateRoute>} />
      <Route path="/employee/servicos" element={<PrivateRoute requiredRole="EMPLOYEE"><EmployeeServicos /></PrivateRoute>} />
      <Route path="/employee/agenda" element={<PrivateRoute requiredRole="EMPLOYEE"><EmployeeAgenda /></PrivateRoute>} />
      <Route path="/employee/chat" element={<PrivateRoute requiredRole="EMPLOYEE"><EmployeeChat /></PrivateRoute>} />
      <Route path="/employee/perfil" element={<PrivateRoute requiredRole="EMPLOYEE"><EmployeePerfil /></PrivateRoute>} />
      <Route path="/employee/servicos/:scheduleId" element={<PrivateRoute requiredRole="EMPLOYEE"><EmployeeDetalhesServico /></PrivateRoute>} />

      {/* Rota de detalhes da consulta, acessível pelo funcionário */}
      <Route path="/vet/consultas/:consultaId" element={<PrivateRoute requiredRole="EMPLOYEE"><VetDetalhesConsulta /></PrivateRoute>} />
    </Routes>
  );
}